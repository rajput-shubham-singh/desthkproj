import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ExternalLink, 
  Tag, 
  Ban, 
  Plus, 
  RotateCcw,
  Sparkles,
  Eye
} from 'lucide-react';
import { getCategoryFallbackImage } from '../data/initialData';

export default function CategoryDetailView({
  category,
  talentList = [],
  onBackToCategories,
  onHireTalent,
  onOpenOfferModal,
  onViewSamples
}) {
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Filter students who offer this service category
  const studentsInCategory = useMemo(() => {
    return talentList.filter((t) => {
      const matchesCat = t.category === category.categoryKey || t.category === category.name;
      if (!matchesCat) return false;

      if (filterAvailableOnly) {
        if (t.isPaused || (t.slots || 0) <= 0) return false;
      }

      if (searchFilter.trim() !== "") {
        const q = searchFilter.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesDesc = t.description.toLowerCase().includes(q);
        const matchesStudent = t.studentId.toLowerCase().includes(q);
        const matchesTools = t.tools && t.tools.some(tool => tool.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesStudent && !matchesTools) return false;
      }

      return true;
    });
  }, [talentList, category, filterAvailableOnly, searchFilter]);

  const availableCount = talentList.filter(
    (t) => (t.category === category.categoryKey || t.category === category.name) && !t.isPaused && (t.slots || 0) > 0
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Nav: Back to All Categories Button */}
      <div>
        <button
          onClick={onBackToCategories}
          className="inline-flex items-center text-xs font-mono font-bold text-[#18181B] bg-white hover:bg-[#FEF3C7] px-3.5 py-2 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
          <span>← Back to All Service Categories</span>
        </button>
      </div>

      {/* Category Hero Banner Card */}
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                Campus Category Directory
              </span>

              {category.isFlagship && (
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-[#18181B] text-[#FEF3C7] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_rgba(255,255,255,0.4)]">
                  ⚡ High-Value Tech
                </span>
              )}

              {availableCount > 0 ? (
                <span className="inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5 animate-pulse" />
                  {availableCount} {availableCount === 1 ? 'Student' : 'Students'} Available Now
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] border-[1.2px] border-[#18181B]">
                  ✕ Currently Booked Out (0 Open Slots)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#18181B] tracking-tight">
              {category.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#52525B] font-medium leading-relaxed">
              {category.description}
            </p>

            {/* Standard Fair-Rate Box */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="bg-[#F5F2EB] px-3 py-1.5 rounded-xl border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
                <span className="text-[#71717A] text-[10px] uppercase font-bold block">Standard Campus Fair-Rate</span>
                <span className="text-sm font-extrabold text-[#18181B]">{category.fairRateGuide}</span>
              </div>
              <div className="bg-[#DCFCE7] px-3 py-1.5 rounded-xl border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-[#15803D] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold text-[11px]">2 Free Changes Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quick Action to Offer This Skill */}
          <div className="flex-shrink-0 flex flex-col items-stretch sm:items-end justify-center gap-2">
            <button
              onClick={onOpenOfferModal}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />
              <span>Offer Your {category.categoryKey} Skills</span>
            </button>
            <span className="text-[10px] font-mono text-[#71717A] text-center sm:text-right">
              Earn from fellow students & campus clubs
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar within Category */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B]">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="font-bold text-[#18181B]">Showing:</span>
          <span className="bg-[#F5F2EB] px-2 py-0.5 rounded border border-[#18181B] font-bold">
            {studentsInCategory.length} Individual {studentsInCategory.length === 1 ? 'Creator' : 'Creators'}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border-[1.2px] border-[#18181B] transition-all ${
              filterAvailableOnly
                ? 'bg-[#18181B] text-white shadow-[1.5px_1.5px_0px_#18181B]'
                : 'bg-white text-[#18181B] hover:bg-[#F5F2EB]'
            }`}
          >
            {filterAvailableOnly ? '✓ Open Slots Only' : 'Filter Open Slots Only'}
          </button>

          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search within this skill..."
            className="px-3 py-1.5 text-xs rounded-xl bg-[#F5F2EB] border-[1.2px] border-[#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white w-48 sm:w-56"
          />
        </div>
      </div>

      {/* Individual Student Profile Cards with Inline Work Samples */}
      {studentsInCategory.length > 0 ? (
        <div className="space-y-6">
          {studentsInCategory.map((talent) => {
            const isAvailable = !talent.isPaused && talent.slots > 0;
            const studentShortName = talent.studentId.split('•')[0].trim();
            const samples = talent.samples || [];

            return (
              <article
                key={talent.id}
                className={`rounded-2xl border-[1.5px] border-[#18181B] p-6 sm:p-7 transition-all ${
                  isAvailable
                    ? 'bg-white shadow-[4px_4px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B]'
                    : 'bg-[#FAF8F5] opacity-90 shadow-[2px_2px_0px_#18181B]'
                }`}
              >
                {/* Card Top: Student Profile Info + Starting Rate + Hire Button */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-6 border-b-[1.5px] border-[#18181B]">
                  
                  {/* Left: Identity, Badges, Title, Bio */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Availability Pill */}
                      {talent.isPaused ? (
                        <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border-[1.2px] border-[#18181B]">
                          <Ban className="w-2.5 h-2.5 mr-1" />
                          Paused (Busy)
                        </span>
                      ) : talent.slots > 0 ? (
                        <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1 animate-pulse" />
                          {talent.slots} {talent.slots === 1 ? 'Slot' : 'Slots'} Left
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] border-[1.2px] border-[#18181B]">
                          ✕ Currently Booked
                        </span>
                      )}

                      {/* Student ID / Reg */}
                      <span className="inline-block text-xs font-mono font-extrabold text-[#18181B] bg-[#F5F2EB] px-2.5 py-0.5 rounded-md border-[1.2px] border-[#18181B]">
                        {talent.studentId}
                      </span>

                      {/* Peer Recommendation */}
                      <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                        <Star className="w-3 h-3 mr-1 fill-[#15803D] stroke-none" />
                        ★ {talent.recommendations} Recommendations
                      </span>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#18181B] leading-tight">
                      {talent.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                      {talent.description}
                    </p>

                    {/* Campus Location & Delivery */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[#71717A]">
                      <span className="flex items-center text-[#18181B] font-semibold">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
                        {talent.campusLocation || 'LPU Campus'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
                        {talent.deliveryTime}
                      </span>
                      {talent.tools && (
                        <>
                          <span>•</span>
                          <span className="text-[#18181B]">Tools: {talent.tools.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Rate Box & Direct Hire Button */}
                  <div className="flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between sm:justify-start gap-3 bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex-shrink-0 min-w-[200px]">
                    <div>
                      <span className="text-[10px] font-mono text-[#71717A] uppercase font-bold block">Individual Rate</span>
                      <span className="font-mono font-extrabold text-2xl text-[#18181B]">
                        ₹{Number(talent.startingPrice).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A] block">
                        {talent.priceUnit ? `/${talent.priceUnit.replace('per ', '')}` : 'per task'}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      {samples.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onViewSamples && onViewSamples(talent)}
                          className="w-full inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border-[1.5px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5 text-[#18181B]" />
                          <span>View Showcase Modal ({samples.length})</span>
                        </button>
                      )}

                      {isAvailable ? (
                        <button
                          onClick={() => onHireTalent(talent)}
                          className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                        >
                          <span>Hire {studentShortName} →</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E5E2DC] text-[#71717A] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/40 cursor-not-allowed select-none"
                        >
                          <span>Currently Booked</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Bottom: INLINE SAMPLE WORK GALLERY (Visible Directly on the Page) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#18181B] flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#D97706]" />
                        <span>Past Work Showcase by {studentShortName}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-[#FEF3C7] text-[#92400E] border border-[#18181B]">
                        {samples.length} Verified {samples.length === 1 ? 'Sample' : 'Samples'}
                      </span>
                    </div>
                  </div>

                  {/* Inline Samples Grid */}
                  {samples.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {samples.map((sample, idx) => {
                        const charged = sample.chargedPrice || talent.startingPrice;

                        return (
                          <div
                            key={idx}
                            className="bg-[#F5F2EB] rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] p-3.5 flex flex-col justify-between hover:bg-white transition-all"
                          >
                            <div>
                              {/* Visual Preview Thumbnail (Clickable to open showcase modal) */}
                              <div 
                                onClick={() => onViewSamples && onViewSamples(talent)}
                                className="relative h-36 w-full rounded-lg border border-[#18181B] overflow-hidden mb-3 bg-[#E5E2DC] cursor-pointer group/thumb"
                                title="Click to view past work showcase in full modal"
                              >
                                <img
                                  src={sample.image || getCategoryFallbackImage(talent.category)}
                                  alt={sample.title}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getCategoryFallbackImage(talent.category);
                                  }}
                                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                                />

                                {/* Hover preview overlay */}
                                <div className="absolute inset-0 bg-[#18181B]/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="inline-flex items-center text-[11px] font-mono font-bold text-white bg-[#18181B]/85 px-2.5 py-1 rounded-md border border-white/50 shadow-md">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Click to Enlarge
                                  </span>
                                </div>

                                {/* Floating Badges: Sample # and Bold Price Pill */}
                                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/95 text-[#18181B] border border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                                    Sample #{idx + 1}
                                  </span>

                                  <span className="inline-flex items-center text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#18181B] text-[#FEF3C7] border border-[#18181B] shadow-[1px_1px_0px_rgba(255,255,255,0.7)]">
                                    <Tag className="w-2.5 h-2.5 mr-1 text-[#F59E0B]" />
                                    Charged: ₹{Number(charged).toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>

                              {/* Title & Context */}
                              <h4 className="font-display font-bold text-sm text-[#18181B] leading-snug">
                                {sample.title}
                              </h4>

                              {sample.context && (
                                <span className="inline-block text-[10px] font-mono font-semibold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#18181B]/30 mt-1">
                                  {sample.context}
                                </span>
                              )}

                              {sample.note && (
                                <p className="text-xs text-[#52525B] line-clamp-2 mt-1.5 leading-relaxed font-normal">
                                  {sample.note}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons: Modal View & Open Full Link */}
                            <div className="mt-3 pt-2.5 border-t border-dashed border-[#18181B]/20 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onViewSamples && onViewSamples(talent)}
                                className="flex-1 inline-flex items-center justify-center py-1.5 px-3 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border border-[#18181B] shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                              >
                                <Eye className="w-3 h-3 mr-1.5 text-[#18181B]" />
                                <span>Preview</span>
                              </button>
                              
                              <a
                                href={sample.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center py-1.5 px-3 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border border-[#18181B] shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                title="Open project link in new tab"
                              >
                                <span className="mr-1">Link</span>
                                <ExternalLink className="w-3 h-3 text-[#E05A47]" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-[#71717A] italic">
                      This student hasn't uploaded specific past sample links yet.
                    </p>
                  )}
                </div>

              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-12 text-center">
          <p className="text-lg font-display font-bold text-[#18181B]">No matching students found</p>
          <p className="text-xs text-[#52525B] mt-1 font-normal">Try clearing your search query or reset filters.</p>
          <button
            onClick={() => {
              setFilterAvailableOnly(false);
              setSearchFilter("");
            }}
            className="mt-4 inline-flex items-center text-xs font-mono font-bold text-[#E05A47] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

