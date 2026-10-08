import React from 'react';
import {
  Bike,
  Sun,
  Fish,
  Trees
} from 'lucide-react';

export const IslandGuideSection: React.FC = () => {
  const tips = [
    {
      icon: Bike,
      title: 'Sepeda Ontel Keliling Pulau',
      desc: 'Bebas kendaraan roda empat. Susuri jalan paving asri dari Tidung Besar menuju Jembatan Cinta dan Tidung Kecil.'
    },
    {
      icon: Fish,
      title: 'Snorkeling Ikan Badut Nemo',
      desc: 'Perairan Karang Beras dangkal berpasir putih, tempat hidup anemon alami yang ramah untuk pemula dan keluarga.'
    },
    {
      icon: Trees,
      title: 'Konservasi Mangrove & Penyu',
      desc: 'Kunjungi Museum Paus dan pusat penangkaran tukik penyu sisik di kawasan konservasi Tidung Kecil.'
    },
    {
      icon: Sun,
      title: 'Sunset & BBQ Pesisir',
      desc: 'Nikmati kelapa muda segar saat matahari terbenam, dilanjutkan pesta BBQ ikan bakar segar khas nelayan lokal.'
    }
  ];

  return (
    <section id="panduan" className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-bold text-cyan-700 tracking-widest uppercase">
          Tips Perjalanan
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Aktivitas Utama di <span className="text-cyan-700">Pulau Tidung</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
          Semua hal praktis yang perlu Anda ketahui untuk liburan berkesan dan ramah lingkungan.
        </p>
      </div>

      {/* 4 Clean Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tips.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2.5 hover:border-cyan-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
