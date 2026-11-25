import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import GigCard from './GigCard';

export default function GigBoard({ 
  gigs, 
  onLockScope, 
  userRole, 
  setUserRole 
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter listings
  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Category filter
      if (selectedCategory !== "All" && gig.category !== selectedCategory) {
        return false;
      }
      // Role preference filter (soft match based on active user role)
      // When client: show all available, prioritizing freelancer offerings
      // When freelancer: show all available, prioritizing open gigs
      if (userRole === 'client' && gig.type === 'client') {
        // still visible, but we can filter if user chooses
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = gig.title.toLowerCase().includes(q);
        const matchesDesc = gig.description.toLowerCase().includes(q);
        const matchesId = gig.anonymizedId.toLowerCase().includes(q);
        const matchesCategory = gig.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesId && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [gigs, selectedCategory, searchQuery, userRole]);

  return (
    <div>
      {/* Main Page Header & Subtle Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
            Explore Campus Gigs
          </h1>
          <p className="text-sm text-[#57534E] mt-1">
            Verified student talent and open club gigs with standardized rates & revision caps.
          </p>
        </div>

        {/* Subtle Role Switcher Pill */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#EAE6DF]/60 border border-[#EAE6DF] text-xs self-start sm:self-auto">
          <button
            onClick={() => setUserRole('client')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              userRole === 'client'
                ? 'bg-white text-[#1C1917] shadow-sm font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Hiring Talent
          </button>
          <button
            onClick={() => setUserRole('freelancer')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              userRole === 'freelancer'
                ? 'bg-white text-[#1C1917] shadow-sm font-semibold'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Offering Skills
          </button>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-4 mb-8">
        {/* Minimal Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill, poster, reel, web, tutor, or anonymized ID..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#EAE6DF] text-[#1C1917] placeholder-[#78716C]/70 focus:outline-none focus:border-[#D95D39] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1C1917]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Clean Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'bg-white text-[#57534E] hover:text-[#1C1917] border border-[#EAE6DF] hover:border-[#D6D0C5]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Grid (Desktop) with Generous gap-6 */}
      {filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              onLockScope={onLockScope}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-12 text-center">
          <p className="text-sm font-medium text-[#1C1917]">No gigs matching your search</p>
          <p className="text-xs text-[#78716C] mt-1">Try clearing filters or search terms.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center text-xs font-semibold text-[#D95D39] hover:underline"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
