# NOVA ORBIT

NOVA ORBIT is a fictional premium ecommerce experience for space technology, orbital transport, exploration, communication and everyday life beyond Earth.

The project is a complete static website built with **HTML5, CSS3 and vanilla JavaScript**. It requires no framework, package manager or build step.

## Project status

- **Project:** NOVA ORBIT
- **Format:** Responsive static ecommerce website
- **Pages:** 5 interconnected HTML pages
- **Theme:** Light mode by default, with optional persistent dark mode
- **Currency:** Fictional Orbit Credits (OC)
- **Backend:** None
- **Payments:** None; checkout is a demonstration flow only
- **Tracking:** None
- **External runtime requests:** None required; fonts, Lenis and visual assets are bundled locally

## Run locally

From the project directory, start a local HTTP server:

```powershell
cd D:\NOVA
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

A local server is recommended instead of opening files directly because browser behavior for `localStorage`, media loading and relative paths can differ when using the `file:` protocol.

The project can also be previewed with any equivalent static server. No installation or compilation is required.

## Project structure

```text
NOVA/
├── index.html
├── pages/
│   ├── shop.html
│   ├── orbital-gate.html
│   ├── connected-worlds.html
│   └── about.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── licenses/
│   └── videos/
├── verification/
└── README.md
```

The project intentionally uses exactly **one CSS file** and **one JavaScript file** shared by all five pages.

## Plan

### 1. Establish the shared foundation

- Build five interconnected HTML documents with working relative paths from the root and `pages/` directories.
- Create a shared fixed editorial navigation with desktop sidebar and responsive mobile menu.
- Centralize the design system in `css/style.css`.
- Keep all behavior in `js/script.js`.

### 2. Build the visual system

- Use the seven approved colors only:
  - Cream `#F4E3D0`
  - Lavender `#EEE6F0`
  - Purple `#73617B`
  - Burgundy `#523739`
  - Plum `#221A24`
  - Ice Blue `#A8D4DC`
  - Burnt Orange `#B36633`
- Use Space Grotesk for headings and Manrope for body copy, navigation, buttons and technical labels.
- Use responsive CSS custom properties, `clamp()`, rem-based spacing, Grid for editorial layouts and Flexbox for controls.
- Maintain a light, spacious, editorial aerospace aesthetic rather than a dark cyberpunk dashboard.

### 3. Implement the five experiences

- Home: hero, product highlights, connected-worlds preview, manifesto and final destination CTA.
- Shop: searchable and filterable catalogue with eleven active products, product dialogs and cart actions.
- Orbital Gate: product detail page with pricing, specifications, telemetry and four journey stages.
- Connected Worlds: selectable Terra, Ares, Vela, Noctis and Luma network with illustrative orbital traffic.
- About / Contact: brand principles, orbital-living content and an accessible demonstration contact form.

### 4. Add interaction and motion

- Add a short entry loader with the NOVA ORBIT mark.
- Use Lenis for smooth scrolling with native scrolling fallback.
- Add section reveals, restrained parallax and subtle card tilt while preserving usability.
- Respect `prefers-reduced-motion`, disabling Lenis, video playback and unnecessary movement when requested.
- Keep Shop catalogue content visible immediately instead of hiding the full catalogue behind the storytelling observer.

### 5. Complete the ecommerce behavior

- Maintain one product dataset as the source for cards, details, prices, search, filters and cart contents.
- Support category filtering, catalogue search, product detail dialogs, add-to-cart, quantity updates, removal, clearing and demo checkout.
- Store only sanitized product IDs and quantities in `localStorage`.
- Never request or transmit payment information.

### 6. Verify and document

- Check HTML page paths, JavaScript syntax, asset existence, responsive layouts, theme persistence and interactions.
- Confirm the website remains within the one-CSS-file and one-JavaScript-file project rule.
- Keep this README synchronized with the final implementation.

## Agents

### Primary implementation agent — Manus

The project was implemented and maintained by the primary Manus frontend agent. Responsibilities included:

- Inspecting the existing NOVA files before each change.
- Implementing and refining the shared HTML, CSS and JavaScript behavior.
- Preserving the existing page structure when applying incremental requests.
- Testing JavaScript syntax and local asset paths.
- Running local browser previews for visual and interaction checks.
- Fixing responsive layout, animation timing and visibility issues found during verification.

No external development agent, framework generator or code-generation service is required to run the final website.

## Skills and implementation knowledge used

### Frontend architecture

- Semantic HTML5 page structure.
- Shared navigation and footer patterns.
- BEM-style lowercase component classes.
- Relative asset paths that work from both `index.html` and files inside `pages/`.
- Accessible labels, landmarks, focus states, keyboard controls and dialog behavior.

### CSS and visual design

- CSS custom properties for palette, typography, spacing, radii, borders, shadows, glass surfaces, transitions and z-index layers.
- CSS Grid for catalogue, editorial compositions, specifications and responsive layouts.
- Flexbox for navigation, buttons, toolbars and smaller content groups.
- Approved palette-derived transparency and gradients only.
- Holographic cards using restrained translucency, borders, shadows and `backdrop-filter`.
- Responsive breakpoints for desktop, tablet and mobile layouts.

### JavaScript behavior

- Vanilla JavaScript with one shared IIFE and clearly labeled functional sections.
- Product dataset-driven rendering.
- Search and category filters.
- Product details, cart state and demo checkout.
- Accessible modal and native dialog handling.
- Mobile navigation open/close behavior.
- Connected Worlds keyboard and pointer interactions.
- Theme persistence through `localStorage`.
- Sanitization of stored cart data and validation of form inputs.

### Motion and scrolling

- Locally bundled Lenis 1.3.11 with native scrolling fallback.
- Entry loader animation.
- Scrollytelling section reveals.
- Subtle image and section parallax.
- Product card pointer tilt and hover scale.
- Gentle independent planetary drift and orbital path movement.
- Reduced-motion handling for CSS, JavaScript, Lenis and the hero video.

### Media handling

- WebP-first product imagery with JPG fallback using `<picture>`.
- Hero video with WebM first, MP4 fallback and the existing hero image as poster.
- Muted, autoplaying and looping video behavior when motion is allowed.
- Lazy loading for below-the-fold imagery.
- Eager loading for the first Shop product images so the catalogue does not appear empty during initial loading.

## Pages

- `index.html` — Home page with the editorial hero, hero video, featured technology, personal technology, exploration products, Connected Worlds preview, manifesto and destination CTA.
- `pages/shop.html` — Catalogue of eleven active products with filters, search, product dialogs, prices and cart controls.
- `pages/orbital-gate.html` — Orbital Gate product page with transport details, specs, telemetry and four responsive stage cards.
- `pages/connected-worlds.html` — Full network map with five selectable worlds, planetary motion and illustrative orbital traffic modal.
- `pages/about.html` — Nova Orbit story, principles, orbital-living content and contact form.

Every page includes the shared header, navigation controls, theme toggle, cart behavior, footer and shared stylesheet/script references.

## Theme behavior

Light mode is the default for a first-time visitor:

- No saved preference: the page opens in light mode.
- Selecting dark mode changes the complete palette using only approved colors.
- The selection is stored under `nova-orbit-theme-v1`.
- Future visits respect the saved preference.
- The header toggle updates its accessible label and pressed state.
- If storage is unavailable, the site safely falls back to light mode.

The destination section has a dedicated dark-mode contrast correction so its cream text remains readable over the burgundy surface during the `story-section` transition.

## Shared CSS system

`css/style.css` is the only stylesheet. It is organized into the requested sections:

1. CSS custom properties
2. Reset and global styles
3. Typography
4. Shared layout and containers
5. Header and navigation
6. Buttons and reusable components
7. Holographic cards
8. Home
9. Shop
10. Product detail
11. Connected Worlds
12. About and Contact
13. Shopping cart and modals
14. Animations
15. Responsive media queries

The stylesheet contains the official palette, transparent variations, font families, responsive type scale, spacing scale, layout tokens, breakpoints, transitions, shadows, glass effects and accessibility-related motion rules.

## Shared JavaScript system

`js/script.js` is the only JavaScript file. It contains the local Lenis bundle followed by the application sections:

1. Entry loader
2. Single product dataset
3. Initialization and DOM helpers
4. Navigation and mobile menu
5. Catalogue and category filters
6. Cart state and validated storage
7. Cart rendering and quantities
8. Demo checkout and reusable dialogs
9. Connected Worlds selection and telemetry
10. Contact form
11. Lenis and native scrolling fallback
12. Storytelling, parallax, pointer tilt and reduced-motion interactions

The Shop-specific loading behavior uses a shorter entry overlay and prioritizes the first four catalogue images. The full catalogue is excluded from the section-pending reveal state so products remain visible as soon as the page renders.

## Catalogue and cart

The active catalogue contains eleven products:

| Product | Category | Price |
| --- | --- | ---: |
| Orbital Gate | Transport | 9,999 OC |
| Astra Suit | Personal Technology | 899 OC |
| Nova Link | Communication | 399 OC |
| Nomi | Orbital Living | 699 OC |
| Aero Pack | Personal Technology | 1,199 OC |
| Terra Bloom | Orbital Living | 249 OC |
| Ares | Space Exploration | 2,499 OC |
| Vela | Space Exploration | 3,999 OC |
| Noctis | Communication | 4,999 OC |
| Luma | Orbital Living | 7,999 OC |
| Helios | Transport | 6,999 OC |

The cart stores only product IDs and quantities under `nova-orbit-cart-v1`. Invalid entries are removed, quantities are capped at 99 and current product prices are recalculated from the shared dataset. Checkout is fictional and does not process payments.

Orbit Vision, Pulse One, Nova Pod and Atlas Core are not active catalogue records. Existing unused assets are retained and are not represented as purchasable products.

## Orbital Gate stage media

The four journey cards on `pages/orbital-gate.html` use responsive `<picture>` elements with WebP first and JPG fallback:

- Arrival: `arrival.webp` / `arrival.jpg`
- Alignment: `alignment.webp` / `alignment.jpg`
- Transfer: `transfer.webp` / `transfer.jpg`
- Reconnection: `reconnection.webp` / `reconnection.jpg`

## Connected Worlds motion

The network map includes:

- Five selectable world nodes.
- Gentle individual planetary drift.
- Subtle orbital-path movement in the Home preview.
- Keyboard support for Tab, Enter, Space, Arrow keys, Home and End.
- A panel containing world information and an Orbital Traffic action.
- Responsive card sizing with the traffic button kept inside the panel and no inner scrollbar.

The traffic values are illustrative concept data and are not live orbital tracking.

## Assets and licenses

- `assets/videos/video-hero.webm` — primary Home hero video source.
- `assets/videos/video-hero.mp4` — fallback Home hero video source.
- `assets/images/orbit.*` — environmental Earth and spacecraft reference imagery.
- `assets/images/station.*` — lunar horizon reference imagery.
- Product image pairs are supplied local artwork in JPG and WebP formats.
- `assets/icons/orbit.svg` — Nova Orbit mark.
- `assets/icons/photographic-tone.svg` — supplied photographic filter definition.
- `assets/fonts/manrope-*` — Manrope, SIL Open Font License.
- `assets/fonts/space-*` — Space Grotesk, SIL Open Font License.
- `assets/licenses/lenis-mit.txt` — Lenis MIT license.
- `assets/licenses/manrope-ofl.txt` — Manrope license notice.
- `assets/licenses/space-grotesk-ofl.txt` — Space Grotesk license notice.

All runtime assets are local to the project. The website does not require external font, script, image or video requests.

## Footer and project copy

The footer on all five pages uses:

> © 3500 Nova Orbit. A fictional future, thoughtfully designed.

The year and wording are intentionally fictional and part of the project concept.

## Verification

The `verification/` directory contains desktop and mobile screenshots and result files from implementation checks. Verification covered:

- All five pages.
- Desktop, tablet and mobile layouts.
- Shared navigation and relative links.
- Theme switching and persistent preference behavior.
- Entry loader timing.
- Hero video source order, poster, autoplay, mute and loop configuration.
- Shop rendering, filters, search and first-image loading priority.
- Product detail dialogs and cart interactions.
- Connected Worlds selection, keyboard controls, planetary movement and traffic modal.
- Orbital Gate picture sources and stage card layout.
- Contact form validation and confirmation state.
- Reduced-motion fallback.
- Local asset paths and JavaScript syntax.
- One shared CSS file and one shared JavaScript file.

No canonical deployment URL is included because a final production domain has not been specified.
