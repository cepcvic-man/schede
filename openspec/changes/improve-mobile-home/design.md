## Context

The app is a static single-page manual in `index.html`. The home currently uses a large brand hero, duplicated entry actions, a separate search block, and tall category cards. This is acceptable on desktop but inefficient on mobile because the first viewport does not prioritize finding or opening a sheet.

The primary user is an operator consulting sheets quickly, often from a phone. The existing manual view, sheet iframe, menu, print behavior, and static deployment model should remain unchanged.

## Goals / Non-Goals

**Goals:**

- Make mobile home faster to scan and use.
- Keep search visible near the top of the first viewport.
- Make `Pulizia` the primary available entry point.
- Reduce vertical space used by unavailable future categories.
- Keep CEPC brand tone: operational, sober, not marketing-like.
- Preserve current sheet opening behavior and search result behavior.

**Non-Goals:**

- Redesign individual sheet pages.
- Add new categories or new sheet data.
- Add persistence, favorites, recent items, analytics, or external dependencies.
- Change service worker, manifest, or print workflow.

## Decisions

1. Use a compact operational header instead of a large hero.

The home should show the title, availability state, and update context in a shallow band. The current large circular symbol and long copy can be reduced or removed on mobile. This improves first-viewport utility. Alternative considered: keep the existing hero and tune spacing. That would be less risky visually but would not solve the main mobile hierarchy problem.

2. Treat search as the primary home action.

The search input should move into the primary visual flow and remain prominent before category browsing. Existing search results can keep the current behavior: typing shows matching sheets and opening a result enters the manual view. Alternative considered: put `Apri schede` first. Search better supports both known-item lookup and broad discovery.

3. Make `Pulizia` a compact primary row/card.

Only `Pulizia` is currently available, so it should be the clearest manual entry. Future categories should be smaller preview rows or compact disabled items with `In preparazione`, not equal-weight cards. Alternative considered: keep all categories as equal cards. That overemphasizes unavailable content on mobile.

4. Keep desktop as a dashboard, not a landing page.

Desktop can keep more spacing but should follow the same hierarchy: compact header, search, available category, support/status panel. This keeps one mental model across breakpoints. Alternative considered: mobile-only redesign. That risks inconsistent hierarchy and extra CSS complexity.

## Risks / Trade-offs

- Less visual impact from the current hero -> Keep CEPC typography, navy/gold/teal palette, and concise status badges.
- Search result dropdown could overlap compact sections -> Verify mobile spacing and result stacking after implementation.
- Category cards changing shape could affect existing click targets -> Keep `open-cleaning` behavior and accessible button/row semantics.
- Static single-file CSS may become dense -> Keep changes scoped to home selectors and responsive blocks.

## Migration Plan

Implement in `index.html`, then verify the home at mobile and desktop widths. Rollback is limited to the home CSS/markup changes because no data or dependency migration is involved.

## Open Questions

- Whether to keep the top navigation icons fully visible on very small screens or simplify them further. Default implementation should preserve existing navigation unless mobile screenshots show crowding.
