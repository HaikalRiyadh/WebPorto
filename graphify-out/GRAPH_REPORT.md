# Graph Report - Web Porto  (2026-10-22)

## Corpus Check
- 10 files · ~122,829 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 35 nodes · 34 edges · 12 communities (6 shown, 6 thin omitted)
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.92)
- Token cost: 1,250 input · 850 output

## Community Hubs (Navigation)
- Navigation & Bento Profile
- CV Documents & Drive Modal
- Projects Showcase & Apotek
- Hero Showcase & 3D Tilt
- Atmosphere & Particle Canvas
- WhatsApp Contact & Toast Flow
- 1Money Financial App
- HRIS Enterprise Platform
- Scrum Collaboration App
- 28Speedshop System
- Footer & Social Links
- Mobile Responsive Controls

## God Nodes (most connected - your core abstractions)
1. `Header & 3D Navigation Bar` - 8 edges
2. `Featured Projects Showcase & Filter` - 8 edges
3. `Hero Showcase Section` - 5 edges
4. `Google Drive Style CV Modal` - 5 edges
5. `About Me & Bento Architecture` - 3 edges
6. `Atmospheric Background & Particle Scene` - 2 edges
7. `Unified Bento Skills Grid (20 Techs)` - 2 edges
8. `Experience & Education Timeline` - 2 edges
9. `Contact Section & WhatsApp Form` - 2 edges
10. `Scroll-Reveal Observer (Intersection)` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Hero Showcase Section` --references--> `Hero Profile Portrait (Haikal.jpeg)`  [EXTRACTED]
  index.html → Images/Haikal.jpeg
- `Google Drive Style CV Modal` --references--> `Curriculum Vitae Haikal (ID)`  [EXTRACTED]
  index.html → cv/CV-Haikal.pdf
- `Google Drive Style CV Modal` --references--> `Resume Haikal Riyadh Romadhon (EN)`  [EXTRACTED]
  index.html → cv/Haikal_Riyadh_Romadhon_Resume_EN-v2.pdf
- `About Me & Bento Architecture` --references--> `About Me Profile Visual (About Me.jpeg)`  [EXTRACTED]
  index.html → Images/About Me.jpeg
- `Apotek Management System (Laravel + Livewire)` --references--> `Apotek System Preview (Apotek.png)`  [EXTRACTED]
  index.html → Images/Apotek.png

## Hyperedges (group relationships)
- **Core Portfolio Showcase Flow** — index_navigation_header, index_hero_section, index_projects_section, index_contact_section [EXTRACTED 1.00]
- **Ambient Atmosphere & Kinetic Effects** — index_bg_scene, index_constella_particle_canvas, index_cursor_spotlight_controller, index_theme_controller [INFERRED 0.95]
- **Cross-Platform Project Ecosystem** — project_apotek_system, project_scrum_collaboration, project_28speedshop, project_1money, project_hris_enterprise [INFERRED 0.85]

## Communities (12 total, 6 thin omitted)

### Community 0 - "Navigation & Bento Profile"
Cohesion: 0.33
Nodes (7): About Me Profile Visual (About Me.jpeg), About Me & Bento Architecture, Experience & Education Timeline, Header & 3D Navigation Bar, Unified Bento Skills Grid (20 Techs), Skill Cards Mouse Radial Tracker, Theme Toggle Controller (Dark/Light)

### Community 1 - "CV Documents & Drive Modal"
Cohesion: 0.50
Nodes (4): Curriculum Vitae Haikal (ID), Resume Haikal Riyadh Romadhon (EN), Google Drive Style CV Modal, CV Modal Controller & Tab Switcher

### Community 2 - "Projects Showcase & Apotek"
Cohesion: 0.50
Nodes (4): Apotek System Preview (Apotek.png), Interactive Projects Filter Engine, Featured Projects Showcase & Filter, Apotek Management System (Laravel + Livewire)

### Community 3 - "Hero Showcase & 3D Tilt"
Cohesion: 0.50
Nodes (4): Hero Profile Portrait (Haikal.jpeg), Hero Showcase Section, Hero Card 3D Magnetic Tilt Effect, Scroll-Reveal Observer (Intersection)

### Community 4 - "Atmosphere & Particle Canvas"
Cohesion: 0.67
Nodes (3): Atmospheric Background & Particle Scene, Constella Infinitum Particle Canvas 2.0, Cursor Spotlight Glow Follower

### Community 5 - "WhatsApp Contact & Toast Flow"
Cohesion: 0.67
Nodes (3): Contact Section & WhatsApp Form, Toast Notification System, WhatsApp Form Controller & Sparkles

## Knowledge Gaps
- **19 isolated node(s):** `Footer & Social Links`, `Theme Toggle Controller (Dark/Light)`, `Toast Notification System`, `Mobile Menu Toggle Controller`, `CV Modal Controller & Tab Switcher` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 19 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Header & 3D Navigation Bar` connect `Navigation & Bento Profile` to `CV Documents & Drive Modal`, `Projects Showcase & Apotek`, `Hero Showcase & 3D Tilt`, `WhatsApp Contact & Toast Flow`?**
  _High betweenness centrality (0.490) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Featured Projects Showcase & Filter` (e.g. with `Interactive Projects Filter Engine` and `Scroll-Reveal Observer (Intersection)`) actually correct?**
  _`Featured Projects Showcase & Filter` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Footer & Social Links`, `Theme Toggle Controller (Dark/Light)`, `Toast Notification System` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `Featured Projects Showcase & Filter` connect `Projects Showcase & Apotek` to `Navigation & Bento Profile`, `Hero Showcase & 3D Tilt`, `1Money Financial App`, `HRIS Enterprise Platform`, `Scrum Collaboration App`, `28Speedshop System`?**
  _High betweenness centrality (0.451) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Hero Showcase Section` (e.g. with `Hero Card 3D Magnetic Tilt Effect` and `Scroll-Reveal Observer (Intersection)`) actually correct?**
  _`Hero Showcase Section` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Why does `Google Drive Style CV Modal` connect `CV Documents & Drive Modal` to `Navigation & Bento Profile`, `Hero Showcase & 3D Tilt`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._