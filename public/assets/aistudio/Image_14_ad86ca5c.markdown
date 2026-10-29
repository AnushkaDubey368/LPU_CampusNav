---
name: Tangerine Transit
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#5a4138'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a63c00'
  primary: '#a23a00'
  on-primary: '#ffffff'
  primary-container: '#cb4a00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb598'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#a23a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cb4a00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb598'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7e2c00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-clarity, kinetic, and utility-first visual language tailored for university students, faculty, and campus visitors navigating expansive institutional grounds under diverse ambient lighting conditions.

The emotional baseline is energetic confidence, urgency reduction, and rapid orientation. The system merges the systematic rigor of Material Design 3 with bold typographic wayfinding and athletic high-contrast accents. 

### Visual Tenets
- **Waypoint Legibility:** Information displays must prioritize glanceability over decorative nuance; waypoints, classroom numbers, and active routes must register within a 300ms visual scan.
- **Controlled Vibrancy:** Energetic warm hues are reserved strictly for active paths, primary actions, and immediate-attention states, grounded by deep obsidian charcoal typography and structural surfaces.
- **Tactile Utility:** Micro-interactions mimic responsive physical signage—crisp corner geometry, distinct active-state badges, and elevated planar cards that suggest layered spatial depth without visual clutter.

## Colors

The palette leverages high-contrast pairing between a vibrant tangerine spectrum and deep obsidian charcoal, supported by clean light-gray architectural surfaces.

### Functional Roles
- **Primary (`#EA5A0B`):** Applied to active navigation vectors, primary floating action buttons (FABs), key turn-by-turn prompts, and primary interactive buttons.
- **Secondary (`#1A1A1A`):** Dominates high-emphasis typography, critical structural headers, bottom sheet backdrops in focused states, and high-contrast wayfinding badges.
- **Tertiary (`#F26522`):** Used for micro-accents, live transit indicators, hover/focus shifts, and route step progress bars.
- **Neutral (`#71717A`):** Secondary metadata, inactive navigation tabs, architectural grid dividers, and distance indicators.

### Surface System
- **Base Canvas:** Pure white (`#FFFFFF`) for indoor detail views, expanded timetables, and modal surfaces.
- **Surface Dim:** Neutral gray (`#F3F4F6`) for full-screen map backgrounds and bottom sheet drag containers.
- **Surface Container:** Warm light-gray (`#F8F9FA`) for elevated block cards, schedule items, and facility rows.
- **Accent Container:** Warm amber tint (`#FFF3EB`) paired with primary orange text/icons for active route badges, selected schedule slots, and alert notices.
- **On-Surface High:** Deep charcoal (`#111111`) ensuring an AAA contrast ratio across all content states.

## Typography

The type system balances the friendly, open geometric clarity of **Plus Jakarta Sans** for primary human-scale communication with the technical precision of **Space Grotesk** for wayfinding labels, room numbers, and navigation metadata.

### Typographic Hierarchy Rules
- **Wayfinding & Metadata:** All campus block designations (e.g., `BLK-34`, `ROOM 102B`), transit ETAs, and status pills utilize `label-lg`, `label-md`, or `label-sm` set in **Space Grotesk** with uppercase formatting and expanded tracking.
- **Headers & Waypoints:** Turn-by-turn prompts, onboarding milestones, and facility names use **Plus Jakarta Sans** with weights between 600 and 800 to maintain instant visual recognition when walking outdoors.
- **Body Text:** Standard timetable details, description cards, and instruction lists utilize **Plus Jakarta Sans** regular weights with generous line heights to avoid reading fatigue during fast mobile interactions.

## Layout & Spacing

The layout is built around a fluid, touch-optimized mobile grid designed to support split-view maps, bottom sheets, and scrollable horizontal schedules.

### Grid & Breakpoints
- **Mobile Viewport (Primary, 320px - 599px):** 4-column fluid layout with a `1rem` (16px) outer margin and `0.75rem` (12px) gutters. Essential controls remain anchored within the thumb zone (bottom 40% of viewport).
- **Tablet / Large Mobile (600px - 904px):** 8-column fluid layout with `1.5rem` (24px) outer margin and `1rem` (16px) gutters. Map and contextual navigation panels decouple into a persistent split-pane system.

### Vertical Spacing & Rhythm
All vertical element stacks adhere to an 8pt base grid with a 4pt sub-grid for tight badge and label padding. Bottom-docked route cards, sheet drawers, and floating utility modules use `space-lg` (24px) separation from base screen bounds to preserve map interactivity underneath.

## Elevation & Depth

Visual hierarchy leverages Material Design 3 surface containers alongside warm-tinted ambient drop shadows to produce an accessible layered environment.

### Surface Tiers
- **Level 0 (Base Map Canvas):** Completely flat plane (`#F3F4F6`), zero shadow.
- **Level 1 (Structural Groupings):** Daily schedule lists, route segments, and inactive cards sit on `#F8F9FA` with a subtle outline border (`1px solid #E5E7EB`) and no shadow.
- **Level 2 (Active Cards & Panels):** High-priority block destination cards and route previews sit on `#FFFFFF` with an ambient shadow: `0 4px 16px -2px rgba(26, 26, 26, 0.06), 0 2px 6px -1px rgba(234, 90, 11, 0.04)`.
- **Level 3 (Modal Sheets & Wayfinding FABs):** Elevated bottom sheets, active re-center controls, and critical alerts sit at `0 12px 32px -4px rgba(26, 26, 26, 0.12), 0 4px 12px -2px rgba(26, 26, 26, 0.08)`.

### Elevation Accents
Selected navigation segments and active timetable blocks introduce a 2px interior border using the primary brand color (`#EA5A0B`) combined with the Level 2 shadow to emphasize priority over sibling elements.

## Shapes

The design system standardizes on a medium-to-large rounded profile (`roundedness: 2`), applying an intentional 16px (`1rem`) border radius to primary cards, modal bottom sheet top edges, and interactive route panels.

### Geometric Application
- **Cards, Panels & Sheets:** Fixed at `1rem` (16px) corner radius to create friendly, modern architectural groupings.
- **Inputs & Search Banners:** Fixed at `0.75rem` (12px) to preserve edge definition and distinguish functional text entries from surrounding card surfaces.
- **Chips, Badges & Small Indicators:** Full pill geometry (`9999px`) for block tags, classroom labels, and ETA pills to support quick visual parsing.
- **Buttons (Primary/Secondary):** Fixed at `0.75rem` (12px) radius for inline actions; floating wayfinding triggers adopt a pill shape (`9999px`) for dynamic tap accessibility.

## Components

### Buttons
- **Primary Navigation Button:** Filled `#EA5A0B` background with `#FFFFFF` text (`label-lg`). Height is 48px to satisfy accessible tap guidelines. No border, slight scale down (0.98) on active state.
- **Secondary Action Button:** Deep Obsidian `#1A1A1A` background with `#FFFFFF` text. Height is 48px, radius `0.75rem`.
- **Tertiary / Outlined Button:** Transparent background, `1.5px solid #1A1A1A`, text in `#1A1A1A`.

### Chips & Badges
- **Wayfinding Status Chip:** Pill shape (`9999px`), `0.25rem` top/bottom and `0.75rem` left/right padding. Space Grotesk `label-md`. 
  - *Active Route:* `#FFF3EB` background with `#EA5A0B` text and matching icon.
  - *Block Code:* `#1A1A1A` background with `#FFFFFF` text.
- **Live Indicator Badge:** Circular 8px dot with primary `#EA5A0B` pulse wave for live bus or ongoing timetable sessions.

### Cards
- **Campus Block Card:** Radius `1rem` (16px), `#FFFFFF` surface, ambient Level 2 shadow, padding `space-md` (16px). Houses block code badge in the top-right, walking distance ETA in `label-lg`, and direct "Start Route" action.
- **Timetable Slot Card:** Radius `1rem` (16px), `#F8F9FA` surface with a `3px` solid left accent stripe indicating course category (e.g., `#EA5A0B` for current class, `#1A1A1A` for upcoming).

### Input Fields
- **Search & Destination Bar:** Height 52px, radius `0.75rem` (12px), `#FFFFFF` fill with `1px solid #E5E7EB` border. Prefix icon in `#1A1A1A`, placeholder text in `#71717A`. On focus: `2px solid #EA5A0B` with zero ambient glow.

### Lists
- **Facility & Waypoint Row:** Divider-free list using alternating spacing (`space-md` gap). Features a leading 40px rounded icon container (`#FFF3EB` background, `#EA5A0B` icon), primary title in `title-md`, and trailing distance metric in `label-md` (`#71717A`).

### Specialized Campus Navigation Components
- **Turn-by-Turn Waypoint Strip:** Docked at viewport top, `#1A1A1A` background with `#FFFFFF` text and vibrant `#EA5A0B` directional arrow glyphs. Space Grotesk `label-lg` for distance count-downs.
- **Route Summary Sheet:** Partial-height bottom sheet anchored with radius `1.5rem` top corners, featuring high-contrast travel mode tabs (Walk, Shuttle, Bicycle) styled as pill segments.