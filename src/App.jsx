import React, { useState, useMemo } from 'react';
import { MotionConfig } from 'framer-motion';
import BlueprintCanvas from './components/BlueprintCanvas';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TalentCard from './components/TalentCard';
import NeedCard from './components/NeedCard';
import ConfirmDealModal from './components/ConfirmDealModal';
import OfferSkillModal from './components/OfferSkillModal';
import PostNeedModal from './components/PostNeedModal';
import RateGuideView from './components/RateGuideView';
import MyDealsView from './components/MyDealsView';
import AccountView from './components/AccountView';
import AuthPage from './components/AuthPage';
import SmartMatchModal from './components/SmartMatchModal';
import SampleWorkModal from './components/SampleWorkModal';
import ServiceCategoryCard from './components/ServiceCategoryCard';
import CategoryDetailView from './components/CategoryDetailView';
import Toast from './components/Toast';
import { INITIAL_TALENT, INITIAL_NEEDS, INITIAL_DEALS, SERVICE_CATEGORIES } from './data/initialData';
import { RotateCcw } from 'lucide-react';

export default function App() {
  // Main view router: 'app' (Marketplace) | 'auth' (Full-screen dedicated Login/Signup)
  const [viewMode, setViewMode] = useState('app');
  
  // Navigation tabs inside app: 'talent' | 'needs' | 'ratecard' | 'deals' | 'account'
  const [activeTab, setActiveTab] = useState('talent');

  // Selected Service Category for dedicated detail page (null = Category Cards grid view)
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [authBannerMessage, setAuthBannerMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  // Data states
  const [talentList, setTalentList] = useState(INITIAL_TALENT);
  const [needsList, setNeedsList] = useState(INITIAL_NEEDS);
  const [dealsList, setDealsList] = useState(INITIAL_DEALS);

  // Search, Category & Urgent / Exam Mode filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [urgentNeedsOnly, setUrgentNeedsOnly] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Modals state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isNeedModalOpen, setIsNeedModalOpen] = useState(false);
  const [dealModalState, setDealModalState] = useState({
    isOpen: false,
    item: null,
    itemType: 'talent' // 'talent' | 'need'
  });

  // Instant Smart Match Suggestions Modal state
  const [smartMatchState, setSmartMatchState] = useState({
    isOpen: false,
    matchType: 'need-to-talent', // 'need-to-talent' | 'talent-to-need'
    sourceItem: null
  });

  // Past Work / Sample Work Showcase Modal state
  const [sampleWorkModalState, setSampleWorkModalState] = useState({
    isOpen: false,
    talent: null
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  // Campus Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      message: 'New urgent reel request matches your Video Editing skill.',
      time: '12 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      message: 'Deal DEAL-LPU-1024 moved to Watermarked Draft stage.',
      time: '1 hr ago',
      read: false
    },
    {
      id: 'notif-3',
      message: '1st-year student applied to shadow your next campus project.',
      time: 'Yesterday',
      read: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  // Strict Auth Gate: Redirects to full-page Login/Sign Up if logged out
  const requireAuth = (actionCallback, reason = "Please login with your LPU Registration Number to offer or hire services.") => {
    if (currentUser) {
      actionCallback();
    } else {
      setAuthBannerMessage(reason);
      setPendingAction(() => actionCallback);
      setViewMode('auth');
    }
  };

  const handleLoginSuccess = (verifiedUser) => {
    setCurrentUser(verifiedUser);
    setViewMode('app');
    setAuthBannerMessage("");
    showToast(
      '✓ LPU Verified Login',
      `Welcome, ${verifiedUser.fullName}! Reg: ${verifiedUser.regNo}`,
      'success'
    );

    // If an action was pending, run it immediately!
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewMode('auth');
    setActiveTab('talent');
    setAuthBannerMessage("You have been logged out. Sign in anytime to access your campus account.");
    showToast('Logged Out', 'Signed out of your campus account.', 'info');
  };

  // Filtered talent
  const filteredTalent = useMemo(() => {
    return talentList.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesId = item.studentId.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesId && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [talentList, selectedCategory, searchQuery]);

  // Filtered needs
  const filteredNeeds = useMemo(() => {
    return needsList.filter((item) => {
      if (urgentNeedsOnly && !item.isUrgent) {
        return false;
      }
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesPoster = item.postedBy.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesPoster && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [needsList, selectedCategory, searchQuery, urgentNeedsOnly]);

  // Strict Auth Protected Action Handlers
  const handleHireTalent = (talent) => {
    requireAuth(() => {
      setDealModalState({
        isOpen: true,
        item: talent,
        itemType: 'talent'
      });
    }, `Please login with your LPU Registration Number to hire ${talent.studentId}.`);
  };

  const handleICanDoThis = (need) => {
    requireAuth(() => {
      setDealModalState({
        isOpen: true,
        item: need,
        itemType: 'need'
      });
    }, `Please login with your LPU Registration Number to accept this requirement.`);
  };

  const handleOpenOfferModal = () => {
    requireAuth(() => {
      setIsOfferModalOpen(true);
    }, "Please login with your LPU Registration Number to list your skills.");
  };

  const handleOpenNeedModal = () => {
    requireAuth(() => {
      setIsNeedModalOpen(true);
    }, "Please login with your LPU Registration Number to post an open need.");
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'talent') {
      setSelectedServiceCategory(null);
      setActiveTab('talent');
    } else if (tabId === 'deals') {
      requireAuth(() => {
        setActiveTab('deals');
      }, "Please login with your LPU Registration Number to view your active deals.");
    } else {
      setActiveTab(tabId);
    }
  };

  const handleConfirmDeal = (newDeal) => {
    setDealsList((prev) => [newDeal, ...prev]);

    // Automatic stock deduction
    if (newDeal.sourceType === 'talent' && newDeal.sourceId) {
      setTalentList((prev) =>
        prev.map((t) => {
          if (t.id === newDeal.sourceId) {
            const nextSlots = Math.max(0, (t.slots || 1) - 1);
            return { ...t, slots: nextSlots };
          }
          return t;
        })
      );
    } else if (newDeal.sourceType === 'need' && newDeal.sourceId) {
      setNeedsList((prev) =>
        prev.map((n) => {
          if (n.id === newDeal.sourceId) {
            const nextFilled = (n.filledCount || 0) + 1;
            return { ...n, filledCount: nextFilled };
          }
          return n;
        })
      );
    }

    showToast(
      'Deal Confirmed & Slot Reserved',
      `Agreement for "${newDeal.title}" is saved in My Deals. 1 slot reserved.`,
      'success'
    );
  };

  const handleAddTalent = (newTalent) => {
    setTalentList((prev) => [newTalent, ...prev]);
    setActiveTab('talent');
    showToast(
      'Skill Listed Live!',
      `"${newTalent.title}" is now visible to students looking for help.`,
      'success'
    );
    // Instant Reverse Smart Match: Show students currently looking for this skill!
    setSmartMatchState({
      isOpen: true,
      matchType: 'talent-to-need',
      sourceItem: newTalent
    });
  };

  const handleAddNeed = (newNeed) => {
    setNeedsList((prev) => [newNeed, ...prev]);
    setActiveTab('needs');
    showToast(
      'Requirement Posted!',
      `Your need "${newNeed.title}" is now live for campus students to see.`,
      'success'
    );
    // Instant Smart Match: Immediately suggest best matching available students!
    setSmartMatchState({
      isOpen: true,
      matchType: 'need-to-talent',
      sourceItem: newNeed
    });
  };

  // Clickable Live Match Badge Handler for Need cards
  const handleOpenNeedMatches = (need) => {
    setSmartMatchState({
      isOpen: true,
      matchType: 'need-to-talent',
      sourceItem: need
    });
  };

  // Open Sample Work / Portfolio Showcase Modal
  const handleViewSamples = (talent) => {
    setSampleWorkModalState({
      isOpen: true,
      talent
    });
  };

  const handleToggleDealStatus = (dealId) => {
    const targetDeal = dealsList.find((d) => d.id === dealId);
    if (!targetDeal) return;

    const nextStatus = targetDeal.status === 'completed' ? 'in-progress' : 'completed';

    // Automatic restock / re-deduct loop
    if (targetDeal.sourceType === 'talent' && targetDeal.sourceId) {
      setTalentList((prev) =>
        prev.map((t) => {
          if (t.id === targetDeal.sourceId) {
            const nextSlots = nextStatus === 'completed'
              ? Math.min((t.totalSlots || 3), (t.slots || 0) + 1)
              : Math.max(0, (t.slots || 0) - 1);
            return { ...t, slots: nextSlots };
          }
          return t;
        })
      );
    } else if (targetDeal.sourceType === 'need' && targetDeal.sourceId) {
      setNeedsList((prev) =>
        prev.map((n) => {
          if (n.id === targetDeal.sourceId) {
            const nextFilled = nextStatus === 'completed'
              ? Math.max(0, (n.filledCount || 1) - 1)
              : (n.filledCount || 0) + 1;
            return { ...n, filledCount: nextFilled };
          }
          return n;
        })
      );
    }

    setDealsList((prev) =>
      prev.map((deal) => (deal.id === dealId ? { ...deal, status: nextStatus } : deal))
    );

    showToast(
      nextStatus === 'completed' ? 'Task Completed & Slot Restocked!' : 'Task Reopened',
      nextStatus === 'completed'
        ? 'Great job! +1 slot has been automatically restored to the student listing, and you can now recommend your peer.'
        : 'Deal status switched back to In Progress.',
      'info'
    );
  };

  // 1-Click Re-open Slot action for completed deals
  const handleReopenSlot = (deal) => {
    if (deal.sourceType === 'talent' && deal.sourceId) {
      setTalentList((prev) =>
        prev.map((t) => {
          if (t.id === deal.sourceId) {
            const nextSlots = (t.slots || 0) + 1;
            const nextTotal = Math.max(nextSlots, t.totalSlots || nextSlots);
            return { ...t, slots: nextSlots, totalSlots: nextTotal, isPaused: false };
          }
          return t;
        })
      );
      showToast(
        '✓ Slot Re-opened!',
        `+1 availability slot restored to "${deal.title}". Live on Find Talent board.`,
        'success'
      );
    } else if (deal.sourceType === 'need' && deal.sourceId) {
      setNeedsList((prev) =>
        prev.map((n) => {
          if (n.id === deal.sourceId) {
            return { ...n, filledCount: Math.max(0, (n.filledCount || 1) - 1) };
          }
          return n;
        })
      );
      showToast(
        '✓ Spot Re-opened!',
        `Need "${deal.title}" now has an open spot on Student Needs.`,
        'success'
      );
    } else {
      showToast('Slot Restocked', 'Availability updated on campus board.', 'info');
    }
  };

  // Manual Availability Control from "My Account"
  const handleUpdateTalentSlots = (talentId, delta) => {
    setTalentList((prev) =>
      prev.map((t) => {
        if (t.id === talentId) {
          const currentSlots = t.slots || 0;
          const nextSlots = Math.max(0, Math.min(5, currentSlots + delta));
          const nextTotal = Math.max(nextSlots, t.totalSlots || nextSlots);
          showToast(
            'Live Slots Updated',
            `"${t.title}" now has ${nextSlots} active booking slot(s).`,
            'info'
          );
          return { ...t, slots: nextSlots, totalSlots: nextTotal };
        }
        return t;
      })
    );
  };

  const handleToggleTalentPause = (talentId) => {
    setTalentList((prev) =>
      prev.map((t) => {
        if (t.id === talentId) {
          const nextPaused = !t.isPaused;
          showToast(
            nextPaused ? 'Listing Paused (Busy / Exam Mode)' : 'Listing Active & Available',
            nextPaused
              ? `"${t.title}" is paused. It won't accept new bookings until unpaused.`
              : `"${t.title}" is now open and accepting bookings on campus.`,
            'info'
          );
          return { ...t, isPaused: nextPaused };
        }
        return t;
      })
    );
  };

  // 1-Click Exam Week / Busy Mode Toggle (Top Bar & My Account)
  const handleToggleExamMode = () => {
    requireAuth(() => {
      const nextExamMode = !examMode;
      setExamMode(nextExamMode);

      setTalentList((prev) =>
        prev.map((t) => {
          const isMine =
            t.studentId.includes(currentUser.regNo) ||
            t.studentId.includes(currentUser.maskedRegNo) ||
            t.studentId.includes(currentUser.fullName) ||
            (currentUser.regNo === '12304567' && t.id === 'talent-1');
          if (isMine) {
            return { ...t, isPaused: nextExamMode };
          }
          return t;
        })
      );

      showToast(
        nextExamMode ? 'Exam Mode Enabled' : 'Exam Mode Turned Off',
        nextExamMode
          ? 'Your listings are marked Busy (Exams) and hiring is paused.'
          : 'Welcome back! Your skill listings are active again.',
        nextExamMode ? 'info' : 'success'
      );
    }, 'Please login with your LPU Registration Number to toggle Exam Mode.');
  };

  // Update Profile & Settings in My Account and sync across user's listings
  const handleUpdateProfileSettings = (updates) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);

    setTalentList((prev) =>
      prev.map((t) => {
        const isMine =
          t.studentId.includes(currentUser.regNo) ||
          t.studentId.includes(currentUser.maskedRegNo) ||
          t.studentId.includes(currentUser.fullName) ||
          (currentUser.regNo === '12304567' && t.id === 'talent-1');
        if (isMine) {
          return {
            ...t,
            hostelTag: updates.hostelBlock ? `Hostel ${updates.hostelBlock}` : t.hostelTag,
            gearTag: updates.gearTag || t.gearTag,
            juniorAssistantOpen:
              updates.juniorShadowOpen !== undefined ? updates.juniorShadowOpen : t.juniorAssistantOpen
          };
        }
        return t;
      })
    );

    showToast('Profile Updated', 'Your campus profile settings are saved.', 'success');
  };

  // CP4 4-Step Deal Tracker Progression
  const handleAdvanceDealStep = (dealId, targetStep) => {
    const clampedStep = Math.max(1, Math.min(4, targetStep));
    const targetDeal = dealsList.find((d) => d.id === dealId);
    if (!targetDeal) return;

    const wasCompleted = (targetDeal.trackerStep || 1) === 4 || targetDeal.status === 'completed';
    const nowCompleted = clampedStep === 4;

    if (wasCompleted !== nowCompleted) {
      if (targetDeal.sourceType === 'talent' && targetDeal.sourceId) {
        setTalentList((prev) =>
          prev.map((t) => {
            if (t.id === targetDeal.sourceId) {
              const nextSlots = nowCompleted
                ? Math.min((t.totalSlots || 3), (t.slots || 0) + 1)
                : Math.max(0, (t.slots || 0) - 1);
              return { ...t, slots: nextSlots };
            }
            return t;
          })
        );
      } else if (targetDeal.sourceType === 'need' && targetDeal.sourceId) {
        setNeedsList((prev) =>
          prev.map((n) => {
            if (n.id === targetDeal.sourceId) {
              const nextFilled = nowCompleted
                ? Math.max(0, (n.filledCount || 1) - 1)
                : (n.filledCount || 0) + 1;
              return { ...n, filledCount: nextFilled };
            }
            return n;
          })
        );
      }
    }

    setDealsList((prev) =>
      prev.map((deal) =>
        deal.id === dealId
          ? { ...deal, trackerStep: clampedStep, status: nowCompleted ? 'completed' : 'in-progress' }
          : deal
      )
    );

    const stepMessages = {
      1: '1. Brief Locked with upfront terms.',
      2: '2. Watermarked Draft shared with client.',
      3: '3. Revision (1/2) in progress (Max 2 Free Revisions).',
      4: '4. Final Handover complete! Verified Completion Badge issued & +1 slot restocked.'
    };

    showToast(
      nowCompleted ? 'Final Handover Complete!' : `Deal Updated to Stage ${clampedStep}/4`,
      stepMessages[clampedStep],
      nowCompleted ? 'success' : 'info'
    );
  };

  // Apply as Junior Shadow / Assistant
  const handleApplyJuniorAssistant = (talent) => {
    requireAuth(() => {
      const seniorName = talent.studentId.split('•')[0].trim();
      showToast(
        '✨ Junior Assistant Request Sent!',
        `Applied to shadow ${seniorName} on "${talent.title}". They will message you on campus!`,
        'success'
      );
    }, `Please login with your LPU Registration Number to apply as a Junior Assistant for ${talent.studentId}.`);
  };

  const handleRecommendStudent = (dealId, personId) => {
    setDealsList((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, hasRecommended: true } : d))
    );

    setTalentList((prev) =>
      prev.map((t) => {
        if (t.studentId === personId || personId.includes(t.studentId.split(' ')[0])) {
          return { ...t, recommendations: t.recommendations + 1 };
        }
        return t;
      })
    );

    showToast(
      '★ Recommendation Added!',
      `Added +1 Recommendation to ${personId}. Updated live on Find Talent!`,
      'success'
    );
  };

  const activeDealsCount = dealsList.filter((d) => d.status === 'in-progress').length;

  // RENDER DEDICATED FULL-SCREEN LOGIN & SIGN UP PAGE
  if (viewMode === 'auth') {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onCancelToGuest={() => {
          setViewMode('app');
          setPendingAction(null);
          setAuthBannerMessage("");
        }}
        bannerMessage={authBannerMessage}
      />
    );
  }

  // RENDER MAIN APPLICATION MARKETPLACE
  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
      <div className="w-full min-h-screen overflow-x-hidden bg-[#F6F4EF] text-[#18181B] flex flex-col font-sans antialiased selection:bg-[#D95D39]/20 selection:text-[#18181B] relative">
        <BlueprintCanvas forceReduceMotion={reduceMotion} />
      
      {/* Top Navbar (Single Minimal Row) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenNeedModal={handleOpenNeedModal}
        onNavigateToAuth={() => {
          setAuthBannerMessage("");
          setViewMode('auth');
        }}
        currentUser={currentUser}
        dealsCount={activeDealsCount}
        examMode={examMode}
        onToggleExamMode={handleToggleExamMode}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main Body (Full-Bleed Fluid Container) */}
      <main className="relative z-10 flex-1 w-full max-w-none px-6 lg:px-12 py-8 sm:py-10">
        
        {/* Hero banner shown on "Student Needs" and Main Category directory view */}
        {(activeTab === 'needs' || (activeTab === 'talent' && !selectedServiceCategory)) && (
          <HeroBanner
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat !== "All") {
                const matched = SERVICE_CATEGORIES.find(
                  (s) => s.categoryKey.toLowerCase() === cat.toLowerCase() || s.name.toLowerCase().includes(cat.toLowerCase())
                );
                if (matched) setSelectedServiceCategory(matched);
              } else {
                setSelectedServiceCategory(null);
              }
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Tab 1: Find Talent — Restructured to Service Category Cards & Dedicated Detail Pages */}
        {activeTab === 'talent' && (
          selectedServiceCategory ? (
            /* Dedicated Full-Page Category View */
            <CategoryDetailView
              category={selectedServiceCategory}
              talentList={talentList}
              currentUser={currentUser}
              onBackToCategories={() => setSelectedServiceCategory(null)}
              onHireTalent={handleHireTalent}
              onOpenOfferModal={handleOpenOfferModal}
              onViewSamples={handleViewSamples}
              onApplyJuniorAssistant={handleApplyJuniorAssistant}
            />
          ) : searchQuery.trim() !== "" ? (
            /* Direct Search Results View when user types a search query */
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#18181B] tracking-tight">
                    Search Results for "{searchQuery}"
                  </h2>
                  <p className="text-xs sm:text-sm text-[#52525B] mt-0.5 font-medium">
                    Found {filteredTalent.length} student(s) matching your search query.
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono font-bold text-[#E05A47] hover:underline"
                >
                  ← Back to Categories
                </button>
              </div>

              {filteredTalent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTalent.map((talent) => (
                    <TalentCard
                      key={talent.id}
                      talent={talent}
                      onHireNow={handleHireTalent}
                      onViewSamples={handleViewSamples}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-12 text-center">
                  <p className="text-lg font-display font-bold text-[#18181B]">No student skills found</p>
                  <p className="text-xs text-[#52525B] mt-1 font-normal">Try searching for another skill or view all campus categories.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 inline-flex items-center text-xs font-mono font-bold text-[#E05A47] hover:underline"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Reset Search
                  </button>
                </div>
              )}
            </section>
          ) : (
            /* Main Service Category Cards Grid (Clean 2-Column Editorial Layout) */
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EBEBEB]">
                <div>
                  <h2 className="text-xl font-semibold text-[#111111] tracking-tight">
                    Browse by Service
                  </h2>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Select a category to view available LPU students, rates, and sample work.
                  </p>
                </div>

                <button
                  onClick={handleOpenOfferModal}
                  className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] hover:shadow-[2px_2px_0px_#18181B] transition-all self-start"
                >
                  + Offer Skill
                </button>
              </div>

              {/* Responsive Service Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {SERVICE_CATEGORIES.map((sc) => {
                  const availableStudents = talentList.filter(
                    (t) => (t.category === sc.categoryKey || t.category === sc.name) && !t.isPaused && (t.slots || 0) > 0
                  );
                  const totalStudents = talentList.filter(
                    (t) => t.category === sc.categoryKey || t.category === sc.name
                  );
                  const minPrice = availableStudents.length > 0
                    ? Math.min(...availableStudents.map((t) => t.startingPrice))
                    : (totalStudents.length > 0 ? Math.min(...totalStudents.map((t) => t.startingPrice)) : (sc.startingPrice || 99));

                  return (
                    <ServiceCategoryCard
                      key={sc.id}
                      category={sc}
                      availableCount={availableStudents.length}
                      startingPrice={minPrice}
                      onSelectCategory={(cat) => setSelectedServiceCategory(cat)}
                    />
                  );
                })}
              </div>
            </section>
          )
        )}

        {/* Tab 2: Student Needs */}
        {activeTab === 'needs' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBEBEB]">
              <div>
                <h2 className="text-xl font-semibold text-[#111111] tracking-tight">
                  Student & Club Needs
                </h2>
                <p className="text-xs text-[#666666] mt-0.5">
                  Showing {filteredNeeds.length} active requirements.
                </p>
              </div>

              {/* Minimal Filter Toggle: All Needs vs Urgent 24-Hr */}
              <div className="flex items-center space-x-2 self-start sm:self-auto bg-white p-1 rounded-lg border border-[#EBEBEB]">
                <button
                  type="button"
                  onClick={() => setUrgentNeedsOnly(false)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    !urgentNeedsOnly
                      ? 'bg-[#111111] text-white font-medium'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  All ({needsList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setUrgentNeedsOnly(true)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    urgentNeedsOnly
                      ? 'bg-[#111111] text-white font-medium'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  Urgent 24-Hr
                </button>
              </div>
            </div>

            {filteredNeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredNeeds.map((need) => (
                  <NeedCard
                    key={need.id}
                    need={need}
                    onICanDoThis={handleICanDoThis}
                    onOpenMatches={handleOpenNeedMatches}
                    talentList={talentList}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#EBEBEB] p-12 text-center">
                <p className="text-base font-medium text-[#111111]">No campus needs found</p>
                <p className="text-sm text-[#666666] mt-1">Try clearing your search query or posting a requirement.</p>
                <button
                  onClick={handleOpenNeedModal}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#111111] text-white text-xs font-medium"
                >
                  + Post Need
                </button>
              </div>
            )}
          </section>
        )}

        {/* Tab 3: Fair Rate Guide */}
        {activeTab === 'ratecard' && (
          <RateGuideView
            onGoToTalent={() => setActiveTab('talent')}
          />
        )}

        {/* Tab 4: My Deals */}
        {activeTab === 'deals' && (
          <MyDealsView
            deals={dealsList}
            currentUser={currentUser}
            onAdvanceStep={handleAdvanceDealStep}
            onToggleStatus={handleToggleDealStatus}
            onReopenSlot={handleReopenSlot}
            onRecommendStudent={handleRecommendStudent}
            onGoToTalent={() => setActiveTab('talent')}
          />
        )}

        {/* Tab 5: My Account (Full Verified User Profile) */}
        {activeTab === 'account' && (
          <AccountView
            currentUser={currentUser}
            talentList={talentList}
            needsList={needsList}
            dealsList={dealsList}
            examMode={examMode}
            onToggleExamMode={handleToggleExamMode}
            onUpdateProfileSettings={handleUpdateProfileSettings}
            onLogout={handleLogout}
            onOpenOfferModal={handleOpenOfferModal}
            onOpenNeedModal={handleOpenNeedModal}
            onGoToDeals={() => setActiveTab('deals')}
            onHireTalent={handleHireTalent}
            onICanDoThis={handleICanDoThis}
            onUpdateTalentSlots={handleUpdateTalentSlots}
            onToggleTalentPause={handleToggleTalentPause}
            onOpenMatches={handleOpenNeedMatches}
            onViewSamples={handleViewSamples}
          />
        )}

      </main>

      {/* Past Work / Portfolio Showcase Modal */}
      <SampleWorkModal
        isOpen={sampleWorkModalState.isOpen}
        onClose={() => setSampleWorkModalState({ isOpen: false, talent: null })}
        talent={sampleWorkModalState.talent}
        onHireNow={handleHireTalent}
      />

      {/* Instant Smart Match Suggestions Modal */}
      <SmartMatchModal
        isOpen={smartMatchState.isOpen}
        onClose={() => setSmartMatchState({ isOpen: false, matchType: 'need-to-talent', sourceItem: null })}
        matchType={smartMatchState.matchType}
        sourceItem={smartMatchState.sourceItem}
        talentList={talentList}
        needsList={needsList}
        onHireTalent={handleHireTalent}
        onICanDoThis={handleICanDoThis}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Confirm Deal Modal (1-Step Deal Agreement with WhatsApp Copy) */}
      <ConfirmDealModal
        isOpen={dealModalState.isOpen}
        item={dealModalState.item}
        itemType={dealModalState.itemType}
        currentUser={currentUser}
        onClose={() => setDealModalState({ isOpen: false, item: null, itemType: 'talent' })}
        onConfirmDeal={handleConfirmDeal}
        onGoToDeals={() => setActiveTab('deals')}
      />

      {/* Modal: + Offer a Skill */}
      <OfferSkillModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        onAddTalent={handleAddTalent}
        currentUser={currentUser}
        onOpenRateGuide={() => {
          setIsOfferModalOpen(false);
          setActiveTab('ratecard');
        }}
      />

      {/* Modal: + Post a Need */}
      <PostNeedModal
        isOpen={isNeedModalOpen}
        onClose={() => setIsNeedModalOpen(false)}
        onAddNeed={handleAddNeed}
        currentUser={currentUser}
        onOpenRateGuide={() => {
          setIsNeedModalOpen(false);
          setActiveTab('ratecard');
        }}
      />

      {/* Global Toast */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Minimal Editorial Footer with Reduce Motion Toggle */}
      <footer className="relative z-10 w-full border-t border-[#18181B]/15 bg-white py-7 text-xs text-[#52525B] mt-16">
        <div className="w-full max-w-none px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#18181B]">Skills for Hire</span>
            <span>·</span>
            <span>Lovely Professional University</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button onClick={() => setActiveTab('talent')} className="hover:text-[#18181B] transition-colors">Explore</button>
            <button onClick={() => setActiveTab('needs')} className="hover:text-[#18181B] transition-colors">Student Needs</button>
            <button onClick={() => setActiveTab('ratecard')} className="hover:text-[#18181B] transition-colors">Fair Rate Guide</button>
            {currentUser ? (
              <button onClick={() => setActiveTab('account')} className="hover:text-[#18181B] transition-colors">My Account</button>
            ) : (
              <button onClick={() => setViewMode('auth')} className="hover:text-[#18181B] transition-colors">Student Login</button>
            )}
            <button
              type="button"
              onClick={() => setReduceMotion(!reduceMotion)}
              className="px-2.5 py-1 rounded-md border border-[#18181B]/25 text-[11px] font-mono text-[#52525B] hover:text-[#18181B] hover:border-[#18181B] transition-colors"
            >
              {reduceMotion ? 'Reduce Motion: ON' : 'Reduce Motion'}
            </button>
          </div>
        </div>
      </footer>

      </div>
    </MotionConfig>
  );
}
