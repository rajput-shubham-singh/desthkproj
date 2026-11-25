import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Hash, 
  Briefcase, 
  LogOut, 
  Plus, 
  Minus,
  ArrowRight,
  CheckCircle2,
  Lock,
  Pause,
  Play,
  Ban,
  Clock,
  Sparkles,
  Users,
  Zap,
  Eye
} from 'lucide-react';
import TalentCard from './TalentCard';
import NeedCard from './NeedCard';

export default function AccountView({ 
  currentUser, 
  talentList, 
  needsList, 
  dealsList, 
  onLogout,
  onOpenOfferModal,
  onOpenNeedModal,
  onGoToDeals,
  onHireTalent,
  onICanDoThis,
  onUpdateTalentSlots,
  onToggleTalentPause,
  onOpenMatches,
  onViewSamples
}) {
  if (!currentUser) return null;

  // Filter skills and needs posted by this user (including demo link for test registration 12304567)
  const myOfferedSkills = talentList.filter(t => 
    t.studentId.includes(currentUser.regNo) || 
    t.studentId.includes(currentUser.maskedRegNo) ||
    t.studentId.includes(currentUser.fullName) ||
    (currentUser.regNo === '12304567' && t.id === 'talent-1')
  );

  const myPostedNeeds = needsList.filter(n => 
    n.postedBy.includes(currentUser.regNo) || 
    n.postedBy.includes(currentUser.maskedRegNo) ||
    n.postedBy.includes(currentUser.fullName) ||
    (currentUser.regNo === '12304567' && n.id === 'need-2')
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Account Profile Card */}
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pb-6 border-b-[1.5px] border-[#18181B]">
          
          {/* User Avatar & Info */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E05A47] text-white flex items-center justify-center font-display font-extrabold text-2xl border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] flex-shrink-0">
              {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#18181B]">
                  {currentUser.fullName}
                </h1>
                <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  VERIFIED LPU ID
                </span>
              </div>
              <p className="text-xs text-[#52525B] mt-1 font-mono">
                Public Campus Alias: <strong className="text-[#18181B]">{currentUser.publicAlias || `Student #${currentUser.regNo}`}</strong>
              </p>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-display font-bold text-red-600 bg-red-50 hover:bg-red-100 border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            <span>Logout Account</span>
          </button>

        </div>

        {/* Detailed Verified Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <div className="flex items-center text-xs font-mono font-bold text-[#71717A] mb-1">
              <Hash className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
              <span>REGISTRATION NO</span>
            </div>
            <span className="font-mono font-extrabold text-base text-[#18181B] tracking-wider block">
              {currentUser.regNo}
            </span>
            <span className="text-[10px] font-mono text-[#15803D] font-bold block mt-0.5">✓ Official LPU Student ID</span>
          </div>

          <div className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <div className="flex items-center text-xs font-mono font-bold text-[#71717A] mb-1">
              <Phone className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
              <span>REGISTERED MOBILE</span>
            </div>
            <span className="font-mono font-extrabold text-base text-[#18181B] tracking-wider block">
              +91 {currentUser.mobile || '98765 43210'}
            </span>
            <span className="text-[10px] font-mono text-[#71717A] block mt-0.5 flex items-center">
              <Lock className="w-3 h-3 mr-0.5 text-[#18181B]" />
              Private (Hidden from public)
            </span>
          </div>

          <div className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <div className="flex items-center text-xs font-mono font-bold text-[#71717A] mb-1">
              <Briefcase className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
              <span>CAMPUS ROLE</span>
            </div>
            <span className="font-display font-bold text-sm text-[#18181B] block">
              {currentUser.role}
            </span>
            <span className="text-[10px] font-mono text-[#71717A] block mt-0.5">Lovely Professional University</span>
          </div>

          <div className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <div className="flex items-center text-xs font-mono font-bold text-[#15803D] mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#15803D]" />
              <span>REVISION SHIELD</span>
            </div>
            <span className="font-display font-bold text-xs text-[#15803D] block">
              2 Free Changes Guaranteed
            </span>
            <span className="text-[10px] font-mono text-[#71717A] block mt-0.5">Fair-play rate caps enforced</span>
          </div>
        </div>

        {/* Privacy Safeguard Note */}
        <div className="mt-6 p-4 rounded-xl bg-[#DCFCE7] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-start space-x-2.5 text-xs text-[#15803D]">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-normal text-[#18181B]">
            <strong>Campus Privacy Safeguard:</strong> On public cards, other students only see your anonymized alias (<span className="font-mono font-bold">{currentUser.publicAlias}</span>). Your mobile number is kept confidential inside your account until mutual deal confirmation.
          </p>
        </div>

      </div>

      {/* SECTION 1: My Offered Skills (With Manual Slot & Availability Controls) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-display font-bold text-xl text-[#18181B]">
                My Offered Skills ({myOfferedSkills.length})
              </h2>
              <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#18181B]">
                Live Stock Controls Active
              </span>
            </div>
            <p className="text-xs text-[#52525B] mt-0.5">
              Control your available booking slots or pause your listing when busy with exams or assignments.
            </p>
          </div>
          <button
            onClick={onOpenOfferModal}
            className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
            <span>+ Add Another Skill</span>
          </button>
        </div>

        {myOfferedSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myOfferedSkills.map(talent => (
              <div 
                key={talent.id}
                className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B]">
                      {talent.category}
                    </span>

                    {talent.isPaused ? (
                      <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border-[1.2px] border-[#18181B]">
                        <Ban className="w-2.5 h-2.5 mr-1" />
                        Paused (Busy)
                      </span>
                    ) : talent.slots > 0 ? (
                      <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1 animate-pulse" />
                        {talent.slots} {talent.slots === 1 ? 'Slot' : 'Slots'} Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] border-[1.2px] border-[#18181B]">
                        ✕ Booked Out (0 Slots)
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base text-[#18181B] leading-snug">
                    {talent.title}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1.5 line-clamp-2 leading-relaxed">
                    {talent.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t-[1.2px] border-dashed border-[#18181B]/20 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#18181B]">₹{talent.startingPrice} {talent.priceUnit ? `/${talent.priceUnit.replace('per ', '')}` : ''}</span>
                    <span className="text-[#71717A] text-[11px]">{talent.deliveryTime}</span>
                  </div>
                </div>

                {/* Dedicated Manual Slot & Availability Control Box */}
                <div className="mt-4 pt-3 border-t-[1.5px] border-[#18181B] bg-[#F5F2EB] rounded-xl p-3 border-[1.2px] shadow-[2px_2px_0px_#18181B] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#18181B] uppercase tracking-wider block">
                        Available Slots:
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A]">
                        Live capacity on board
                      </span>
                    </div>

                    {/* Plus / Minus Counter Buttons */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onUpdateTalentSlots(talent.id, -1)}
                        disabled={talent.slots <= 0}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-[#FEF3C7] disabled:opacity-40 disabled:hover:bg-white text-[#18181B] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B] font-mono font-extrabold flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
                        title="Decrease available slot"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-10 text-center font-mono font-black text-sm bg-white py-1 rounded-lg border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                        {talent.slots || 0}
                      </div>
                      <button
                        onClick={() => onUpdateTalentSlots(talent.id, 1)}
                        disabled={(talent.slots || 0) >= 5}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-[#FEF3C7] disabled:opacity-40 disabled:hover:bg-white text-[#18181B] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B] font-mono font-extrabold flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
                        title="Increase available slot"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 1-Click "Mark Busy / Take Break" Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onToggleTalentPause(talent.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center ${
                        talent.isPaused
                          ? 'bg-[#15803D] hover:bg-[#166534] text-white'
                          : 'bg-white hover:bg-[#FEE2E2] text-[#991B1B]'
                      }`}
                    >
                      {talent.isPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5 fill-white stroke-none" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5 mr-1.5 text-[#991B1B]" />
                          <span>Mark Busy</span>
                        </>
                      )}
                    </button>

                    {onViewSamples && (
                      <button
                        onClick={() => onViewSamples(talent)}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                        title="Preview how clients see your work samples"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Samples ({talent.samples?.length || 0})</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-[#71717A] block text-center">
                    {talent.isPaused 
                      ? "● Your card is currently hidden from booking." 
                      : (talent.slots || 0) === 0 
                        ? "● Card displays 'Booked Out' until you increase slots."
                        : `● Accepting up to ${talent.slots} simultaneous project(s).`}
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-8 text-center">
            <p className="text-sm font-display font-bold text-[#18181B]">You haven't listed any skills yet.</p>
            <p className="text-xs text-[#52525B] mt-1 font-normal">Offer your design, video editing, web, or tutoring skills to fellow LPU students.</p>
            <button
              onClick={onOpenOfferModal}
              className="mt-3.5 inline-flex items-center text-xs font-display font-bold text-[#E05A47] hover:underline"
            >
              + List your first skill now →
            </button>
          </div>
        )}
      </section>

      {/* SECTION 2: My Posted Needs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-xl text-[#18181B]">
              My Posted Needs ({myPostedNeeds.length})
            </h2>
            <p className="text-xs text-[#52525B] mt-0.5">
              Requirements your club or project has published on campus
            </p>
          </div>
          <button
            onClick={onOpenNeedModal}
            className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all self-start"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
            <span>+ Post New Need</span>
          </button>
        </div>

        {myPostedNeeds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPostedNeeds.map(need => {
              const isFilled = (need.filledCount || 0) >= (need.neededCount || 1);
              const spotsLeft = (need.neededCount || 1) - (need.filledCount || 0);
              const matchingCount = talentList.filter(
                (t) => t.category === need.category && !t.isPaused && (t.slots || 0) > 0
              ).length;

              return (
                <div 
                  key={need.id}
                  className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#FDF3F1] text-[#E05A47] border-[1.2px] border-[#18181B]">
                        {need.category}
                      </span>
                      {isFilled ? (
                        <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          ✓ Position Filled
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B]">
                          ● {spotsLeft} Spot Open
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-base text-[#18181B] leading-snug">
                      {need.title}
                    </h3>
                    <p className="text-xs text-[#52525B] mt-1.5 line-clamp-2 leading-relaxed">
                      {need.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t-[1.2px] border-dashed border-[#18181B]/20 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#18181B]">Budget: ₹{need.budget}</span>
                      <span className="text-[#71717A] text-[11px]">{need.deadline}</span>
                    </div>
                  </div>

                  {/* Spot Fulfillment Summary & Clickable Live Match Badge */}
                  <div className="mt-4 pt-3 border-t-[1.5px] border-[#18181B] bg-[#F5F2EB] rounded-xl p-3 border-[1.2px] shadow-[2px_2px_0px_#18181B] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-[#18181B] flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
                      Filled: {need.filledCount || 0} / {need.neededCount || 1}
                    </span>

                    {onOpenMatches && (
                      <button
                        onClick={() => onOpenMatches(need)}
                        className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border border-[#18181B] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                          matchingCount > 0
                            ? 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] shadow-[1px_1px_0px_#18181B]'
                            : 'bg-white hover:bg-[#F5F2EB] text-[#71717A]'
                        }`}
                        title="Click to view students on campus ready for this skill"
                      >
                        <Zap className="w-2.5 h-2.5 mr-1 text-[#D97706] fill-[#D97706]" />
                        <span>⚡ {matchingCount} Available Matches</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-8 text-center">
            <p className="text-sm font-display font-bold text-[#18181B]">No open requirements posted yet.</p>
            <p className="text-xs text-[#52525B] mt-1 font-normal">Need help with festival posters, code bugs, or event photography? Post a need.</p>
            <button
              onClick={onOpenNeedModal}
              className="mt-3.5 inline-flex items-center text-xs font-display font-bold text-[#E05A47] hover:underline"
            >
              + Post a requirement →
            </button>
          </div>
        )}
      </section>

      {/* SECTION 3: My Deals Link */}
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-base text-[#18181B]">
            My Deals & Active Agreements
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5">
            You have {dealsList.length} total deal agreement(s) recorded in your campus account.
          </p>
        </div>
        <button
          onClick={onGoToDeals}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all flex-shrink-0"
        >
          <span>Open My Deals Tab</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
