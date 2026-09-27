# Nova Orbit — Prompts principales

Este documento recoge los dos prompts principales utilizados para orientar el desarrollo de la web. Se conservan en inglés y completos para mostrar las instrucciones de estructura, diseño y funcionamiento. Son una referencia del encargo original; los cambios posteriores pueden diferir de estas especificaciones.

## 1. Organización del proyecto y uso de los wireframes

Este prompt define dónde guardar los archivos y cómo interpretar las referencias visuales antes de programar.

```text
Create a folder named `NOVA` in the project root and develop the entire website exclusively inside this folder. All HTML, CSS, JavaScript, images, videos, icons and other assets must be organized within `NOVA`. Do not modify or create files outside this folder.

I have attached the original Nova Orbit wireframes created in Google Stitch, along with visual references for the holographic cards and minimalist navigation. (the wireframes you will find them in a folder named Wireframes)

Please analyze all the attached wireframes before writing any code.

Use them as references for the content, information architecture, navigation, product information and sections of the five pages.

Do not copy their visual designs literally. Improve the layout, visual hierarchy, spacing, typography, interactions and responsive behavior, following all the requirements in my master prompt.

Create the complete website inside the NOVA folder, using only one CSS file (style.css) and one JavaScript file (script.js).
```

## 2. Prompt maestro: desarrollo completo de Nova Orbit

El prompt maestro detalla la identidad visual, la paleta de siete colores, las tipografías Space Grotesk y Manrope, las cinco páginas, las tarjetas holográficas, el carrito, las interacciones y los requisitos de accesibilidad y diseño responsive.

### Texto original completo

```text
BUILD THE COMPLETE NOVA ORBIT WEBSITE

You are an expert frontend developer and creative UI/UX designer. Build a complete, fully functional, responsive, premium futuristic ecommerce website for NOVA ORBIT.

IMPORTANT PROJECT RULE: Create a folder named NOVA and keep the entire website inside it. Use ONLY ONE CSS FILE (css/style.css) and ONLY ONE JAVASCRIPT FILE (js/script.js) for the entire project. Do not create additional CSS or JavaScript files. Do not use frameworks or build tools. Use HTML5, CSS3 and vanilla JavaScript.

PROJECT STRUCTURE:
NOVA/
  index.html
  pages/
    shop.html
    orbital-gate.html
    connected-worlds.html
    about.html
  css/
    style.css
  js/
    script.js
  assets/
    images/
    videos/
    icons/

All five HTML pages must load the same shared style.css and script.js. Organize CSS using clearly labeled sections and JavaScript using clearly labeled functional sections, without splitting them into separate files. Do not create or modify anything outside NOVA. Ensure relative links work from both the root and pages folder.

DESIGN DIRECTION

Nova Orbit is a fictional premium space technology company developing transportation, planetary exploration, orbital systems, interplanetary communication and connected worlds.

The design must be predominantly light, soft, editorial, spacious, futuristic and sophisticated. Use cream and lavender backgrounds with generous whitespace. Combine premium aerospace imagery, asymmetrical editorial layouts, elegant typography, holographic product cards and subtle 3D interactions.

Use the supplied wireframes as references for structure, content, navigation and information architecture, not as designs to copy. Improve their composition and visual hierarchy. Use the supplied glass-card reference for soft translucent interfaces and the Zara reference for minimalism and unconventional editorial navigation. Do not copy another brand's identity.

Avoid dark sci-fi, cyberpunk, neon, crowded dashboards and generic ecommerce templates.

OFFICIAL COLORS — ONLY THESE SEVEN

Cream #F4E3D0
Lavender #EEE6F0
Purple #73617B
Burgundy #523739
Plum #221A24
Ice Blue #A8D4DC
Burnt Orange #B36633

No additional colors, including pure white or black. Derive transparency and gradients exclusively from the official palette.

Use cream and lavender for most backgrounds, plum and burgundy for text and occasional contrast, purple for metadata, ice blue for holographic effects and orbital connections, and burnt orange for primary CTAs and selected states.

TYPOGRAPHY

Use exactly Space Grotesk for headings, major editorial statements, hero titles and large product names. Use Manrope for body copy, navigation, buttons, labels, forms and technical information.

Create a fluid typography system using CSS custom properties, rem and clamp(). All pages must share the same typographic scale.

CENTRALIZED CSS DESIGN SYSTEM

Define all reusable design tokens in :root at the beginning of css/style.css.

Create variables for every official color, approved transparent variations, font families, weights, responsive font sizes, line heights, spacing scale, section padding, container widths, responsive gutters, radii, borders, shadows, glass effects, transitions and z-index levels.

Do not repeatedly hardcode colors, dimensions, spacing or animation values. Reuse custom properties consistently throughout every page.

Create a spacing scale based on 16px increments, using 1rem = 16px under standard browser settings. Prefer 1rem, 2rem, 3rem, 4rem, 6rem, 8rem and 10rem for primary spacing, sections and containers. Smaller details may use smaller values when necessary.

Use appropriate relative and fluid units for over 90% of dimensional CSS declarations: rem, em, %, vw, vh, dvh, fr, clamp(), min(), max() and minmax(). Keep pixel usage below approximately 10%, reserving it for borders and precision details. Use clamp() for fluid typography and responsive padding where useful.

BEM METHODOLOGY

Use BEM consistently for custom CSS classes:
.product-card
.product-card__image
.product-card__title
.product-card--featured

Use only lowercase letters in all class and ID names. No uppercase characters and no digits. Use meaningful English names and hyphens for compound words.

Do not use IDs for styling. Use IDs only for accessibility, labels, anchors or genuinely necessary JavaScript hooks.

Keep CSS specificity below 100 in at least 90% of authored rules. Favor simple class selectors, avoid deeply nested selectors, unnecessary overrides and !important.

SINGLE CSS FILE ORGANIZATION

Organize css/style.css with clear comment headings in this order:
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

Use CSS Grid for editorial compositions, asymmetrical layouts, catalogues and specification grids. Use Flexbox for navigation, buttons and smaller components. Keep consistent global containers and section spacing across all pages.

HEADER AND NAVIGATION

Create a distinctive minimalist navigation inspired by the supplied Zara reference.

Explore a narrow vertical sticky navigation on the left of the desktop viewport, containing the Nova Orbit wordmark, page links, search and cart with a live count.

Make the main content correctly account for the sidebar width using reusable CSS variables. The navigation must feel like a premium editorial interface, not a generic dashboard.

Create a compact accessible mobile navigation with a functional open/close button. Every link and control must work.

HOLOGRAPHIC CARDS

Follow the supplied glass-card reference. Create soft, translucent product cards with backdrop-filter, subtle transparency, delicate borders, restrained shadows, gentle reflections and pastel holographic highlights.

Use only the approved palette. Combine light lavender surfaces with subtle ice-blue highlights. Introduce restrained 3D tilt, layered product imagery and floating technical labels on selected featured cards.

Do not make every card transparent. Maintain visual rhythm with clean editorial sections, product imagery and generous whitespace. Ensure essential interactions work with mouse, keyboard and touch.

LENIS AND ANIMATIONS

Use the Lenis smooth-scrolling library. Integrate it properly with sticky navigation, links, the cart and modals. Use native scrolling as a fallback if Lenis cannot load.

Use gentle fades, reveals, parallax and restrained 3D transformations. Prefer performant transform and opacity animations. Respect prefers-reduced-motion by disabling or substantially reducing unnecessary motion. Never sacrifice usability for visual effects.

REQUIRED PAGES

Build exactly five complete, interconnected pages.

HOME — index.html

Create a bright editorial hero with a premium spacecraft or orbital object.

Headline: THE DISTANCE BETWEEN WORLDS IS A PRODUCT.
Supporting text: Advanced technologies for moving beyond the limits of Earth.
Primary CTA: EXPLORE TECHNOLOGIES
Secondary CTA: ENTER THE NETWORK

Include subtle technical information, a Featured Technology section displaying Orbital Gate, Ares, Vela and Luma in an editorial composition, and a Connected Worlds preview with Terra, Ares, Vela, Noctis and Luma.

Editorial statement: WE DON'T BUILD TECHNOLOGY FOR SPACE. WE BUILD TECHNOLOGY THAT MAKES SPACE FEEL CLOSER.
Final CTA: YOUR NEXT DESTINATION IS WAITING.

SHOP — pages/shop.html

Headline: SPACE TECHNOLOGY, AVAILABLE NOW.

Categories: All Systems, Transport, Exploration, Communication, Orbital and Colonization.

Products: Orbital Gate, Ares, Vela, Noctis, Luma, Helios, Nova Pod and Atlas Core.

Build a sophisticated catalogue mixing featured cards, large editorial compositions, horizontal cards and asymmetric layouts rather than a repetitive generic grid. Include product names, categories, descriptions, quality visuals, prices or request-access states, availability and functional CTAs. Implement working category filters.

ORBITAL GATE — pages/orbital-gate.html

Headline: ORBITAL GATE.
Statement: THE SHORTEST DISTANCE BETWEEN TWO POINTS IS NO LONGER A LINE.

Use a prominent product visual and a technical panel with Gate Status: Online; Destination: Luma / Sector 05; Transfer Time: 00:00:08; Energy Load: 72%.

Include four storytelling stages: Arrival, Alignment, Transfer and Reconnection.

Technical specifications: System Type: Spatial Transfer; Range: 1,240,000 KM; Alignment: 99.8%; Energy Core: Nova Cell / X9; Transfer Window: 08 SEC; System Status: Stable.

Include functional ADD TO CART and REQUEST ACCESS buttons.

CONNECTED WORLDS — pages/connected-worlds.html

Create an interactive planetary network featuring Terra, Ares, Vela, Noctis and Luma.

Use orbital paths, planetary visuals, connections, coordinates and technical labels. Use ice blue for orbital connections and burnt orange for selected worlds.

Selecting a world must update its information panel. Support mouse, touch and keyboard navigation. Essential information must not depend exclusively on hover.

ABOUT / CONTACT — pages/about.html

Headline: WE DESIGN THE TECHNOLOGY BETWEEN WORLDS.
Supporting text: Nova Orbit develops technologies that transform distance into infrastructure.

Present these principles: Distance is a design problem. Exploration should feel intuitive. The future should be beautiful. Every world should be connected.

Contact title: OPEN A CHANNEL.

Create a form with Name, Email, Organization, Destination and Message. The TRANSMIT MESSAGE button must validate input and display a custom confirmation state. Clearly state that submissions are demonstrations if no backend exists.

FULLY FUNCTIONAL SHOPPING CART

Implement the entire ecommerce frontend within js/script.js. Use a single shared product dataset and localStorage to persist cart contents across all pages and reloads.

Users must be able to add and remove products, increase and decrease quantities, see item prices and subtotal, see the live cart count, open and close the cart, view cart contents and clear the cart.

Build an accessible custom cart drawer on desktop and an appropriate overlay on mobile. Handle empty-cart states, invalid stored data and request-access products.

Implement a functional frontend checkout simulation with order summary, form validation and a confirmation screen. No real payment processing. Clearly identify the process as a demonstration, not a real purchase.

Use custom modals for product details, add-to-cart confirmations, request access and checkout. Do not use browser alert(), confirm() or prompt() for the interface.

SINGLE JAVASCRIPT FILE ORGANIZATION

Keep all application JavaScript in js/script.js, organized through clearly labeled comment sections:
1. Product data
2. Initialization and shared DOM helpers
3. Navigation and mobile menu
4. Product catalogue and category filtering
5. Cart state and localStorage
6. Cart rendering and quantity controls
7. Checkout simulation
8. Reusable modal functionality
9. Connected Worlds interactions
10. Contact form
11. Lenis scrolling
12. Animations and responsive interactions

Keep functions short, clearly named and reusable. Do not duplicate logic or create separate JavaScript files. Initialize page-specific behavior only when the necessary elements exist, so the same script can run safely on all five pages. Use addEventListener rather than inline onclick attributes.

IMAGES AND PERFORMANCE

Use high-quality, visually coherent aerospace imagery. Avoid cheap stock photos, generic rockets and unrelated visuals. Use responsive picture elements when suitable, meaningful alt text and lazy loading below the fold. Prioritize critical hero imagery. Use video sparingly with poster images and fallbacks.

Avoid unnecessary heavy libraries and excessively complex 3D effects.

SEO AND ACCESSIBILITY

Use semantic HTML5, correct heading hierarchy, unique descriptive page titles, meta descriptions, viewport meta tags, language attributes, meaningful internal links and appropriate Open Graph metadata. Add canonical URLs when the final deployment URLs are available.

Ensure readable contrast, visible keyboard focus, accessible menus, forms, filters, modals and cart interactions. Provide proper form labels, useful errors, meaningful alt text and reduced-motion support.

RESPONSIVE DESIGN

Design specifically for desktop, tablet and mobile, rather than only shrinking the desktop layout. Reorganize grids, adapt typography and section spacing, convert hover-dependent controls into touch-friendly interactions, and make the navigation and cart usable on small screens.

Avoid horizontal scrolling, cut-off elements and overlapping text.

FINAL VERIFICATION

Deliver the complete working website exclusively inside NOVA, using only css/style.css and js/script.js as the two shared code files, alongside the five HTML pages and necessary media assets.

Verify consistent design tokens and BEM naming, the seven-color-only palette, mostly relative units, correct CSS specificity, responsive layouts, working links and assets, functional product filtering, working cart persistence, functional modals and form validation, keyboard accessibility and reduced-motion behavior.

Do not provide pseudocode, nonfunctional controls, unfinished sections or additional CSS/JavaScript files. Explain briefly how to run the website locally, where the global CSS variables are located and how the single JavaScript file is organized.

BUILD THE COMPLETE NOVA ORBIT EXPERIENCE INSIDE NOVA.
```

