import React from 'react';
import { FERRY_SCHEDULES } from '../data/tidungData';
import { X, Ship, Clock, MapPin, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface FerryScheduleModalProps {
  onClose: () => void;
  onBookFerry: () => void;
}

export const FerryScheduleModal: React.FC<FerryScheduleModalProps> = ({
  onClose,
  onBookFerry
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-cyan-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/30 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Jadwal Kapal Penyeberangan Pulau Tidung
              </h2>
              <p className="text-xs text-slate-300">
                Pemberangkatan Reguler Setiap Hari
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

        {/* Schedules Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6 text-slate-800">
          {FERRY_SCHEDULES.map((sched, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wide">
                    {sched.type}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {sched.port}
                  </h3>
                </div>
                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Waktu Tempuh: {sched.travelTime}</span>
                </div>
              </div>

              {/* Departure Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {sched.departures.map((dep, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Rute:</span>
                      <strong className="text-slate-800">{dep.from} → {dep.to}</strong>
                    </div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                      <span>Jam Berangkat:</span>
                      <span className="text-cyan-700">{dep.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Batas Check-in:</span>
                      <span className="text-amber-700 font-semibold">{dep.checkIn}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Facilities */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1">
                {sched.facilities.map((fac, fIdx) => (
                  <span
                    key={fIdx}
                    className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{fac}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Important Notice */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Ketentuan Boarding Kapal</p>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                Manifes kapal ditutup 20 menit sebelum kapal lepas tali. Pastikan Anda telah mengunduh E-Tiket dari email atau menyiapkan kode booking untuk ditunjukkan di loket masuk dermaga.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onClose();
              onBookFerry();
            }}
            className="px-5 py-2.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Pesan Tiket Kapal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
