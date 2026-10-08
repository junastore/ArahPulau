import React, { useState } from 'react';
import { BookingTransaction } from '../types';
import { formatRupiah, formatDateIndonesian } from '../utils/storage';
import { X, Search, Ticket, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TicketLookupModalProps {
  bookings: BookingTransaction[];
  onClose: () => void;
  onSelectBooking: (booking: BookingTransaction) => void;
}

export const TicketLookupModal: React.FC<TicketLookupModalProps> = ({
  bookings,
  onClose,
  onSelectBooking
}) => {
  const [query, setQuery] = useState<string>('bangjuna876@gmail.com');
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const trimmed = query.trim().toLowerCase();
  const searchResults = bookings.filter((b) => {
    if (!trimmed) return false;
    return (
      b.id.toLowerCase().includes(trimmed) ||
      b.customer.email.toLowerCase().includes(trimmed) ||
      b.customer.phone.includes(trimmed)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-cyan-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/30 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Cek E-Tiket Wisata</h2>
              <p className="text-xs text-slate-300">
                Lacak status pemesanan & e-tiket resmi Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Masukkan Kode Booking / Alamat Email
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Misal: TID-78429 atau email Anda..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHasSearched(true);
                }}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
              />
            </div>
          </div>

          {/* Results list */}
          <div className="space-y-3 pt-1">
            {hasSearched && searchResults.length > 0 ? (
              searchResults.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onClose();
                    onSelectBooking(b);
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        #{b.id}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        LUNAS
                      </span>
                      {b.receiptImage && (
                        <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-1.5 py-0.5 rounded">
                          BUKTI STRUK ✓
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-700 mt-0.5">{b.ticketTitle}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Berangkat: {b.departureDate} ({b.passengersCount} Pax)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-cyan-800">{formatRupiah(b.totalPrice)}</span>
                    <div className="flex items-center gap-1 text-[11px] text-cyan-600 font-semibold mt-1">
                      <span>Buka Tiket</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))
            ) : hasSearched && trimmed ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                Tidak ditemukan tiket dengan kode/email "{query}". Pastikan ejaan sudah benar atau lakukan pemesanan baru.
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Ketik kode booking (contoh: TID-78429) atau alamat email pemesan.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
