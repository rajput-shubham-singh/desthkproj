// Plain-Language Campus Rate Guide for LPU
// Flagship Tech & Design (Top Tier) + Everyday Student Pocket-Money Micro-Skills (Budget Tier)
export const CAMPUS_RATES = [
  // --- FLAGSHIP HIGH-VALUE TECH & UI/UX CATEGORIES (TOP TIER) ---
  {
    id: "website-building",
    service: "Website Building & Full-Stack Dev",
    category: "Website Building & Full-Stack Dev",
    typicalRate: "₹1,499 – ₹3,999",
    minPrice: 1499,
    maxPrice: 3999,
    averagePrice: 2200,
    unit: "full website / capstone app",
    turnaround: "3 to 5 days",
    whatYouGet: "Responsive React/Next.js/HTML website, Google Sheets RSVP sync, live countdown timer, and automated Vercel/GitHub Pages deployment.",
    tip: "Club coordinators should prepare approved text, high-res sponsor PNG logos, and event schedule before development begins."
  },
  {
    id: "mobile-app-dev",
    service: "Mobile App Development (Android / iOS)",
    category: "Mobile App Development (Android / iOS)",
    typicalRate: "₹2,499 – ₹5,999",
    minPrice: 2499,
    maxPrice: 5999,
    averagePrice: 3500,
    unit: "per MVP app build (3–6 screens)",
    turnaround: "4 to 7 days",
    whatYouGet: "Cross-platform Flutter or native Kotlin Android app with Firebase authentication, local database caching, and ready-to-install debug APK.",
    tip: "Agree on the exact screen mockups and user flow with the developer before writing backend code."
  },
  {
    id: "uiux-design",
    service: "UI/UX Design & Figma Prototypes",
    category: "UI/UX Design & Figma Prototypes",
    typicalRate: "₹799 – ₹1,999",
    minPrice: 799,
    maxPrice: 1999,
    averagePrice: 1200,
    unit: "interactive 8–15 screen UI kit",
    turnaround: "2 to 4 days",
    whatYouGet: "Interactive clickable Figma prototype, auto-layout components, typography scale, color tokens, and ready-for-dev asset exports.",
    tip: "Share benchmark apps or screenshots of visual styles you like during your kickoff discussion."
  },

  // --- EVERYDAY STUDENT BUDGET MICRO-SKILLS (BUDGET TIER) ---
  {
    id: "posters",
    service: "Poster & Canva Design",
    category: "Poster & Canva Design",
    typicalRate: "₹99 – ₹249",
    minPrice: 99,
    maxPrice: 249,
    averagePrice: 149,
    unit: "per poster creative",
    turnaround: "1 to 2 days",
    whatYouGet: "High-resolution print file (A3/A4) + Instagram story/post size (1080x1920) + editable Canva/Figma link.",
    tip: "Share approved headline text, event dates, and official PNG logos upfront to enable 24h turnaround."
  },
  {
    id: "reels",
    service: "Video & Reel Editing",
    category: "Video & Reel Editing",
    typicalRate: "₹249 – ₹499",
    minPrice: 249,
    maxPrice: 499,
    averagePrice: 349,
    unit: "per 30–60s video",
    turnaround: "1 to 2 days",
    whatYouGet: "Vertical 9:16 MP4, trending audio sync, animated kinetic subtitles, sound effects, and clean color grading.",
    tip: "Upload raw footage to Google Drive and agree on the audio track before video cutting starts."
  },
  {
    id: "study-ppt",
    service: "PPT & Assignment Formatting",
    category: "PPT & Assignment Formatting",
    typicalRate: "₹149 – ₹299",
    minPrice: 149,
    maxPrice: 299,
    averagePrice: 199,
    unit: "for 10–15 slides",
    turnaround: "1 to 2 days",
    whatYouGet: "Executive typography, custom diagrams, clean workflow charts, and modern speaker talking notes for viva defense.",
    tip: "Share your rough assignment bullet points or project report at least 24 hours before your presentation."
  },
  {
    id: "resume-linkedin",
    service: "Resume & LinkedIn Polish",
    category: "Resume & LinkedIn Help",
    typicalRate: "₹149 – ₹299",
    minPrice: 149,
    maxPrice: 299,
    averagePrice: 199,
    unit: "per resume / profile",
    turnaround: "1 day",
    whatYouGet: "1-page ATS-formatted resume (LaTeX/Canva/Word) + personalized LinkedIn headline & summary tailored for campus drives.",
    tip: "Include your target tech stacks, hackathon projects, and semester CGPA so the reviewer can highlight your strengths."
  },
  {
    id: "photography",
    service: "Event Photography",
    category: "Event Photography",
    typicalRate: "₹299 – ₹599",
    minPrice: 299,
    maxPrice: 599,
    averagePrice: 449,
    unit: "for 1–2 hours shoot",
    turnaround: "2 days for edited photos",
    whatYouGet: "1–2 hours continuous mirrorless DSLR coverage + 35 to 50 color-graded high-res photos delivered via Google Drive.",
    tip: "Club coordinators must arrange stage/ground access passes for the photographer with campus security."
  }
];

export const FAIR_PLAY_TIPS = [
  {
    title: "2 Free Changes Included",
    description: "Every deal includes two rounds of minor adjustments (like updating text, color, or a photo). This keeps collaboration fair for students and clubs."
  },
  {
    title: "₹50 for Extra Changes",
    description: "If a client requests repeated modifications beyond the 2 included revisions, a flat ₹50 per extra change respects the student creator's time."
  },
  {
    title: "Clear 50/50 Payments",
    description: "We recommend 50% advance when work kicks off and the remaining 50% upon delivery of completed files. Never ask students to work for free."
  },
  {
    title: "Honest Deadlines",
    description: "Agree on the exact delivery hour in advance. If an unexpected academic deadline comes up, notify your peer at least 4 hours ahead."
  }
];

// Backwards compatibility aliases
export const FAIR_PRICE_RATES = CAMPUS_RATES;
export const FAIR_PLAY_RULES = FAIR_PLAY_TIPS;
