import React from 'react';
import { motion } from 'framer-motion';

const cleanText = (str = '') =>
  str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();

export default function TalentCard({ talent, onHireNow, onViewSamples }) {
  const isAvailable = !talent.isPaused && talent.slots > 0;
  const samplesCount = (talent.samples && talent.samples.length) || 0;
  const hostelClean = cleanText(talent.hostelTag || talent.campusLocation || 'LPU Campus');
  const gearClean = cleanText(talent.gearTag || 'Laptop Setup');

  return (
    <motion.article
      whileHover={{ y: -2, boxShadow: '3px 3px 0px #18181B' }}
      whileTap={{ y: 1, boxShadow: '1px 1px 0px #18181B' }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold">
            {isAvailable ? (
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#15803D]" />
              </span>
            ) : (
              <span className={`w-1.5 h-1.5 rounded-full ${talent.isPaused ? 'bg-[#F59E0B]' : 'bg-[#9CA3AF]'}`} />
            )}
            <span className={talent.isPaused ? 'text-[#B45309]' : talent.slots > 0 ? 'text-[#15803D]' : 'text-[#71717A]'}>
              {talent.isPaused
                ? 'Busy (Exams)'
                : talent.slots > 0
                  ? `Available (${talent.slots})`
                  : 'Booked'}
            </span>
          </span>

          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#F6F4EF] text-[#18181B] border-[1.5px] border-[#18181B] flex-shrink-0">
            From ₹{Number(talent.startingPrice).toLocaleString('en-IN')}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#18181B] leading-snug">
          {talent.title}
        </h3>

        <p className="text-xs font-mono text-[#52525B] mt-1.5">
          {hostelClean} · {gearClean}
        </p>

        <p className="text-xs text-[#52525B] mt-2 line-clamp-2 leading-relaxed">
          {talent.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#18181B]/15 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono text-[#71717A] block truncate max-w-[140px]">
            {talent.studentId}
          </span>
          {samplesCount > 0 && (
            <button
              type="button"
              onClick={() => onViewSamples && onViewSamples(talent)}
              className="text-[11px] font-mono font-bold text-[#D95D39] hover:underline mt-0.5"
            >
              View samples ({samplesCount})
            </button>
          )}
        </div>

        {isAvailable ? (
          <button
            onClick={() => onHireNow(talent)}
            className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors flex-shrink-0"
          >
            Hire Directly →
          </button>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-[#F3F4F6] text-[#9CA3AF] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/30 cursor-not-allowed flex-shrink-0"
          >
            {talent.isPaused ? 'Busy (Exams)' : 'Booked'}
          </button>
        )}
      </div>
    </motion.article>
  );
}
