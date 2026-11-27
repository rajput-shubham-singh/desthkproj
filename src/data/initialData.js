export const CATEGORIES = [
  "All",
  "Website Building & Full-Stack Dev",
  "Mobile App Development (Android / iOS)",
  "UI/UX Design & Figma Prototypes",
  "Poster & Canva Design",
  "Video & Reel Editing",
  "PPT & Assignment Formatting",
  "Resume & LinkedIn Help",
  "Event Photography"
];

export const CATEGORY_FALLBACK_IMAGES = {
  "Website Building & Full-Stack Dev": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "Mobile App Development (Android / iOS)": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  "UI/UX Design & Figma Prototypes": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
  "Poster & Canva Design": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
  "Video & Reel Editing": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
  "PPT & Assignment Formatting": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "Resume & LinkedIn Help": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
  "Event Photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
};

export const getCategoryFallbackImage = (category) => {
  return CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES["Website Building & Full-Stack Dev"];
};

// Main Campus Service Categories: Flagship Tech at Top, Everyday Student Skills Below
export const SERVICE_CATEGORIES = [
  // --- FLAGSHIP HIGH-VALUE TECH & UI/UX CATEGORIES (TOP TIER) ---
  {
    id: "website-building",
    name: "Website Building & Full-Stack Dev",
    categoryKey: "Website Building & Full-Stack Dev",
    isFlagship: true,
    tagline: "Club landing pages, portfolios & capstone web apps with Google Sheets sync",
    description: "Production-ready React, Next.js, Tailwind CSS, and MERN stack websites. Includes RSVP registration forms connected to Google Sheets, live timers, and free Vercel deployment.",
    fairRateGuide: "₹1,499 – ₹3,999 for full site or capstone app",
    iconName: "Globe",
    startingPrice: 1499,
    bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Club Registration Site", "Capstone Web App", "Developer Portfolio"]
  },
  {
    id: "mobile-app-dev",
    name: "Mobile App Development (Android / iOS)",
    categoryKey: "Mobile App Development (Android / iOS)",
    isFlagship: true,
    tagline: "Cross-platform Flutter & native Kotlin apps, Firebase backends & hackathon MVPs",
    description: "Functional Android & iOS mobile apps built in Flutter or native Kotlin. Features Firebase auth, local SQLite/Room caching, REST API integrations, and ready-to-test APKs.",
    fairRateGuide: "₹2,499 – ₹5,999 for MVP / capstone mobile app",
    iconName: "Smartphone",
    startingPrice: 2499,
    bannerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Flutter Hackathon MVP", "Mess Rating Android App", "Capstone System APK"]
  },
  {
    id: "uiux-design",
    name: "UI/UX Design & Figma Prototypes",
    categoryKey: "UI/UX Design & Figma Prototypes",
    isFlagship: true,
    tagline: "Interactive Figma app flows, clickable mobile prototypes & design systems",
    description: "Modern, high-fidelity user journeys and screen prototypes designed in Figma. Includes auto-layout components, mobile viewports (iOS/Android), typography scale, and dev handoff specs.",
    fairRateGuide: "₹799 – ₹1,999 for 8–15 screen prototype",
    iconName: "Layers",
    startingPrice: 799,
    bannerImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["10-Screen Figma Prototype", "Design Thinking UI Kit", "Dashboard Wireframes"]
  },

  // --- EVERYDAY STUDENT BUDGET MICRO-SKILLS (BUDGET TIER) ---
  {
    id: "poster-canva",
    name: "Poster & Canva Design",
    categoryKey: "Poster & Canva Design",
    isFlagship: false,
    tagline: "Event posters, Instagram stories & club induction creatives",
    description: "High-impact graphics designed in Canva and Figma for club recruitments, hackathons, guest talks, and festival announcements with 24h turnaround.",
    fairRateGuide: "₹99 – ₹249 per poster creative",
    iconName: "Palette",
    startingPrice: 99,
    bannerImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Insta Event Poster", "Club Induction Story", "Fest Banner"]
  },
  {
    id: "video-reels",
    name: "Video & Reel Editing",
    categoryKey: "Video & Reel Editing",
    isFlagship: false,
    tagline: "Fast 30–60s reels, beat-synced cuts & fest teaser videos",
    description: "Beat-synced 9:16 vertical edits, trending audio sync, kinetic animated subtitles, and sound effects for club auditions, inductions, and fests.",
    fairRateGuide: "₹249 – ₹499 per 30–60s video",
    iconName: "Video",
    startingPrice: 249,
    bannerImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Spectra Audition Reels", "Club Induction Teasers", "Festival Aftermovies"]
  },
  {
    id: "ppt-assignment",
    name: "PPT & Assignment Formatting",
    categoryKey: "PPT & Assignment Formatting",
    isFlagship: false,
    tagline: "CA presentation slides, capstone viva decks & report styling",
    description: "Modern slide decks with executive typography, clean charts, and diagrams for viva defense, CA presentations, and club pitch decks.",
    fairRateGuide: "₹149 – ₹299 for 10–15 slides",
    iconName: "BookOpen",
    startingPrice: 149,
    bannerImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Major Project Viva Slides", "CA-2 Case Study Deck", "E-Cell Pitch Deck"]
  },
  {
    id: "resume-linkedin",
    name: "Resume & LinkedIn Polish",
    categoryKey: "Resume & LinkedIn Help",
    isFlagship: false,
    tagline: "ATS-friendly resume formatting & LinkedIn profile polish",
    description: "Peer review by placed seniors. Clean Overleaf LaTeX / Canva templates optimized for campus placement drives and recruiter ATS scans.",
    fairRateGuide: "₹149 – ₹299 per resume / profile",
    iconName: "FileText",
    startingPrice: 149,
    bannerImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["1-Page ATS Resume", "LinkedIn Headline & About", "Placement CV Review"]
  },
  {
    id: "photography",
    name: "Event Photography",
    categoryKey: "Event Photography",
    isFlagship: false,
    tagline: "Campus event coverage, sports matches & portrait headshots",
    description: "Mirrorless DSLR coverage for sports finals, cultural performances, and graduation headshots with high-res curated Google Drive delivery.",
    fairRateGuide: "₹299 – ₹599 for 1–2 hours shoot",
    iconName: "Camera",
    startingPrice: 299,
    bannerImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    popularTasks: ["Unipolis Sports Finals", "Club Induction Shoots", "Graduation Portraits"]
  }
];

// Tab 1: Find Talent (Students Offering Their Skills - with real-time slot booking & student-specific sample work)
export const INITIAL_TALENT = [
  // --- 1. WEBSITE BUILDING & FULL-STACK DEV (2 DISTINCT BUILDERS) ---
  {
    id: "talent-web-1",
    studentId: "Student S3 • B.Tech CSE (Full-Stack) 3rd Yr",
    title: "Full-Stack Club Websites & Fast React Portals",
    category: "Website Building & Full-Stack Dev",
    description: "Custom responsive React & Tailwind websites with automated Google Sheets RSVP sync, live countdown timers, and free Vercel deployment. Clean code hand-off.",
    recommendations: 19,
    startingPrice: 1499,
    priceUnit: "per club landing page",
    deliveryTime: "Delivers in 3 days",
    tools: ["React", "Next.js", "Tailwind CSS", "Google Sheets", "Vercel"],
    freeChanges: "2 free changes + setup guide",
    campusLocation: "Block 38 Tech Corridor",
    gearTag: "💻 React + VS Code",
    hostelTag: "📍 Hostel BH-4",
    juniorAssistantOpen: true,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Robotics Club Hackathon RSVP & Schedule Portal",
        context: "Client: Robotics Society LPU • Block 38",
        chargedPrice: 1800,
        link: "https://github.com/sample-lpu/robotics-club-portal",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        note: "Production React 19 app with live event countdown, team registration validation, and Google Sheets webhook sync."
      },
      {
        title: "Senior Developer Showcase Portfolio & Blog",
        context: "Personal Capstone Project • Tech Corridor",
        chargedPrice: 1499,
        link: "https://vercel.app/sample-developer-portfolio",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        note: "Minimalist developer portfolio with 100/100 Lighthouse performance and interactive project drawer."
      }
    ]
  },
  {
    id: "talent-web-2",
    studentId: "Student S12 • B.Tech CSE (Backend & MERN) 4th Yr",
    title: "Production MERN Web Apps & Capstone Portals",
    category: "Website Building & Full-Stack Dev",
    description: "End-to-end web apps with Node.js/Express backends, MongoDB databases, user authentication, and REST APIs for major capstone projects.",
    recommendations: 24,
    startingPrice: 2499,
    priceUnit: "full-stack web app",
    deliveryTime: "Delivers in 4 days",
    tools: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    freeChanges: "2 free changes + DB schema setup",
    campusLocation: "Block 34 CSE Labs",
    gearTag: "💻 MERN + Docker",
    hostelTag: "📍 Block 34",
    juniorAssistantOpen: true,
    slots: 1,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Campus Lost & Found Portal with LPU Email Auth",
        context: "Built for Student Welfare Council • Block 30",
        chargedPrice: 2800,
        link: "https://github.com/sample-lpu/campus-lost-found",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        note: "MERN stack portal with image uploads on Cloudinary, JWT auth, and real-time WhatsApp contact triggers."
      },
      {
        title: "Club Fest Ticketing & QR Pass Scanner Web App",
        context: "Spectra Cultural Fest Committee • Unipolis",
        chargedPrice: 3500,
        link: "https://github.com/sample-lpu/fest-qr-ticketing",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        note: "Digital pass generation with client-side camera QR scanning for 4,000+ fest attendees."
      }
    ]
  },

  // --- 2. MOBILE APP DEVELOPMENT (2 DISTINCT BUILDERS) ---
  {
    id: "talent-app-1",
    studentId: "Student S13 • B.Tech CSE (Flutter) 3rd Yr",
    title: "Cross-Platform Flutter Apps & Hackathon MVPs",
    category: "Mobile App Development (Android / iOS)",
    description: "Smooth, native-feeling Flutter apps for Android & iOS. Firebase backend, clean state management with Riverpod/Bloc, and ready-to-test APK builds.",
    recommendations: 17,
    startingPrice: 2499,
    priceUnit: "per MVP app (3-5 screens)",
    deliveryTime: "Delivers in 4 days",
    tools: ["Flutter", "Dart", "Firebase", "Android Studio"],
    freeChanges: "2 free changes + release APK",
    campusLocation: "Block 38 Innovation Wing",
    gearTag: "💻 Flutter + Android Studio",
    hostelTag: "📍 Hostel BH-2",
    juniorAssistantOpen: true,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Smart Mess Menu & Meal Rating Android App",
        context: "Commissioned for Campus Hostel Council • BH-4",
        chargedPrice: 3200,
        link: "https://github.com/sample-lpu/smart-mess-flutter",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
        note: "Flutter mobile app with daily dynamic mess schedule, push notifications, and offline Hive caching."
      },
      {
        title: "Hackathon Fitness Tracker & Step Counter MVP",
        context: "LPU Smart Campus Hackathon Top 5 Finalist",
        chargedPrice: 2499,
        link: "https://github.com/sample-lpu/step-tracker-app",
        image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80",
        note: "Pedometer hardware sensor integration with animated progress rings and Firebase leaderboard."
      }
    ]
  },
  {
    id: "talent-app-2",
    studentId: "Student S14 • B.Tech CSE (Native Android) 4th Yr",
    title: "Native Android Apps (Kotlin) & Capstone Systems",
    category: "Mobile App Development (Android / iOS)",
    description: "High-performance native Android apps built with Modern Android Architecture (Jetpack Compose, MVVM, Room DB, Retrofit). Complete code hand-over.",
    recommendations: 21,
    startingPrice: 3499,
    priceUnit: "full capstone Android app",
    deliveryTime: "Delivers in 5 days",
    tools: ["Kotlin", "Jetpack Compose", "Room DB", "Retrofit"],
    freeChanges: "2 free changes + signed APK",
    campusLocation: "Central Library Tech Pod 2",
    gearTag: "💻 Kotlin + Jetpack Compose",
    hostelTag: "📍 Block 38",
    juniorAssistantOpen: true,
    slots: 1,
    totalSlots: 1,
    isPaused: false,
    samples: [
      {
        title: "Campus Attendance Predictor & Timetable App",
        context: "Senior B.Tech CSE Major Project • Block 34",
        chargedPrice: 3800,
        link: "https://github.com/sample-lpu/lpu-attendance-companion",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
        note: "Jetpack Compose app with bunk calculator, automatic timetable notifications, and biometric app lock."
      },
      {
        title: "Bluetooth BLE Indoor Navigation Prototype App",
        context: "Research Paper Prototype • Block 38 Robotics Lab",
        chargedPrice: 4500,
        link: "https://github.com/sample-lpu/indoor-ble-navigator",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        note: "BLE beacon signal triangulation for indoor corridor guidance with custom vector floor maps."
      }
    ]
  },

  // --- 3. UI/UX DESIGN & FIGMA PROTOTYPES (2 DISTINCT DESIGNERS) ---
  {
    id: "talent-uiux-1",
    studentId: "Student S15 • B.Des User Experience 3rd Yr",
    title: "Figma App UI/UX & Interactive Clickable Prototypes",
    category: "UI/UX Design & Figma Prototypes",
    description: "Complete user journeys, mobile screen designs (iOS/Android), and interactive prototypes in Figma. Delivered with reusable auto-layout design systems.",
    recommendations: 18,
    startingPrice: 799,
    priceUnit: "for 5-8 app screens",
    deliveryTime: "Delivers in 2 days",
    tools: ["Figma", "Auto-Layout", "Design Systems", "FigJam"],
    freeChanges: "2 free changes + Figma file",
    campusLocation: "Block 28 Design Labs",
    gearTag: "💻 Figma + FigJam",
    hostelTag: "📍 Hostel GH-2",
    juniorAssistantOpen: true,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Campus Food Delivery App (10-Screen Figma Prototype)",
        context: "Built for UniMall Late-Night Delivery Startup",
        chargedPrice: 950,
        link: "https://figma.com/@sample-lpu/campus-bites-uiux",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
        note: "10-screen high-fidelity mobile prototype with micro-interactions, cart bottom sheets, and live order tracking."
      },
      {
        title: "Peer Tutor Booking Flow & Student Dashboard UI",
        context: "Design Thinking Project P25 Submission",
        chargedPrice: 850,
        link: "https://figma.com/@sample-lpu/peer-study-dashboard",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        note: "Responsive desktop + mobile UI kit with interactive calendar slot selector and filter components."
      }
    ]
  },
  {
    id: "talent-uiux-2",
    studentId: "Student S16 • B.Des Product Design 4th Yr",
    title: "SaaS Dashboards, Design Systems & Wireframing",
    category: "UI/UX Design & Figma Prototypes",
    description: "Full web app wireframes, dashboard UI kits, and cohesive design tokens (typography, color ramps, component library) ready for frontend handoff.",
    recommendations: 14,
    startingPrice: 1199,
    priceUnit: "full dashboard / 12 screens",
    deliveryTime: "Delivers in 3 days",
    tools: ["Figma", "Design Tokens", "Wireframing", "Notion"],
    freeChanges: "2 free changes + token export",
    campusLocation: "Block 28 Media Complex",
    gearTag: "💻 Figma + Design Tokens",
    hostelTag: "📍 Block 28",
    juniorAssistantOpen: false,
    slots: 1,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "E-Cell Investor Pitch Deck & Web Platform Mockups",
        context: "E-Cell Incubated Student Venture • Block 30",
        chargedPrice: 1400,
        link: "https://figma.com/@sample-lpu/ecell-incubator-ui",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80",
        note: "Comprehensive 14-screen responsive web app UI with analytics graphs, KPI cards, and exportable SVG assets."
      },
      {
        title: "Club Executive Admin Panel & Member Roster UI",
        context: "Student Welfare Council Management Suite",
        chargedPrice: 1200,
        link: "https://figma.com/@sample-lpu/swc-admin-dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        note: "Data-dense data-table interface with batch actions, modal approvals, and role permissions."
      }
    ]
  },

  // --- 4. POSTER & CANVA DESIGN ---
  {
    id: "talent-1",
    studentId: "Student S1 • B.Tech CSE 2nd Yr",
    title: "Instagram Stories & Club Event Posters",
    category: "Poster & Canva Design",
    description: "I design clean, high-impact Canva & Figma posters for campus events, hackathons, and club stories. Delivered in print-ready A3 and 1080x1920 formats.",
    recommendations: 14,
    startingPrice: 99,
    priceUnit: "per poster",
    deliveryTime: "Delivers in 1 day",
    tools: ["Canva", "Figma", "Photoshop"],
    freeChanges: "2 free changes included",
    campusLocation: "Block 34 / Central Library",
    gearTag: "📱 Mobile + Canva Pro",
    hostelTag: "📍 Block 34",
    juniorAssistantOpen: false,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Spectra Dance Club Audition Story",
        context: "Client: Spectra Dance Society • UniMall Pods",
        chargedPrice: 99,
        link: "https://drive.google.com/drive/folders/sample-spectra-poster",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
        note: "High-contrast 1080x1920 Instagram story creative with animated stickers and QR code."
      },
      {
        title: "OneIndia Cultural Fest A3 Banner",
        context: "Commissioned by Cultural Society • UniMall Block",
        chargedPrice: 199,
        link: "https://behance.net/gallery/sample-oneindia-poster",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        note: "Fest print banner featuring custom geometric patterns, campus landmarks, and sponsor lockups."
      }
    ]
  },
  {
    id: "talent-1b",
    studentId: "Student S8 • B.Des Graphic Design 3rd Yr",
    title: "High-Impact Fest Posters & Grid Creatives",
    category: "Poster & Canva Design",
    description: "Cyberpunk, editorial, and vector posters made in Figma and Illustrator. Perfect for flagship club hackathons and multi-post Instagram grids.",
    recommendations: 9,
    startingPrice: 149,
    priceUnit: "per creative kit",
    deliveryTime: "Delivers in 1 day",
    tools: ["Figma", "Illustrator", "Photoshop"],
    freeChanges: "2 free changes included",
    campusLocation: "Block 28 Design Studio",
    gearTag: "💻 Figma + Illustrator",
    hostelTag: "📍 Hostel BH-1",
    juniorAssistantOpen: true,
    slots: 1,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "LPU Hackathon 2026 Promo Banner",
        context: "Made for Block 34 Tech Corridor",
        chargedPrice: 199,
        link: "https://behance.net/gallery/sample-hackathon-banner",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80",
        note: "Tech theme created in Figma with custom badges, timeline, and prize pool graphic."
      },
      {
        title: "RoboRace Tech Talk Instagram Carousel (3 slides)",
        context: "IEEE Student Branch • Block 38",
        chargedPrice: 249,
        link: "https://instagram.com/sample-lpu-carousel",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        note: "Seamless 3-slide panoramic carousel for guest lecture speaker intro."
      }
    ]
  },

  // --- 5. VIDEO & REEL EDITING ---
  {
    id: "talent-2",
    studentId: "Student S2 • B.Sc Multimedia 3rd Yr",
    title: "30–60s Fast Reel & Beat-Sync Video Edit",
    category: "Video & Reel Editing",
    description: "Fast-paced, beat-synced reels with subtitles, sound effects, and clean color grading for club inductions, fests, or personal pages.",
    recommendations: 16,
    startingPrice: 249,
    priceUnit: "per 30–60s reel",
    deliveryTime: "Delivers in 1 day",
    tools: ["Premiere Pro", "CapCut", "VN"],
    freeChanges: "2 free changes included",
    campusLocation: "UniMall Media Pods",
    gearTag: "📱 Mobile-Only Creator",
    hostelTag: "📍 Hostel BH-3",
    juniorAssistantOpen: false,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Spectra Dance Auditions Hype Reel",
        context: "Made for Spectra Dance Club • UniMall Media Pods",
        chargedPrice: 249,
        link: "https://youtube.com/shorts/sample-spectra-reel",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
        note: "Beat-synced 9:16 vertical edit with animated kinetic subtitles, sound effects, and color grade."
      },
      {
        title: "UniMall Freshers Week 45s Recap Video",
        context: "Client: Student Welfare Council • Block 30",
        chargedPrice: 349,
        link: "https://drive.google.com/file/d/sample-freshers-aftermovie",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80",
        note: "45-second energetic festival recap reel edited in Premiere Pro with custom speed ramps."
      }
    ]
  },
  {
    id: "talent-7",
    studentId: "Student S7 • B.Des Film & TV 4th Yr",
    title: "Cinematic Fest Teasers & Audio-Visual Cuts",
    category: "Video & Reel Editing",
    description: "Festival aftermovies, speaker intro sequences, and cinematic teaser cuts with custom 3D typography and sound design.",
    recommendations: 11,
    startingPrice: 399,
    priceUnit: "per teaser",
    deliveryTime: "Delivers in 2 days",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
    freeChanges: "2 free changes + 4K render",
    campusLocation: "Block 28 Media Complex",
    gearTag: "💻 DaVinci + After Effects",
    hostelTag: "📍 Block 28",
    juniorAssistantOpen: true,
    slots: 1,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "DSW YouthFest 45s Teaser Reel",
        context: "Commissioned by DSW Cultural Wing • Shanti Devi Mittal Auditorium",
        chargedPrice: 399,
        link: "https://youtube.com/shorts/sample-youthfest-teaser",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
        note: "Cinematic 4K grading, bass-boosted sound design, and custom 3D title tracking."
      },
      {
        title: "RoboRace Tech Talk Promo Edit",
        context: "Client: IEEE Student Branch LPU",
        chargedPrice: 499,
        link: "https://drive.google.com/file/d/sample-roborace-promo",
        image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=600&q=80",
        note: "Fast-paced tech cut with glitch transitions and animated speaker lower-thirds."
      }
    ]
  },

  // --- 6. PPT & ASSIGNMENT FORMATTING ---
  {
    id: "talent-4",
    studentId: "Student S4 • B.Des User Experience 2nd Yr",
    title: "Clean CA Presentation & Viva Slide Decks",
    category: "PPT & Assignment Formatting",
    description: "Turn messy text bullets into sleek, executive presentation slides with clean charts, icons, and modern layouts for major projects or club pitches.",
    recommendations: 11,
    startingPrice: 149,
    priceUnit: "for 10 slides",
    deliveryTime: "Delivers in 1 day",
    tools: ["PowerPoint", "Google Slides", "Canva"],
    freeChanges: "2 free changes included",
    campusLocation: "Block 28 Design Studio",
    gearTag: "💻 PowerPoint + Canva",
    hostelTag: "📍 Hostel GH-1",
    juniorAssistantOpen: false,
    slots: 1,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Mechanical Capstone Viva Slides (12 slides)",
        context: "Commissioned by ME Final Year Group • Block 34",
        chargedPrice: 199,
        link: "https://drive.google.com/file/d/sample-capstone-project-deck",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
        note: "Redesigned 25 messy academic slides into clean, visual diagrams and charts for viva."
      },
      {
        title: "E-Cell Campus Startup Pitch Deck (15 slides)",
        context: "Client: E-Cell Student Startup • Block 30",
        chargedPrice: 249,
        link: "https://slides.google.com/sample-lpu-pitch-deck",
        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=600&q=80",
        note: "15-slide investor deck featuring custom financial graphics, market sizing, and mockups."
      }
    ]
  },
  {
    id: "talent-4b",
    studentId: "Student S9 • BBA 3rd Yr",
    title: "Assignment Formatting & Professional Slide Polish",
    category: "PPT & Assignment Formatting",
    description: "Fast turnaround formatting for college assignments, CA case studies, and presentation slides. Clean headers, typography, and citation styles.",
    recommendations: 7,
    startingPrice: 199,
    priceUnit: "up to 15 slides",
    deliveryTime: "Same day delivery",
    tools: ["MS PowerPoint", "Canva", "Google Docs"],
    freeChanges: "2 free changes included",
    campusLocation: "Central Library Pods",
    gearTag: "💻 MS Office + Canva",
    hostelTag: "📍 Block 14",
    juniorAssistantOpen: false,
    slots: 2,
    totalSlots: 2,
    isPaused: false,
    samples: [
      {
        title: "Marketing Management CA-2 Case Study Deck",
        context: "Prepared for MBA/BBA CA Submission • Block 14",
        chargedPrice: 199,
        link: "https://drive.google.com/file/d/sample-ca2-slides",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        note: "14 polished slides with SWOT analysis matrix, competitor benchmarking, and speaker notes."
      },
      {
        title: "Environmental Studies Seminar Deck",
        context: "Peer Presentation • Block 34",
        chargedPrice: 149,
        link: "https://drive.google.com/file/d/sample-seminar-deck",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
        note: "10-slide eco-themed presentation with infographic icons and reference slides."
      }
    ]
  },

  // --- 7. RESUME & LINKEDIN POLISH ---
  {
    id: "talent-8",
    studentId: "Student S10 • B.Tech CSE (Tier-1 Placed)",
    title: "ATS Resume Polish & LinkedIn Profile Revamp",
    category: "Resume & LinkedIn Help",
    description: "Peer review of your CV by an already placed 4th-year senior. Overleaf LaTeX or Canva formatting optimized to pass company ATS filters.",
    recommendations: 15,
    startingPrice: 149,
    priceUnit: "per resume review",
    deliveryTime: "Delivers in 1 day",
    tools: ["Overleaf LaTeX", "Canva", "Google Docs"],
    freeChanges: "2 free revisions included",
    campusLocation: "Block 34 Hub",
    gearTag: "💻 Overleaf LaTeX + Docs",
    hostelTag: "📍 Hostel BH-4",
    juniorAssistantOpen: true,
    slots: 3,
    totalSlots: 3,
    isPaused: false,
    samples: [
      {
        title: "Software Engineer Fresher ATS Resume Template",
        context: "Used for Tier-1 Campus Placement Shortlists",
        chargedPrice: 149,
        link: "https://drive.google.com/file/d/sample-ats-resume",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
        note: "Clean 1-page LaTeX template formatted with Harvard style action verbs and metric bullets."
      },
      {
        title: "LinkedIn Headline & About Section Makeover",
        context: "Campus Placement Prep Cohort • Block 34",
        chargedPrice: 199,
        link: "https://linkedin.com/in/sample-student-profile",
        image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80",
        note: "Keyword-optimized summary, experience bullet restructuring, and featured projects layout."
      }
    ]
  },

  // --- 8. EVENT PHOTOGRAPHY ---
  {
    id: "talent-5",
    studentId: "Student S5 • B.Tech ECE 4th Yr",
    title: "Campus Event Coverage & Clean Portrait Shoots",
    category: "Event Photography",
    description: "On-campus event shoot or LinkedIn portraits. I bring high-speed mirrorless gear and share 35+ color-corrected, high-res photos via Google Drive.",
    recommendations: 12,
    startingPrice: 299,
    priceUnit: "for 1 hour shoot",
    deliveryTime: "Delivers in 2 days",
    tools: ["Sony Alpha", "Lightroom"],
    freeChanges: "Curated grading + drive link",
    campusLocation: "Baldev Raj Mittal Unipolis",
    gearTag: "📷 DSLR + Gimbal",
    hostelTag: "📍 Block 30 / Unipolis",
    juniorAssistantOpen: true,
    slots: 2,
    totalSlots: 3,
    isPaused: false,
    samples: [
      {
        title: "Baldev Raj Mittal Unipolis Cricket Finals",
        context: "Covered for Sports Committee • Ground 2",
        chargedPrice: 399,
        link: "https://drive.google.com/drive/folders/sample-lpu-sports-photos",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        note: "High-speed action shutter coverage of inter-department cricket and athletics finals."
      },
      {
        title: "Graduation Golden Hour Headshots Album",
        context: "Private Shoots • Baldev Raj Lawns",
        chargedPrice: 299,
        link: "https://adobe.ly/sample-lpu-graduation-portraits",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        note: "Natural golden hour campus portraits taken with Sony Alpha 85mm f/1.8 lens."
      }
    ]
  }
];

// Tab 2: Student Needs (Students & Clubs Looking for Help - with Urgent 24-Hr & Skill Barter support)
export const INITIAL_NEEDS = [
  {
    id: "need-tech-1",
    postedBy: "Club Coordinator C2 • Robotics Club",
    title: "Need responsive club website with Google Sheets RSVP for Hackathon",
    category: "Website Building & Full-Stack Dev",
    description: "Looking for a student full-stack web developer to build a modern landing page with live countdown, team registration forms that save to Google Sheets, and Vercel hosting.",
    deadline: "Needed in 24 Hours",
    isUrgent: true,
    paymentType: "cash",
    budget: 1800,
    campusLocation: "Block 38 Tech Hub",
    neededCount: 1,
    filledCount: 0
  },
  {
    id: "need-tech-2",
    postedBy: "Hostel Committee BH-4 • Lead",
    title: "Need Flutter MVP app for hostel mess meal rating (3 screens)",
    category: "Mobile App Development (Android / iOS)",
    description: "Need a skilled Flutter mobile developer to create a simple Android app for hostel residents to view daily mess menus and submit meal feedback to Firebase.",
    deadline: "Needed in 5 Days",
    isUrgent: false,
    paymentType: "cash",
    budget: 3000,
    campusLocation: "Hostel BH-4 Council",
    neededCount: 1,
    filledCount: 0
  },
  {
    id: "need-tech-3",
    postedBy: "Student S17 • UniMall Startup Lead",
    title: "Need 8-screen Figma UI prototype for campus food delivery startup",
    category: "UI/UX Design & Figma Prototypes",
    description: "Looking for a UI/UX designer to build an interactive clickable prototype in Figma with bottom cart sheets, order tracking, and restaurant cards.",
    deadline: "Needed in 2 Days",
    isUrgent: false,
    paymentType: "cash",
    budget: 950,
    campusLocation: "Block 28 Design Studio",
    neededCount: 1,
    filledCount: 0
  },
  {
    id: "need-1",
    postedBy: "Club Lead C1 • Cultural Society",
    title: "Need urgent 45s teaser reel for Spectra auditions",
    category: "Video & Reel Editing",
    description: "We have raw audition clips from yesterday. Need a hype 45s vertical reel with trending audio and bold text captions to post on our club Instagram by tonight.",
    deadline: "Urgent • Tonight 10 PM",
    isUrgent: true,
    paymentType: "barter",
    budget: 0,
    barterOffer: "Will build your portfolio website in exchange for this 45s pitch/audition reel",
    campusLocation: "UniMall Student Center",
    neededCount: 1,
    filledCount: 0
  },
  {
    id: "need-2",
    postedBy: "Student S7 • B.Tech ME 4th Yr",
    title: "Need clean PPT presentation for Major Project Viva (12 slides)",
    category: "PPT & Assignment Formatting",
    description: "Our capstone project viva is tomorrow morning. Have 20 pages of thesis content; need someone skilled to design 12 crisp slides with workflow charts.",
    deadline: "Urgent • Tomorrow 9 AM",
    isUrgent: true,
    paymentType: "cash",
    budget: 249,
    campusLocation: "Hostel BH-2 / Block 34",
    neededCount: 2,
    filledCount: 1
  },
  {
    id: "need-4",
    postedBy: "Student S11 • B.Tech ECE 4th Yr",
    title: "Need 1-page ATS resume review before campus placements",
    category: "Resume & LinkedIn Help",
    description: "Looking for an experienced senior to review my resume bullets and format it in clean LaTeX/Canva before the upcoming placement drive.",
    deadline: "Needed in 2 Days",
    isUrgent: false,
    paymentType: "barter",
    budget: 0,
    barterOffer: "Will shoot 1-hr DSLR LinkedIn portraits for you in exchange for ATS resume polish",
    campusLocation: "Block 34 Hub",
    neededCount: 1,
    filledCount: 0
  },
  {
    id: "need-6",
    postedBy: "Student S9 • Coding Club Coordinator",
    title: "Need 2 Instagram event posters for upcoming coding workshop",
    category: "Poster & Canva Design",
    description: "Need 2 matching social media poster designs (announcement banner and speaker timetable). We will provide text and official logos.",
    deadline: "Needed by Saturday",
    isUrgent: false,
    paymentType: "cash",
    budget: 199,
    campusLocation: "Block 38 Tech Hub",
    neededCount: 2,
    filledCount: 0
  }
];

// Pre-seeded active deals with CP4 4-Step Tracker
export const INITIAL_DEALS = [
  {
    id: "deal-1",
    dealCode: "DEAL-LPU-1024",
    sourceId: "talent-web-1",
    sourceType: "talent",
    title: "Full-Stack Club Websites & Fast React Portals",
    withPerson: "Student S3 • B.Tech CSE (Full-Stack) 3rd Yr",
    category: "Website Building & Full-Stack Dev",
    paymentType: "cash",
    price: 1800,
    deadline: "In 3 days",
    paymentTerm: "50% advance (₹900), 50% on completion",
    freeChanges: "Max 2 Free Revisions",
    trackerStep: 2, // 1: Brief Accepted, 2: Watermarked Draft Shared, 3: Revisions (Max 2), 4: Completed & Verified Badge Issued
    status: "in-progress",
    hasRecommended: false,
    notes: "Robotics Club hackathon schedule and Sheets RSVP integration.",
    createdAt: "Today, 11:30 AM"
  }
];
