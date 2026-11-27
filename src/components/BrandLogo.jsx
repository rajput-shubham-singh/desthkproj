import React from 'react';

export default function BrandLogo({ onClick, subtitle = null, className = '' }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      {...(onClick ? { type: 'button', onClick } : {})}
      className={`inline-flex items-center space-x-2.5 text-left focus:outline-none hover:-translate-y-0.5 transition-transform duration-150 select-none flex-shrink-0 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* 36x36px Custom Geometric S/H Peer-Bridge Emblem */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Subtle #18181B offset shadow */}
        <rect x="3.5" y="3.5" width="30.5" height="30.5" rx="9" fill="#18181B" />
        {/* Terracotta rounded square badge */}
        <rect
          x="1.2"
          y="1.2"
          width="30.5"
          height="30.5"
          rx="9"
          fill="#D95D39"
          stroke="#18181B"
          strokeWidth="1.8"
        />
        {/* Interlocking angled S/H peer-connection strokes */}
        <path
          d="M10.2 22.5V12.2L15.4 9.5M22.7 10.4V20.7L17.5 23.4"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Peer bridge arms */}
        <path
          d="M10.2 16.5H13.4M19.5 16.5H22.7"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        {/* Center talent-discovery spark dot */}
        <circle cx="16.45" cy="16.5" r="2.1" fill="#FFFFFF" />
      </svg>

      {/* Sharp Wordmark Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-base font-extrabold tracking-tight text-[#18181B] leading-none">
            Skills for Hire
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] border border-[#18181B] leading-none">
            LPU
          </span>
        </div>
        {subtitle && (
          <span className="text-[10px] font-mono text-[#52525B] mt-0.5 leading-none">
            {subtitle}
          </span>
        )}
      </div>
    </Tag>
  );
}
