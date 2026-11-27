# Skills for Hire: Campus Edition (LPU)

A two-sided student-to-student peer skill marketplace built for **Lovely Professional University (LPU)** as part of the **Design Thinking (INT335)** project.

---

## Project Overview & Problem Solved

University students frequently need reliable, affordable help for campus tasks—from club event websites, Flutter hackathon MVPs, and Figma UI/UX prototypes to last-minute CA slide decks, reels, and event posters. At the same time, skilled student builders and creators struggle with unstructured WhatsApp DMs, unclear scope, endless unpaid revisions, and exam-week scheduling conflicts.

**Skills for Hire: Campus Edition** solves this with a structured, transparent campus marketplace tailored to student budgets and academic schedules.

---

## Core Features

- **LPU Registration Number Auth Gate**: Full-page Login and Sign Up experience requiring an 8-digit LPU Registration Number, 10-digit Indian mobile number, and password, keeping public cards anonymized while verifying campus identity.
- **Two-Sided Listings (Flagship Tech + Budget Micro-Skills)**:
  - *Explore Talent*: Clean service categories (**Website Building ₹1,499+**, **Mobile App Dev ₹2,499+**, **UI/UX & Figma ₹799+**, **Poster & Canva ₹99+**, **Video & Reel Editing ₹249+**, **PPT & Study Help ₹149+**, **Resume & LinkedIn ₹149+**) with live available student counts and dedicated category pages showcasing personal sample works.
  - *Student Needs*: Open campus requests supporting **Cash Budgets (₹)**, **Skill Barter / Swap**, and an **Urgent (24-Hr Hackathon / Viva)** filter.
- **Gear & Hostel Proximity Tags**: Creator cards display hostel/block proximity (`BH-4`, `Block 34`, `GH-2`) and setup tags (`DSLR + Gimbal`, `Laptop + Figma`, `Mobile Creator`) with **Same Hostel Block** sorting.
- **1-Tap Exam Mode Toggle**: Top-bar and account switch that pauses all of a student's listings (`Busy (Exams)`) during MTT/ETT exams without hurting their reliability streak.
- **Junior Shadow / 1st-Year Assistant Filter**: Allows 1st-year learners to filter senior creators open to mentoring and apply as a Junior Shadow.
- **Locked 3-Point Scope (Max 2 Revisions)**: Every deal locks upfront deliverable & deadline, budget/barter terms, and a **Max 2 Free Revisions** limit, with 1-click **Copy for WhatsApp** receipts.
- **4-Stage Deal Tracker & Verified Completion Certificate**: Track orders across `1. Brief Locked` → `2. Watermarked Draft` → `3. Revision 1/2` → `4. Final Handover`, unlocking a printable/copyable campus proof-of-work certificate and automatic slot restocking.
- **Smart Instant Match**: Automatically surfaces matching available creators or open needs right after posting.

---

## Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS 3 (`#F6F4EF` editorial canvas, `#18181B` ink borders, `#D95D39` terracotta accents)
- **Motion**: Framer Motion (architectural dot-grid cursor spotlight, spring card micro-interactions, shared `layoutId` tab/filter indicators, `AnimatePresence` modals, and `prefers-reduced-motion` support)
- **Icons**: Lucide React
- **Backend / Persistence**: Supabase-ready via environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) with automatic local demo state fallback

---

## Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd desthkproj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in `.env` if connecting a live Supabase project. If omitted, the app runs out-of-the-box with pre-seeded campus demo data.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```
