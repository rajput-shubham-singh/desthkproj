import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, User, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [regNo, setRegNo] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Student"); // "Student" | "Club Coordinator"
  const [error, setError] = useState("");

  const maskRegNo = (number) => {
    if (!number || number.length < 4) return number;
    return number.slice(0, 4) + '****';
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const cleanReg = regNo.trim();

    if (!cleanReg) {
      setError("Please enter your 8-digit LPU Registration Number.");
      return;
    }

    if (!/^\d{8}$/.test(cleanReg)) {
      setError("Registration number must be exactly 8 digits (e.g., 12304567).");
      return;
    }

    setError("");

    const masked = maskRegNo(cleanReg);
    const finalDisplayName = displayName.trim() 
      ? displayName.trim() 
      : (role === 'Student' ? `Student #${masked}` : `Club Coordinator #${masked}`);

    const verifiedUser = {
      regNo: cleanReg,
      maskedRegNo: masked,
      displayName: finalDisplayName,
      role,
      verifiedAt: "Just now"
    };

    onLoginSuccess(verifiedUser);
    onClose();
  };

  const handleQuickDemo = () => {
    const demoReg = "12309876";
    const masked = maskRegNo(demoReg);
    const verifiedUser = {
      regNo: demoReg,
      maskedRegNo: masked,
      displayName: `Student #${masked}`,
      role: "Student",
      verifiedAt: "Just now"
    };
    onLoginSuccess(verifiedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/35 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-lg max-w-md w-full overflow-hidden p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#71717A] hover:text-[#18181B] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] text-xs font-semibold mb-1.5 border border-[#BBF7D0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Campus Verification</span>
          </div>
          <h3 className="font-serif font-bold text-xl text-[#18181B]">
            Verify LPU Student ID
          </h3>
          <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
            Enter your 8-digit university registration number to post skills, hire peers, or accept student needs.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 text-xs">
          
          {/* LPU Registration Number (Mandatory) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#18181B]">
                LPU Registration Number <span className="text-[#D95D39]">*</span>
              </label>
              <span className="text-[11px] text-[#71717A]">8 digits</span>
            </div>
            <input
              type="text"
              maxLength={8}
              value={regNo}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setRegNo(val);
                if (error) setError("");
              }}
              placeholder="e.g. 12304567"
              className={`w-full p-2.5 rounded-xl bg-[#F8F7F4] border text-xs text-[#18181B] font-mono tracking-wider focus:outline-none focus:bg-white transition-all ${
                error ? 'border-red-400 focus:border-red-500' : 'border-[#E5E2DC] focus:border-[#D95D39]'
              }`}
            />
            {error ? (
              <p className="text-[11px] text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                {error}
              </p>
            ) : (
              <p className="text-[11px] text-[#71717A] mt-1">
                Your full reg number is masked (e.g. 1230****) so other students can't see private details.
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block font-semibold text-[#18181B] mb-1.5">
              Select Your Campus Role:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRole("Student")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center ${
                  role === "Student"
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-sm font-semibold'
                    : 'bg-[#F8F7F4] text-[#71717A] border-[#E5E2DC] hover:text-[#18181B]'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("Club Coordinator")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center ${
                  role === "Club Coordinator"
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-sm font-semibold'
                    : 'bg-[#F8F7F4] text-[#71717A] border-[#E5E2DC] hover:text-[#18181B]'
                }`}
              >
                Club Coordinator
              </button>
            </div>
          </div>

          {/* Display Name / Alias (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#18181B]">
                Display Name / Alias <span className="text-[#71717A] font-normal">(Optional)</span>
              </label>
              <span className="text-[10px] text-[#15803D] font-medium bg-[#F0FDF4] px-1.5 py-0.2 rounded">
                Privacy Protected
              </span>
            </div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={`e.g. ${role === 'Student' ? 'Student S8 • B.Tech' : 'Club Lead C2 • Cultural Club'}`}
              className="w-full p-2.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs text-[#18181B] focus:outline-none focus:border-[#D95D39] focus:bg-white"
            />
            <p className="text-[11px] text-[#71717A] mt-1">
              Leave blank to automatically use: <strong className="text-[#18181B]">Student #{regNo.length >= 4 ? regNo.slice(0, 4) + '****' : '1230****'}</strong>
            </p>
          </div>

          {/* Quick Demo Login Option for evaluators / professors */}
          <div className="bg-[#F8F7F4] p-3 rounded-xl border border-[#E5E2DC] flex items-center justify-between">
            <div className="text-[11px] text-[#71717A]">
              <span className="font-semibold text-[#18181B] block">Testing the prototype?</span>
              <span>Skip typing and verify instantly.</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F2EFE9] text-[#D95D39] text-xs font-semibold border border-[#E5E2DC] transition-colors shadow-sm flex items-center"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Demo (12309876)
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#D95D39] hover:bg-[#C24F2D] text-white text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Verify & Continue
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

