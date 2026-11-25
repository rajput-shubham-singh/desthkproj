import React from 'react';
import { 
  X, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Star, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  AlertCircle,
  Users
} from 'lucide-react';

export default function SmartMatchModal({
  isOpen,
  onClose,
  matchType, // 'need-to-talent' | 'talent-to-need'
  sourceItem,
  talentList = [],
  needsList = [],
  onHireTalent,
  onICanDoThis,
  onNavigateTab
}) {
  if (!isOpen || !sourceItem) return null;

  const isNeedToTalent = matchType === 'need-to-talent';

  // 1. If user posted a Need -> match with available Talent (slots > 0 and not paused)
  let directMatches = [];
  let fallbackMatches = [];

  if (isNeedToTalent) {
    directMatches = talentList.filter(
      (t) =>
        t.category === sourceItem.category &&
        !t.isPaused &&
        (t.slots || 0) > 0
    );

    // Fallbacks if no direct category match with open slots
    if (directMatches.length === 0) {
      fallbackMatches = talentList
        .filter((t) => !t.isPaused && (t.slots || 0) > 0)
        .slice(0, 2);
    }
  } else {
    // 2. If user offered a Skill -> match with open Needs (spots open)
    directMatches = needsList.filter(
      (n) =>
        n.category === sourceItem.category &&
        (n.filledCount || 0) < (n.neededCount || 1)
    );

    // Fallbacks if no direct open need in that category
    if (directMatches.length === 0) {
      fallbackMatches = needsList
        .filter((n) => (n.filledCount || 0) < (n.neededCount || 1))
        .slice(0, 2);
    }
  }

  const hasMatches = directMatches.length > 0;
  const displayItems = hasMatches ? directMatches : fallbackMatches;

  const handleSelectTalent = (talent) => {
    onClose();
    if (onHireTalent) {
      onHireTalent(talent);
    }
  };

  const handleSelectNeed = (need) => {
    onClose();
    if (onICanDoThis) {
      onICanDoThis(need);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/45 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#18181B] hover:text-[#E05A47] p-1.5 rounded-lg border border-transparent hover:border-[#18181B] transition-all"
          title="Close Suggestions"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
            <span>Smart Match Suggestions</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B] leading-tight">
            {isNeedToTalent
              ? (hasMatches ? 'Best Student Matches on Campus' : 'Requirement Published Live!')
              : (hasMatches ? 'Students Looking for This Skill' : 'Skill Published Live!')}
          </h2>

          {/* Context Subtitle */}
          <div className="mt-1.5 text-xs font-mono text-[#52525B] flex flex-wrap items-center gap-1.5">
            <span>For your {isNeedToTalent ? 'posted need' : 'offered skill'}:</span>
            <span className="font-bold text-[#18181B] bg-[#F5F2EB] px-2 py-0.5 rounded border border-[#18181B]">
              "{sourceItem.title}"
            </span>
            <span className="text-[10px] text-[#71717A]">({sourceItem.category})</span>
          </div>
        </div>

        {/* Status Callout Banner */}
        {hasMatches ? (
          <div className="mb-5 p-3 rounded-xl bg-[#DCFCE7] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-between text-xs font-mono text-[#15803D]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>
                Found <strong>{directMatches.length}</strong> matching {isNeedToTalent ? 'available student(s)' : 'open student requirement(s)'} ready for you!
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline-block">
              1-Click Fast Connect
            </span>
          </div>
        ) : (
          <div className="mb-5 p-3.5 rounded-xl bg-[#FEF3C7] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs font-mono text-[#92400E] space-y-1">
            <div className="flex items-center space-x-2 font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#D97706]" />
              <span>No exact open slots right now in "{sourceItem.category}"</span>
            </div>
            <p className="text-[11px] text-[#78350F] pl-6 font-normal">
              Don't worry — your {isNeedToTalent ? 'need is posted live on the Student Needs board' : 'skill is live on Find Talent'} and other campus peers can view and accept it anytime!
            </p>
            <p className="text-[11px] font-bold text-[#92400E] pl-6 pt-1">
              In the meantime, check out these other active campus students:
            </p>
          </div>
        )}

        {/* Matches List */}
        <div className="space-y-3.5 mb-6">
          {isNeedToTalent ? (
            /* Render Matched Talent Cards */
            displayItems.map((talent) => (
              <div
                key={talent.id}
                className="bg-[#F5F2EB] rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1px] border-[#18181B]">
                      {talent.category}
                    </span>

                    {/* Live Slot Badge */}
                    <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1px] border-[#18181B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1 animate-pulse" />
                      {talent.slots} {talent.slots === 1 ? 'Slot' : 'Slots'} Left
                    </span>

                    <span className="inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white text-[#15803D] border-[1px] border-[#18181B]">
                      <Star className="w-2.5 h-2.5 mr-0.5 fill-[#15803D] stroke-none" />
                      ★ {talent.recommendations}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#18181B] leading-snug">
                    {talent.title}
                  </h3>

                  <p className="text-xs text-[#52525B] line-clamp-1">
                    {talent.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-1 text-[#71717A]">
                    <span className="font-semibold text-[#18181B]">{talent.studentId}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#E05A47]" />
                      {talent.deliveryTime}
                    </span>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-[#18181B]/20 flex-shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-[#71717A] uppercase block">Price</span>
                    <span className="font-mono font-extrabold text-base text-[#18181B]">
                      ₹{talent.startingPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectTalent(talent)}
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>Hire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Render Matched Needs Cards */
            displayItems.map((need) => {
              const spotsLeft = (need.neededCount || 1) - (need.filledCount || 0);

              return (
                <div
                  key={need.id}
                  className="bg-[#F5F2EB] rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#FDF3F1] text-[#E05A47] border-[1px] border-[#18181B]">
                        {need.category}
                      </span>

                      {/* Open spots */}
                      <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1px] border-[#18181B]">
                        ● {spotsLeft} {spotsLeft === 1 ? 'Spot' : 'Spots'} Open
                      </span>

                      <span className="inline-flex items-center text-[10px] font-mono text-[#71717A]">
                        <Clock className="w-3 h-3 mr-1 text-[#E05A47]" />
                        {need.deadline}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-[#18181B] leading-snug">
                      {need.title}
                    </h3>

                    <p className="text-xs text-[#52525B] line-clamp-1">
                      {need.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-1 text-[#71717A]">
                      <span className="font-semibold text-[#18181B]">Posted By: {need.postedBy}</span>
                      {need.campusLocation && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-[#E05A47]" />
                            {need.campusLocation}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Budget & Action Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-[#18181B]/20 flex-shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-mono text-[#71717A] uppercase block">Budget</span>
                      <span className="font-mono font-extrabold text-base text-[#18181B]">
                        ₹{need.budget}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectNeed(need)}
                      className="inline-flex items-center px-4 py-2 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <span>I Can Do This</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="pt-4 border-t-[1.5px] border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold">
          <button
            onClick={onClose}
            className="text-[#52525B] hover:text-[#18181B] order-2 sm:order-1"
          >
            ← Close & Continue Browsing
          </button>

          <button
            onClick={() => {
              onClose();
              if (onNavigateTab) {
                onNavigateTab(isNeedToTalent ? 'needs' : 'talent');
              }
            }}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all order-1 sm:order-2"
          >
            <span>{isNeedToTalent ? 'View Live Student Needs Board →' : 'View Live Find Talent Board →'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

