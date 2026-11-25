import React, { useState } from 'react';
import { 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  ShieldCheck, 
  Compass, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function DtProjectBanner({ userRole }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-1">
      <div className="bg-white rounded-2xl border border-[#E6E2D8] shadow-warm p-4 sm:p-5 relative overflow-hidden transition-all">
        {/* Subtle decorative left accent */}
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#D95D39]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FDF4F2] text-[#D95D39] border border-[#F7D1C9] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                  Design Thinking Project P25: LPU Student Micro-Gig Safe Zone
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF3EE] text-[#2D6A4F] border border-[#C2DFCF]">
                  Empathetic Campus Commerce
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
                {userRole === 'client' ? (
                  <span>
                    <strong className="text-[#1C1917]">Club Lead Mode:</strong> Source vouched student designers, video editors, coders, and peer tutors under transparent campus benchmarks. No awkward haggling; 2 revisions guaranteed.
                  </span>
                ) : (
                  <span>
                    <strong className="text-[#1C1917]">Student Freelancer Mode:</strong> Get hired by campus clubs with fair pay (₹250–₹1,800), anonymized privacy, and zero infinite revision traps (+₹50 per extra round).
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end md:self-center flex-shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center text-xs font-semibold text-[#57534E] hover:text-[#1C1917] bg-[#FAF9F6] hover:bg-[#F5F3EE] px-3 py-1.5 rounded-lg border border-[#E6E2D8] transition-colors"
            >
              <span>{isExpanded ? 'Hide DT Research Notes' : 'Why P25? (DT Insights)'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 ml-1" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible DT Research Framework */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#E6E2D8] grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E6E2D8]">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#1C1917] mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#D95D39] text-white flex items-center justify-center text-[10px]">1</span>
                <span>The Empathy Interview Problem</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                LPU student creators report being offered "free certificates" or ₹50 for complex posters, followed by 10+ rounds of late-night revisions. Juniors feel pressured by senior club coordinators.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E6E2D8]">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#1C1917] mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-[10px]">2</span>
                <span>The P25 Architectural Solution</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Eliminate status hierarchies via <strong>Anonymized IDs (F1, C1)</strong> and peer vouching. Lock deliverables upfront so work cannot expand beyond agreed milestones.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E6E2D8]">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#1C1917] mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#57534E] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Fair-Play Economic Guardrail</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Strict mandate: Every gig has <strong>2 free revision rounds</strong> included. Any extra iteration is billed at a transparent <strong>₹50 flat fee</strong> to value student time.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
