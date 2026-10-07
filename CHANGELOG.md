# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Modern WebP Image Optimization**: Converted all project showcase and profile images to high-fidelity WebP format, reducing asset payload from ~5.9 MB down to ~910 KB (>84% payload reduction).
- **Mobile Formspree Parity**: Enhanced `MobileContactSection` with direct API submission to Formspree, status spinners, sealed wax confirmation cards, and domain inquiry selection matching desktop.
- **Custom Wax Seal SVG Favicon**: Added vector wax seal favicon (`public/favicon.svg`) with gold/crimson styling to eliminate browser 404 favicon requests.
- **SEO & Social Sharing Metadata**: Added OpenGraph social preview tags, author and description metadata, mobile `theme-color` meta tags, and preloads for critical above-the-fold assets in `index.html`.
- **Audio Throttling Protection**: Implemented a 120ms throttle and GC-safe audio reference in `usePageFlipSound.ts` to prevent audio driver clipping during rapid tab switching.

### Performance & Lag Elimination
- **Resolved Desktop Flip Stutters & Race Condition**: Replaced interrupted multi-step page jumping (`turnToPage` + `setTimeout(60ms)` + `flip`) in `useBookAnimation.ts` with direct, single-phase target page flipping and exact spread detection.
- **Eliminated Expensive Per-Frame Drop-Shadow Filters**: Removed `filter: drop-shadow(...)` on `.page-flip-leaf` in `index.css` and `drop-shadow-2xl` from `HTMLFlipBookWrapper.tsx` in favor of native hardware-accelerated box shadows, eliminating full-page alpha mask re-rasterization during 3D rotations.
- **Paused Background 1080p Video While Journal Open**: Automatically pauses the 1080p background video when the journal is open in `SumieBackground.tsx`, freeing 100% of GPU resources for fluid 60 FPS page flips, and isolated the video onto a dedicated hardware layer (`transform: translateZ(0)`).
- **Consolidated 40 Metallic Binder Rings**: Removed duplicate `<SpiralBinderSpine />` calls from `JournalLeftPage.tsx` and mounted a single static spine in `HTMLFlipBookWrapper.tsx` over the center crease, saving 40 rotating 3D ring components and 80+ multi-layer box shadows.
- **Removed Nested Backdrop Blurs in 3D Cards**: Replaced `backdrop-blur-lg` inside rotating book pages in `JournalRightPage.tsx` with clean solid/alpha colors, removing Gaussian convolution kernel stalls.
- **Removed Infinite Scale Animations & Layout Projections**: Eliminated infinite scale animation loops in `JournalSidebar.tsx` and removed Framer Motion `layoutId` projection overhead from profile cards.

### Removed
- Removed 9.1 MB leftover `react-pageflip-master.zip` archive and `react-pageflip-master/` vendor folder.
- Removed abandoned experimental book components (`src/components/book/`), 10 orphaned components, and Three.js stubs.
- Cleaned unused dependencies from `package.json` (`three`, `@react-three/fiber`, `@react-three/drei`, `jotai`, `quick_flipbook`).

---

## [1.2.0] - 2026-07-28

### Fixed
- Enabled direct React click event forwarding across `HTMLFlipBookWrapper` pages for project selection and AI Twin quick action cards.
- Resolved pointer event interception inside book pages by preventing default book flip drag when interacting with inputs, buttons, and links.

### Changed
- Updated resume PDF asset in `public/resume.pdf`.

---

## [1.1.0] - 2026-07-25

### Added
- **Leather Bookmark Tabs Navigation**: Stitched leather bookmark tab UI with gold foil accents, realistic rotation, and paper preview tooltips.
- **Responsive FlipBook Architecture**: Dual-page book view for desktop (`>= 1024px`) with automatic page corner folds, shadows, and smooth page turns.
- **Dedicated Mobile Viewport**: Streamlined mobile vertical scroll experience (`MobileAboutSection`, `MobileProjectsSection`, `MobileSkillsSection`, `MobileContactSection`, and `MobileChatSection`).
- **Interactive AI Twin Interface**: Handwritten response journal simulation with typewriter effect and downloadable session logs.
- **Japanese Ink Wash Aesthetic**: Sumi-e background canvas with brush wipe transition on dark/light mode toggle.

### Changed
- Refactored book binder spine rendering to enhance perspective depth and reduce layout reflows.

---

## [1.0.0] - 2026-07-23

### Added
- Initial release of the interactive field journal portfolio for Prodip Sengupta.
- Integration of Formspree email dispatch with wax seal visual confirmation.
- Interactive project showcase highlighting 9 production-grade GenAI systems including VitalTrace AI, FinDoc AI, MenuOS, and LeafCart.
- Interactive career journey timeline and skill radar matrix.
- Ambient Three.js canvas simulation.
- Node/Express backend with Gemini API proxy integration.
