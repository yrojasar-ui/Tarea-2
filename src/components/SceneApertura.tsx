/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserRole } from '../types';
import { GalleryHeaderIllustration } from './GalleryHeaderIllustration';
import {
  FileText,
  Users,
  Dna,
  Scale,
  ShieldCheck,
  ArrowRight,
  AlertOctagon,
  Clock,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface SceneAperturaProps {
  role: UserRole;
  onToggleRole: (role: UserRole) => void;
  onProceed: () => void;
}

export const SceneApertura: React.FC<SceneAperturaProps> = ({
  role,
  onToggleRole,
  onProceed,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Ilustración de cabecera con el marco vacío de la Galería Aurora */}
      <GalleryHeaderIllustration />

      {/* Tarjeta de Expediente Judicial Principal */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c152e] border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Sello de expediente en la esquina */}
        <div className="absolute -top-3 right-6 rotate-6 pointer-events-none opacity-40 sm:opacity-70">
          <div className="border-2 border-amber-500/80 px-4 py-1.5 rounded text-[11px] font-mono tracking-widest text-amber-400 font-black uppercase">
            CASO N° 2026-GAL-042
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>CRONOLOGÍA FORENSE · 23:00 H</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Expediente del caso: La sustracción en la Galería Aurora
          </h2>

          <blockquote className="p-4 rounded-xl bg-slate-950/70 border-l-4 border-amber-500 text-slate-300 text-sm sm:text-base leading-relaxed italic">
            «A las 23:00 desapareció una pintura de la Galería Aurora. La investigación se centra inicialmente
            en el guardia del turno nocturno. El expediente contiene información sobre motivos, declaraciones
            de dos testigos y una muestra hallada cerca del marco. Tu tarea consiste en interpretar las
            probabilidades y detectar conclusiones que los datos no permiten sostener».
          </blockquote>

          <p className="text-sm text-slate-300 leading-relaxed">
            Como analista forense, tu rol no es condenar ni absolver, sino desarmar falacias matemáticas habituales
            en la administración de justicia: ¿estamos contando dos veces? ¿confundimos coincidencia con veracidad?
            ¿entendemos el impacto de la probabilidad previa en una prueba científica?
          </p>
        </div>

        {/* Selector de perspectiva interactivo en la apertura */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Elegí tu perspectiva de análisis:</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ambas perspectivas buscan la verdad procesal. El rol adapta las preguntas reflexivas, pero nunca las fórmulas.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onToggleRole('fiscalia')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  role === 'fiscalia'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>Perspectiva Fiscalía</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleRole('defensa')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  role === 'defensa'
                    ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Perspectiva Defensa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fichas de las tres evidencias del caso */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs font-mono">
            Piezas de evidencia incorporadas a la causa
          </h3>
          <span className="text-xs text-slate-500 font-mono">3 ÍTEMS PERICIALES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Evidencia 1 */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  PIEZA E-01
                </span>
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Los motivos del guardia</h4>
                <p className="text-xs text-slate-400 mt-1">
                  100 expedientes de personal con datos de deudas y conflictos laborales previos.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>Tema matemático:</span>
              <span className="text-slate-300">Inclusión-Exclusión</span>
            </div>
          </div>

          {/* Evidencia 2 */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  PIEZA E-02
                </span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Declaraciones testimoniales</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Dos personas afirman haber visto al guardia salir con una bolsa a las 23:05 h.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>Tema matemático:</span>
              <span className="text-slate-300">Independencia y Condicional</span>
            </div>
          </div>

          {/* Evidencia 3 */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
                  PIEZA E-03
                </span>
                <Dna className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Muestra biológica en el marco</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Cotejo de laboratorio con 99% de sensibilidad y 1% de falsos positivos.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>Tema matemático:</span>
              <span className="text-slate-300">Teorema de Bayes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reglas deontológicas y límites éticos de la simulación */}
      <div className="p-5 rounded-xl bg-slate-900/40 border border-amber-900/40 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
          <AlertOctagon className="w-4 h-4 text-amber-400" />
          <span>Reglas fundamentales del laboratorio probatorio:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>Cero veredictos automáticos:</strong> No se calcula ningún «porcentaje de culpabilidad final».
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>No mezclar escenas:</strong> No se suman, promedian ni multiplican resultados de escenas independientes para crear un índice artificial.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>Distinguir declarar de veracidad:</strong> La probabilidad de declarar no equivale a la tasa de veracidad ni a la culpabilidad.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>Datos de laboratorio:</strong> Modelo pedagógico con números ficticios, no evidencia judicial de tribunales reales.
            </span>
          </div>
        </div>
      </div>

      {/* Botón de acción para abrir la investigación */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Podés navegar libremente entre las escenas en cualquier momento desde la barra superior.
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/10 transition-all hover:scale-[1.02]"
        >
          <span>Abrir Escena 1: Los motivos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
