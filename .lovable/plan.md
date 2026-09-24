# Animated horizontal destination gallery

## What will change
- Replace the current destination grid with a horizontal, snap-scrolling city gallery on both Home and Destinations.
- Track the card nearest the gallery center so it smoothly enlarges and brightens while the previous card recedes.
- Preserve each card’s existing click-to-preview behavior and destination details.
- Keep touch scrolling natural on phones and support mouse/trackpad scrolling on larger screens.
- Respect reduced-motion preferences by disabling scale and movement transitions.

## Technical details
- Add a gallery ref and lightweight scroll-position calculation to identify the centered destination card.
- Apply active/inactive states through semantic classes and CSS transitions.
- Use stable card widths, scroll snapping, edge spacing, and image sizing for consistent desktop and mobile layouts.
- Verify the effect and layout on desktop and mobile, then confirm the project remains error-free.
