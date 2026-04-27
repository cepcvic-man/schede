## Why

The current home works on desktop but feels too large and slow on mobile: header and hero consume most of the first viewport, while search and manual sections are pushed down. Users need a faster operational entry point for finding and opening maintenance sheets.

## What Changes

- Rework the home as a mobile-first operational launcher instead of a large hero-led landing section.
- Keep CEPC branding visible but compress the home header, especially on narrow screens.
- Move search into the primary first-viewport workflow and make it visually central.
- Replace duplicate hero/category calls to action with one clear path into the available `Pulizia` sheets.
- Present future categories in a compact, lower-priority format so unavailable content does not dominate mobile.
- Preserve desktop usability with a cleaner dashboard-style arrangement and no breaking navigation changes.

## Capabilities

### New Capabilities

- `home-experience`: Covers the home page layout, mobile-first hierarchy, search prominence, category entry points, and responsive behavior.

### Modified Capabilities

- None.

## Impact

- Affected code: `index.html` CSS, home markup, and possibly small JavaScript wiring for existing home search/category actions.
- No new runtime dependencies expected.
- No changes expected to individual sheet files, service worker behavior, manifest, or print workflow.
