import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export default function HeroBanner({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}) {
  return (
    <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 sm:p-8 mb-8 relative overflow-hidden">
      
      {/* Decorative campus notice-board corner tab */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#FEF3C7] border-l-[1.5px] border-b-[1.5px] border-[#18181B] flex items-center justify-center font-mono font-bold text-[10px] text-[#B45309] rotate-0 select-none">
        LPU '26
      </div>

      {/* Warm Mustard/Amber Highlight Tag */}
      <div className="max-w-3xl mb-5">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>LPU STUDENT-TO-STUDENT MARKETPLACE</span>
        </div>

        {/* High-Contrast Bold Geometric Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#18181B] tracking-tight leading-tight">
          Hire skilled LPU students for projects, or earn from your side skills on campus.
        </h1>

        <p className="text-xs sm:text-sm text-[#52525B] mt-2 font-medium">
          From ₹1,499 full-stack websites and Flutter apps to ₹99 poster designs and PPT help — verified LPU student builders, fair campus pricing, and 2 free changes guaranteed.
        </p>
      </div>

      {/* Tactile Ink Search Bar */}
      <div className="relative mb-5 max-w-2xl">
        <Search className="w-4 h-4 text-[#18181B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by skill, poster, reel, python, tutor, or campus ID..."
          className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-[#18181B] font-mono placeholder-[#71717A] focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#18181B] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#18181B] hover:text-[#E05A47]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tactile Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex-shrink-0 border-[1.5px] border-[#18181B] ${
                isSelected
                  ? 'bg-[#18181B] text-white shadow-[2px_2px_0px_#18181B]'
                  : 'bg-white text-[#18181B] hover:bg-[#FEF3C7] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

    </div>
  );
}
