# 🎓 Smart Student Dashboard (Hack-A-Sprint 2026)

**Problem Statement ID:** WD-E01  
**Track:** Web Development (Education)

## Overview

A modern, highly personalized college student dashboard built to replace traditional chaotic notice boards. It delivers an organized, beautiful, and distraction-free experience for students by filtering content (Notices, Events, Assignments) specifically to their profile tags (e.g., Department, Year, Course).

This project uses a calming, pastel-themed "glassmorphic" design system combined with Next.js App Router for top-tier performance and mobile responsiveness.

---

## 🔥 Key Features

1. **Smart Personalization Engine**  
   Every piece of content (Notice, Event, Assignment) is tagged (e.g., `["CSE-3", "BBA-4"]` or `["ALL"]`). Students only see what matters to them in their feed, drastically reducing information overload.
2. **Modular Dashboard Layout**  
   A dynamic grid featuring 3 core widgets:
   - **Notice Feed:** A compact stream of the latest personalized updates.
   - **Academic Calendar:** A full calendar integration highlighting exam dates, workshops, and holidays.
   - **Assignment Tracker:** An automated to-do list showing pending coursework sorted by due date.
3. **Admin Control Panel**  
   A dedicated portal for faculty and administrators to post rich notices, pin important announcements, and attach files for immediate campus-wide or targeted distribution.
4. **Offline Demo Mode & Firebase Ready**  
   The app works out-of-the-box using extensive mock seed data, making it incredibly easy to review and demo. If Firebase credentials are provided, it seamlessly switches to real-time Firestore sync.
5. **Calm & Premium UI/UX**  
   Built with Tailwind CSS, the app exclusively uses soft rounding, soothing pastel accents, and fluid micro-animations to create a premium, stress-free user environment.

---

## 💻 Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Components)
- **Styling:** Tailwind CSS V4 + Vanilla CSS Variables
- **Icons & Components:** `react-icons`, `react-calendar`, `date-fns`
- **Database (Optional):** Firebase Firestore (Real-time NoSQL)
- **State Management:** React Context API + Custom Hooks (`useDashboardData`)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Environment Variables (Optional)

If you want to use Firebase Real-time Sync, duplicate `.env.local.example` to `.env.local` and add your keys.
Otherwise, the app will safely fall back to **Offline Demo Mode** using local seed data.

```bash
cp .env.local.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 👥 Demo Profiles

When running in "Offline Demo Mode", you can switch users via the **Profile/Settings** page or by logging out and logging back in:

1. **Admin User:** Can access the Admin Dashboard to post notices. Sees all content across all departments.
2. **Student 1 (BBA, Year 4):** Sees "ALL" notices + BBA-specific assignments and events.
3. **Student 2 (CSE, Year 3):** Sees "ALL" notices + CSE-specific technical assignments and hackathons.

## 🎨 Theme & Accessibility

The app features full support for Dark Mode, which can be toggled via the Top Navigation Bar or Settings page. The dark palette swaps out stark blacks for calming deep slates to maintain the pastel aesthetic.

## 🏆 Judging Criteria Alignment

- **Relevance:** Directly solves the chaos of college notice boards.
- **Innovation:** Tag-based personalization engine.
- **Functionality:** Fully interactive calendar, to-do toggle, and search/filter integrations.
- **UI/UX:** Vercel-ready, pixel-perfect layout using modern AppShell paradigms.
