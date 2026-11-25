import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-white border-[1.5px] border-[#18181B] rounded-2xl shadow-[4px_4px_0px_#18181B] p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess ? (
            <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#15803D] border border-[#18181B] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : isInfo ? (
            <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#B45309] border border-[#18181B] flex items-center justify-center font-bold">
              <Info className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-[#FDF3F1] text-[#E05A47] border border-[#18181B] flex items-center justify-center font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="flex-1 pr-1">
          <h4 className="font-display font-bold text-xs text-[#18181B]">
            {toast.title}
          </h4>
          <p className="text-xs text-[#52525B] mt-0.5 leading-relaxed font-normal">
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#18181B] hover:text-[#E05A47] p-1 rounded-md transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
