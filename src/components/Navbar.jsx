import React from 'react';
import { Plus, Sparkles, ShieldCheck, User } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenOfferModal, 
  onOpenNeedModal,
  onNavigateToAuth,
  currentUser,
  dealsCount = 0 
}) {
  const tabs = [
    { id: 'talent', label: 'Find Talent' },
    { id: 'needs', label: 'Student Needs' },
    { id: 'ratecard', label: 'Rate Guide' },
    { id: 'deals', label: 'My Deals', count: dealsCount }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EB]/95 backdrop-blur-md border-b-[1.5px] border-[#18181B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Handcrafted Stamp Logo on Left */}
        <div 
          onClick={() => setActiveTab('talent')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E05A47] text-white flex items-center justify-center font-display font-extrabold text-base border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#18181B] transition-all">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-[#18181B] leading-none">
              Skills for Hire
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#18181B]/70 mt-0.5">
              LPU Campus Edition
            </span>
          </div>
        </div>

        {/* Center: Tactile Campus Board Tabs */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-white p-1 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-display font-bold transition-all px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#FEF3C7] text-[#18181B] border-[1.5px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]'
                    : 'text-[#18181B]/70 hover:text-[#18181B] hover:bg-[#F5F2EB]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#15803D] text-white font-mono font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Tactile Action Buttons */}
        <div className="flex items-center space-x-2.5">
          
          {/* User Profile Badge ("Reg: 12304567 • My Account") vs "Student Login" */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('account')}
              className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-mono font-bold border-[1.5px] border-[#18181B] transition-all ${
                activeTab === 'account'
                  ? 'bg-[#18181B] text-white shadow-[2px_2px_0px_#18181B]'
                  : 'bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] shadow-[2px_2px_0px_#18181B]'
              }`}
              title="View full account profile details"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
              <span>Reg: {currentUser.regNo}</span>
            </button>
          ) : (
            <button
              onClick={onNavigateToAuth}
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <User className="w-3.5 h-3.5 mr-1.5 text-[#18181B]" />
              <span>Student Login</span>
            </button>
          )}

          {/* Secondary: + Offer a Skill */}
          <button
            onClick={onOpenOfferModal}
            className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#F59E0B]" />
            <span>+ Offer a Skill</span>
          </button>

          {/* Primary: + Post a Need in Terracotta Coral (#E05A47) */}
          <button
            onClick={onOpenNeedModal}
            className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
            <span className="hidden sm:inline">+ Post a Need</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t-[1.5px] border-[#18181B] bg-white py-2 px-3 text-xs overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-display font-bold whitespace-nowrap flex items-center space-x-1 ${
                isActive 
                  ? 'bg-[#FEF3C7] text-[#18181B] border-[1.5px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]' 
                  : 'text-[#18181B]/70'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="text-[10px] px-1 rounded-full bg-[#15803D] text-white font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
