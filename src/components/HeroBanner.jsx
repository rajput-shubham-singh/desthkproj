import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/initialData';

export default function HeroBanner({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}) {
  return (
    <section className="w-full max-w-none bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 sm:p-8 mb-10">
      <div className="w-full max-w-none mb-5">
        <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#18181B] mb-3">
          LPU Student-to-Student Marketplace
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight leading-snug">
          Hire skilled LPU peers, or earn from your campus skills.
        </h1>
        <p className="text-sm text-[#52525B] mt-1.5 leading-relaxed">
          From ₹1,499 websites and apps to ₹99 posters — verified students, clear deadlines, and max 2 free revisions.
        </p>
      </div>

      {/* Sharp Search Input */}
      <div className="relative w-full max-w-none mb-4">
        <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search websites, Figma, reels, posters, or student ID..."
          className="w-full pl-10 pr-8 py-2.5 text-sm rounded-xl bg-[#F6F4EF] border-[1.5px] border-[#18181B] text-[#18181B] placeholder-[#71717A] focus:outline-none focus:bg-white transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#52525B] hover:text-[#18181B]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Pills with Shared layoutId */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-3 py-1 rounded-lg border-[1.5px] transition-colors ${
                isSelected
                  ? 'text-white border-[#18181B] font-semibold'
                  : 'bg-[#F6F4EF] text-[#18181B] border-[#18181B]/30 hover:border-[#18181B]'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="hero-category-pill"
                  className="absolute inset-0 bg-[#18181B] rounded-[6px] z-0"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
