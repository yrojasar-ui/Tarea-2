/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const GalleryHeaderIllustration: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#060c1d] via-[#0b1736] to-[#081026] border border-amber-900/30 shadow-2xl ${
        compact ? 'h-36 sm:h-44' : 'h-48 sm:h-64'
      }`}
      aria-label="Ilustración nocturna de la Galería Aurora: marco vacío bajo luz cenital y precinto de investigación forense"
      role="img"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1000 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Luz focal sobre el marco */}
          <radialGradient id="spotlight" cx="500" cy="80" r="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b1736" stopOpacity="0" />
          </radialGradient>
          {/* Luz ambiental secundaria */}
          <radialGradient id="ambientMoon" cx="850" cy="70" r="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#081026" stopOpacity="0" />
          </radialGradient>
          {/* Patrón de pared del museo */}
          <pattern id="wallPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 40 L 40 40 M 40 0 L 40 40" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>
        </defs>

        {/* Fondo con textura arquitectónica */}
        <rect width="1000" height="360" fill="#091024" />
        <rect width="1000" height="360" fill="url(#wallPattern)" />

        {/* Arcos neoclásicos de fondo */}
        <path d="M 120 360 L 120 160 A 80 80 0 0 1 280 160 L 280 360 Z" fill="#0d1b3d" opacity="0.6" />
        <path d="M 720 360 L 720 160 A 80 80 0 0 1 880 160 L 880 360 Z" fill="#0d1b3d" opacity="0.6" />
        <path d="M 140 360 L 140 170 A 60 60 0 0 1 260 170 L 260 360 Z" fill="#081024" opacity="0.8" />
        <path d="M 740 360 L 740 170 A 60 60 0 0 1 860 170 L 860 360 Z" fill="#081024" opacity="0.8" />

        {/* Cornisa arquitectónica superior */}
        <rect x="0" y="30" width="1000" height="12" fill="#13234d" />
        <rect x="0" y="42" width="1000" height="4" fill="#d97706" opacity="0.4" />

        {/* Ventanal alto a la derecha con luz de luna */}
        <circle cx="850" cy="70" r="140" fill="url(#ambientMoon)" />

        {/* Haz de luz cenital / proyector de galería */}
        <polygon points="460,0 540,0 680,360 320,360" fill="url(#spotlight)" opacity="0.85" />
        <ellipse cx="500" cy="30" rx="35" ry="8" fill="#fef08a" opacity="0.9" />

        {/* Marco dorado tallado y VACÍO (la pintura desaparecida) */}
        {/* Sombra del marco */}
        <rect x="424" y="94" width="152" height="192" rx="4" fill="#000000" opacity="0.65" filter="blur(8px)" />
        {/* Borde exterior del marco */}
        <rect x="420" y="90" width="160" height="200" rx="4" fill="#b45309" stroke="#fcd34d" strokeWidth="3" />
        <rect x="428" y="98" width="144" height="184" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="436" y="106" width="128" height="168" fill="#451a03" stroke="#d97706" strokeWidth="1" />
        {/* Lienzo vacío (sustraído) - Fondo de pared oscura expuesta */}
        <rect x="444" y="114" width="112" height="152" fill="#070c18" stroke="#1f2937" strokeWidth="1" />

        {/* Marcas de corte o lienzo faltante */}
        <line x1="446" y1="116" x2="454" y2="124" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="554" y1="116" x2="546" y2="124" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="446" y1="264" x2="454" y2="256" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="554" y1="264" x2="546" y2="256" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />

        {/* Texto interno del marco vacío */}
        <text x="500" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" letterSpacing="1" opacity="0.8">
          [OBRA SUSTRAÍDA]
        </text>
        <text x="500" y="200" textAnchor="middle" fill="#d97706" fontSize="10" fontFamily="sans-serif" letterSpacing="2" opacity="0.9">
          23:00 H
        </text>

        {/* Placa identificatoria de la galería bajo el cuadro */}
        <rect x="465" y="300" width="70" height="18" rx="2" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
        <text x="500" y="312" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
          GALERÍA AURORA
        </text>

        {/* Puntero de evidencia forense (Marcador N° 3) */}
        <polygon points="560,285 585,285 572,255" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
        <text x="572" y="280" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" fontFamily="sans-serif">
          03
        </text>

        {/* Piso de parquet oscuro y zócalo */}
        <rect x="0" y="340" width="1000" height="20" fill="#050a17" />
        <line x1="0" y1="340" x2="1000" y2="340" stroke="#334155" strokeWidth="2" />

        {/* Cinta perimetral de preservación forense en diagonal */}
        <g opacity="0.85">
          <polygon points="0,350 1000,315 1000,332 0,367" fill="#fbbf24" stroke="#000" strokeWidth="1" />
          <path d="M 0,350 L 1000,315" stroke="#000" strokeWidth="2" strokeDasharray="18 18" />
          <text x="250" y="344" fill="#000000" fontSize="9" fontWeight="900" fontFamily="monospace" transform="rotate(-2 250 344)">
            EVIDENCIA FORENSE · ESCENA BAJO PERITAJE · NO PASAR
          </text>
          <text x="750" y="327" fill="#000000" fontSize="9" fontWeight="900" fontFamily="monospace" transform="rotate(-2 750 327)">
            EXP-2026-GAL-042 · ÁREA PERIMETRADA
          </text>
        </g>
      </svg>

      {/* Rótulo superior flotante de la causa */}
      <div className="absolute top-3 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/60 text-xs">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-slate-300 font-mono tracking-wider">EXPEDIENTE N° 2026/042-CR</span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-400/90 font-semibold">Galería Aurora · Sala Central</span>
      </div>

      <div className="absolute top-3 right-4 hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/60 text-xs font-mono text-slate-300">
        <span className="text-slate-400">Hora del hecho:</span>
        <span className="text-teal-400 font-bold">23:00:00 H</span>
      </div>
    </div>
  );
};
