'use client';

import { useState } from 'react';

export default function MessengerChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-neutral-100 animate-fade-in">
          {/* Header */}
          <div className="bg-[#0866ff] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.368-1.853c.9.25 1.854.384 2.846.384 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.464-5.802 2.612 2.718 4.906-2.718-5.464 5.802z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">STARMARK Work Space</p>
              <p className="text-white/80 text-xs">มักจะตอบภายในไม่กี่นาที</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#0866ff] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.368-1.853c.9.25 1.854.384 2.846.384 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.464-5.802 2.612 2.718 4.906-2.718-5.464 5.802z"/>
                </svg>
              </div>
              <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-neutral-800 leading-relaxed">
                สวัสดีครับ! 👋<br />
                ต้องการสอบถามสินค้าหรือขอใบเสนอราคา ทักมาได้เลยครับ
              </div>
            </div>

            <a
              href="https://m.me/starmarkworkspace"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#0866ff] hover:bg-[#0757d6] text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.368-1.853c.9.25 1.854.384 2.846.384 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.464-5.802 2.612 2.718 4.906-2.718-5.464 5.802z"/>
              </svg>
              เริ่มการสนทนา
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#0866ff] hover:bg-[#0757d6] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on Messenger"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.368-1.853c.9.25 1.854.384 2.846.384 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.006 12.44l-2.548-2.718-4.97 2.718 5.464-5.802 2.612 2.718 4.906-2.718-5.464 5.802z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
