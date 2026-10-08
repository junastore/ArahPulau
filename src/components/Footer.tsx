import React from 'react';
import { Phone, Mail, Ship, Ticket } from 'lucide-react';
import { ArahPulauLogo } from './ArahPulauLogo';

interface FooterProps {
  onOpenInbox: () => void;
  onOpenSchedule: () => void;
  inboxCount?: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInbox, onOpenSchedule, inboxCount }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 text-xs">
      {/* Compact container: py-2.5 on mobile, py-3.5 on desktop to keep height slim & balanced */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Mobile Contact */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ArahPulauLogo size="sm" theme="dark" />
              <span className="text-[10px] text-slate-500 hidden md:inline">· Wisata Resmi Pulau Tidung</span>
            </div>

            {/* Quick WhatsApp Contact on mobile (inline with brand to save space) */}
            <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-slate-400">
              <a
                href="https://wa.me/6281289998438"
                target="_blank"
                rel="noreferrer"
                className="px-2 py-0.5 rounded-md text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800 flex items-center gap-1 transition-colors"
              >
                <Phone className="w-2.5 h-2.5 text-cyan-400" />
                <span>0812-8999-TIDUNG</span>
              </a>
            </div>
          </div>

          {/* Styled Navigation Buttons - Sleek single-line buttons on mobile */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-xs w-full sm:w-auto flex-wrap">
            <a
              href="#destinasi"
              className="px-2 sm:px-2.5 py-1 rounded-md font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 transition-all flex items-center gap-1 shrink-0"
            >
              <span>Destinasi</span>
            </a>
            <a
              href="#tiket"
              className="px-2 sm:px-2.5 py-1 rounded-md font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 transition-all flex items-center gap-1 shrink-0"
            >
              <Ticket className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Tiket</span>
            </a>
            <button
              type="button"
              onClick={onOpenSchedule}
              className="px-2 sm:px-2.5 py-1 rounded-md font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Ship className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Jadwal Kapal</span>
            </button>
            <button
              type="button"
              onClick={onOpenInbox}
              className="px-2.5 sm:px-3 py-1 rounded-md font-semibold text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 hover:border-cyan-700 transition-all flex items-center gap-1 shrink-0 cursor-pointer group"
            >
              <Mail className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Notifikasi Email</span>
              {typeof inboxCount === 'number' && inboxCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-600 text-white text-[9px] font-bold flex items-center justify-center ml-0.5">
                  {inboxCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Contact & Legal (Desktop view) */}
          <div className="hidden sm:flex items-center gap-2.5 text-[11px] text-slate-500 shrink-0">
            <a
              href="https://wa.me/6281289998438"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-0.5 rounded text-slate-400 hover:text-cyan-400 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/60 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-2.5 h-2.5 text-cyan-400" />
              <span>0812-8999-TIDUNG</span>
            </a>
            <span>·</span>
            <span>© 2026 Arah Pulau</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
