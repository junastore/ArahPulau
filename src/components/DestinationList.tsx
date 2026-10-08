import React, { useState, useEffect } from 'react';
import { DestinationItem } from '../types';
import { MapPin, Star, Eye, Camera, Check, RotateCcw } from 'lucide-react';
import {
  getEffectiveDestinationImage,
  saveStoredDestinationPhoto,
  removeStoredDestinationPhoto,
  getStoredDestinationPhoto
} from '../utils/destinationImages';

interface DestinationListProps {
  destinations: DestinationItem[];
  onSelectDestination: (dest: DestinationItem) => void;
  onBookRelatedTicket?: (dest: DestinationItem) => void;
}

export const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  onSelectDestination
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [updateFeedback, setUpdateFeedback] = useState<{ id: string; message: string } | null>(null);

  // Load custom photos from localStorage on mount
  useEffect(() => {
    const loaded: Record<string, string> = {};
    destinations.forEach((dest) => {
      const stored = getStoredDestinationPhoto(dest.id);
      if (stored) loaded[dest.id] = stored;
    });
    setCustomPhotos(loaded);
  }, [destinations]);

  const categories = [
    { id: 'all', label: 'Semua (5)' },
    { id: 'spot-ikonik', label: 'Jembatan Cinta' },
    { id: 'museum', label: 'Museum Paus' },
    { id: 'nemo', label: 'Ternak Ikan Nemo' },
    { id: 'penyu', label: 'Penangkaran Penyu' },
    { id: 'homestay', label: 'Homestay Tidung' }
  ];

  const filtered = destinations.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleFileUpload = (destId: string, destName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveStoredDestinationPhoto(destId, dataUrl);
        setCustomPhotos((prev) => ({ ...prev, [destId]: dataUrl }));
        setUpdateFeedback({
          id: destId,
          message: `Foto ${destName} berhasil diperbarui!`
        });
        setTimeout(() => setUpdateFeedback(null), 3500);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetPhoto = (e: React.MouseEvent, destId: string, destName: string) => {
    e.stopPropagation();
    removeStoredDestinationPhoto(destId);
    setCustomPhotos((prev) => {
      const updated = { ...prev };
      delete updated[destId];
      return updated;
    });
    setUpdateFeedback({
      id: destId,
      message: `Foto ${destName} dikembalikan ke default.`
    });
    setTimeout(() => setUpdateFeedback(null), 3000);
  };

  return (
    <section id="destinasi" className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
        <div>
          <span className="text-[11px] font-bold text-cyan-700 tracking-widest uppercase">
            Eksplorasi 5 Spot Pilihan
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Destinasi & Penginapan <span className="text-cyan-700">Pulau Tidung</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
            Daftar 5 destinasi esensial: Jembatan Cinta, Museum Paus, Ternak Ikan Nemo, Penangkaran Penyu, dan Homestay AC nyaman.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto border border-slate-200/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Update notification toast */}
      {updateFeedback && (
        <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{updateFeedback.message}</span>
          </div>
          <button
            onClick={() => setUpdateFeedback(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold px-2 py-0.5 rounded cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Grid of 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const displayImage = customPhotos[item.id] || getEffectiveDestinationImage(item.id, item.imageUrl);
          const hasCustomPhoto = Boolean(customPhotos[item.id]);

          return (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={displayImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-xs">
                    {item.categoryLabel}
                  </div>

                  {/* Photo Action Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {/* Upload / Change Photo Button */}
                    <label
                      title={`Upload / Ganti Foto ${item.name}`}
                      className="px-2 py-1 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[10px] font-medium backdrop-blur-md flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Camera className="w-3 h-3 text-cyan-300" />
                      <span>{hasCustomPhoto ? 'Ubah' : 'Ganti Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.id, item.name, e)}
                      />
                    </label>

                    {/* Reset Photo (if custom photo is active) */}
                    {hasCustomPhoto && (
                      <button
                        onClick={(e) => handleResetPhoto(e, item.id, item.name)}
                        title="Kembalikan foto asli bawaan"
                        className="p-1 bg-black/60 hover:bg-black/80 text-slate-200 hover:text-white rounded-lg text-[10px] backdrop-blur-md cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Museum Paus Special Badge */}
                  {item.id === 'museum-paus' && (
                    <div className="absolute bottom-2.5 left-3 bg-cyan-900/85 backdrop-blur-xs text-cyan-200 px-2 py-0.5 rounded text-[9px] font-semibold border border-cyan-400/30">
                      {hasCustomPhoto ? 'Foto Koleksi Pengguna' : 'Foto Kerangka Paus 12M'}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-700 font-semibold">{item.entryFee}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {item.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {item.shortDesc}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDestination(item)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Detail Spot</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
