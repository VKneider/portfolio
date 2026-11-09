# Archived components

These components are kept for reference and are **not registered** in
`src/Components/components.js`, so they are not built, bundled or routed.

Archived because they are no longer used by the live portfolio:

- `ImageDemo` — old demo page; no route.
- `MainMenu` — old menu; replaced by `Navbar`.
- `MyNavigation` — old sidebar navigation; replaced by `Navbar` + `MultiRoute`.
- `TeachingSection` — old About teaching block; replaced by the current About sections.
- `TechExpertise` — old toolbox card/marquee; replaced by `ToolboxSpec` (`DescriptionList`). Its data lives in `AppComponents/AboutSection/data/techExpertise.js`.
- `TechnicalSkillsSection` — old toolbox; replaced by `ToolboxSpec`.
- `RandomFacts` — removed from About.
- `BadgeCarousel` — only used by `TechExpertise`.

To restore one, move it back to its category folder, register it in
`components.js`, and add it to the relevant view. Do not import archived files
from active components.
