import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCategoryCard({
  category,
  availableCount = 0,
  startingPrice = 99,
  onSelectCategory
}) {
  const isAvailable = availableCount > 0;

  return (
    <motion.article
      onClick={() => onSelectCategory(category)}
      whileHover={{ y: -2, boxShadow: '3px 3px 0px #18181B' }}
      whileTap={{ y: 1, boxShadow: '1px 1px 0px #18181B' }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="bg-white rounded-2xl border-[1.5px] border-[#18181B] cursor-pointer p-6 sm:p-7 flex flex-col justify-between group"
    >
      {/* Top Row: Category Title + Bold Pricing Tag on Top-Right */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-[#18181B] tracking-tight group-hover:text-[#D95D39] transition-colors">
          {category.name}
        </h3>

        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#F6F4EF] text-[#18181B] border-[1.5px] border-[#18181B] flex-shrink-0">
          From ₹{Number(startingPrice).toLocaleString('en-IN')}
        </span>
      </div>

      {/* Bottom Row: Availability Dot + View Students CTA */}
      <div className="mt-7 pt-4 border-t border-[#18181B]/15 flex items-center justify-between text-xs font-mono">
        <span className="inline-flex items-center space-x-2">
          {isAvailable ? (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#15803D]" />
            </span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
          )}
          <span className={isAvailable ? 'text-[#15803D] font-bold' : 'text-[#71717A]'}>
            {availableCount} {availableCount === 1 ? 'student' : 'students'} available
          </span>
        </span>

        <span className="font-bold text-[#D95D39] group-hover:translate-x-0.5 transition-transform">
          View Students →
        </span>
      </div>
    </motion.article>
  );
}
