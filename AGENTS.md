<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- SHADCN-AGENTS-MD-START -->
# shadcn/ui and @ncdai Registry

This project uses shadcn/ui for frontend components.
The `@ncdai` registry is configured in `components.json`:
- Registry URL: `https://chanhdai.com/r/{name}.json`

To add components from this registry, use:
`npx shadcn@latest add @ncdai/<component-name>`

## Available Components in `@ncdai`

### Hooks & Libs
- `@ncdai/haptic` (lib) — Trigger haptic feedback on mobile devices.
- `@ncdai/use-sound` (hook) — Play sound effects with volume, playback rate, and interrupt support.
- `@ncdai/use-controllable-state` (hook)

### UI Components
- `@ncdai/theme-switcher` — Toggle system, light, and dark themes in Next.js apps.
- `@ncdai/text-flip` — Animated text that cycles through items with a smooth flip transition.
- `@ncdai/apple-hello-effect` — SVG writing animation inspired by Apple’s Hello screen.
- `@ncdai/apple-hello-effect-hindi` — SVG writing animation (Hindi version).
- `@ncdai/apple-hello-effect-spanish` — SVG writing animation (Spanish version).
- `@ncdai/apple-hello-effect-vietnamese` — SVG writing animation (Vietnamese version).
- `@ncdai/wheel-picker` — iOS-like wheel picker with inertia scrolling and infinite options.
- `@ncdai/chevrons-up-down-icon` — Animated chevrons icon that morphs between directions.
- `@ncdai/typography` — Custom prose styles for headings, links, code blocks, etc.
- `@ncdai/work-experience` — Display work experiences with companies, logos, and durations.
- `@ncdai/shimmering-text` — Smooth light-sweeping shimmer animation for text.
- `@ncdai/slide-to-unlock` — Interactive slider inspired by the classic iPhone gesture.
- `@ncdai/testimonials-marquee` — Scrolling marquee to showcase user testimonials.
- `@ncdai/testimonial` — Testimonial card with author info, avatar, and verified badge.
- `@ncdai/github-stars` — Display GitHub repo star count with tooltip.
- `@ncdai/scroll-fade-effect` — Fade content edges as you scroll (vertical/horizontal).
- `@ncdai/consent-manager` — Cookie and tracking consent banner for Next.js.
- `@ncdai/copy-button` — Copy text to clipboard with visual, haptic, and audio feedback.
- `@ncdai/code-block-command` — Display install commands with package manager switcher.
- `@ncdai/testimonial-spotlight` — Testimonial card with spotlight effect on hover.
- `@ncdai/glow-card-grid` — Display cards with glowing border and background hover effects.
- `@ncdai/middle-truncation` — Truncate text in the middle while preserving ends.
- `@ncdai/twemoji` — Render Unicode emoji as Twemoji SVG images.
- `@ncdai/elastic-slider` — Slider with rubber-band drag and magnetic snap feedback.
- `@ncdai/contribution-graph` — GitHub-style contribution grid calendar.
- `@ncdai/github-contributions` — Calendar graph tracking year-long GitHub contributions.
- `@ncdai/toc-minimap` — Navigate page sections with hoverable TOC minimap.
- `@ncdai/fluid-gradient-text` — Render text with interactive fluid gradient tracking cursor.
- `@ncdai/brand-assets-menu` — Context menu for copying brand SVGs and links.
- `@ncdai/icon-swap` — Animate icon swaps with scale, blur, and fade transitions.
- `@ncdai/dot-grid-spotlight` — Interactive dot grid with cursor spotlight effect.
- `@ncdai/spinning-circular-text` — Text arranged in a circle with spinning animation.
- `@ncdai/mobius-loop-icon` — Animated Mobius loop icon morphing between states.

### Blocks
- `@ncdai/login-01` — Simple login form block.
- `@ncdai/hero-01` — Hero section with golden spiral background.
- `@ncdai/blog-01` — Blog section grid layout.
- `@ncdai/blog-02` — Blog section with lined grid layout.
- `@ncdai/testimonials-01` — Testimonials section with dual marquees.
- `@ncdai/testimonials-02` — Testimonials section with lined layout.
- `@ncdai/experience-01` — Work experience section with lined layout.
- `@ncdai/team-01` — Team section with glowing cards.
- `@ncdai/metrics-01` — Metrics section with line chart.
- `@ncdai/social-links-01` — Social links grid section with lined layout.

### Styles
- `@ncdai/style`
- `@ncdai/theme-toggle-effect-triangle`
- `@ncdai/theme-toggle-effect-triangle-blur`
- `@ncdai/theme-toggle-effect-circle`
- `@ncdai/theme-toggle-effect-circle-blur`
- `@ncdai/theme-toggle-effect-circle-blur-top-left`
- `@ncdai/theme-toggle-effect-polygon`
- `@ncdai/theme-toggle-effect-polygon-gradient`
- `@ncdai/thin-scrollbar`
<!-- SHADCN-AGENTS-MD-END -->

# Caching Policy
Implement caching for everything that should be cached (like Books, Leaderboard, Courses, etc.) to minimize database requests.
Use `@upstash/redis` configured in `src/config/redis.ts`. 
Always check the cache first before querying Prisma, and store the result in cache after retrieving it.
