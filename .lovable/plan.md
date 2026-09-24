# Split WanderWise into Multiple Pages

## Pages
- **Home (`/`)** — image-led introduction, a short destination preview, and a clear link to start exploring.
- **Explore (`/explore`)** — search, filters, and recommended stays.
- **Destinations (`/destinations`)** — the full India destination gallery and journey route.
- **Our Approach (`/approach`)** — how natural-language search and personalization work.

## Shared experience
- Keep the existing WanderWise visual style, imagery, dialogs, and interactions.
- Replace in-page section links with real page navigation and highlight the active page.
- Keep a concise footer and relevant cross-page calls to action.
- Give every page its own title and sharing description.

## Technical details
- Extract reusable header, footer, destination gallery, and supporting sections into focused components.
- Add dedicated TanStack route files for each new page while preserving `/explore`.
- Verify desktop and mobile navigation, page content, and builds.
