# Video Streaming Platform Frontend Code Spec

This file is a single-place guide to how the `src/` code is written, how the pieces connect, what each folder owns, and where the current design is strong or fragile.

## 1. Project Summary

The frontend is a Vite + React single page application for a video streaming platform named Bugsy. It uses:

- React 19 for UI composition.
- React Router 7 for client-side routing.
- Tailwind CSS utility classes plus local CSS files for styling.
- Axios for backend API requests.
- React Context for authentication state.
- Framer Motion for page transitions.
- Lucide React for icons.
- Spline/3D-related packages in the project dependencies and preloader path.

The app is mostly organized as:

- `src/main.jsx` bootstraps the app.
- `src/App.jsx` defines routes and loading behavior.
- `src/pages/` contains route-level screens.
- `src/component/` contains reusable UI parts.
- `src/context/` contains auth state and static data modules.
- `src/api/` centralizes backend URL and Axios setup.
- `src/Animation/` contains route/page animation wrappers.
- `src/utils/` contains shared helpers.

## 2. Runtime Flow

1. `src/main.jsx` mounts React into `#root`.
2. `main.jsx` wraps the app in `BrowserRouter`, `StrictMode`, and `AuthProvider`.
3. `AuthProvider` immediately calls `/users/current-user` through `axiosInstance` to determine whether a user is logged in.
4. `src/App.jsx` shows `Preloader` for about 3.5 seconds before rendering routes.
5. `App.jsx` wraps routes with `AnimatePresence` and `Suspense`.
6. The `/` route renders `Home`.
7. `Home` renders the shared `Navbar`, `Sidebar`, and an `Outlet`.
8. Nested routes inside `Home` fill the outlet with pages such as `Hero`, `Movies`, `History`, `Liked`, `Trending`, `Music`, and profile/settings/help pages.
9. Video list pages call `/videos/get-all`, render video cards, and link cards to `/watch/:id`.
10. `/watch/:id` loads video detail from `/videos/watch/:id` and passes it to `VideoPlayer`.

## 3. Root-Level Entry Points

### `package.json`

Defines project scripts:

- `npm run dev` starts Vite dev server.
- `npm run build` creates production build.
- `npm run preview` previews the production build.
- `npm run lint` runs ESLint.

Important dependencies include `react`, `react-router-dom`, `axios`, `framer-motion`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, `daisyui`, and `@splinetool/react-spline`.

### `src/main.jsx`

Creates the root:

```jsx
createRoot(document.getElementById('root')).render(...)
```

Provider order:

```text
BrowserRouter
  StrictMode
    AuthProvider
      App
```

This means every route and component inside `App` can use router hooks and `useAuth()`.

### `src/App.jsx`

Owns application routing and startup preloader state.

Key behavior:

- Uses `useState(true)` for initial `isLoading`.
- Uses `setTimeout` to hide the `Preloader` after 3500ms.
- Uses `useLocation()` so `AnimatePresence` can animate route changes by pathname.
- Lazy-loads many route pages with `React.lazy`.
- Some route components are still imported eagerly.

## 4. Folder Structure

```text
src/
  Animation/
  Preloader/
  api/
  assets/
  component/
  context/
  pages/
  utils/
  App.jsx
  main.jsx
  index.css
  noise.css
  textured-bg.css
```

## 5. Route Map

Routes are defined in `src/App.jsx`.

### Main Shell Route

```text
/ -> Home layout
```

Nested inside `Home`:

```text
/              -> Hero
/movies        -> Movies
/news          -> News
/sports        -> Sports
/history       -> History
/liked         -> Liked
/shorts        -> Shorts
/subscription  -> Subscription
/settings      -> Setting
/help          -> Help
/profile       -> Profile
/trending      -> Trending
/music         -> Music
```

### Top-Level Routes

```text
/upload-test   -> TestUpload
/upload-video  -> UploadVideo
/showcase      -> ArchitectureShowcase
/register      -> Register
/login         -> Login
/preloader     -> Preloader
/test          -> Test
/watch/:id     -> PlayerPage
*              -> NotFound
```

## 6. Layout and Navigation

### `src/pages/Home.jsx`

`Home` is the main authenticated-style layout shell. It renders:

- Fixed top `Navbar`.
- Left `Sidebar`.
- Scrollable main area containing `PageWrapper` and `Outlet`.

The nested route pages do not render their own full shell. They rely on `Home` for the navigation frame.

### `src/component/Navbar.jsx`

Responsibilities:

- Shows logo/name.
- Links to `/`, `/trending`, and `/music`.
- Shows search input.
- Shows notification icon.
- Uses `useAuth()` to decide whether to show `ProfileDropdown` or register/login links.

Important note: it destructures `logout`, but `AuthContext` exports `Logout`. The variable is currently unused in `Navbar`, so this does not break the build, but it is inconsistent.

### `src/component/Sidebar.jsx`

Responsibilities:

- Defines the side menu array inside the component.
- Renders links for home, movies, news, sports, history, liked, subscription, upload, settings, help, and showcase.
- Stores local UI state for collapsed/expanded view and hover styling.

Important note: `menuClick` state is declared but not used.

## 7. Authentication Flow

### `src/context/AuthContext.jsx`

Exports:

```jsx
useAuth()
AuthProvider
```

Provider state:

- `user`
- `setUser`
- `loading`
- `Logout`

Startup behavior:

- On mount, `fetchUser()` calls:

```text
GET /users/current-user
```

- On success, it stores `response.data?.data` in `user`.
- On failure, it logs `"Login first"` and sets `user` to `null`.
- `loading` becomes `false` in `finally`.

Logout behavior:

```text
POST /users/logout
```

Then it sets `user` to `null`.

### Auth Consumers

- `Navbar` reads `user`.
- `ProfileDropdown` reads `user`, `setUser`, `Logout`, and `loading`.
- `Login` calls `/users/login`, then sets `user` from `res.data.data.user`.
- `Register` calls `/users/register`.
- `UploadVideo` reads `user` and blocks upload UI when no user is present.
- `Setting` destructures `logout`, but the context exposes `Logout`, so logout actions there may not work if used.

## 8. API Layer

### `src/api/_config.js`

Reads Vite environment variables:

```js
VITE_BACKEND_URI_LOCAL
VITE_BACKEND_URI_PROD
```

Exports:

```js
backend_local
backend_prod
```

### `src/api/axios.js`

Creates the shared Axios instance:

```js
axios.create({
  baseURL: `${backend_prod}/api/v1`,
  withCredentials: true,
})
```

All main API calls should go through this instance so cookies and backend base URL stay consistent.

Current limitation: the active base URL always uses `backend_prod`; local backend switching is commented out.

## 9. Backend Endpoint Usage

Current frontend endpoint calls:

```text
GET  /users/current-user    AuthProvider session restore
POST /users/logout          ProfileDropdown/logout flow
POST /users/login           Login form
POST /users/register        Register form with avatar and cover image
GET  /users/profile         Profile page
GET  /users/me              Fetch test page
GET  /videos/get-all        Hero, Render, RenderHistory, RenderLiked, RenderTrending
GET  /videos/watch/:id      PlayerPage
POST /videos/upload         UploadVideo form
```

## 10. Video Browsing Flow

### `src/pages/Hero.jsx`

- Fetches `/videos/get-all`.
- Randomizes the response array with `.sort(() => Math.random() - 0.5)`.
- Renders a responsive grid of `VideoCard`.
- Shows a small loading message while fetching.

### `src/pages/Render/Render.jsx`

- Same general fetch-and-shuffle behavior as `Hero`.
- Used by category pages like `Movies`, `News`, and `Sports`.

### `src/pages/Render/RenderHistory.jsx`

- Fetches all videos but renders them with `LikedVideoCard`.
- It does not currently fetch real user watch history.

### `src/pages/Render/RenderLiked.jsx`

- Fetches all videos but renders them with `LikedVideoCard`.
- It does not currently fetch real liked videos.

### `src/pages/Render/RenderTrending.jsx`

- Fetches all videos, shuffles them, and displays masonry-style cards.
- Links currently point to `/video-player-demo`, but that route is commented out in `App.jsx`. This is a real navigation flaw.

## 11. Video Card and Player Flow

### `src/pages/VideoCard.jsx`

Receives a `video` object and expects fields like:

```text
_id
thumbnail
title
description
views
createdAt
owner.avatar
owner.fullName
```

It optimizes the thumbnail URL through `optimizeCloudinaryUrl()` and links to:

```text
/watch/:videoId
```

Potential fragility: it directly reads `video.owner.avatar` and `video.owner.fullName`; if `owner` is missing, the card can crash.

### `src/pages/PlayerPage/PlayerPage.jsx`

- Reads `id` from `useParams()`.
- Calls `/videos/watch/${id}`.
- Stores `res.data?.data` in local `video` state.
- Renders `Navbar` and `VideoPlayer`.

Potential fragility: the effect dependency array is empty. If React reuses this component for a different `id`, it will not refetch. `id` should be in the dependency array.

### `src/component/VideoPlayer.jsx`

Presentation component for playback controls. It receives a `video` object from `PlayerPage`.

Expected responsibility:

- Render video source.
- Handle play/pause/progress/volume/fullscreen UI.
- Display video metadata.

## 12. Upload Flow

### `src/pages/Upload/UploadVideo.jsx`

Auth behavior:

- Reads `user` from `useAuth()`.
- If no user exists, shows register/login prompt.
- If user exists, shows upload form.

Form fields:

```text
video
thumbnail
title
description
duration
```

Submit behavior:

- Builds `FormData`.
- Sends:

```text
POST /videos/upload
```

With multipart data:

```text
videoFile
thumbnail
title
description
duration
```

Potential flaw: duration is intended to be read from video metadata, but the preview video has `ref={videoRef}` commented out, so `videoRef.current` never receives the DOM node and duration may stay empty.

## 13. Register and Login Flow

### `src/pages/AuthPages/Register.jsx`

- Collects full name, username, email, password, avatar, and cover image.
- Uses `FileReader` for local avatar/cover previews.
- Sends multipart form data to `/users/register`.
- Navigates to `/` on success.

Potential issue: it does not set auth user state after registration; whether the user is logged in after registration depends entirely on backend cookie behavior and later `AuthProvider` fetches.

### `src/pages/AuthPages/Login.jsx`

- Collects username and password.
- Sends JSON to `/users/login`.
- On success, calls `setUser(res.data.data.user)` and navigates to `/`.
- Includes `rememberMe` UI, but it does not affect request behavior.

Potential issue: it destructures `logout`, but context exposes `Logout`. The value is unused here.

## 14. Static Data Modules

`src/context/` also contains static data files:

- `DemoData.js`
- `KeyFeatures.js`
- `NextPhaseFeatures.js`
- `Showcase.js`
- `SubscriptionData.js`
- `TrendingData.js`
- `connectOptions.js`

These are used for showcase, demo content, subscription cards, and UI sections. Some imported demo data is now unused because live API calls replaced it.

## 15. Animation Layer

### `src/Animation/PageWrapper.jsx`

Wraps nested page content in Framer Motion transitions.

Used in:

```text
Home -> main -> PageWrapper -> Outlet
```

### `src/Animation/LayoutRoute.jsx`

Renders an `Outlet`, but its use in `App.jsx` is commented out. It currently appears to be leftover or planned layout code.

## 16. Styling Approach

Styling is primarily Tailwind utility classes written directly in JSX.

Global/local CSS files:

- `src/index.css`
- `src/noise.css`
- `src/textured-bg.css`

Common class names indicate themed backgrounds:

- `textured-bg`
- `bg-home`
- `bg-sidebar`
- `bg-navbar`

The design currently leans dark, with neutral backgrounds and accent colors.

## 17. Cloudinary Helper

### `src/utils/Cloudinary.jsx`

`optimizeCloudinaryUrl(url, width, height)`:

- If the URL is not Cloudinary, returns it unchanged.
- If it is Cloudinary, injects:

```text
f_auto,q_auto,w_{width},h_{height},c_fill
```

Potential flaw: it assumes `url` is always defined. Calling `url.includes(...)` will crash if `url` is `null` or `undefined`.

## 18. Benefits of Current Code Structure

- Clear top-level separation between pages, components, context, API setup, utilities, and animations.
- Central `axiosInstance` keeps backend URL and cookie behavior consistent.
- `AuthProvider` gives the whole app one source of truth for logged-in user state.
- Route-based layout with `Home` + `Outlet` keeps navigation shell separate from page content.
- Many route pages are lazy-loaded, which helps initial loading.
- Upload/register flows correctly use `FormData` for file uploads.
- Cloudinary optimization helper keeps image URL transformation reusable.
- Shared components like `Navbar`, `Sidebar`, `ProfileDropdown`, `VideoCard`, and card variants make UI reuse straightforward.
- Production build currently succeeds.

## 19. Flaws, Risks, and Improvement Opportunities

### Confirmed or Highly Likely Bugs

- `RenderTrending` links to `/video-player-demo`, but that route is commented out. Trending cards should probably link to `/watch/${video._id}`.
- `UploadVideo` duration auto-detection likely does not work because the preview `<video>` has `ref={videoRef}` commented out.
- `Setting`, `Navbar`, and `Login` use or destructure `logout`, while `AuthContext` exposes `Logout`. Standardize the name.
- `optimizeCloudinaryUrl` can crash if called with a missing URL.
- `VideoCard` can crash if `video.owner` is missing.
- `PlayerPage` should include `id` in its `useEffect` dependency array.

### Maintainability Issues

- Fetching `/videos/get-all` is duplicated in `Hero`, `Render`, `RenderHistory`, `RenderLiked`, and `RenderTrending`.
- `History` and `Liked` pages currently show shuffled all-video data instead of real user history/liked data.
- Sidebar routes are hardcoded inside `Sidebar`; this is acceptable now, but a route config would reduce drift as routes grow.
- Some files have unused imports and commented-out code, which makes the intended architecture harder to read.
- Route-level components are mixed between lazy imports and eager imports.
- Search input exists visually but has no search behavior.
- Notification bell exists visually but has no notification behavior.
- `rememberMe` exists visually but has no login behavior.
- `AuthContext` has unused `videos` state.
- Some links use plain `<a href>` instead of React Router `Link`, causing full page reloads.

### Build and Bundle Issues

`npm run build` succeeds, but Vite reports large chunks. The largest output chunks include `Preloader` and 3D/physics-related assets. This means:

- Initial or transition loading may be heavier than expected.
- More aggressive code-splitting may be needed.
- Heavy visual dependencies should be isolated to routes/components that truly need them.

## 20. Suggested Next Changes

Highest value fixes:

1. Change `RenderTrending` links from `/video-player-demo` to `/watch/${video._id}`.
2. Standardize auth logout as either `logout` or `Logout` everywhere.
3. Reattach `ref={videoRef}` in `UploadVideo` or replace duration detection with a reliable helper.
4. Add null guards in `VideoCard` and `optimizeCloudinaryUrl`.
5. Extract a reusable `useVideos()` hook or API function for `/videos/get-all`.
6. Add real API endpoints/data flows for liked videos and watch history.
7. Split heavy preloader/3D code so the whole app is not affected by large visual chunks.

## 21. Verification

Checked with:

```text
npm run build
```

Result:

```text
Build passed.
Vite warned that some production chunks are larger than 500 kB.
```
