/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { UserRole } from '../types';
import {
  Scene1Distribution,
  calculateScene1,
  SCENE1_DEFAULT,
  formatPercent,
  formatProbability,
} from '../utils/probabilityMath';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Info,
  Scale,
  ShieldCheck,
} from 'lucide-react';

interface SceneMotivosProps {
  distribution: Scene1Distribution;
  onChangeDistribution: (dist: Scene1Distribution) => void;
  role: UserRole;
  onOpenTheory: () => void;
}

export const SceneMotivos: React.FC<SceneMotivosProps> = ({
  distribution,
  onChangeDistribution,
  role,
  onOpenTheory,
}) => {
  const soloAInputId = useId();
  const soloBInputId = useId();
  const ambosInputId = useId();

  const results = calculateScene1(distribution);

  // Manipuladores de controles con restricciones estrictas (sin alterar parámetros ajenos)
  const handleUpdate = (field: keyof Scene1Distribution, val: number) => {
    const intVal = Math.max(0, Math.floor(isNaN(val) ? 0 : val));
    const currentSumOther =
      (field === 'soloA' ? 0 : distribution.soloA) +
      (field === 'soloB' ? 0 : distribution.soloB) +
      (field === 'ambos' ? 0 : distribution.ambos);

    // El nuevo valor no puede hacer que la suma de los 3 supere 100
    const clampedVal = Math.min(intVal, 100 - currentSumOther);

    onChangeDistribution({
      ...distribution,
      [field]: clampedVal,
    });
  };

  const handleReset = () => {
    onChangeDistribution({ ...SCENE1_DEFAULT });
  };

  // Generar array de 100 expedientes para la cuadrícula
  const dossiers = React.useMemo(() => {
    const list: Array<{ id: number; category: 'soloA' | 'soloB' | 'ambos' | 'ninguno'; label: string }> = [];
    let id = 1;

    for (let i = 0; i < results.ambos; i++) {
      list.push({ id: id++, category: 'ambos', label: 'Ambos motivos (Deudas + Conflicto)' });
    }
    for (let i = 0; i < results.soloA; i++) {
      list.push({ id: id++, category: 'soloA', label: 'Solo Deudas (Evento A)' });
    }
    for (let i = 0; i < results.soloB; i++) {
      list.push({ id: id++, category: 'soloB', label: 'Solo Conflicto laboral (Evento B)' });
    }
    for (let i = 0; i < results.ninguno; i++) {
      list.push({ id: id++, category: 'ninguno', label: 'Ninguno de los dos motivos' });
    }
    return list;
  }, [results.soloA, results.soloB, results.ambos, results.ninguno]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ESCENA 1 · INCLUSIÓN - EXCLUSIÓN
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Espacio muestral Ω = 100 legajos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Los motivos: ¿Estamos contando dos veces?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Experimento: Selección uniforme al azar de un legajo entre los 100 registros del personal de seguridad.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer iniciales</span>
            </button>
            <button
              type="button"
              onClick={onOpenTheory}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-950/60 hover:bg-teal-900/60 text-teal-300 text-xs font-medium border border-teal-500/40 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Ver teoría</span>
            </button>
          </div>
        </div>

        {/* Definición de eventos */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-blue-600/30 border border-blue-400 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0">
              A
            </span>
            <div>
              <strong className="text-white block">Evento A: El legajo registra deudas financieras</strong>
              <span>Incluye expedientes con solo deudas o con ambos motivos simultáneos.</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-purple-200 flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-purple-600/30 border border-purple-400 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0">
              B
            </span>
            <div>
              <strong className="text-white block">Evento B: El legajo registra conflicto laboral previo</strong>
              <span>Incluye expedientes con solo conflicto o con ambos motivos simultáneos.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disposición en dos columnas: Controles & Cuadrícula / Venn & Comparación */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA IZQUIERDA: CONTROLES NUMÉRICOS Y CUADRÍCULA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Panel de Controles de Entrada */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Distribución de los 100 expedientes
              </h3>
              <span className="text-[11px] font-mono text-teal-400 font-semibold">
                Suma total: {results.total} / 100
              </span>
            </div>

            {/* Control Solo A */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={soloAInputId} className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>Solo A (Deudas únicamente):</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[11px]">
                    {formatPercent(results.soloA / 100, 0)}
                  </span>
                  <input
                    id={soloAInputId}
                    type="number"
                    min={0}
                    max={100 - results.soloB - results.ambos}
                    value={distribution.soloA}
                    onChange={(e) => handleUpdate('soloA', Number(e.target.value))}
                    className="w-16 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100 - results.soloB - results.ambos}
                value={distribution.soloA}
                onChange={(e) => handleUpdate('soloA', Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para Solo A"
              />
            </div>

            {/* Control Solo B */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={soloBInputId} className="font-semibold text-purple-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                  <span>Solo B (Conflicto laboral únicamente):</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[11px]">
                    {formatPercent(results.soloB / 100, 0)}
                  </span>
                  <input
                    id={soloBInputId}
                    type="number"
                    min={0}
                    max={100 - results.soloA - results.ambos}
                    value={distribution.soloB}
                    onChange={(e) => handleUpdate('soloB', Number(e.target.value))}
                    className="w-16 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100 - results.soloA - results.ambos}
                value={distribution.soloB}
                onChange={(e) => handleUpdate('soloB', Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para Solo B"
              />
            </div>

            {/* Control Ambos (Intersección A ∩ B) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={ambosInputId} className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>Ambos (Intersección A ∩ B):</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[11px]">
                    {formatPercent(results.ambos / 100, 0)}
                  </span>
                  <input
                    id={ambosInputId}
                    type="number"
                    min={0}
                    max={100 - results.soloA - results.soloB}
                    value={distribution.ambos}
                    onChange={(e) => handleUpdate('ambos', Number(e.target.value))}
                    className="w-16 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100 - results.soloA - results.soloB}
                value={distribution.ambos}
                onChange={(e) => handleUpdate('ambos', Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para Ambos"
              />
            </div>

            {/* Región Complemento Calculada: Ninguno */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                <span className="text-slate-300 font-medium">Ninguno de los dos motivos:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500">
                  100 − ({results.soloA} + {results.soloB} + {results.ambos}) =
                </span>
                <span className="font-mono font-bold text-slate-200 px-2 py-0.5 bg-slate-800 rounded">
                  {results.ninguno} legajos ({formatPercent(results.pNinguno, 0)})
                </span>
              </div>
            </div>
          </div>

          {/* Cuadrícula interactiva de los 100 expedientes (10x10) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Archivo de 100 expedientes de personal</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">1 casillero = 1 expediente</span>
            </div>

            {/* Leyenda de la cuadrícula */}
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-700/60 text-blue-300">
                <span className="w-2 h-2 rounded bg-blue-500" /> Solo A ({results.soloA})
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-700/60 text-purple-300">
                <span className="w-2 h-2 rounded bg-purple-500" /> Solo B ({results.soloB})
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-700/60 text-amber-300">
                <span className="w-2 h-2 rounded bg-amber-500" /> Ambos ({results.ambos})
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                <span className="w-2 h-2 rounded bg-slate-600" /> Ninguno ({results.ninguno})
              </span>
            </div>

            {/* Grid 10x10 */}
            <div
              className="grid grid-cols-10 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800"
              role="img"
              aria-label={`Visualización de 100 expedientes: ${results.soloA} solo con deudas, ${results.soloB} solo con conflicto, ${results.ambos} con ambos, y ${results.ninguno} sin motivos`}
            >
              {dossiers.map((doc) => {
                let bg = 'bg-slate-700/60 border-slate-600/40 text-slate-400';
                if (doc.category === 'soloA') bg = 'bg-blue-600/80 border-blue-400 text-white';
                if (doc.category === 'soloB') bg = 'bg-purple-600/80 border-purple-400 text-white';
                if (doc.category === 'ambos') bg = 'bg-amber-500 border-amber-300 text-slate-950 font-bold';

                return (
                  <div
                    key={doc.id}
                    className={`aspect-square rounded flex items-center justify-center text-[9px] font-mono border transition-all hover:scale-125 hover:z-10 cursor-help ${bg}`}
                    title={`Expediente #${doc.id.toString().padStart(3, '0')}: ${doc.label}`}
                  >
                    {doc.id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: DIAGRAMA DE VENN, COMPARACIÓN Y LIMITACIONES (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Diagrama de Venn */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Diagrama de Venn (Regiones y probabilidades)
              </h3>
              <span className="text-[11px] text-amber-400 font-mono">
                P(A ∪ B) = {formatProbability(results.pUnion, 2)}
              </span>
            </div>

            <div className="relative p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
              {/* SVG de Venn */}
              <svg viewBox="0 0 540 260" className="w-full max-w-lg h-auto" fill="none">
                {/* Espacio muestral Omega (rectángulo contenedor) */}
                <rect x="10" y="10" width="520" height="240" rx="12" fill="#0b1329" stroke="#334155" strokeWidth="2" />
                <text x="30" y="36" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  Ω = 100 expedientes (100%)
                </text>

                {/* Círculo A (Deudas) */}
                <circle cx="210" cy="135" r="95" fill="#1e3a8a" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2.5" />
                {/* Círculo B (Conflicto) */}
                <circle cx="330" cy="135" r="95" fill="#581c87" fillOpacity="0.5" stroke="#a855f7" strokeWidth="2.5" />

                {/* Etiquetas de conjuntos */}
                <text x="160" y="70" fill="#93c5fd" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
                  A: Deudas
                </text>
                <text x="160" y="88" fill="#60a5fa" fontSize="11" fontFamily="monospace">
                  Total: {results.soloA + results.ambos}%
                </text>

                <text x="380" y="70" fill="#e9d5ff" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
                  B: Conflicto
                </text>
                <text x="380" y="88" fill="#c084fc" fontSize="11" fontFamily="monospace">
                  Total: {results.soloB + results.ambos}%
                </text>

                {/* Valores en las regiones */}
                {/* Solo A */}
                <text x="175" y="140" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">
                  {results.soloA}
                </text>
                <text x="175" y="158" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="monospace">
                  P = {formatProbability(results.soloA / 100, 2)}
                </text>

                {/* Intersección (Ambos) */}
                <text x="270" y="132" textAnchor="middle" fill="#fbbf24" fontSize="18" fontFamily="monospace" fontWeight="900">
                  {results.ambos}
                </text>
                <text x="270" y="150" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">
                  A ∩ B
                </text>
                <text x="270" y="165" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                  P = {formatProbability(results.pInterseccion, 2)}
                </text>

                {/* Solo B */}
                <text x="365" y="140" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">
                  {results.soloB}
                </text>
                <text x="365" y="158" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontFamily="monospace">
                  P = {formatProbability(results.soloB / 100, 2)}
                </text>

                {/* Región Ninguno (afuera de los círculos) */}
                <text x="460" y="225" textAnchor="end" fill="#64748b" fontSize="12" fontFamily="monospace">
                  Ninguno: {results.ninguno} ({formatProbability(results.pNinguno, 2)})
                </text>
              </svg>

              {/* Rótulo aclaratorio obligatorio */}
              <p className="text-[11px] text-slate-400 italic text-center mt-2 font-mono">
                Diagrama esquemático; las cifras representan las probabilidades.
              </p>
            </div>
          </div>

          {/* Comparación inequívoca: Cálculo Incorrecto vs Cálculo Correcto */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Comparativa crítica: Adición ingenua frente al principio de inclusión-exclusión
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CÁLCULO INCORRECTO */}
              <div className="p-4 rounded-xl bg-rose-950/20 border-2 border-rose-500/60 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>CÁLCULO INCORRECTO</span>
                  </div>
                  <p className="text-xs text-rose-200">
                    Sumar las probabilidades marginales directamente sin descontar el solapamiento:
                  </p>
                  <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-rose-300 font-bold border border-rose-900/40">
                    P(A) + P(B) = {formatProbability(results.pA, 2)} + {formatProbability(results.pB, 2)}
                    <br />
                    = <span className="text-base text-rose-400 font-black">{formatPercent(results.sumaMarginalesIncorrecta, 0)}</span>
                  </div>
                </div>
                <div className="text-[11px] text-rose-300/90 font-medium">
                  <strong>Defecto:</strong> Cuenta dos veces a los {results.ambos} expedientes que registran ambos motivos simultáneamente, inflando artificialmente el resultado en +{formatPercent(results.excesoConteoDoble, 0)}.
                </div>
              </div>

              {/* CÁLCULO CORRECTO */}
              <div className="p-4 rounded-xl bg-teal-950/20 border-2 border-teal-500/60 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-teal-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>CÁLCULO CORRECTO</span>
                  </div>
                  <p className="text-xs text-teal-200">
                    Principio de adición para eventos compatibles:
                  </p>
                  <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-teal-300 font-bold border border-teal-900/40">
                    P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
                    <br />
                    = {formatProbability(results.pA, 2)} + {formatProbability(results.pB, 2)} − {formatProbability(results.pInterseccion, 2)}
                    <br />
                    = <span className="text-base text-teal-300 font-black">{formatPercent(results.pUnion, 0)}</span>
                  </div>
                </div>
                <div className="text-[11px] text-teal-300/90 font-medium">
                  <strong>Corrección:</strong> Resta la intersección una vez para que cada individuo en A ∪ B sea contabilizado exactamente una vez.
                </div>
              </div>
            </div>
          </div>

          {/* Interpretación dinámica y Limitación obligatoria */}
          <div className="space-y-3">
            {/* Interpretación dinámica */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 text-teal-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-semibold block text-white">Interpretación cuantitativa:</span>
                «Con estos valores, <strong>{Math.round(results.pUnion * 100)}%</strong> de los expedientes presenta al menos uno de los dos motivos».
              </div>
            </div>

            {/* Limitación obligatoria */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px]">
                  Límite probatorio de la inferencia:
                </span>
                «Este porcentaje describe los expedientes del conjunto ficticio. No calcula la culpabilidad del guardia».
              </div>
            </div>

            {/* Tarjeta de perspectiva (Fiscalía vs Defensa) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                {role === 'fiscalia' ? (
                  <>
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300">Pregunta de reflexión · Perspectiva Fiscalía:</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span className="text-teal-300">Pregunta de reflexión · Perspectiva Defensa:</span>
                  </>
                )}
              </div>
              {role === 'fiscalia' ? (
                <p>
                  ¿Por qué cometería un error grave la acusación si presenta ante el juez que el «{formatPercent(results.sumaMarginalesIncorrecta, 0)}» del personal tiene motivos para sospechar, en lugar del verdadero {formatPercent(results.pUnion, 0)}? ¿Qué objeción matemática le formulará la contraparte?
                </p>
              ) : (
                <p>
                  Si el guardia pertenece al {formatPercent(results.pUnion, 0)} de empleados con alguna dificultad financiera o laboral, ¿demuestra eso que fue él quien cometió el delito a las 23:00 h, o simplemente que los motivos no son exclusivos ni determinantes?
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
