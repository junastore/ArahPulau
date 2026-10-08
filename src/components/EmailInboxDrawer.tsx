import React, { useState } from 'react';
import { BookingTransaction } from '../types';
import { formatRupiah, formatDateIndonesian } from '../utils/storage';
import {
  X,
  Mail,
  CheckCircle2,
  Calendar,
  User,
  MapPin,
  Clock,
  Printer,
  Send,
  Search,
  Sparkles,
  Inbox
} from 'lucide-react';

interface EmailInboxDrawerProps {
  bookings: BookingTransaction[];
  onClose: () => void;
  onOpenBookingDetail: (booking: BookingTransaction) => void;
}

export const EmailInboxDrawer: React.FC<EmailInboxDrawerProps> = ({
  bookings,
  onClose,
  onOpenBookingDetail
}) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || ''
  );
  const [searchEmail, setSearchEmail] = useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    if (!searchEmail) return true;
    const term = searchEmail.toLowerCase();
    return (
      b.id.toLowerCase().includes(term) ||
      b.customer.email.toLowerCase().includes(term) ||
      b.customer.fullName.toLowerCase().includes(term) ||
      b.ticketTitle.toLowerCase().includes(term)
    );
  });

  const selectedBooking =
    bookings.find((b) => b.id === selectedBookingId) || filteredBookings[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-cyan-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/30 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Kotak Masuk Notifikasi Email
              </h2>
              <p className="text-xs text-slate-300">
                Sistem E-Tiket Otomatis Arah Pulau
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

        {/* Search in Drawer */}
        <div className="p-3 bg-slate-100 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari email (misal: bangjuna876@gmail.com) atau nomor booking..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Content: List + Detail */}
        {bookings.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
            <Inbox className="w-12 h-12 text-slate-300 mb-3" />
            <p className="font-bold text-slate-700 text-sm">Belum ada email yang terkirim</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Lakukan pemesanan tiket terlebih dahulu. Setelah transaksi selesai, notifikasi email resmi akan otomatis tercatat di sini.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* List of Emails sent */}
            <div className="border-b border-slate-200 max-h-52 overflow-y-auto divide-y divide-slate-100 bg-slate-50">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBookingId(b.id)}
                  className={`p-3 cursor-pointer text-xs transition-colors flex items-start justify-between gap-3 ${
                    selectedBooking?.id === b.id
                      ? 'bg-cyan-50/80 border-l-4 border-cyan-600'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="truncate">{b.customer.fullName}</span>
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="text-cyan-700 font-mono text-[11px]">#{b.id}</span>
                    </div>
                    <p className="text-slate-600 truncate mt-0.5">
                      [E-TIKET RESMI] Konfirmasi Wisata Pulau Tidung - {b.ticketTitle}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Penerima: {b.customer.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded block">
                      Terkirim
                    </span>
                    {b.receiptImage && (
                      <span className="text-[9px] text-cyan-800 font-bold bg-cyan-100 px-1.5 py-0.5 rounded block">
                        Struk ✓
                      </span>
                    )}
                    <p className="text-[10px] text-slate-400">
                      {new Date(b.emailSentAt).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Detail View for Selected Item */}
            {selectedBooking && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white text-slate-800">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      [E-TIKET RESMI] Konfirmasi Transaksi #{selectedBooking.id}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                      <p>
                        Pengirim: <strong>tiket@arahpulau.id (Arah Pulau Official)</strong>
                      </p>
                      <p>
                        Penerima: <strong>{selectedBooking.customer.email}</strong>
                      </p>
                      <p>
                        Waktu Kirim: {new Date(selectedBooking.emailSentAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBookingDetail(selectedBooking)}
                    className="px-3 py-1.5 text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    Buka E-Tiket Penuh
                  </button>
                </div>

                {/* Email Body Snippet */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pembayaran Diterima - Status: LUNAS</span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    Halo <strong>{selectedBooking.customer.fullName}</strong>, terima kasih telah memesan tiket di Arah Pulau. Tiket penyeberangan dan paket wisata Anda telah terkonfirmasi dengan jadwal berikut:
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-400 block">LAYANAN</span>
                      <strong className="text-slate-800">{selectedBooking.ticketTitle}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">TANGGAL KEBERANGKATAN</span>
                      <strong className="text-slate-800">{selectedBooking.departureDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">PELABUHAN</span>
                      <strong className="text-slate-800">{selectedBooking.departurePort}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">TOTAL BIAYA</span>
                      <strong className="text-cyan-800">{formatRupiah(selectedBooking.totalPrice)}</strong>
                    </div>
                  </div>

                  <div className="text-slate-600 text-[11px] space-y-1">
                    <p>
                      • Nomor WhatsApp: {selectedBooking.customer.phone}
                    </p>
                    <p>
                      • Tour Leader: {selectedBooking.tourGuideName} ({selectedBooking.tourGuidePhone})
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Lampiran 1: E-Tiket_{selectedBooking.id}.pdf (124 KB)</span>
                    <button
                      onClick={() => onOpenBookingDetail(selectedBooking)}
                      className="text-cyan-700 font-bold hover:underline cursor-pointer"
                    >
                      Lihat Dokumen
                    </button>
                  </div>

                  {selectedBooking.receiptImage && (
                    <div className="flex items-center justify-between text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                      <span>✓ Lampiran 2: Bukti_Bayar_{selectedBooking.id} ({selectedBooking.receiptFileName || 'Struk'})</span>
                      <button
                        onClick={() => onOpenBookingDetail(selectedBooking)}
                        className="text-emerald-900 font-bold hover:underline cursor-pointer"
                      >
                        Lihat Struk
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors cursor-pointer"
          >
            Tutup Kotak Masuk
          </button>
        </div>
      </div>
    </div>
  );
};
