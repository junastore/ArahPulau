import React, { useState } from 'react';
import { DestinationItem } from '../types';
import {
  X,
  MapPin,
  Star,
  Clock,
  Sparkles,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Camera,
  RotateCcw
} from 'lucide-react';
import {
  getEffectiveDestinationImage,
  saveStoredDestinationPhoto,
  removeStoredDestinationPhoto,
  getStoredDestinationPhoto
} from '../utils/destinationImages';

interface DestinationDetailModalProps {
  destination: DestinationItem;
  onClose: () => void;
  onBookRelatedTicket: (dest: DestinationItem) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onBookRelatedTicket
}) => {
  const [currentImage, setCurrentImage] = useState<string>(() =>
    getEffectiveDestinationImage(destination.id, destination.imageUrl)
  );
  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(() =>
    Boolean(getStoredDestinationPhoto(destination.id))
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveStoredDestinationPhoto(destination.id, dataUrl);
        setCurrentImage(dataUrl);
        setHasCustomPhoto(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetPhoto = () => {
    removeStoredDestinationPhoto(destination.id);
    setCurrentImage(getEffectiveDestinationImage(destination.id, destination.imageUrl));
    setHasCustomPhoto(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Cover Photo */}
        <div className="relative h-56 sm:h-80 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={currentImage}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Top Actions: Change photo & Close button */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <label
              title="Ganti / Upload Foto Destinasi"
              className="px-2.5 py-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full text-xs font-medium backdrop-blur-md flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-300" />
              <span>{hasCustomPhoto ? 'Ubah Foto' : 'Ganti Foto'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {hasCustomPhoto && (
              <button
                onClick={handleResetPhoto}
                title="Kembalikan foto bawaan"
                className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              {destination.categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-0.5 leading-tight">
              {destination.name}
            </h2>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{destination.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{destination.rating} ({destination.reviewsCount} Ulasan)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-slate-800">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">TIKET MASUK</span>
              <strong className="text-slate-900 text-sm">{destination.entryFee}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">WAKTU KUNJUNGAN TERBAIK</span>
              <strong className="text-slate-900 text-sm">{destination.bestTime}</strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider text-slate-400 mb-1.5">
              Tentang Destinasi Ini
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {destination.fullDesc}
            </p>
          </div>

          {/* Local Tips */}
          {destination.tips && destination.tips.length > 0 && (
            <div className="p-4 bg-cyan-50/70 border border-cyan-100 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-cyan-950">
                <Lightbulb className="w-4 h-4 text-cyan-700" />
                <span>Tips dari Penduduk Lokal Tidung</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {destination.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Aktivitas:</span>
            {destination.tags.map((t) => (
              <span key={t} className="text-slate-600">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
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
              onBookRelatedTicket(destination);
            }}
            className="px-5 py-2.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Pesan Tiket / Paket Terkait</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
