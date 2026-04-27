import base64
import io
import re
from pathlib import Path

from PIL import Image


SPECS = {
    "pulizie/scheda11.html": [
        (125, 20, 565, 335),
        (35, 340, 650, 685),
    ],
    "pulizie/scheda12.html": [
        (20, 0, 660, 250),
        (170, 260, 585, 600),
        (20, 590, 660, 935),
    ],
    "pulizie/scheda19.html": [
        (15, 18, 340, 145),
        (78, 150, 334, 330),
        (5, 325, 345, 520),
    ],
}


def png_data_uri(image):
    out = io.BytesIO()
    image.save(out, format="PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(out.getvalue()).decode("ascii")


def extract_shared_image(html):
    match = re.search(
        r'<div class="shared-img"><img src="data:image/[^;]+;base64,([^"]+)"',
        html,
    )
    if not match:
        raise ValueError("missing shared image")
    return Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert("RGBA")


def extract_steps(shared_block):
    steps = re.findall(
        r'<div class="layout-step">\s*'
        r'<div class="step-kicker"><span class="step-num">([^<]+)</span><span class="step-label">([^<]+)</span></div>\s*'
        r'<div class="step-body">([\s\S]*?)</div>\s*'
        r'</div>',
        shared_block,
    )
    if not steps:
        raise ValueError("missing layout steps")
    return steps


def build_step_rows(image, crops, steps):
    if len(crops) != len(steps):
        raise ValueError(f"crop/step mismatch: {len(crops)} crops, {len(steps)} steps")
    rows = []
    for crop_box, (num, label, body) in zip(crops, steps):
        cropped = image.crop(crop_box)
        src = png_data_uri(cropped)
        rows.append(
            '  <div class="step-row">\n'
            f'    <div class="step-img-cell"><img src="{src}" alt=""></div>\n'
            '    <div class="step-text-cell">\n'
            f'      <div class="step-kicker"><span class="step-num">{num}</span><span class="step-label">{label}</span></div>\n'
            f'      <div class="step-body">{body}</div>\n'
            "    </div>\n"
            "  </div>"
        )
    return "\n".join(rows)


for file_name, crops in SPECS.items():
    path = Path(file_name)
    html = path.read_text(encoding="utf-8")
    shared_match = re.search(r'  <div class="shared-layout">[\s\S]*?\n  </div>\n\n  <div class="storage-layout">', html)
    if not shared_match:
        raise SystemExit(f"missing shared layout: {file_name}")
    shared_block = shared_match.group(0)
    image = extract_shared_image(shared_block)
    steps = extract_steps(shared_block)
    replacement = build_step_rows(image, crops, steps) + "\n\n  <div class=\"storage-layout\">"
    html = html[: shared_match.start()] + replacement + html[shared_match.end() :]
    path.write_text(html, encoding="utf-8", newline="\n")
    print(f"split {file_name}: {len(steps)} rows")
