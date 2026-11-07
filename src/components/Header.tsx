/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SceneId, SCENES, UserRole } from '../types';
import { BookOpen, Scale, ShieldAlert, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  role: UserRole;
  onToggleRole: (newRole: UserRole) => void;
  onOpenTheory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  onSelectScene,
  role,
  onToggleRole,
  onOpenTheory,
}) => {
  return (
    <header className="border-b border-slate-800 bg-[#070d1e]/90 backdrop-blur-md sticky top-0 z-30">
      {/* Barra superior con advertencia institucional y selector de rol */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/60 text-xs">
        {/* Nota discreta obligatoria */}
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium text-[11px] sm:text-xs tracking-tight">
            Simulación educativa con datos ficticios. Los resultados describen eventos del modelo, no culpabilidad.
          </span>
        </div>

        {/* Selector de perspectiva / rol: Fiscalía o Defensa */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-400 text-xs font-mono hidden md:inline">Perspectiva:</span>
          <div
            className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-700/80"
            role="group"
            aria-label="Selector de perspectiva de análisis"
          >
            <button
              type="button"
              onClick={() => onToggleRole('fiscalia')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                role === 'fiscalia'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              aria-pressed={role === 'fiscalia'}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Fiscalía</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleRole('defensa')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                role === 'defensa'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              aria-pressed={role === 'defensa'}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Defensa</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 hover:border-teal-400 text-xs font-medium transition-all shadow-sm ml-1"
            aria-label="Abrir panel Ver teoría"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold">Ver teoría</span>
          </button>
        </div>
      </div>

      {/* Título principal y navegación por escenas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PROYECTO UNIVERSITARIO
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Probabilidad y Estadística</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5 flex items-baseline gap-2">
              <span>«DUDA RAZONABLE»</span>
              <span className="text-sm sm:text-base font-normal text-slate-300 hidden sm:inline">
                · El robo en la galería
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Laboratorio interactivo de probabilidad: contrastación rigurosa de evidencia forense
            </p>
          </div>

          {/* Menú horizontal scrollable de escenas */}
          <nav
            aria-label="Navegación de escenas de la investigación"
            className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {SCENES.map((s) => {
              const isActive = currentScene === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectScene(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-amber-300 border-amber-500/60 shadow-sm font-semibold'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
