import React from 'react';
import { 
  Globe,
  Smartphone,
  Layers,
  Palette, 
  Video, 
  BookOpen, 
  FileText,
  Camera,
  Code,
  ArrowRight, 
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Globe,
  Smartphone,
  Layers,
  Palette,
  Video,
  BookOpen,
  FileText,
  Camera,
  Code
};

export default function ServiceCategoryCard({
  category,
  availableCount = 0,
  startingPrice = 99,
  onSelectCategory
}) {
  const IconComponent = ICON_MAP[category.iconName] || Sparkles;
  const isAvailable = availableCount > 0;
  const isFlagship = Boolean(category.isFlagship);

  return (
    <article 
      onClick={() => onSelectCategory(category)}
      className={`bg-white rounded-2xl border-[1.5px] border-[#18181B] transition-all cursor-pointer p-6 flex flex-col justify-between group ${
        isFlagship 
          ? 'shadow-[3.5px_3.5px_0px_#18181B] hover:shadow-[6px_6px_0px_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5 ring-1 ring-[#18181B]/10' 
          : 'shadow-[3px_3px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5'
      }`}
    >
      <div>
        {/* Top Header: Clean Category Icon + Flagship Tag + Live Availability Badge */}
        <div className="flex items-center justify-between gap-2.5 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className={`w-12 h-12 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-center transition-colors ${
              isFlagship 
                ? 'bg-[#FEF3C7] group-hover:bg-[#E05A47]' 
                : 'bg-[#F5F2EB] group-hover:bg-[#E05A47]'
            }`}>
              <IconComponent className="w-6 h-6 text-[#18181B] group-hover:text-white transition-colors stroke-[2]" />
            </div>

            {isFlagship && (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                ⚡ High-Value Tech
              </span>
            )}
          </div>

          {/* Live Availability Badge */}
          {isAvailable ? (
            <span className="inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1.5 animate-pulse" />
              {availableCount} {availableCount === 1 ? 'Student' : 'Students'} Available
            </span>
          ) : (
            <span className="inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[#6B7280] border-[1.2px] border-[#18181B]">
              ✕ Currently Full (0 Available)
            </span>
          )}
        </div>

        {/* Category Title */}
        <h3 className="font-display font-extrabold text-xl text-[#18181B] group-hover:text-[#E05A47] transition-colors leading-snug">
          {category.name}
        </h3>

        {/* Short clean tagline */}
        {category.tagline && (
          <p className="text-xs text-[#52525B] mt-1.5 font-medium leading-relaxed">
            {category.tagline}
          </p>
        )}
      </div>

      {/* Card Footer: Starting Price + Simple "View Students →" Button */}
      <div className="mt-6 pt-4 border-t-[1.5px] border-[#18181B] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase text-[#71717A] block">
            Starting rate
          </span>
          <span className={`inline-block text-sm font-mono font-extrabold text-[#18181B] px-2.5 py-0.5 rounded-md border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B] mt-0.5 ${
            isFlagship ? 'bg-[#FEF3C7]' : 'bg-[#F5F2EB]'
          }`}>
            Starts at ₹{startingPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectCategory(category);
          }}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex-shrink-0"
        >
          <span>View Students</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
        </button>
      </div>
    </article>
  );
}
