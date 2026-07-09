# 🏟️ StadiumVerse AI 

### *The Generative-AI Operating System for FIFA World Cup 2026 Stadiums*

---

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js Version](https://img.shields.io/badge/Next.js-16.2-black.svg)](https://nextjs.org)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)

**StadiumVerse AI** is an end-to-end venue operations and fan experience platform. It integrates real-time stadium telemetry, dynamic route optimization, and generative-AI agents to assist fans, volunteers, security personnel, transport teams, and venue organizers during high-density tournament fixtures.

---

## 🏆 The Hackathon Challenge

This project was built to address **Challenge 4: Smart Stadiums & Tournament Operations** from the **Hackr Skills PromptWars** (powered by Google).

### Challenge Objective:
> *"Create a GenAI-powered solution to optimize stadium operations and enhance the FIFA World Cup 2026 experience through intelligent, real-time assistance."*

### Challenge Solution Strategy:
StadiumVerse AI meets this prompt by translating complex sensor feeds into clear, actionable advice across multiple user roles:
* **For Fans**: Offers real-time gate navigation, AI concessions waiting times forecasting, and multi-modal transit guides.
* **For Volunteers & Security**: Dynamic task scheduling boards, an instant incident reporter, and AI-synthesized shift briefs.
* **For Tournament Organizers**: A unified telemetry dashboard tracking concessions inventory, energy reserves, water capacity, and active incident response channels.
* **For Accessibility & Inclusion**: Assistive voice-guided narration, sign-language overlay interpreters, and step-free egress route planners.

---

## 💻 Development Philosophy: Driven by "Vibe Coding"

> *"This project was completely driven by my thoughts, ideas, and Vibe Coding pair-programming sessions with Antigravity."*

Rather than following rigid, boilerplate specs, the architecture and aesthetics of StadiumVerse AI evolved dynamically. The system was designed from the ground up to feel like a premium, state-of-the-art consumer software product (drawing inspiration from platforms like Linear, Notion AI, and Apple's interface design).

The core layout and features were built through rapid prototyping cycles where:
1. **The Vibe**: We prioritized a premium, dark-mode-first aesthetic (`#0A0B14`) using glassmorphism borders (`backdrop-blur-xl`), custom scrollbars, and smooth micro-animations.
2. **The Logic**: Antigravity acted as the coding co-pilot, translating the user's conceptual system flow—such as cross-role state reactivity, live multilingual announcement translators, and global red emergency evacuation overrides—into clean, production-ready React and TypeScript.

---

## 🌟 Key Features

### 1. 🤖 AI Co-Pilot Assistant
A streaming conversational assistant built with context-aware quick questions (e.g. *“Where is the nearest food vendor?”*). It generates step-by-step solutions and includes direct action links to other parts of the dashboard.

### 2. 🗺️ Smart Wayfinding & SVG Navigation
A top-down interactive vector diagram of the stadium that draws route lines dynamically. Users can toggle routes based on parameters: **Shortest Path**, **Accessibility Path** (avoids steps and elevators), **Low-Crowd Path**, and **Emergency Egress**.

### 3. 📊 Live Crowd Telemetry & Density Charts
Sensory heatmap tracking across stadium sectors (Concourses, Suites, Plazas) with interactive Area Charts projecting gate entrance patterns.

### 4. 🚊 Transportation Hub & Parking Reserves
Compares transit queue times (Metrolink, Shuttles, Express Bus) and features an interactive grid to reserve parking spaces with live vacancy calculations.

### 5. ♿ Accessibility Center
Provides a live auditory narration log (simulate hover actions to hear descriptions), a video overlay panel for sign language interpreters, and voice command actions.

### 6. 🗣️ Multilingual Translation Console
Translates PA announcements across 10 official FIFA languages (English, Spanish, French, German, Japanese, Portuguese, Arabic, Italian, Korean, Colombian Spanish) with a voice playback simulator.

### 7. 🍃 Sustainability Console
Tracks carbon offsets, awards Eco-Points badges for choosing public transit, and maps smart recycling bins.

### 8. 🚨 Emergency Evacuation & Red Override
Toggles a global high-contrast red theme override across all dashboards. Provides exit maps, medical center dispatch details, and a step-by-step evacuation guide.

---

## 🛠️ Complete Technology Stack & Specifications

StadiumVerse AI is engineered using a modern, performant, and visual-first software stack designed for real-time responsiveness and aesthetic polish.

### 1. Front-End Core & Framework
* **Next.js 16.2 (App Router)**: Utilizing Server-Side Rendering (SSR) for initial loads, dynamic React Server Components, and Next.js static optimizations.
* **React 19**: Powered by React's latest hooks, state preservation, and concurrent hydration cycles.
* **TypeScript**: Strict type definitions for mock dataset items (Stadiums, Matches, Volunteers, Parking Grid, and Concession Inventories) ensuring clean compile validation.

### 2. Styling & Design Architecture
* **Tailwind CSS v4.0 (CSS-First)**: Leverages Tailwind's brand new CSS-in-JS compilation system, featuring inline custom themes, container queries, and HSL dynamic modifiers.
* **Glassmorphism Spec**: High-intensity backdrop blur filters (`backdrop-blur-xl`), custom border transparency overlays (`border-white/[0.07]`), and radial gradient shadows.
* **Adaptive Typography**: Google Fonts integration (`Outfit` for high-impact display titles, `Inter` for clean technical readouts).

### 3. Motion & Animation Engine
* **Framer Motion**: Spring-based layout animations, page-to-page tab slide transitions (`AnimatePresence`), and interactive card lifts (4px Y-translation on hover).
* **Hardware-Accelerated CSS Keyframes**: Custom animations in `globals.css` (e.g., `mesh-flow` gradient loops, `pulse-slow` glowing meshes, `fade-in-up`, and `fade-in-scale`) to bypass client JS delays on initial page loads.

### 4. Interactive Assets & Engines
* **Custom SVG Vector Pathfinding**: Custom Top-Down Stadium Blueprint with dynamic, coordinates-bound SVG path drawing.
* **Auditory Narration Simulator**: Screen-reader voice logging that triggers audio narration lines on hover states.
* **Interactive Parking Reserves Grid**: Dynamic grid array state calculations updating available capacities live.
* **Lucide Icons**: High-fidelity, scalable SVG UI assets for operations dashboards.

### 5. Local Mock Telemetry & AI Synthesis
* **React Context API**: Central state store (`StadiumContext.tsx`) syncing gate scan rates, parking spaces, food queue times, active volunteer shift task checkmarks, and emergency overrides.
* **AI Copilot Service**: Generates real-time, context-aware instructions for fans, organizers, and security dispatch.
* **Translation Simulator**: Translates alerts across 10 official FIFA languages, mimicking actual PA announcer audio output.

### 6. Development, Tunneling & Verification Tooling
* **Next.js Turbopack**: High-speed incremental compiler for quick compilation.
* **Git**: Repository version control.
* **ngrok**: HTTPS tunneling agent used to securely expose the local environment to remote reviewers with allowed HMR dev origins configured.

---

## 🚀 Getting Started

To run the project locally:

### 1. Clone & Navigate
```bash
git clone https://github.com/sathishreddymanne/stadiumverse-ai.git
cd stadiumverse-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Optional: Expose via ngrok
To share the dashboard with others:
```bash
ngrok http 3000
```
*(Our `next.config.ts` includes root-level `allowedDevOrigins` support for `*.ngrok-free.app` to ensure HMR works perfectly on external tunnels!)*

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
