import base64
import io
import re
from pathlib import Path

from PIL import Image


SOURCE = Path("tests/_tmp_crops/scheda19.png")
TARGET = Path("pulizie/scheda19.html")
CROPS = [
    (15, 18, 340, 145),
    (78, 162, 334, 332),
    (5, 348, 345, 520),
]


def uri(image):
    out = io.BytesIO()
    image.save(out, format="PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(out.getvalue()).decode("ascii")


image = Image.open(SOURCE).convert("RGBA")
html = TARGET.read_text(encoding="utf-8")
new_sources = [uri(image.crop(box)) for box in CROPS]

def replace(match):
    replace.index += 1
    if replace.index <= len(new_sources):
        return f'<div class="step-img-cell"><img src="{new_sources[replace.index - 1]}" alt=""></div>'
    return match.group(0)

replace.index = 0
html = re.sub(r'<div class="step-img-cell"><img src="data:image/png;base64,[^"]+" alt=""></div>', replace, html)
TARGET.write_text(html, encoding="utf-8", newline="\n")
print(f"recropped {replace.index} step images in {TARGET}")
