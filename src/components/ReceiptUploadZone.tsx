import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  FileCheck,
  AlertCircle,
  RefreshCw,
  Maximize2
} from 'lucide-react';

export interface ReceiptData {
  dataUrl: string;
  fileName: string;
  fileSizeText: string;
  uploadedAt: string;
}

interface ReceiptUploadZoneProps {
  receipt: ReceiptData | null;
  onReceiptChange: (receipt: ReceiptData | null) => void;
  required?: boolean;
}

// Compress image to ensure it fits comfortably in storage
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG 0.82
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
};

export const ReceiptUploadZone: React.FC<ReceiptUploadZoneProps> = ({
  receipt,
  onReceiptChange,
  required = false
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Format file tidak didukung. Mohon unggah gambar (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Ukuran file terlalu besar (maksimal 15MB).');
      return;
    }

    try {
      setIsProcessing(true);
      const compressed = await compressImage(file);
      const newReceipt: ReceiptData = {
        dataUrl: compressed,
        fileName: file.name || `bukti-transfer-${Date.now()}.jpg`,
        fileSizeText: formatFileSize(file.size),
        uploadedAt: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      onReceiptChange(newReceipt);
    } catch {
      setErrorMessage('Gagal memproses gambar bukti transaksi. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    if (e.target) e.target.value = '';
  };

  const handleRemove = () => {
    onReceiptChange(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-cyan-700" />
          <span>Upload Bukti Pembayaran</span>
        </label>

        {receipt ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Terlampir</span>
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">
            {required ? '*Wajib diunggah' : 'Opsional (Verifikasi Instan)'}
          </span>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-700 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {!receipt ? (
        /* Empty Upload Dropzone - Compact & Clean */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-3.5 sm:p-4 transition-all text-center ${
            isDragging
              ? 'border-cyan-500 bg-cyan-50/80 scale-[1.01]'
              : 'border-slate-300 hover:border-cyan-400 bg-slate-50/50 hover:bg-cyan-50/20'
          }`}
        >
          {isProcessing ? (
            <div className="py-4 flex flex-col items-center justify-center space-y-1.5">
              <RefreshCw className="w-5 h-5 text-cyan-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-700">
                Memproses bukti struk...
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="w-9 h-9 mx-auto rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  Lampirkan Bukti Transfer / Struk QRIS
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Screenshot m-Banking, QRIS, atau foto struk ATM (JPG/PNG)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Pilih File</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Kamera HP</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Uploaded Preview Card */
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 sm:p-3 space-y-2">
          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            <div
              onClick={() => setPreviewZoom(true)}
              className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shrink-0 cursor-pointer group shadow-2xs"
              title="Klik untuk melihat bukti ukuran penuh"
            >
              <img
                src={receipt.dataUrl}
                alt="Bukti Transaksi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-slate-800 truncate" title={receipt.fileName}>
                {receipt.fileName}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {receipt.fileSizeText} · {receipt.uploadedAt} WIB
              </p>

              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setPreviewZoom(true)}
                  className="text-[11px] font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Lihat</span>
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Ganti</span>
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-[11px] font-medium text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal Zoom */}
      {previewZoom && receipt && (
        <div
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewZoom(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold truncate">{receipt.fileName}</span>
              </div>
              <button
                onClick={() => setPreviewZoom(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 flex-1 flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src={receipt.dataUrl}
                alt="Preview Bukti Transaksi"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>{receipt.uploadedAt} WIB · {receipt.fileSizeText}</span>
              <button
                type="button"
                onClick={() => setPreviewZoom(false)}
                className="px-3 py-1 bg-cyan-700 text-white font-bold rounded-lg text-xs hover:bg-cyan-800 cursor-pointer"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
