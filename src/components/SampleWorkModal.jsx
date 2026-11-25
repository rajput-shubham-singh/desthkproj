import React from 'react';
import { 
  X, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Image as ImageIcon,
  Sparkles,
  Tag,
  Ban
} from 'lucide-react';
import { getCategoryFallbackImage } from '../data/initialData';

export default function SampleWorkModal({ isOpen, onClose, talent, onHireNow }) {
  if (!isOpen || !talent) return null;

  const samples = talent.samples || [];
  const isAvailable = !talent.isPaused && talent.slots > 0;
  const studentShortName = talent.studentId.split('•')[0].trim();

  const handleHireClick = () => {
    onClose();
    if (onHireNow) {
      onHireNow(talent);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/45 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#18181B] hover:text-[#E05A47] p-1.5 rounded-lg border border-transparent hover:border-[#18181B] transition-all"
          title="Close Modal"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#D97706]" />
              <span>Verified Past Work</span>
            </span>

            {/* Current Slot Status Badge */}
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

            <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-[#18181B] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
              Starting Rate: ₹{talent.startingPrice}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B] leading-tight">
            Past Work Samples by {studentShortName}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-mono text-[#52525B]">
            <span className="font-bold text-[#18181B]">{talent.title}</span>
            <span>•</span>
            <span className="text-[#E05A47] font-semibold">{talent.category}</span>
            <span>•</span>
            <span className="text-[#15803D] font-bold">★ {talent.recommendations} Recommendations</span>
          </div>
        </div>

        {/* Distinct Student-Specific Samples List */}
        {samples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {samples.map((sample, idx) => {
              const charged = sample.chargedPrice || talent.startingPrice;

              return (
                <div 
                  key={idx}
                  className="bg-[#F5F2EB] rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] overflow-hidden flex flex-col justify-between group hover:bg-white transition-all"
                >
                  <div>
                    {/* Thumbnail Preview with Fallback */}
                    <div className="relative h-44 w-full bg-[#E5E2DC] border-b-[1.5px] border-[#18181B] overflow-hidden">
                      <img 
                        src={sample.image || getCategoryFallbackImage(talent.category)} 
                        alt={sample.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getCategoryFallbackImage(talent.category);
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Top Badges on Thumbnail: Sample Index + Bold Charged Rate Pill */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/95 text-[#18181B] border border-[#18181B] shadow-[1px_1px_0px_#18181B] backdrop-blur-xs">
                          Sample #{idx + 1}
                        </span>

                        {/* Bold Price Pill */}
                        <span className="inline-flex items-center text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-[#18181B] text-[#FEF3C7] border border-[#18181B] shadow-[1.5px_1.5px_0px_rgba(255,255,255,0.7)]">
                          <Tag className="w-2.5 h-2.5 mr-1 text-[#F59E0B]" />
                          Charged: ₹{Number(charged).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Sample Details */}
                    <div className="p-4 space-y-1.5">
                      <h4 className="font-display font-bold text-sm text-[#18181B] leading-snug">
                        {sample.title}
                      </h4>

                      {/* Campus Client / Context */}
                      {sample.context && (
                        <div className="inline-block text-[10px] font-mono font-semibold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#18181B]/40">
                          📍 {sample.context}
                        </div>
                      )}

                      {sample.note && (
                        <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed mt-1 font-normal">
                          {sample.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Open Sample Link Button */}
                  <div className="p-4 pt-0">
                    <a
                      href={sample.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    >
                      <span>Open Sample Link</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-[#E05A47]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#F5F2EB] rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-8 text-center mb-6">
            <ImageIcon className="w-10 h-10 text-[#71717A] mx-auto mb-2 opacity-60" />
            <h4 className="font-display font-bold text-base text-[#18181B]">No work samples uploaded yet</h4>
            <p className="text-xs text-[#52525B] mt-1 max-w-sm mx-auto">
              This student hasn't uploaded specific project links yet, but is backed by our campus revision guarantee.
            </p>
          </div>
        )}

        {/* Protection Shield Note */}
        <div className="p-3.5 rounded-xl bg-[#DCFCE7] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center space-x-2.5 text-xs text-[#15803D] mb-6">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono">
            <strong>Campus Revision Shield:</strong> All hires include 2 free revisions included before final payment release.
          </span>
        </div>

        {/* Footer & Primary Action Button */}
        <div className="pt-4 border-t-[1.5px] border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase block">Starting Rate</span>
              <span className="font-mono font-extrabold text-lg text-[#18181B]">
                ₹{talent.startingPrice}
              </span>
            </div>
            <div className="border-l border-[#18181B]/30 pl-3">
              <span className="text-[10px] text-[#71717A] uppercase block">Turnaround</span>
              <span className="text-xs text-[#18181B] font-semibold">{talent.deliveryTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5F2EB] text-xs font-mono font-bold text-[#52525B] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Close
            </button>

            {isAvailable ? (
              <button
                onClick={handleHireClick}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>Hire {studentShortName} at ₹{talent.startingPrice}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
              </button>
            ) : (
              <button
                disabled
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#E5E2DC] text-[#71717A] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/40 cursor-not-allowed select-none"
              >
                Currently Booked Out
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
