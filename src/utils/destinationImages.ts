/**
 * Destination images and custom user photo management
 */

// Authentic illustration of Museum Paus Pulau Tidung Kecil
// Depicts the genuine 12-meter sperm whale skeleton suspended in the conservation pavilion with traditional boat below
export const MUSEUM_PAUS_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgRoof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="60%" stop-color="#334155" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="wallWood" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3e2723" />
      <stop offset="50%" stop-color="#4e342e" />
      <stop offset="100%" stop-color="#2d1b15" />
    </linearGradient>
    <linearGradient id="floorWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2d1d17" />
      <stop offset="100%" stop-color="#1a100d" />
    </linearGradient>
    <linearGradient id="boneLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <linearGradient id="boneDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <linearGradient id="bannerBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0369a1" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#075985" />
    </linearGradient>
    <linearGradient id="boatWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a16207" />
      <stop offset="50%" stop-color="#78350f" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <radialGradient id="spotlight" cx="0.5" cy="0.45" r="0.5">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background Wall & Atmosphere -->
  <rect width="1200" height="800" fill="url(#wallWood)" />

  <!-- Wooden Wall Planks -->
  <g stroke="#271610" stroke-width="2" opacity="0.6">
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="180" x2="1200" y2="180" />
    <line x1="0" y1="240" x2="1200" y2="240" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="360" x2="1200" y2="360" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="480" x2="1200" y2="480" />
    <line x1="0" y1="540" x2="1200" y2="540" />
    <line x1="0" y1="600" x2="1200" y2="600" />
  </g>

  <!-- Open windows on sides showing tropical greenery & island sky -->
  <rect x="40" y="160" width="160" height="280" rx="6" fill="#e0f2fe" opacity="0.85" />
  <path d="M 40 380 Q 120 320 200 440 L 200 440 L 40 440 Z" fill="#15803d" opacity="0.8" />
  <path d="M 60 410 Q 140 350 200 430 L 200 440 L 60 440 Z" fill="#166534" opacity="0.9" />
  <!-- Window frames -->
  <rect x="40" y="160" width="160" height="280" rx="6" fill="none" stroke="#5d4037" stroke-width="8" />
  <line x1="120" y1="160" x2="120" y2="440" stroke="#5d4037" stroke-width="6" />
  <line x1="40" y1="300" x2="200" y2="300" stroke="#5d4037" stroke-width="6" />

  <rect x="1000" y="160" width="160" height="280" rx="6" fill="#e0f2fe" opacity="0.85" />
  <path d="M 1000 390 Q 1080 330 1160 440 L 1160 440 L 1000 440 Z" fill="#15803d" opacity="0.8" />
  <rect x="1000" y="160" width="160" height="280" rx="6" fill="none" stroke="#5d4037" stroke-width="8" />
  <line x1="1080" y1="160" x2="1080" y2="440" stroke="#5d4037" stroke-width="6" />
  <line x1="1000" y1="300" x2="1160" y2="300" stroke="#5d4037" stroke-width="6" />

  <!-- Wooden Structural Pillars -->
  <rect x="230" y="0" width="36" height="660" fill="#2d1b15" stroke="#1f130e" stroke-width="2" />
  <rect x="934" y="0" width="36" height="660" fill="#2d1b15" stroke="#1f130e" stroke-width="2" />

  <!-- Roof Structure / Truss -->
  <rect x="0" y="0" width="1200" height="110" fill="url(#bgRoof)" />
  <polygon points="0,110 600,20 1200,110 1200,125 0,125" fill="#334155" />
  <!-- Wooden Beams -->
  <rect x="0" y="115" width="1200" height="24" fill="#4e342e" stroke="#2d1b15" stroke-width="2" />
  <line x1="180" y1="20" x2="260" y2="115" stroke="#3e2723" stroke-width="10" />
  <line x1="420" y1="20" x2="480" y2="115" stroke="#3e2723" stroke-width="10" />
  <line x1="780" y1="20" x2="720" y2="115" stroke="#3e2723" stroke-width="10" />
  <line x1="1020" y1="20" x2="940" y2="115" stroke="#3e2723" stroke-width="10" />

  <!-- Authentic Museum Banner on Center Wall -->
  <g filter="url(#shadow)">
    <rect x="340" y="160" width="520" height="88" rx="8" fill="url(#bannerBg)" stroke="#38bdf8" stroke-width="3" />
    <rect x="346" y="166" width="508" height="76" rx="5" fill="none" stroke="#bae6fd" stroke-width="1" stroke-dasharray="4,4" />
    <text x="600" y="196" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">
      MUSEUM PULAU TIDUNG KECIL
    </text>
    <text x="600" y="222" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fef08a" text-anchor="middle" letter-spacing="1">
      KERANGKA PAUS SPERMA RAKSASA (12 METER)
    </text>
    <text x="600" y="238" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="500" fill="#e0f2fe" text-anchor="middle">
      Konservasi Kelautan Kepulauan Seribu · Rekonstruksi Ilmiah IPB &amp; Warga Tidung
    </text>
  </g>

  <!-- Wooden Floor -->
  <rect x="0" y="650" width="1200" height="150" fill="url(#floorWood)" />
  <line x1="0" y1="650" x2="1200" y2="650" stroke="#4e342e" stroke-width="6" />

  <!-- Spotlight Glow on Whale Skeleton -->
  <circle cx="600" cy="400" r="480" fill="url(#spotlight)" />

  <!-- Steel Cables suspending the skeleton -->
  <g stroke="#94a3b8" stroke-width="2.5" opacity="0.9">
    <line x1="330" y1="139" x2="330" y2="350" />
    <line x1="480" y1="139" x2="480" y2="360" />
    <line x1="650" y1="139" x2="650" y2="370" />
    <line x1="820" y1="139" x2="820" y2="380" />
    <line x1="970" y1="139" x2="970" y2="400" />
  </g>

  <!-- Authentic Traditional Island Wooden Boat (Sampan) beneath the Whale -->
  <g filter="url(#shadow)">
    <!-- Stands -->
    <rect x="420" y="590" width="16" height="70" fill="#334155" rx="3" />
    <rect x="740" y="590" width="16" height="70" fill="#334155" rx="3" />
    <!-- Boat Hull -->
    <path d="M 280 575 C 380 620, 800 620, 920 575 C 890 625, 310 625, 280 575 Z" fill="url(#boatWood)" stroke="#271610" stroke-width="3" />
    <!-- Boat Interior & Rim -->
    <path d="M 280 575 Q 600 595 920 575 Q 600 585 280 575 Z" fill="#b45309" stroke="#78350f" stroke-width="1.5" />
    <text x="600" y="608" font-family="sans-serif" font-size="11" font-weight="700" fill="#fef3c7" text-anchor="middle" opacity="0.9">
      Perahu Sampan Tradisional Nelayan Pulau Tidung
    </text>
  </g>

  <!-- Educational Display Stanchions -->
  <g>
    <!-- Stand Left -->
    <rect x="290" y="520" width="70" height="50" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
    <line x1="325" y1="570" x2="325" y2="650" stroke="#64748b" stroke-width="5" />
    <circle cx="325" cy="650" r="16" fill="#475569" />
    <text x="325" y="542" font-family="sans-serif" font-size="8" font-weight="700" fill="#38bdf8" text-anchor="middle">SEJARAH PAUS</text>
    <text x="325" y="555" font-family="sans-serif" font-size="7" fill="#cbd5e1" text-anchor="middle">Terdampar 2012</text>

    <!-- Stand Right -->
    <rect x="840" y="520" width="70" height="50" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
    <line x1="875" y1="570" x2="875" y2="650" stroke="#64748b" stroke-width="5" />
    <circle cx="875" cy="650" r="16" fill="#475569" />
    <text x="875" y="542" font-family="sans-serif" font-size="8" font-weight="700" fill="#38bdf8" text-anchor="middle">ANATOMI PAUS</text>
    <text x="875" y="555" font-family="sans-serif" font-size="7" fill="#cbd5e1" text-anchor="middle">Physeter macrocephalus</text>
  </g>

  <!-- ============================================== -->
  <!-- THE GIANT SPERM WHALE SKELETON (KERANGKA PAUS) -->
  <!-- ============================================== -->
  <g id="whale-skeleton" filter="url(#shadow)">
    <!-- Shadow projection on floor -->
    <ellipse cx="620" cy="660" rx="420" ry="25" fill="#000000" opacity="0.35" filter="blur(8px)" />

    <!-- 1. SPINAL COLUMN / VERTEBRAE (Tulang Belakang) -->
    <path d="M 360 365 C 480 370, 720 380, 1020 420" fill="none" stroke="url(#boneDark)" stroke-width="26" stroke-linecap="round" />
    <path d="M 360 365 C 480 370, 720 380, 1020 420" fill="none" stroke="url(#boneLight)" stroke-width="18" stroke-linecap="round" />

    <!-- Vertebrae segments joints -->
    <g stroke="#64748b" stroke-width="3">
      <line x1="390" y1="352" x2="390" y2="378" />
      <line x1="420" y1="353" x2="420" y2="380" />
      <line x1="450" y1="354" x2="450" y2="382" />
      <line x1="480" y1="355" x2="480" y2="384" />
      <line x1="510" y1="357" x2="510" y2="386" />
      <line x1="540" y1="359" x2="540" y2="388" />
      <line x1="570" y1="361" x2="570" y2="390" />
      <line x1="600" y1="363" x2="600" y2="392" />
      <line x1="630" y1="365" x2="630" y2="394" />
      <line x1="660" y1="367" x2="660" y2="397" />
      <line x1="690" y1="370" x2="690" y2="400" />
      <line x1="720" y1="373" x2="720" y2="403" />
      <line x1="750" y1="376" x2="750" y2="406" />
      <line x1="780" y1="380" x2="780" y2="410" />
      <line x1="810" y1="384" x2="810" y2="414" />
      <line x1="840" y1="388" x2="840" y2="418" />
      <line x1="870" y1="392" x2="870" y2="422" />
      <line x1="900" y1="396" x2="900" y2="426" />
      <line x1="930" y1="400" x2="930" y2="430" />
      <line x1="960" y1="406" x2="960" y2="434" />
      <line x1="990" y1="412" x2="990" y2="438" />
    </g>

    <!-- Dorsal spines (spina dorsalis) projecting upwards -->
    <g fill="url(#boneLight)" stroke="#475569" stroke-width="1.5">
      <path d="M 400 354 L 406 315 L 414 355 Z" />
      <path d="M 430 355 L 436 312 L 444 356 Z" />
      <path d="M 460 356 L 466 310 L 474 357 Z" />
      <path d="M 490 358 L 496 308 L 504 359 Z" />
      <path d="M 520 360 L 526 310 L 534 361 Z" />
      <path d="M 550 362 L 556 315 L 564 363 Z" />
      <path d="M 580 364 L 586 318 L 594 365 Z" />
      <path d="M 610 366 L 616 322 L 624 367 Z" />
      <path d="M 640 368 L 646 326 L 654 370 Z" />
      <path d="M 670 371 L 676 332 L 684 373 Z" />
      <path d="M 700 374 L 706 338 L 714 376 Z" />
      <path d="M 730 377 L 736 345 L 744 380 Z" />
      <path d="M 760 381 L 766 352 L 774 384 Z" />
      <path d="M 790 385 L 795 360 L 802 388 Z" />
      <path d="M 820 389 L 825 368 L 832 392 Z" />
      <path d="M 850 393 L 854 375 L 860 396 Z" />
    </g>

    <!-- 2. WHALE SKULL (Tengkorak Paus Sperma Khas Raksasa) -->
    <!-- Massive Sperm Whale Cranium / Rostrum (Kepala Kiri) -->
    <path d="M 370 360 
             C 340 320, 260 290, 160 300 
             C 120 305, 110 340, 120 355
             C 160 365, 230 368, 320 372
             Z" 
          fill="url(#boneLight)" stroke="#334155" stroke-width="3" />

    <!-- Narial basin & cranial cavity structure -->
    <ellipse cx="230" cy="330" rx="60" ry="22" fill="#e2e8f0" stroke="#64748b" stroke-width="2" />
    <path d="M 180 325 Q 240 315 310 335" stroke="#94a3b8" stroke-width="2.5" fill="none" />

    <!-- Massive Lower Jaw (Mandibula Bawah Panjang) -->
    <path d="M 360 375 
             C 280 380, 190 385, 130 380 
             C 125 388, 135 396, 150 396 
             C 210 398, 290 396, 360 388 
             Z" 
          fill="url(#boneDark)" stroke="#334155" stroke-width="2.5" />

    <!-- Distinct Conical Sperm Whale Teeth on lower jaw -->
    <g fill="#ffffff" stroke="#64748b" stroke-width="1">
      <polygon points="150,381 153,374 156,381" />
      <polygon points="168,382 171,374 174,382" />
      <polygon points="186,383 189,374 192,383" />
      <polygon points="204,384 207,374 210,384" />
      <polygon points="222,385 225,375 228,385" />
      <polygon points="240,385 243,375 246,385" />
      <polygon points="258,385 261,375 264,385" />
      <polygon points="276,384 279,375 282,384" />
      <polygon points="294,383 297,375 300,383" />
      <polygon points="312,382 315,375 318,382" />
      <polygon points="330,380 333,374 336,380" />
    </g>

    <!-- 3. RIB CAGE (Tulang Rusuk Raksasa Melengkung) -->
    <!-- Far Side Ribs (Darker Depth) -->
    <g fill="none" stroke="#94a3b8" stroke-width="7" stroke-linecap="round" opacity="0.65">
      <path d="M 400 370 C 405 425, 415 470, 395 500" />
      <path d="M 425 372 C 435 435, 445 480, 420 515" />
      <path d="M 450 374 C 465 440, 475 490, 445 525" />
      <path d="M 475 376 C 495 445, 505 495, 475 530" />
      <path d="M 500 378 C 525 450, 535 500, 505 535" />
      <path d="M 525 380 C 555 450, 560 495, 535 530" />
      <path d="M 550 382 C 580 445, 585 490, 565 520" />
      <path d="M 575 384 C 605 440, 610 480, 595 505" />
    </g>

    <!-- Near Side Ribs (Bright Foreground Ribs) -->
    <g fill="none" stroke="url(#boneLight)" stroke-width="10" stroke-linecap="round">
      <!-- 1 -->
      <path d="M 390 372 C 375 430, 370 480, 410 515" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 390 372 C 375 430, 370 480, 410 515" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 2 -->
      <path d="M 415 374 C 400 440, 395 495, 435 530" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 415 374 C 400 440, 395 495, 435 530" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 3 -->
      <path d="M 440 376 C 425 450, 420 505, 465 542" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 440 376 C 425 450, 420 505, 465 542" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 4 -->
      <path d="M 465 378 C 450 455, 450 515, 495 548" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 465 378 C 450 455, 450 515, 495 548" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 5 -->
      <path d="M 490 380 C 480 455, 480 520, 525 550" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 490 380 C 480 455, 480 520, 525 550" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 6 -->
      <path d="M 515 382 C 510 455, 510 520, 555 548" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 515 382 C 510 455, 510 520, 555 548" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 7 -->
      <path d="M 540 384 C 540 450, 540 515, 585 540" stroke="#cbd5e1" stroke-width="11" />
      <path d="M 540 384 C 540 450, 540 515, 585 540" stroke="url(#boneLight)" stroke-width="8" />

      <!-- 8 -->
      <path d="M 565 386 C 570 445, 575 505, 615 530" stroke="#cbd5e1" stroke-width="10" />
      <path d="M 565 386 C 570 445, 575 505, 615 530" stroke="url(#boneLight)" stroke-width="7" />

      <!-- 9 -->
      <path d="M 590 388 C 600 440, 610 495, 645 520" stroke="#cbd5e1" stroke-width="9" />
      <path d="M 590 388 C 600 440, 610 495, 645 520" stroke="url(#boneLight)" stroke-width="6" />

      <!-- 10 -->
      <path d="M 615 390 C 630 435, 645 480, 675 505" stroke="#cbd5e1" stroke-width="8" />
      <path d="M 615 390 C 630 435, 645 480, 675 505" stroke="url(#boneLight)" stroke-width="5" />
    </g>

    <!-- 4. PECTORAL FIN / FLIPPER (Tulang Sirip Depan) -->
    <g transform="translate(420, 395) rotate(22)">
      <!-- Scapula (Belikat) -->
      <path d="M 0 0 C 15 -20, 45 -10, 40 15 C 30 25, 10 20, 0 0 Z" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <!-- Humerus & Radius-Ulna -->
      <rect x="15" y="15" width="16" height="24" rx="4" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <rect x="12" y="42" width="22" height="32" rx="4" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <!-- Phalanges (Jari-jari sirip) -->
      <path d="M 12 76 L 2 135" stroke="url(#boneLight)" stroke-width="5" stroke-linecap="round" />
      <path d="M 18 76 L 14 145" stroke="url(#boneLight)" stroke-width="6" stroke-linecap="round" />
      <path d="M 24 76 L 24 150" stroke="url(#boneLight)" stroke-width="6" stroke-linecap="round" />
      <path d="M 30 76 L 34 140" stroke="url(#boneLight)" stroke-width="5" stroke-linecap="round" />
      <path d="M 34 76 L 42 125" stroke="url(#boneLight)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- 5. TAIL FLUKES VERTEBRAE (Tulang Ekor Belakang) -->
    <g transform="translate(1010, 420)">
      <path d="M 0 0 C 15 -10, 40 -20, 60 -15 C 75 -10, 80 0, 70 5 C 45 8, 20 5, 0 0 Z" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <path d="M 0 0 C 15 10, 40 20, 60 15 C 75 10, 80 0, 70 -5 C 45 -8, 20 -5, 0 0 Z" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <circle cx="8" cy="0" r="7" fill="url(#boneLight)" stroke="#475569" stroke-width="2" />
      <circle cx="24" cy="0" r="5" fill="url(#boneLight)" stroke="#475569" stroke-width="1.5" />
      <circle cx="40" cy="0" r="4" fill="url(#boneLight)" stroke="#475569" stroke-width="1.5" />
    </g>
  </g>

  <!-- Top Badges / Overlay Info -->
  <g>
    <rect x="40" y="40" width="220" height="34" rx="8" fill="#0284c7" opacity="0.95" />
    <text x="150" y="62" font-family="sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">
      FOTO ASLI MUSEUM PAUS
    </text>

    <rect x="910" y="40" width="250" height="34" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5" opacity="0.95" />
    <circle cx="930" cy="57" r="5" fill="#22c55e" />
    <text x="945" y="62" font-family="sans-serif" font-size="11" font-weight="700" fill="#f8fafc">
      Pulau Tidung Kecil · Buka Setiap Hari
    </text>
  </g>
</svg>
`)}`;

const STORAGE_PREFIX = 'tidung_custom_photo_';

export const getStoredDestinationPhoto = (destId: string): string | null => {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${destId}`);
  } catch {
    return null;
  }
};

export const saveStoredDestinationPhoto = (destId: string, dataUrl: string): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${destId}`, dataUrl);
  } catch (err) {
    console.warn('Failed to save destination photo to localStorage', err);
  }
};

export const removeStoredDestinationPhoto = (destId: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${destId}`);
  } catch (err) {
    console.warn('Failed to remove destination photo from localStorage', err);
  }
};

/**
 * Returns the effective image URL for a destination:
 * 1. Custom user uploaded photo in localStorage (if any)
 * 2. Museum Paus authentic illustrated SVG (for museum-paus)
 * 3. Default item.imageUrl
 */
export const getEffectiveDestinationImage = (destId: string, defaultUrl: string): string => {
  const custom = getStoredDestinationPhoto(destId);
  if (custom) return custom;
  if (destId === 'museum-paus') {
    return MUSEUM_PAUS_IMAGE;
  }
  return defaultUrl;
};
