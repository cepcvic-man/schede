import base64
import io
import os
import re
from pathlib import Path

from PIL import Image


FILES = ["pulizie/scheda11.html", "pulizie/scheda12.html", "pulizie/scheda19.html"]
OUT = Path("tests/_tmp_crops")
OUT.mkdir(parents=True, exist_ok=True)

for file_name in FILES:
    html = Path(file_name).read_text(encoding="utf-8")
    match = re.search(
        r'<div class="shared-img"><img src="data:image/([^;]+);base64,([^"]+)"',
        html,
    )
    if not match:
        raise SystemExit(f"missing shared image: {file_name}")
    image = Image.open(io.BytesIO(base64.b64decode(match.group(2))))
    print(file_name, image.size, match.group(1))
    image.save(OUT / f"{Path(file_name).stem}.png")
    shared = re.search(r'<div class="shared-layout">([\s\S]*?)\n  <div class="storage-layout">', html)
    if shared:
        for label, body in re.findall(r'<span class="step-label">([^<]+)</span></div>\s*<div class="step-body">([\s\S]*?)</div>', shared.group(1)):
            print(" -", label, re.sub(r"\s+", " ", body).strip()[:140])
