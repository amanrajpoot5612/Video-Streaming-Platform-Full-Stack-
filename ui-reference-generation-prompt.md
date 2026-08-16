# UI Reference Generation Prompt

Copy this prompt into your preferred UI/code generator. It is intentionally written for a **standalone HTML + CSS reference** that can later be translated into this React/Tailwind application.

```text
Act as a senior product designer and front-end engineer. Design an original, polished video-streaming web UI called “Bugsy”. Create a standalone visual reference in two files: `index.html` and `styles.css`. Use semantic HTML and plain CSS only (no React, Tailwind, Bootstrap, or component libraries). Minimal vanilla JavaScript is allowed only for a theme switcher and a collapsible sidebar; the demo must still look complete without JavaScript.

## Product context
This is an existing React video platform, not a marketing landing page. Its real information architecture is:
- Global Navbar: Bugsy brand, search, notifications, account menu, login/register state
- Collapsible Sidebar: Home, Movies, News, Sports, History, Liked, Subscriptions, Create/Upload, Settings, Connect, About
- Home feed: category chips and a responsive grid of video cards
- Watch page: custom video player, title, channel details, engagement actions, description, and an “Up next” rail
- Upload page: video and thumbnail drop zones, title, description, auto duration, status/error state, submit action
- Profile page: cover image, avatar, identity, and uploaded-video grid
- Auth pages: login/register forms and inline feedback

The implementation uses React Router, Tailwind, Lucide icons, and a dark theme today. This output is only a visual/design reference, so keep the markup straightforward to port into those components later.

## Design direction
Make it feel as focused and familiar as a serious media product: dense discovery, a clear search-first header, fast-scanning video metadata, and a cinematic watch experience. It may take *structural inspiration* from the usability of YouTube, but it must not copy YouTube branding, logo, exact layout, red play mark, wording, or screen design.

Avoid generic “AI/SaaS” styling:
- No full-page purple/blue/cyan gradients, glassmorphism, floating neon blobs, or excessive blur.
- No huge hero banner, oversized text, or every element inside a rounded card.
- Use mostly flat surfaces, subtle 1px borders, restrained shadows, and 8–12px corner radii.
- Use colour purposefully: the action colour is for one primary action, the active nav item, video progress, and small indicators—not for every card.
- Gradients are forbidden except a black translucent fade behind video-player controls and thumbnail overlay text.

## Colour exploration
Include a compact “Theme explorer” strip at the top of the reference with four labelled swatch groups. Implement all values as CSS custom properties and make **Signal Dark** the visible default. Add class-based themes (`.theme-signal`, `.theme-blueprint`, `.theme-ember`, `.theme-paper`) so I can evaluate them without rewriting components.

1. **Signal Dark — recommended default**: canvas `#101114`, sidebar/header `#17191E`, raised surface `#20232A`, hover `#292D36`, border `#303540`, primary `#E5484D`, primary-hover `#F2555A`, text `#F5F7FA`, muted `#9EA5B1`, live/warning `#F6C85F`, success `#4CAF7D`.
2. **Blueprint**: canvas `#10151C`, sidebar/header `#18212B`, raised `#22303D`, hover `#2C3B49`, border `#3A4B5D`, primary `#4B9EFF`, primary-hover `#70B2FF`, text `#F2F7FC`, muted `#AAB9C7`, warning `#F6C85F`, success `#4DB489`.
3. **Ember Studio**: canvas `#171311`, sidebar/header `#211A17`, raised `#2B211D`, hover `#382923`, border `#4A3730`, primary `#E8753D`, primary-hover `#F18B55`, text `#FFF8F2`, muted `#C5B3A8`, warning `#E8B84E`, success `#6DB58C`.
4. **Paper Cut** (light alternative): canvas `#F7F5F1`, sidebar/header `#FFFFFF`, raised `#FFFFFF`, hover `#F0EDE7`, border `#E0DCD4`, primary `#C9343B`, primary-hover `#AD252C`, text `#1B1D20`, muted `#676C73`, warning `#B77916`, success `#267955`.

Show the exact hex values in each palette. Make sure every theme has accessible normal-text contrast and visible keyboard focus states.

## Required reference UI
Build the main viewport at 1440px wide, with realistic placeholder content and original thumbnail imagery. A CSS-only page switcher or clear labelled sections may be used to show all of the following states in the one document.

### 1. Home / Discovery (the most prominent view)
- Sticky 64–72px header with a menu button, small abstract Bugsy logo (not a bug emoji or YouTube-style play icon), wordmark, centered search field with shortcut hint, upload button, notification button with badge, and avatar.
- A 232–248px desktop sidebar that can collapse to an 80px icon rail. Group the navigation into “Discover” and “You”, visually identify the active Home item, and keep labels legible in both states.
- Main content starts with a concise page title and horizontally scrollable filter chips: For you, Music, Gaming, Design, Coding, News, Sports, Documentaries.
- Include a “Continue watching” rail with two compact progress-bearing cards, followed by “Recommended for you” with 12 video cards in a 4-column grid. At smaller widths move to 3, 2, then 1 column.
- Every video card needs a 16:9 thumbnail, duration pill, subtle quick actions on hover, channel avatar, two-line title clamp, channel name, metadata (`18K views · 3 days ago`), and an overflow menu. Thumbnail is the visual anchor; metadata should not be placed in a large separate card.
- Include one tasteful LIVE label and one watch-progress bar. Use believable varied titles, creators, categories, and durations.

### 2. Watch page reference
- Two-column desktop layout: wide 16:9 player left and a compact “Up next” list right. Stack these for tablet/mobile.
- Player must show a dark poster image, centered play affordance, bottom black fade, progress scrubber in the active theme colour, time, volume, settings, captions, theatre/fullscreen controls.
- Below player: title, view/date line, circular channel avatar, channel name/subscriber count, Subscribe button, and secondary Like, Share, Save controls. Then a bounded description panel with “Show more”.
- Up-next cards use thumbnail, duration, title, creator, and metadata. Do not make the comments section the visual focus; a short comment preview is enough.

### 3. Upload, profile, and auth mini-previews
- Upload: an ordered, calm workspace: page heading, status chip (“Draft”), video drop zone with file-format help, thumbnail uploader/preview, title, description with character counter, visibility selector, and a clearly dominant “Publish video” button. Include a visible drag-over state and a compact error message example.
- Profile: wide but modest cover area, overlapping avatar, name/handle, stats, edit-profile button, tabs, and a clean uploaded-videos grid.
- Auth: show one compact sign-in card only—no generic feature-column, no giant gradient panel. It needs label-first inputs, checkbox, password visibility control, primary button, and muted registration link.

## Type, spacing, interaction, and responsiveness
- Use a modern system font stack such as Inter, ui-sans-serif, system-ui. Use 14px metadata, 15–16px body text, and 18–28px page/section titles. Do not use a display font for every heading.
- Establish reusable spacing, type, surface, and state tokens in `:root` before components. Use CSS Grid and Flexbox, not fixed pixel positioning for content.
- Desktop content should have a comfortable 24–32px gutter. On mobile (<768px), hide sidebar labels or use a bottom navigation, simplify header controls, make search full-width on a second row if needed, and preserve touch targets of at least 44px.
- Include `:hover`, `:focus-visible`, `:active`, loading/skeleton, empty, and error states for key components. Motion should be short and subtle, and disabled under `prefers-reduced-motion`.
- Use inline SVG or simple text symbols for icons so the example remains self-contained. Use remote image URLs only for replaceable placeholder thumbnails/avatars; give every image useful alt text.

## Output rules
1. Start with a short 4–6 bullet design rationale that compares the four palettes and recommends one for a video platform.
2. Then output complete `index.html` followed by complete `styles.css` in separate fenced code blocks. Do not omit sections with “same as above” or pseudo-code.
3. Keep the finished demo professional, usable, and visually information-rich—not a generic dashboard and not a clone of an existing streaming site.
4. At the end, list a small mapping from this reference’s pieces to React components: `Navbar`, `Sidebar`, `VideoCard`, `VideoPlayer`, `UploadVideo`, `Profile`, `Login`, and `Register`.
```

## Why this matches the current app

The prompt retains the existing navigation and page-level functionality while giving `Navbar`, `Sidebar`, `Hero`/`VideoCard`, `VideoPlayer`, `UploadVideo`, `Profile`, and the auth pages one consistent token-based visual language. It also explicitly replaces the current layered gray texture and scattered neutral/gradient classes with surfaces that can be applied via Tailwind design tokens.
