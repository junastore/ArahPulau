import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { formatRupiah } from '../utils/storage';
import {
  Download,
  Copy,
  Check,
  Maximize2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  X,
  Upload,
  Sparkles,
  Camera,
  FolderOpen
} from 'lucide-react';

interface QrisPaymentCardProps {
  amount: number;
  customerName: string;
  bookingRef?: string;
  onPaymentSuccess?: () => void;
}

// Precise CRC-16/CCITT-FALSE
function computeCrc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
}

// Generate valid QRIS payload
function generateValidQrisPayload(options: {
  amount?: number;
  basePayload?: string | null;
}): string {
  const { amount: _amount, basePayload } = options;

  // If user supplied their authentic decoded raw QRIS string from their photo
  if (basePayload && basePayload.startsWith('000201')) {
    return basePayload;
  }

  // GoPay standard merchant payload for JB JUNA SHOP CAKUNG
  const nns = '93600914';
  const nmid = 'ID1024333344710';
  const merchantName = 'JB JUNA SHOP CAKUNG';
  const city = 'CAKUNG';
  const postal = '13910';
  const terminal = 'A01';

  // Tag 26 (Merchant Account Information)
  const sub00 = '0014ID.CO.QRIS.WWW';
  const sub01 = `0118${nns}0000000000`;
  const sub02 = `0215${nmid}`;
  const sub03 = '0303UMI';
  const tag26Val = sub00 + sub01 + sub02 + sub03;
  const tag26 = `26${String(tag26Val.length).padStart(2, '0')}${tag26Val}`;

  // Tag 51 (Domestic Central Repository)
  const tag51Val = `0014ID.CO.QRIS.WWW0215${nmid}0303UMI`;
  const tag51 = `51${String(tag51Val.length).padStart(2, '0')}${tag51Val}`;

  // Tag 62 (Additional Data)
  const tag62Val = `0703${terminal}`;
  const tag62 = `62${String(tag62Val.length).padStart(2, '0')}${tag62Val}`;

  // Point of initiation: 11 (Static QRIS)
  let payload = `000201010211${tag26}${tag51}5204541153033605802ID59${String(merchantName.length).padStart(2, '0')}${merchantName}60${String(city.length).padStart(2, '0')}${city}61${String(postal.length).padStart(2, '0')}${postal}${tag62}6304`;

  const crc = computeCrc16(payload);
  return payload + crc;
}

export const QrisPaymentCard: React.FC<QrisPaymentCardProps> = ({
  amount,
  customerName: _customerName
}) => {
  // Stored custom QR photo from merchant
  const [customQrImage, setCustomQrImage] = useState<string | null>(() => {
    return localStorage.getItem('tidung_custom_qr_photo') || null;
  });

  const [decodedPayload, setDecodedPayload] = useState<string | null>(() => {
    return localStorage.getItem('tidung_custom_qr_payload') || null;
  });

  const [generatedQrUrl, setGeneratedQrUrl] = useState<string>('');
  const [copiedNmid, setCopiedNmid] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate QR image
  useEffect(() => {
    const payload = generateValidQrisPayload({
      amount,
      basePayload: decodedPayload
    });

    QRCode.toDataURL(payload, {
      width: 520,
      margin: 3,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setGeneratedQrUrl(url))
      .catch((err) => console.error('Error generating QR Code', err));
  }, [amount, decodedPayload]);

  const copyNmid = () => {
    navigator.clipboard.writeText('ID1024333344710');
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  // Download QR image to gallery
  const downloadQrImage = () => {
    const targetUrl = customQrImage || generatedQrUrl;
    if (!targetUrl) return;
    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = `QRIS-JB-JUNA-SHOP-${amount}.png`;
    link.click();
  };

  // Process uploaded image file & decode QR
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setCustomQrImage(dataUrl);
      localStorage.setItem('tidung_custom_qr_photo', dataUrl);

      // Attempt to decode QR with jsQR
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          try {
            const imgData = ctx.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imgData.data, imgData.width, imgData.height);
            if (code && code.data) {
              setDecodedPayload(code.data);
              localStorage.setItem('tidung_custom_qr_payload', code.data);
              setUploadStatus('Foto barcode QR berhasil diperbarui dan disinkronkan.');
            } else {
              setUploadStatus('Foto barcode QR berhasil diperbarui.');
            }
          } catch {
            setUploadStatus('Foto barcode QR berhasil diperbarui.');
          }
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleResetCustomImage = () => {
    localStorage.removeItem('tidung_custom_qr_photo');
    localStorage.removeItem('tidung_custom_qr_payload');
    setCustomQrImage(null);
    setDecodedPayload(null);
    setUploadStatus('Barcode dikembalikan ke standar QRIS resmi JB JUNA SHOP.');
  };

  const activeQrSrc = customQrImage || generatedQrUrl;

  return (
    <div className="space-y-4">
      {/* 1. Official ASPI QRIS Stand Display */}
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[350px] bg-white rounded-3xl shadow-md border border-slate-200/80 overflow-hidden text-center transition-all">
        {/* Subtle decorative top accent */}
        <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="p-4 sm:p-5 space-y-3">
          {/* Header Barcode Stand: QRIS Logo + GPN */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="text-left">
              <div className="flex items-center gap-0.5 tracking-tight leading-none">
                <span className="font-extrabold text-2xl font-mono text-slate-900 tracking-tight">
                  Q<span className="text-[#E01E2E]">R</span>IS
                </span>
              </div>
              <p className="text-[8px] font-semibold text-slate-400 tracking-tight leading-tight mt-0.5">
                Standar Pembayaran Nasional
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E01E2E] fill-current">
                <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4zm-1 6h2v6h-2V8zm0 8h2v2h-2v-2z" />
              </svg>
              <span className="text-[10px] font-black tracking-wider text-slate-800">GPN</span>
            </div>
          </div>

          {/* Merchant Info */}
          <div className="text-center pt-0.5">
            <h4 className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
              JB JUNA SHOP CAKUNG
            </h4>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="font-mono text-[11px] text-slate-500 font-medium">
                NMID: ID1024333344710
              </span>
              <span className="text-slate-300">·</span>
              <span className="font-mono text-[11px] text-slate-400 font-semibold">
                A01
              </span>
            </div>
          </div>

          {/* QR Barcode Box */}
          <div
            className="relative p-2 sm:p-2.5 bg-white rounded-2xl border-2 border-slate-200/90 inline-block shadow-inner cursor-pointer group hover:border-cyan-500 transition-all"
            onClick={() => setIsZoomed(true)}
            title="Klik untuk memperbesar QR Code"
          >
            {activeQrSrc ? (
              <img
                src={activeQrSrc}
                alt="QRIS JB JUNA SHOP CAKUNG"
                className="w-56 h-56 sm:w-60 sm:h-60 mx-auto object-contain block rounded-lg transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-56 h-56 flex flex-col items-center justify-center text-xs text-slate-400 gap-2">
                <div className="w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />
                <span>Membuat Barcode QRIS...</span>
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute inset-0 rounded-2xl bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[1px]">
              <Maximize2 className="w-4 h-4" />
              <span>Perbesar Layar Penuh</span>
            </div>
          </div>

          {/* Tagline */}
          <div className="pt-1 text-center">
            <p className="font-extrabold text-[11px] tracking-wider text-slate-700">
              SATU QRIS UNTUK SEMUA
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5">
              BCA · Mandiri · BRI · BNI · GoPay · OVO · ShopeePay · DANA · LinkAja
            </p>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
          <span>Dicetak: 93600914</span>
          <span className="font-semibold text-slate-500">Scan via m-Banking / E-Wallet</span>
        </div>
      </div>

      {/* 2. Primary Fast Actions Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={downloadQrImage}
          className="px-3.5 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:shadow"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Simpan QR ke Galeri</span>
        </button>

        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Perbesar QR</span>
        </button>

        <button
          type="button"
          onClick={copyNmid}
          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          {copiedNmid ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">NMID Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Salin NMID</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Collapsible Guide Accordion (Clean & Uncluttered) */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-2xl overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-left font-bold text-slate-700 hover:bg-slate-100/60 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-cyan-900">
            <HelpCircle className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>Cara bayar jika membuka website ini dari HP yang sama:</span>
          </div>
          {showGuide ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showGuide && (
          <div className="px-4 pb-3.5 pt-1 text-[11px] text-slate-600 border-t border-slate-200/60 space-y-1.5 leading-relaxed bg-white/70">
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                Klik tombol <strong>"Simpan QR ke Galeri"</strong> di atas.
              </li>
              <li>
                Buka aplikasi perbankan Anda (BCA Mobile, Livin Mandiri, GoPay, OVO, ShopeePay).
              </li>
              <li>
                Pilih menu <strong>QRIS</strong>, lalu tap ikon <strong>Galeri / Upload Gambar</strong>.
              </li>
              <li>
                Pilih gambar QR yang tersimpan. Nama <strong>JB JUNA SHOP CAKUNG</strong> akan terdeteksi otomatis.
              </li>
              <li>
                Selesaikan pembayaran, simpan bukti struk transfer, dan lampirkan di formulir di bawah.
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* 4. Subtle Merchant Settings Link (Discreet, does not disrupt customer UI) */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => setShowAdminModal(true)}
          className="text-[11px] text-slate-400 hover:text-cyan-700 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Settings className="w-3 h-3" />
          <span>Pengaturan Barcode Toko (Admin)</span>
        </button>
      </div>

      {/* MODAL: Fullscreen QR Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="text-left">
                <h4 className="font-black text-sm text-slate-900">
                  JB JUNA SHOP CAKUNG
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  NMID: ID1024333344710 · QRIS
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 inline-block shadow-inner">
              <img
                src={activeQrSrc}
                alt="QRIS Ultra Fullscreen"
                className="w-64 h-64 sm:w-72 sm:h-72 mx-auto object-contain block rounded-lg"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Tagihan</span>
                <p className="text-base font-black text-cyan-800">{formatRupiah(amount)}</p>
              </div>
              <button
                type="button"
                onClick={downloadQrImage}
                className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Tutup Layar Penuh
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Merchant Barcode Admin / Settings (Clean modal for store owner) */}
      {showAdminModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Pengaturan Barcode Merchant
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Kelola foto QR resmi JB JUNA SHOP
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Jika Anda memiliki file foto/sticker resmi QRIS dari bank atau GoBiz, Anda dapat mengunggahnya di sini. Sistem akan otomatis mendeteksi dan menggunakannya pada halaman checkout.
              </p>

              {customQrImage ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800">Foto QR Kustom Aktif</span>
                    <button
                      type="button"
                      onClick={handleResetCustomImage}
                      className="text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Reset ke Standar
                    </button>
                  </div>
                  <img
                    src={customQrImage}
                    alt="Preview Custom QR"
                    className="w-28 h-28 object-contain rounded-lg border border-slate-200 bg-white mx-auto"
                  />
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
                  Saat ini sistem menggunakan barcode generator presisi standar QRIS ASPI Indonesia untuk <strong>JB JUNA SHOP CAKUNG (NMID: ID1024333344710)</strong>.
                </div>
              )}

              {uploadStatus && (
                <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs">
                  {uploadStatus}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah File Foto QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
