import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCategoryFallbackImage } from '../data/initialData';

const cleanText = (str = '') =>
  str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();

const shortBlock = (str = '') =>
  cleanText(str).replace(/^Hostel\s+/i, '').trim() || 'LPU';

const shortTime = (str = '') =>
  str.replace(/^Delivers in\s+/i, '').trim() || '2 days';

export default function CategoryDetailView({
  category,
  talentList = [],
  currentUser = null,
  onBackToCategories,
  onHireTalent,
  onOpenOfferModal,
  onViewSamples,
  onApplyJuniorAssistant
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'junior' | 'mobile' | 'gear'
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'lowest_price' | 'same_hostel'

  const userHostel = currentUser?.hostelBlock || 'BH-4';

  const studentsInCategory = useMemo(() => {
    const filtered = talentList.filter((t) => {
      const matchesCat = t.category === category.categoryKey || t.category === category.name;
      if (!matchesCat) return false;

      const gearLower = (t.gearTag || '').toLowerCase();
      if (activeFilter === 'junior' && !t.juniorAssistantOpen) return false;
      if (activeFilter === 'mobile' && !gearLower.includes('mobile')) return false;
      if (activeFilter === 'gear' && !(gearLower.includes('dslr') || gearLower.includes('gimbal') || gearLower.includes('camera'))) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'lowest_price') {
        return (a.startingPrice || 0) - (b.startingPrice || 0);
      }
      if (sortBy === 'same_hostel') {
        const aMatch = (a.hostelTag || a.campusLocation || '').toLowerCase().includes(userHostel.toLowerCase()) ? 1 : 0;
        const bMatch = (b.hostelTag || b.campusLocation || '').toLowerCase().includes(userHostel.toLowerCase()) ? 1 : 0;
        if (bMatch !== aMatch) return bMatch - aMatch;
      }
      return (b.recommendations || 0) - (a.recommendations || 0);
    });
  }, [talentList, category, activeFilter, sortBy, userHostel]);

  const availableCount = talentList.filter(
    (t) => (t.category === category.categoryKey || t.category === category.name) && !t.isPaused && (t.slots || 0) > 0
  ).length;

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'junior', label: 'Junior Shadow Open' },
    { id: 'mobile', label: 'Mobile Creator' },
    { id: 'gear', label: 'Gear (DSLR/Gimbal)' }
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-150">
      
      {/* Back Link */}
      <div>
        <button
          onClick={onBackToCategories}
          className="text-xs font-mono font-bold text-[#52525B] hover:text-[#D95D39] transition-colors"
        >
          ← Back to All Services
        </button>
      </div>

      {/* Slim Single-Row Category Header Banner */}
      <header className="bg-white rounded-2xl border-[1.5px] border-[#18181B] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono mb-1">
            <span className={`w-2 h-2 rounded-full ${availableCount > 0 ? 'bg-[#15803D]' : 'bg-[#9CA3AF]'}`} />
            <span className={availableCount > 0 ? 'text-[#15803D] font-bold' : 'text-[#71717A]'}>
              {availableCount} available
            </span>
            <span className="text-[#71717A]">·</span>
            <span className="text-[#52525B] truncate">{category.fairRateGuide}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
            {category.name}
          </h1>
        </div>

        <button
          onClick={onOpenOfferModal}
          className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors self-start sm:self-auto flex-shrink-0"
        >
          + Offer this skill
        </button>
      </header>

      {/* Responsive Filter & Sort Bar with Shared layoutId Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filterOptions.map((f) => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`relative px-3 py-1 rounded-lg text-xs border-[1.5px] whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'text-white border-[#18181B] font-bold'
                    : 'bg-white text-[#18181B] border-[#18181B]/30 hover:border-[#18181B]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="category-filter-pill"
                    className="absolute inset-0 bg-[#18181B] rounded-[6px] z-0"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono flex-shrink-0">
          <span className="text-[#52525B]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-white border-[1.5px] border-[#18181B] text-[#18181B] focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="lowest_price">Lowest Price</option>
            <option value="same_hostel">Same Block ({userHostel})</option>
          </select>
        </div>
      </div>

      {/* 2-Column Creator Grid on Large Screens */}
      {studentsInCategory.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {studentsInCategory.map((talent) => {
            const isAvailable = !talent.isPaused && talent.slots > 0;
            const samples = talent.samples || [];
            const hostelShort = shortBlock(talent.hostelTag || talent.campusLocation);
            const gearShort = cleanText(talent.gearTag || (talent.tools ? talent.tools[0] : 'Laptop'));
            const timeShort = shortTime(talent.deliveryTime);

            return (
              <motion.article
                key={talent.id}
                whileHover={{ y: -2, boxShadow: '3px 3px 0px #18181B' }}
                whileTap={{ y: 1, boxShadow: '1px 1px 0px #18181B' }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-5 flex flex-col justify-between space-y-4"
              >
                
                <div className="space-y-2.5">
                  {/* Top Row: Student ID + Status Dot on Left, Bold Price on Right */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2 text-[11px] font-mono">
                        {!talent.isPaused && talent.slots > 0 ? (
                          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-60" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#15803D]" />
                          </span>
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            talent.isPaused ? 'bg-[#F59E0B]' : 'bg-[#9CA3AF]'
                          }`} />
                        )}
                        <span className={talent.isPaused ? 'text-[#B45309] font-bold' : talent.slots > 0 ? 'text-[#15803D] font-bold' : 'text-[#71717A]'}>
                          {talent.isPaused ? 'Busy (Exams)' : talent.slots > 0 ? `Available (${talent.slots})` : 'Booked'}
                        </span>
                        <span className="text-[#71717A]">·</span>
                        <span className="text-[#52525B] truncate">{talent.studentId.split('•')[0].trim()}</span>
                      </div>

                      <h2 className="text-base font-bold text-[#18181B] leading-snug mt-1 line-clamp-1">
                        {talent.title}
                      </h2>
                    </div>

                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#F6F4EF] text-[#18181B] border-[1.5px] border-[#18181B] flex-shrink-0">
                      From ₹{Number(talent.startingPrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Single Clean Concise Metadata Line */}
                  <p className="text-xs font-mono text-[#52525B] truncate">
                    {hostelShort} · {gearShort} · {timeShort} · ★ {talent.recommendations}
                  </p>

                  {/* 1-Sentence Crisp Bio */}
                  <p className="text-xs text-[#52525B] line-clamp-1">
                    {talent.description}
                  </p>

                  {/* Compact 2-Column Sample Work Mini-Grid (Title & Price only) */}
                  {samples.length > 0 && (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {samples.slice(0, 2).map((sample, idx) => {
                        const charged = sample.chargedPrice || talent.startingPrice;
                        return (
                          <div
                            key={idx}
                            onClick={() => onViewSamples && onViewSamples(talent)}
                            className="group rounded-xl border-[1.5px] border-[#18181B] bg-white overflow-hidden cursor-pointer"
                          >
                            <div className="h-24 sm:h-28 w-full overflow-hidden bg-[#E5E2DC] border-b-[1.5px] border-[#18181B]">
                              <img
                                src={sample.image || getCategoryFallbackImage(talent.category)}
                                alt={sample.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = getCategoryFallbackImage(talent.category);
                                }}
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                              />
                            </div>
                            <div className="p-2 flex items-center justify-between gap-1.5">
                              <span className="text-[11px] font-bold text-[#18181B] truncate">
                                {sample.title}
                              </span>
                              <span className="text-[11px] font-mono font-bold text-[#D95D39] flex-shrink-0">
                                ₹{Number(charged).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-[#18181B]/15 flex flex-wrap items-center justify-between gap-2">
                  {talent.juniorAssistantOpen ? (
                    <button
                      type="button"
                      onClick={() => onApplyJuniorAssistant && onApplyJuniorAssistant(talent)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] text-[11px] font-bold border-[1.5px] border-[#18181B] transition-colors"
                    >
                      Apply as Junior Shadow
                    </button>
                  ) : (
                    <span />
                  )}

                  {isAvailable ? (
                    <button
                      onClick={() => onHireTalent(talent)}
                      className="px-4 py-1.5 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors"
                    >
                      Hire Directly →
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-1.5 rounded-lg bg-[#F3F4F6] text-[#9CA3AF] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/30 cursor-not-allowed"
                    >
                      {talent.isPaused ? 'Busy (Exams)' : 'Booked'}
                    </button>
                  )}
                </div>

              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-10 text-center">
          <p className="text-base font-bold text-[#18181B]">No matching creators found</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-3 text-xs font-bold text-[#D95D39] underline underline-offset-4"
          >
            Show all creators
          </button>
        </div>
      )}

    </div>
  );
}
