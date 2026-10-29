# 🍊 Tangerine Transit (LPU CampusNav)
> **INT355 Mobile Interface Design & Prototyping Final Project**  
> *A high-fidelity, mobile-first campus transit, indoor navigation, and class wayfinding web app tailored for Lovely Professional University (LPU).*

---

## 📌 Executive Summary

Navigating large-scale university campuses (such as LPU's 600+ acre layout) poses significant challenges for freshers and returning students—such as locating complex indoor classrooms (e.g., `34-608A`), timing electric shuttles, and pacing between back-to-back lectures. 

**Tangerine Transit** solves campus mobility by integrating **interactive 2D campus block maps**, **turn-by-turn indoor wayfinding**, **live shuttle transit radars**, **real-time lecture countdowns**, and a **"First 15 Days" fresher survival handbook** into a unified, responsive Progressive Web App.

---

## 🏛️ System Architecture & Engineering

### 1. Architectural Pattern
The application follows a modular, single-page/multi-view web app architecture built with modern front-end web standards:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer (PWA)                     │
│  Tailwind CSS 3.x (Design Tokens) + Semantic HTML5 + Vanilla JS│
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Navigation & Routing    │ │     State & Preferences    │
│  - 2D Canvas / SVG Block Map │ │  - LocalStorage Persist    │
│  - Indoor Dijkstra / Pathing │ │  - Offline Timetable Cache │
│  - Live Campus Shuttle Radar │ │  - Accessible / Walk Modes │
└──────────────┬───────────────┘ └─────────────┬──────────────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Campus Data & Directory                  │
│  - UMS Timetable Schemas (Room codes, Timings, Prof info)   │
│  - LPU Emergency Helplines, Uni-Hospital, Security Posts    │
│  - Food Kiosks, Turnstiles, Lifts, and EV Shuttle Stops     │
└─────────────────────────────────────────────────────────────┘
```

### 2. Tech Stack & Libraries
- **Markup & Layout:** Clean Semantic HTML5 (`<main>`, `<nav>`, `<aside>`, `<section>`).
- **Styling & Design System:** Tailwind CSS utility classes with customized Tangerine/University design tokens (`amber-500`, `orange-600`, `slate-900`, etc.).
- **Typography:** Inter / Google Fonts (`sans-serif`).
- **Icons:** Material Symbols & Lucide-inspired SVG icon sprites.
- **Rendering:** Responsive viewport emulation optimized for mobile screens ($360\text{px} \times 800\text{px}$ up to modern phablets).

---

## 📂 Project Structure

The project archive (`stitch_int355.zip`) is organized into clean screen modules alongside UI design guidelines:

```text
stitch_int355/
├── tangerine_transit/
│   └── DESIGN.md                                      # UI/UX design specifications, color schemes, typography
├── screen_1_university_portal_login_welcome/
│   ├── code.html                                      # UMS Single-Sign-On & Registration Screen
│   └── screen.png                                     # High-fidelity visual mockup
├── screen_2_central_home_live_class_dashboard/
│   ├── code.html                                      # Next Lecture, Shuttle Radar & Live Timetable
│   └── screen.png                                     # High-fidelity visual mockup
├── screen_3_interactive_2d_campus_guide_block_map/
│   ├── code.html                                      # 2D Campus Block Map, Shuttle Stops & Gates
│   └── screen.png                                     # High-fidelity visual mockup
├── screen_4_shortest_route_indoor_room_wayfinder/
│   ├── code.html                                      # Turn-by-Turn indoor corridor & elevator router
│   └── screen.png                                     # High-fidelity visual mockup
├── screen_5_campus_directory_first_15_days_survival_guide/
│   ├── code.html                                      # SOS Contacts, Freshers' checklist & vital spots
│   └── screen.png                                     # High-fidelity visual mockup
└── screen_6_user_preferences_navigation_settings/
    ├── code.html                                      # Mobility aids, walking speed & notifications
    └── screen.png                                     # High-fidelity visual mockup
```

---

## 📱 Detailed Screen Breakdown

### Screen 1: University Portal Login & Welcome
- **Target File:** `screen_1_university_portal_login_welcome/code.html`
- **Core Functionality:**
  - Secure student authentication using LPU Registration Number / University Email and UMS credentials.
  - "Remember Me" toggle and Quick Biometric login placeholder.
  - Guest mode exploring the campus without registration.
  - Dynamic greeting and campus notice badge.

---

### Screen 2: Central Home & Live Class Dashboard
- **Target File:** `screen_2_central_home_live_class_dashboard/code.html`
- **Core Functionality:**
  - **Dynamic "Next Class" Card:** Real-time countdown clock (e.g., *Starts in 12 mins*), course code (e.g., `INT355`), and direct room link (`Block 34, Room 608A`).
  - **1-Tap Quick Wayfinder:** Generates immediate walking route from student's current block to the lecture room.
  - **Live Shuttle Radar Widget:** Displays approaching electric campus shuttles, next arrival times at the nearest stand, and route identifiers.
  - **Daily Schedule Scroller:** Horizontal timetable showing completed, current, and upcoming academic blocks.

---

### Screen 3: Interactive 2D Campus Guide & Block Map
- **Target File:** `screen_3_interactive_2d_campus_guide_block_map/code.html`
- **Core Functionality:**
  - **2D Schematic Campus Map:** Interactive block representations (Blocks 1 to 58, Mall, Central Library, Uni-Hospital, Sports Arenas).
  - **Points of Interest (POI) Filter Bar:** Filter by Academic Blocks, Food Courts / Kiosks, ATM / Uni-Mall, Shuttle Stops, and Hostels.
  - **Pathing Overlays:** Pedestrian walking paths vs. vehicular/shuttle routes.
  - **Current Location Pinner:** Visual radar showing the user's estimated campus location.

---

### Screen 4: Shortest Route & Indoor Room Wayfinder
- **Target File:** `screen_4_shortest_route_indoor_room_wayfinder/code.html`
- **Core Functionality:**
  - **Room Code Decoder:** Parses complex room syntax (e.g., `34-608A` $\rightarrow$ *Block 34, 6th Floor, Wing A, Room 8*).
  - **Turn-by-Turn Guidance:** Micro-navigation from block entrance $\rightarrow$ main foyer $\rightarrow$ elevator/stairs $\rightarrow$ left corridor $\rightarrow$ target door.
  - **Accessibility Mode Indicator:** Highlights elevator-only paths for disabled students or heavy-equipment transit.
  - **Route Metrics:** Estimated walking time in minutes, step count, and elevation changes.

---

### Screen 5: Campus Directory & "First 15 Days" Survival Guide
- **Target File:** `screen_5_campus_directory_first_15_days_survival_guide/code.html`
- **Core Functionality:**
  - **Emergency Red-Alert SOS:** Instant call buttons for LPU Security Chief, University Hospital Ambulance, and Women Helpline.
  - **Fresher Onboarding Checklist:** Step-by-step progress tracker (ID Card punch, biometric registration, library clearance, mess onboarding).
  - **Campus Life Directory:** Key office locations (Division of Student Welfare, Examination Dept, Fee Counters, Registrar Office).

---

### Screen 6: User Preferences & Navigation Settings
- **Target File:** `screen_6_user_preferences_navigation_settings/code.html`
- **Core Functionality:**
  - **Pacing Calibration:** Adjust default walking pace (*Casual, Standard 4.5 km/h, Brisk 6 km/h*) to calibrate route arrival times.
  - **Mobility Preferences:** Avoid stairs toggle (wheelchair / lift-friendly routes).
  - **Transit Notifications:** Class start push alerts (15m/10m/5m prior) and shuttle arrival vibrations.
  - **Display Customization:** High-contrast daylight mode / Dark mode / Offline map downloads.

---

## 🎨 UI/UX Design System & Tokens

Derived from `tangerine_transit/DESIGN.md`:

| Token Name | Hex Code / Value | Usage |
| :--- | :--- | :--- |
| **Tangerine Primary** | `#F97316` (`orange-500`) | Key CTAs, active route lines, active tabs |
| **Tangerine Dark** | `#EA580C` (`orange-600`) | Button hover states, active badges |
| **Campus Navy / Slate** | `#0F172A` (`slate-900`) | Header backgrounds, high-contrast text |
| **Card Surface** | `#FFFFFF` / `#1E293B` | Modular dashboard widgets, bottom sheets |
| **Success / Transit Green**| `#10B981` (`emerald-500`) | Shuttle status: on-time, room available |
| **Alert Red** | `#EF4444` (`red-500`) | SOS Emergency services, class late warning |

---

## 🚀 How to Run & Preview

Since all views are built with zero build-step native web standards:

1. **Extract the ZIP file:**
   ```bash
   unzip stitch_int355.zip -d stitch_int355
   cd stitch_int355
   ```
2. **Preview Directly in Browser:**
   - Double-click any screen's `code.html` (e.g., `screen_2_central_home_live_class_dashboard/code.html`).
3. **Run with a Local Dev Server (Recommended for Live Reload):**
   ```bash
   # Using Python 3
   python3 -m http.server 8080

   # Or using Node / npx
   npx serve .
   ```
4. Open `http://localhost:8080` in your browser and switch to **Mobile Device Emulation** (`Ctrl + Shift + M` / `Cmd + Shift + M` on Chrome/Firefox).

---

## 👥 Contributors & Academic Reference
- **Course:** INT355 (Mobile Interface Design & Application Development)
- **Institution:** Lovely Professional University (LPU), Phagwara, Punjab
- **Topic:** Smart Campus Transit & Indoor Wayfinding