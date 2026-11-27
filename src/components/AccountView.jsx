import React from 'react';
import { Plus, Minus } from 'lucide-react';

const HOSTEL_OPTIONS = [
  'BH-4',
  'BH-2',
  'BH-1',
  'GH-2',
  'Block 34',
  'Block 38'
];

const GEAR_OPTIONS = [
  'Laptop + Figma / VS Code',
  'DSLR + Gimbal',
  'Mobile Creator',
  'Flutter + Android Studio',
  'Laptop + Canva / PPT'
];

export default function AccountView({ 
  currentUser, 
  talentList, 
  needsList, 
  dealsList, 
  examMode = false,
  onToggleExamMode,
  onUpdateProfileSettings,
  onLogout,
  onOpenOfferModal,
  onOpenNeedModal,
  onGoToDeals,
  onUpdateTalentSlots,
  onToggleTalentPause,
  onOpenMatches
}) {
  if (!currentUser) return null;

  const hostelBlock = currentUser.hostelBlock || 'BH-4';
  const gearTag = currentUser.gearTag || 'Laptop + Figma / VS Code';
  const juniorShadowOpen = Boolean(currentUser.juniorShadowOpen);

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
    <div className="space-y-10 animate-in fade-in duration-150">
      
      {/* Profile & Settings Card */}
      <section className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-7 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#18181B]/15">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl font-bold text-[#18181B] tracking-tight">
                {currentUser.fullName}
              </h1>
              <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#18181B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                <span>LPU Verified</span>
              </span>
            </div>
            <p className="text-xs font-mono text-[#52525B] mt-1">
              Public Alias: {currentUser.publicAlias || `Student #${currentUser.regNo}`}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-lg border-[1.5px] border-[#18181B] bg-[#F6F4EF] hover:bg-[#FEE2E2] text-xs font-bold text-[#18181B] self-start sm:self-auto transition-colors"
          >
            Log out
          </button>
        </div>

        {/* Verified Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-[#F6F4EF] border-[1.5px] border-[#18181B]">
            <span className="text-xs font-mono text-[#71717A] block">Registration No</span>
            <span className="font-mono font-bold text-[#18181B] mt-0.5 block">
              {currentUser.regNo}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#F6F4EF] border-[1.5px] border-[#18181B]">
            <span className="text-xs font-mono text-[#71717A] block">Registered Mobile</span>
            <span className="font-mono font-bold text-[#18181B] mt-0.5 block">
              +91 {currentUser.mobile || '9876543210'}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#F6F4EF] border-[1.5px] border-[#18181B]">
            <span className="text-xs font-mono text-[#71717A] block">Campus Role</span>
            <span className="font-bold text-[#18181B] mt-0.5 block">
              {currentUser.role} · LPU
            </span>
          </div>
        </div>

        {/* Profile Settings: Hostel Block, Gear/Mobile Tag & Junior Shadow Opt-In */}
        <div className="pt-6 border-t border-[#18181B]/15 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#18181B] mb-1.5">
              Hostel / Campus Block
            </label>
            <select
              value={hostelBlock}
              onChange={(e) => onUpdateProfileSettings && onUpdateProfileSettings({ hostelBlock: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#F6F4EF] border-[1.5px] border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white"
            >
              {HOSTEL_OPTIONS.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#18181B] mb-1.5">
              Gear / Mobile Creator Tag
            </label>
            <select
              value={gearTag}
              onChange={(e) => onUpdateProfileSettings && onUpdateProfileSettings({ gearTag: e.target.value })}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#F6F4EF] border-[1.5px] border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white"
            >
              {GEAR_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-between">
            <span className="block text-xs font-bold text-[#18181B] mb-1.5">
              Junior Shadow Opt-In
            </span>
            <button
              type="button"
              onClick={() => onUpdateProfileSettings && onUpdateProfileSettings({ juniorShadowOpen: !juniorShadowOpen })}
              className={`w-full px-3 py-2 rounded-lg border-[1.5px] border-[#18181B] text-xs font-mono font-bold text-left flex items-center justify-between transition-colors ${
                juniorShadowOpen
                  ? 'bg-[#DCFCE7] text-[#15803D]'
                  : 'bg-[#F6F4EF] text-[#52525B]'
              }`}
            >
              <span>1st-Yr Learners Welcome</span>
              <span>{juniorShadowOpen ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* 1-Click Exam Mode Switch */}
        <div className={`p-4 rounded-xl border-[1.5px] border-[#18181B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
          examMode ? 'bg-[#FEF3C7]' : 'bg-[#F6F4EF]'
        }`}>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-[#18181B]">
                Exam Mode
              </span>
              <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold">
                <span className={`w-2 h-2 rounded-full ${examMode ? 'bg-[#F59E0B]' : 'bg-[#15803D]'}`} />
                <span className={examMode ? 'text-[#B45309]' : 'text-[#15803D]'}>
                  {examMode ? 'Busy (Exams)' : 'Active'}
                </span>
              </span>
            </div>
            <p className="text-xs text-[#52525B] mt-0.5">
              Pauses all your skill listings during MTT/ETT exams without hurting your reliability streak.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onToggleExamMode && onToggleExamMode()}
            className={`relative inline-flex h-6 w-11 items-center rounded-full border-[1.5px] border-[#18181B] transition-colors focus:outline-none flex-shrink-0 ${
              examMode ? 'bg-[#F59E0B]' : 'bg-white'
            }`}
            role="switch"
            aria-checked={examMode}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-[#18181B] transition-transform ${
                examMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {/* My Offered Skills & Slot Controls */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#18181B]">
              My Offered Skills ({myOfferedSkills.length})
            </h2>
            <p className="text-xs text-[#52525B] mt-0.5">
              Adjust open booking slots or pause individual listings.
            </p>
          </div>
          <button
            onClick={onOpenOfferModal}
            className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors"
          >
            + Offer Skill
          </button>
        </div>

        {myOfferedSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myOfferedSkills.map(talent => (
              <div 
                key={talent.id}
                className="bg-white rounded-2xl border-[1.5px] border-[#18181B] hover:shadow-[3px_3px_0px_#18181B] transition-shadow p-6 flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#52525B]">{talent.category}</span>
                    <span className="inline-flex items-center space-x-1.5 font-bold">
                      <span className={`w-2 h-2 rounded-full ${
                        talent.isPaused ? 'bg-[#F59E0B]' : talent.slots > 0 ? 'bg-[#15803D]' : 'bg-[#9CA3AF]'
                      }`} />
                      <span className={talent.isPaused ? 'text-[#B45309]' : talent.slots > 0 ? 'text-[#15803D]' : 'text-[#71717A]'}>
                        {talent.isPaused ? 'Busy (Exams)' : talent.slots > 0 ? `${talent.slots} open` : 'Booked'}
                      </span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#18181B]">{talent.title}</h3>
                  <p className="text-xs font-mono text-[#52525B] mt-1">
                    From ₹{Number(talent.startingPrice).toLocaleString('en-IN')} · {talent.deliveryTime}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#18181B]/15 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-[#52525B]">Slots:</span>
                    <button
                      onClick={() => onUpdateTalentSlots(talent.id, -1)}
                      disabled={talent.slots <= 0}
                      className="w-7 h-7 rounded-md bg-[#F6F4EF] border-[1.5px] border-[#18181B] flex items-center justify-center text-[#18181B] disabled:opacity-40"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold w-5 text-center">{talent.slots || 0}</span>
                    <button
                      onClick={() => onUpdateTalentSlots(talent.id, 1)}
                      disabled={talent.slots >= 5}
                      className="w-7 h-7 rounded-md bg-[#F6F4EF] border-[1.5px] border-[#18181B] flex items-center justify-center text-[#18181B] disabled:opacity-40"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onToggleTalentPause(talent.id)}
                    className="text-xs font-mono font-bold text-[#D95D39] hover:underline"
                  >
                    {talent.isPaused ? 'Resume listing' : 'Pause listing'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-8 text-center">
            <p className="text-sm text-[#52525B]">You haven't listed any skills yet.</p>
          </div>
        )}
      </section>

      {/* My Posted Needs & Active Deals Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#18181B]">
              My Posted Needs ({myPostedNeeds.length})
            </h3>
            <button
              onClick={onOpenNeedModal}
              className="text-xs font-bold text-[#D95D39] hover:underline"
            >
              + Post Need
            </button>
          </div>
          {myPostedNeeds.length > 0 ? (
            <div className="divide-y divide-[#18181B]/10">
              {myPostedNeeds.map(n => (
                <div key={n.id} className="py-3 flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#18181B] truncate">{n.title}</span>
                  {onOpenMatches && (
                    <button
                      onClick={() => onOpenMatches(n)}
                      className="text-[#D95D39] font-bold flex-shrink-0 hover:underline"
                    >
                      Matches
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#71717A]">No requirements posted yet.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#18181B]">
              Active Orders ({dealsList.filter(d => d.status !== 'completed').length})
            </h3>
            <p className="text-xs text-[#52525B] mt-1">
              Track deal stages, watermarked drafts, and completion certificates.
            </p>
          </div>
          <button
            onClick={onGoToDeals}
            className="text-xs font-bold text-[#D95D39] hover:underline self-start"
          >
            Go to My Deals →
          </button>
        </div>
      </section>

    </div>
  );
}
