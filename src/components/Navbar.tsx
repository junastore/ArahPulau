import React, { useState } from 'react';
import {
  Compass,
  Mail,
  Ticket,
  Ship,
  ArrowRight,
  Menu,
  X,
  Phone,
  HelpCircle,
  Home
} from 'lucide-react';

import { ArahPulauLogo } from './ArahPulauLogo';

interface NavbarProps {
  onOpenInbox: () => void;
  onOpenSchedule: () => void;
  onOpenLookup: () => void;
  onQuickBook: () => void;
  inboxCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInbox,
  onOpenSchedule,
  onOpenLookup,
  onQuickBook,
  inboxCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleMobileNavClick = (callback?: () => void) => {
    setMobileMenuOpen(false);
    if (callback) callback();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 flex items-center justify-between gap-2.5">
        {/* Brand */}
        <div className="flex items-center gap-2 group shrink-0">
          <ArahPulauLogo size="md" withBadge={true} allowCustomUpload={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <a href="#destinasi" className="hover:text-cyan-700 transition-colors">
            Destinasi
          </a>
          <a href="#tiket" className="hover:text-cyan-700 transition-colors">
            Tiket & Homestay
          </a>
          <button
            onClick={onOpenSchedule}
            className="hover:text-cyan-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Ship className="w-3.5 h-3.5 text-cyan-600" />
            <span>Jadwal Kapal</span>
          </button>
          <a href="#panduan" className="hover:text-cyan-700 transition-colors">
            Panduan
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Email Notification Button */}
          <button
            onClick={onOpenInbox}
            className="relative px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-lg text-slate-700 hover:text-cyan-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Kotak Masuk Email E-Tiket"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-600" />
            <span className="hidden sm:inline">Notifikasi Email</span>
            {inboxCount > 0 && (
              <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-cyan-600 rounded-full">
                {inboxCount}
              </span>
            )}
          </button>

          {/* Ticket Lookup (Desktop) */}
          <button
            onClick={onOpenLookup}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-slate-400" />
            <span>Cek Tiket</span>
          </button>

          {/* Compact Primary CTA Button */}
          <button
            onClick={onQuickBook}
            className="px-3 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Pesan Tiket</span>
            <ArrowRight className="w-3 h-3 text-cyan-300" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <a
              href="#destinasi"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-600" />
              <span>5 Spot Destinasi</span>
            </a>

            <a
              href="#tiket"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-cyan-600" />
              <span>Tiket & Homestay</span>
            </a>

            <button
              type="button"
              onClick={() => handleMobileNavClick(onOpenSchedule)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 flex items-center gap-2 text-left cursor-pointer"
            >
              <Ship className="w-4 h-4 text-cyan-600" />
              <span>Jadwal Kapal</span>
            </button>

            <button
              type="button"
              onClick={() => handleMobileNavClick(onOpenLookup)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 flex items-center gap-2 text-left cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-cyan-600" />
              <span>Cek E-Tiket</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <a
              href="#panduan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 hover:text-cyan-700"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Panduan & FAQ</span>
            </a>

            <a
              href="https://wa.me/6281289998438"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp CS</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
