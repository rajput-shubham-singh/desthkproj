import React, { useState, useRef, useEffect } from 'react';
import { Bell, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenNeedModal,
  onNavigateToAuth,
  currentUser,
  dealsCount = 0,
  examMode = false,
  onToggleExamMode,
  notifications = [],
  onMarkAllRead
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs = [
    { id: 'talent', label: 'Explore' },
    { id: 'needs', label: 'Student Needs' },
    { id: 'deals', label: 'My Deals', count: dealsCount }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F4EF]/95 backdrop-blur-md border-b-[1.5px] border-[#18181B]">
      <div className="w-full px-6 lg:px-12 h-16 flex items-center justify-between gap-3">
        
        {/* Left: Custom Brand SVG Logo */}
        <BrandLogo onClick={() => setActiveTab('talent')} />

        {/* Center: 3 Clean Text Links with Shared layoutId Underline */}
        <nav className="hidden md:flex items-center space-x-7">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1 text-sm transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-[#18181B] font-bold'
                    : 'text-[#52525B] hover:text-[#18181B] font-medium'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[#15803D] text-white">
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#D95D39] rounded-full"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Exam Mode Toggle + Notification Bell + Account/Login + Post Need */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <motion.button
            type="button"
            whileTap={{ y: 1 }}
            onClick={() => onToggleExamMode && onToggleExamMode()}
            className={`hidden sm:inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border-[1.5px] border-[#18181B] text-xs font-mono font-bold transition-colors ${
              examMode
                ? 'bg-[#F59E0B] text-[#18181B] shadow-[2px_2px_0px_#18181B]'
                : 'bg-white text-[#18181B] hover:bg-[#FEF3C7]'
            }`}
            title="Toggle Exam Mode to mark your listings as Busy (Exams)"
          >
            <span
              className={`w-2 h-2 rounded-full border border-[#18181B] ${
                examMode ? 'bg-[#18181B]' : 'bg-[#15803D]'
              }`}
            />
            <span>Exam Mode</span>
          </motion.button>

          {/* Notification Bell with AnimatePresence Dropdown */}
          <div className="relative" ref={notifRef}>
            <motion.button
              type="button"
              whileTap={{ y: 1 }}
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg bg-white border-[1.5px] border-[#18181B] text-[#18181B] hover:bg-[#FEF3C7] transition-colors"
              aria-label="Campus Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D95D39] border border-[#18181B]" />
              )}
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -4 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-4 z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#EBEBEB]">
                    <span className="text-xs font-bold text-[#18181B]">
                      Campus Alerts ({unreadCount} unread)
                    </span>
                    {unreadCount > 0 && onMarkAllRead && (
                      <button
                        type="button"
                        onClick={onMarkAllRead}
                        className="text-[11px] font-mono text-[#D95D39] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
                          n.read
                            ? 'bg-white border-[#EBEBEB] text-[#52525B]'
                            : 'bg-[#FEF3C7]/40 border-[#18181B] text-[#18181B] font-medium'
                        }`}
                      >
                        <p>{n.message}</p>
                        <span className="text-[10px] font-mono text-[#71717A] block mt-1">
                          {n.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentUser ? (
            <button
              onClick={() => setActiveTab('account')}
              className={`px-3 py-1.5 rounded-lg border-[1.5px] border-[#18181B] text-xs font-mono font-bold transition-colors truncate max-w-[165px] ${
                activeTab === 'account'
                  ? 'bg-[#18181B] text-white'
                  : 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#BBF7D0]'
              }`}
            >
              Reg: {currentUser.regNo} · My Account
            </button>
          ) : (
            <button
              onClick={onNavigateToAuth}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-bold border-[1.5px] border-[#18181B] transition-colors"
            >
              Student Login
            </button>
          )}

          <motion.button
            whileTap={{ y: 1 }}
            onClick={onOpenNeedModal}
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] hover:shadow-[2px_2px_0px_#18181B] transition-colors flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
            <span>Post Need</span>
          </motion.button>
        </div>

      </div>

      {/* Mobile Scrollable Pill Bar */}
      <div className="md:hidden flex items-center gap-2 border-t border-[#18181B]/20 bg-white py-2 px-4 text-xs overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                isActive
                  ? 'bg-[#18181B] text-white border-[#18181B] font-bold'
                  : 'bg-[#F6F4EF] text-[#52525B] border-[#18181B]/20'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 ? ` (${tab.count})` : ''}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onToggleExamMode && onToggleExamMode()}
          className={`px-3 py-1 rounded-full border ${
            examMode
              ? 'bg-[#F59E0B] text-[#18181B] border-[#18181B] font-bold'
              : 'bg-[#F6F4EF] text-[#52525B] border-[#18181B]/20'
          }`}
        >
          {examMode ? 'Exam Mode: ON' : 'Exam Mode'}
        </button>
      </div>
    </header>
  );
}
