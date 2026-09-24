# NOVA ORBIT

A complete, build-free concept storefront. All website files, fonts, imagery and dependencies are contained in this folder. The original `Wireframes` directory is unchanged.

## Run locally

The running development preview is available at **http://127.0.0.1:4173** while its server is active.

To start another local session with Python installed:

```powershell
cd D:\WEB\Nova\NOVA
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173 in a browser. No install or build step is necessary. You can also open `index.html` directly; a local HTTP server is recommended because browsers vary in how they share localStorage between `file:` pages.

## Pages

- `index.html` — editorial home, personal technology and exploration highlights, network preview and brand statement.
- `pages/shop.html` — all eleven products, category filters, search and product dialogs.
- `pages/orbital-gate.html` — transit sequence, specifications, Orbit Credits pricing and product enquiries.
- `pages/connected-worlds.html` — five selectable worlds, keyboard controls and simulated traffic.
- `pages/about.html` — company principles, everyday orbital living and demonstration contact form.

## Design system

`css/style.css` is the only stylesheet. Its opening `:root` block contains the seven official colors, derived transparent surfaces, typography, spacing, layout, borders, motion and layering tokens. Its fifteen labeled sections follow the master prompt. Local Space Grotesk and Manrope fonts are bundled in `assets/fonts`.

The orange button surface includes a 16% cream overlay, derived entirely from the approved palette, to give its plum text approximately 4.88:1 contrast. Supplied product artwork keeps its original colors and square proportions, using object-fit: contain. The existing environmental reference photographs retain their color treatment. Product images use WebP with JPG fallback; an error handler also falls back when a WebP request fails.

## Shared JavaScript

`js/script.js` is the only JavaScript file. A pinned copy of **Lenis 1.3.11** is bundled at the top; the application follows in twelve labeled sections:

1. Single product dataset
2. Initialization and DOM helpers
3. Navigation and mobile menu
4. Catalogue and category filters
5. Validated cart storage
6. Cart rendering and quantities
7. Demo checkout
8. Accessible reusable dialogs
9. World selection and telemetry
10. Contact form
11. Lenis and native scrolling fallback
12. Reduced-motion-aware animations and pointer tilt

All eleven active products support demo purchases in Orbit Credits (OC), the fictional currency of the Nova Orbit universe. Prices live in the single products dataset, and formatPrice() formats every storefront price, cart subtotal, search result and checkout total. Product-price hooks on Home and Orbital Gate are populated from that same dataset.

The cart stores only product IDs and quantities under `nova-orbit-cart-v1`, rejects invalid entries and caps each quantity at 99. On startup it writes back a sanitized cart, removing discontinued or unknown product IDs and recalculating surviving items at current OC prices. LocalStorage is shared across pages served from the same origin. No personal form information is saved, transmitted or submitted to a backend. Checkout never asks for payment information. World telemetry is illustrative, not live tracking.

Native dialogs include forward/reverse focus trapping, Escape dismissal and focus restoration. The mobile menu makes background content inert. World controls support Tab, Enter, Space, arrow keys, Home and End. Reduced-motion preferences disable Lenis and unnecessary movement, including when the preference changes during a session.

## Media and dependencies

- `assets/images/orbit.jpg` — Earth and spacecraft reference photograph from the [Unsplash image CDN](https://images.unsplash.com/photo-1446776811953-b23d57bd21aa).
- `assets/images/station.jpg` — lunar surface reference via [Unsplash image CDN](https://images.unsplash.com/photo-1447433589675-4aaa569f3e05).
- Product JPG/WebP pairs — artwork supplied and selected by the user. All eleven pairs were decoded successfully as real 2048 × 2048 images. No product image was downloaded, generated, renamed or deleted in this update.
- Existing SVG schematics are retained as assets but are no longer used to represent products in the active storefront.
- [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) and [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk) — SIL Open Font License.
- [Lenis](https://github.com/darkroomengineering/lenis/tree/v1.3.11) — MIT license; bundled locally to preserve the one-JavaScript-file requirement and offline operation.

The font and library license notices are included in `assets/licenses`.

`assets/videos` is reserved for future media. No video dependency is necessary for this implementation. No external font, script or image requests occur while browsing the site.

## Verification

`verification/catalogue-update-results.txt` records the latest catalogue-update checks; `verification/results.txt` belongs to the original implementation. Screenshots prefixed `update-` show the updated storefront. Desktop and mobile screenshots are in the same folder. Testing covers five pages at 320, 390, 768, 1024 and 1440 pixels; filters and search; persistent cart; invalid stored data; quantities, removal and clearing; checkout and product enquiries; form validation; node selection; dialog focus; mobile navigation; and reduced motion.

Static checks verify exactly five HTML pages, one CSS file and one JavaScript file, valid local asset paths, lowercase class/ID naming and the seven-color CSS palette. Pixel-based dimensions account for approximately 6% of dimensional declarations, mainly borders and precision details.

No canonical URL is included because a final deployment domain has not been specified.

## Catalogue update

Active supplied image pairs (each filename exists in both .webp and .jpg):

- orbital-gate — Transport
- astra-suit — Personal Technology
- nova-link — Communication
- nomi — Orbital Living
- aero-pack — Personal Technology
- terra-bloom — Orbital Living
- ares — Space Exploration
- vela — Space Exploration
- noctis — Communication
- luma — Orbital Living
- helios — Transport

Orbit Vision is pending: no JPG, JPEG or WebP image was found, so it has no active product record, card, purchase control or image URL. Pulse One is also absent and has not been added.

Nova Pod and Atlas Core have been discontinued and removed from the active storefront, search and product data. Their existing assets have not been deleted.

To add Orbit Vision later, verify its real image files first, then add its record to the single products dataset with the approved price of 499 OC. The catalogue total, search, filters, dialogs and cart are driven by that dataset.
