# formatoschede.md

Scopo: formato canonico per generare nuove schede HTML CEPC uniformi. File pensato per agenti. Seguire come contratto rigido.

## Output

- Una scheda = un file HTML standalone in cartella macrocategoria.
- Nome file: `<macrocategoria>/scheda<N>.html`.
- Lingua HTML: `it`.
- Non usare JS nella scheda.
- Non aggiungere dipendenze oltre Google Fonts gia usati.
- Layout deve funzionare sia standalone sia dentro iframe di `index.html`.
- Larghezza desktop card: `680px`.
- Mobile <=720px: full width, no radius, no shadow.

## Metadata

```yaml
schema: cepc-sheet-v1
file: "<macrocategoria>/scheda<N>.html"
title: "Scheda <N> - <Titolo>"
category_label: "<Macrocategoria>" # es. Pulizia, Elettrodomestici, Ferramenta
footer_left: "CEPC - Scheda <N>"
footer_right: "<TITOLO MAIUSCOLO>"
image_policy:
  preferred: embedded data URI base64 when generated from existing assets
  allowed: relative src when asset lives in repo and path is stable from sheet file
  required_alt: "" # current convention: empty alt for procedural product images
```

## Visual Tokens

```css
/* Canonical colors */
--paper:#f0f0ee;
--white:#fff;
--navy:#1A3A5C;
--blue:#2E6DA4;
--line:#e2e2df;
--step-bg:#F2F2F0;
--storage-bg:#F0F4F8;
--footer-bg:#F7F7F5;
--warn-bg:#FFF3CD;
--warn-line:#E8A900;
--warn-icon:#F5C000;
--warn-title:#7A5000;
--warn-text:#5C3D00;
--warn-strong:#3D2800;
--body-text:#555;
--footer-text:#999;
```

Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
```

Type:

```yaml
body: Barlow 400/500
display: Barlow Condensed 600/700 uppercase
header_title: 22px desktop, 20px mobile, weight 700, letter .04em
badge: 16px desktop, 14px mobile, weight 700, letter .1em
section_bar_h2: 14px, weight 700, letter .08em
step_label: 14px, weight 700, letter .04em
body_text: 13px, line-height 1.55
alert_text: 12.5px, line-height 1.5
footer: 11px
```

## Canonical CSS

Use this CSS block unless intentionally extending with local-only classes. Keep class names stable.

```css
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Barlow',sans-serif;background:#f0f0ee;display:flex;justify-content:center;padding:24px 12px}
.scheda{width:min(680px,100%);background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.12)}

.scheda-header{background:#1A3A5C;color:#fff;padding:14px 20px;display:flex;align-items:center}
.badge{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:4px;padding:5px 12px;color:#fff;margin-right:12px}
.scheda-header h1{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#fff}

.alert-box{display:flex;align-items:flex-start;gap:12px;padding:13px 16px;background:#FFF3CD;border-left:5px solid #E8A900}
.alert-icon{flex-shrink:0;width:30px;height:30px;margin-top:1px}
.alert-title{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#7A5000;margin-bottom:3px}
.alert-text{font-size:12.5px;color:#5C3D00;line-height:1.5}
.alert-text strong{font-weight:600;color:#3D2800}

.section-bar{display:flex;align-items:center;gap:9px;padding:9px 16px;background:#2E6DA4}
.section-bar.dark{background:#1A3A5C}
.section-bar h2{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fff}

.step-row{display:grid;grid-template-columns:160px 1fr;border-top:1px solid #e2e2df}
.step-row:first-child{border-top:none}
.step-img-cell{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;background:#fff;border-right:1px solid #e2e2df;gap:0}
.step-img-cell img{max-width:128px;max-height:160px;display:block;width:auto;height:auto;object-fit:contain}
.step-text-cell{padding:16px 18px;display:flex;flex-direction:column;justify-content:center;gap:6px;background:#F2F2F0}
.step-kicker{display:flex;align-items:center;gap:8px}
.step-dot{width:7px;height:7px;border-radius:50%;background:#2E6DA4;flex-shrink:0}
.step-dot.navy{background:#1A3A5C}
.step-label{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#1A3A5C;margin-bottom:0}
.step-label.navy{color:#1A3A5C}
.step-body{font-size:13px;line-height:1.55;color:#555;padding-left:0}

.shared-layout{display:grid;grid-template-columns:160px 1fr;border-top:1px solid #e2e2df}
.shared-img{display:flex;align-items:center;justify-content:center;padding:16px;background:#fff;border-right:1px solid #e2e2df}
.shared-img img{max-width:128px;max-height:200px;display:block}
.shared-steps{padding:12px 18px;background:#F2F2F0;display:flex;flex-direction:column;justify-content:center;gap:10px}
.layout-step{display:flex;flex-direction:column;gap:4px}

.storage-layout{display:grid;grid-template-columns:160px 1fr;border-top:1px solid #e2e2df}
.storage-left{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;background:#fff;border-right:1px solid #e2e2df;gap:0}
.storage-left img{max-width:128px;max-height:200px;display:block;width:auto;height:auto;object-fit:contain}
.storage-right{display:flex;flex-direction:column;justify-content:center;background:#F0F4F8}
.storage-sub{padding:12px 18px;border-top:1px solid #e2e2df}
.storage-sub:first-child{border-top:none}
.storage-sub-header{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.step-kicker .step-num,.storage-sub-header .step-num{flex-shrink:0}
.step-num{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;background:#1A3A5C;color:#fff;border-radius:3px;padding:2px 7px;margin-bottom:0}
.storage-step-title{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#1A3A5C;margin-bottom:0}
.storage-step-body{font-size:13px;line-height:1.55;color:#555}
.bullet-list{margin:4px 0 0 18px;font-size:13px;line-height:1.6;color:#555}
.step-warning{font-size:12px;font-weight:700;text-transform:uppercase;color:#7A5000;background:#FFF3CD;border-left:3px solid #E8A900;padding:5px 8px;margin-bottom:6px;line-height:1.4}

.scheda-footer{display:flex;justify-content:space-between;align-items:center;padding:8px 16px;background:#F7F7F5;border-top:1px solid #e2e2df;font-size:11px;color:#999}
@media(max-width:720px){
body{padding:0;background:#fff}
.scheda{width:100%;border-radius:0;box-shadow:none}
.scheda-header{padding:12px 14px;align-items:center;gap:8px;flex-wrap:wrap}
.badge{margin-right:0;font-size:14px}
.scheda-header h1{font-size:20px;line-height:1.05}
.alert-box{padding:12px 14px}
.section-bar{padding:9px 14px}
.step-row,.shared-layout,.storage-layout{grid-template-columns:1fr}
.step-img-cell,.shared-img,.storage-left{border-right:0;border-bottom:1px solid #e2e2df;padding:14px}
.step-img-cell img,.shared-img img,.storage-left img{width:auto;max-width:min(100%,260px);height:auto;max-height:280px;object-fit:contain}
.step-text-cell,.shared-steps,.storage-sub{padding:14px}
.storage-right{min-width:0}
.scheda-footer{align-items:flex-start;flex-direction:column;gap:3px;padding:8px 14px}
}
```

## Required HTML Skeleton

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Scheda N - Titolo</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
<style>
/* paste canonical CSS */
</style>
</head>
<body>
<div class="scheda">

  <div class="scheda-header">
    <span class="badge">Scheda N</span>
    <h1>Titolo</h1>
  </div>

  <!-- required unless explicitly told to omit -->
  <div class="alert-box">
    <svg class="alert-icon" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2L2 26h26L15 2z" fill="#F5C000" stroke="#E8A900" stroke-width="1.5"/><rect x="13.5" y="11" width="3" height="8" rx="1" fill="#7A5000"/><rect x="13.5" y="21" width="3" height="3" rx="1" fill="#7A5000"/></svg>
    <div>
      <p class="alert-title">Attenzione - Sicurezza</p>
      <p class="alert-text">Prima di eseguire gli interventi di questa scheda di manutenzione, valutare i potenziali rischi e condizioni pericolose che richiedono la compilazione del <strong>DC-85</strong> e leggere il <strong>DC-82</strong>.</p>
    </div>
  </div>

  <div class="section-bar">
    <!-- category icon, 18x18, stroke/fill white -->
    <h2>Macrocategoria</h2>
  </div>

  <!-- content blocks go here -->

  <div class="scheda-footer">
    <span>CEPC - Scheda N</span>
    <span>TITOLO MAIUSCOLO</span>
  </div>

</div>
</body>
</html>
```

## Category Bar Icons

Default icon for `Pulizia`:

```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
```

Future macrocategorie can reuse same geometry rules. Icon must be:

```yaml
size: 18x18
color: "#fff"
style: simple solid/fill or stroke 2
position: before h2 inside .section-bar
```

## Content Block Types

### Type A: Single Step With Image

Use for one procedural action paired with one product/image.

```html
<div class="step-row">
  <div class="step-img-cell"><img src="IMAGE_SRC" alt=""></div>
  <div class="step-text-cell">
    <div class="step-kicker"><span class="step-dot"></span><p class="step-label">Step title</p></div>
    <div class="step-body">Instruction text.</div>
  </div>
</div>
```

Rules:

```yaml
image_cell_width: 160px desktop
image_max: 128x160 desktop, 260x280 mobile
text_bg: "#F2F2F0"
step_dot_default: "#2E6DA4"
step_dot_navy_allowed: true
```

### Type B: Shared Image With Multiple Steps

Avoid for generated procedural sheets. Use only when the same single product image truly applies to every listed step. Do not use a composite illustration containing multiple scenes for multiple steps. If the source visual contains multiple scenes, crop/split it and use Type A `step-row` once per step.

```html
<div class="shared-layout">
  <div class="shared-img"><img src="IMAGE_SRC" alt=""></div>
  <div class="shared-steps">
    <div class="layout-step">
      <div class="step-kicker"><span class="step-num">Passo 1</span><p class="step-label">Step title</p></div>
      <div class="step-body">Instruction text.</div>
    </div>
    <div class="layout-step">
      <div class="step-kicker"><span class="step-num">Passo 2</span><p class="step-label">Step title</p></div>
      <div class="step-body">Instruction text.</div>
    </div>
  </div>
</div>
```

Rules:

```yaml
default_for_new_sheets: false
forbidden_when_image_is_composite: true
shared_img_max: 128x200 desktop, 260x280 mobile
steps_gap: 10px
use_step_num_for_ordered_sequences: true
```

### Type C: Storage Layout

Use for final stoccaggio/ripristino block. This is most common after cleaning/use blocks.

```html
<div class="storage-layout">
  <div class="storage-left"><img src="IMAGE_SRC" alt=""></div>
  <div class="storage-right">
    <div class="storage-sub">
      <div class="storage-sub-header"><span class="step-num">Passo 1</span><p class="storage-step-title">Title</p></div>
      <div class="storage-step-body">Instruction text.</div>
    </div>
    <div class="storage-sub">
      <div class="storage-sub-header"><span class="step-num">Passo 2</span><p class="storage-step-title">Title</p></div>
      <div class="storage-step-body">
        Instruction text.
        <ul class="bullet-list">
          <li>Bullet</li>
          <li>Bullet</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

Rules:

```yaml
background: "#F0F4F8"
border_between_substeps: "#e2e2df"
step_num_required_when_more_than_one_substep: true
single_substep_can_omit_step_num: true
```

### Type D: Warning Inside Step

Use for local safety/storage caution inside any step or storage substep.

```html
<div class="step-warning">Warning text.</div>
```

Rules:

```yaml
uppercase: true
font_size: 12px
background: "#FFF3CD"
left_border: "3px solid #E8A900"
color: "#7A5000"
```

## Section Ordering

Preferred order:

```yaml
1_header: required
2_global_safety_alert: required
3_category_bar: required
4_primary_procedure_blocks: one_or_more
5_storage_or_closing_block: recommended
6_footer: required
```

For pulizie:

```yaml
common_sections:
  - Pulizia
  - Stoccaggio
```

If only one macro section exists, category bar can remain `Pulizia` and all blocks follow it. If adding extra section bars, use `.section-bar.dark` for secondary/darker separator only when visual grouping is needed.

## Copy Rules

```yaml
title:
  case: Title Case or human title as source
  rendered: CSS uppercase
  max_words_recommended: 4
badge:
  format: "Scheda N"
section_bar:
  label: macrocategoria singular/plural as app nav uses it
step_titles:
  case: short noun phrase
  rendered: uppercase via CSS
  examples: ["Pulizia", "Asciugatura", "Chiusura", "Stoccaggio", "Fissaggio finale"]
body:
  style: imperative/operational Italian
  max_sentence_length: short
  avoid: marketing copy, explanations not tied to action
safety_alert:
  canonical_text: keep exact unless user changes safety policy
```

Canonical safety text:

```html
Prima di eseguire gli interventi di questa scheda di manutenzione, valutare i potenziali rischi e condizioni pericolose che richiedono la compilazione del <strong>DC-85</strong> e leggere il <strong>DC-82</strong>.
```

## Image Rules

```yaml
object_fit: contain
desktop_standard_max:
  step_img_cell: 128x160
  shared_img: 128x200
  storage_left: 128x200
mobile_max: min(100%,260px) x 280px
background: white image cell
border_between_image_and_text: right desktop, bottom mobile
alt: "" unless image conveys unique non-text info
```

If source image is photo/product cutout:

```yaml
must_not_crop: true
must_not_stretch: true
transparent_or_white_background_preferred: true
```

## Integration With index.html

When adding new sheet:

```yaml
1_create_file: "<macrocategoria>/scheda<N>.html"
2_update_index_array:
  const: sheets
  add_object: "{number:N,title:'Titolo',file:'<macrocategoria>/scheda<N>.html'}"
3_update_counts:
  hero_count/category_count auto uses sheets.length for current pulizie setup
4_if_new_macrocategoria:
  add category metadata/entry in home
  add filtering/grouping only if user asks; current manual list is flat
5_service_worker:
  update cache list if sw.js enumerates files explicitly
```

Current `index.html` iframe enhancements assume:

```yaml
header_selector: ".scheda-header"
badge_selector: ".badge"
title_selector: "h1"
print_safe_width: 720px
print_card_width: 680px
step_layout_selectors:
  - ".step-row"
  - ".shared-layout"
  - ".storage-layout"
```

Do not rename `.scheda-header`, `.badge`, `.scheda`, `.step-row`, `.shared-layout`, `.storage-layout` unless also updating iframe enhancement/print CSS in `index.html`.

## Validation Checklist

Before saying done:

```yaml
html:
  - parses in browser
  - title tag matches badge/title
  - one .scheda root only
  - header contains .badge and h1
  - alert-box present unless explicitly omitted
  - footer present
layout:
  - desktop width <= 680px
  - mobile <=720px full width
  - images contained, not cropped
  - no text overlap
  - no horizontal scroll at 390px
integration:
  - iframe loads file path from index
  - print still uses 720px fixed layout rules
  - menu/print buttons injected into .scheda-header still fit mobile
style:
  - navy #1A3A5C header
  - blue #2E6DA4 section bar
  - warning #FFF3CD/#E8A900
  - Barlow + Barlow Condensed only
```

## Minimal New Sheet Template

Use this when creating new simple sheet.

```html
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Scheda N - Titolo</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
<style>
/* paste canonical CSS from this file */
</style>
</head>
<body>
<div class="scheda">
  <div class="scheda-header">
    <span class="badge">Scheda N</span>
    <h1>Titolo</h1>
  </div>
  <div class="alert-box">
    <svg class="alert-icon" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2L2 26h26L15 2z" fill="#F5C000" stroke="#E8A900" stroke-width="1.5"/><rect x="13.5" y="11" width="3" height="8" rx="1" fill="#7A5000"/><rect x="13.5" y="21" width="3" height="3" rx="1" fill="#7A5000"/></svg>
    <div>
      <p class="alert-title">Attenzione - Sicurezza</p>
      <p class="alert-text">Prima di eseguire gli interventi di questa scheda di manutenzione, valutare i potenziali rischi e condizioni pericolose che richiedono la compilazione del <strong>DC-85</strong> e leggere il <strong>DC-82</strong>.</p>
    </div>
  </div>
  <div class="section-bar">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <h2>Pulizia</h2>
  </div>
  <div class="step-row">
    <div class="step-img-cell"><img src="IMAGE_SRC" alt=""></div>
    <div class="step-text-cell">
      <div class="step-kicker"><span class="step-dot"></span><p class="step-label">Azione</p></div>
      <div class="step-body">Testo operativo.</div>
    </div>
  </div>
  <div class="storage-layout">
    <div class="storage-left"><img src="IMAGE_SRC" alt=""></div>
    <div class="storage-right">
      <div class="storage-sub">
        <p class="storage-step-title">Stoccaggio</p>
        <div class="storage-step-body">Testo operativo.</div>
      </div>
    </div>
  </div>
  <div class="scheda-footer">
    <span>CEPC - Scheda N</span>
    <span>TITOLO MAIUSCOLO</span>
  </div>
</div>
</body>
</html>
```
