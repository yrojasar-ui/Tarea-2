/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { UserRole } from '../types';
import {
  Scene2Parameters,
  calculateScene2,
  SCENE2_SCENARIO_A,
  SCENE2_SCENARIO_B,
  formatPercent,
  formatProbability,
} from '../utils/probabilityMath';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Info,
  Scale,
  ShieldCheck,
  Split,
} from 'lucide-react';

interface SceneTestigosProps {
  parameters: Scene2Parameters;
  onChangeParameters: (params: Scene2Parameters) => void;
  role: UserRole;
  onOpenTheory: () => void;
}

export const SceneTestigos: React.FC<SceneTestigosProps> = ({
  parameters,
  onChangeParameters,
  role,
  onOpenTheory,
}) => {
  const pInputId = useId();
  const q1InputId = useId();
  const q0InputId = useId();
  const indepQInputId = useId();

  const [mode, setMode] = React.useState<'independiente' | 'dependiente' | 'personalizado'>('independiente');

  const results = calculateScene2(parameters);

  // Seleccionar escenario predefinido A o B
  const selectScenario = (scen: 'independiente' | 'dependiente') => {
    setMode(scen);
    if (scen === 'independiente') {
      onChangeParameters({ ...SCENE2_SCENARIO_A });
    } else {
      onChangeParameters({ ...SCENE2_SCENARIO_B });
    }
  };

  const handlePChange = (val: number) => {
    const clamped = Math.min(0.99, Math.max(0.01, isNaN(val) ? 0.01 : val));
    onChangeParameters({ ...parameters, p: clamped });
  };

  // En modo independiente, cambiar un único control mantiene q1 = q0
  const handleIndepQChange = (val: number) => {
    const clamped = Math.min(1.0, Math.max(0.0, isNaN(val) ? 0.0 : val));
    onChangeParameters({
      ...parameters,
      q1: clamped,
      q0: clamped,
    });
  };

  // En modo condicionales ajustables, q1 y q0 por separado
  const handleQ1Change = (val: number) => {
    const clamped = Math.min(1.0, Math.max(0.0, isNaN(val) ? 0.0 : val));
    onChangeParameters({ ...parameters, q1: clamped });
    setMode('personalizado');
  };

  const handleQ0Change = (val: number) => {
    const clamped = Math.min(1.0, Math.max(0.0, isNaN(val) ? 0.0 : val));
    onChangeParameters({ ...parameters, q0: clamped });
    setMode('personalizado');
  };

  const handleReset = () => {
    selectScenario('independiente');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                ESCENA 2 · PROBABILIDAD CONDICIONAL E INDEPENDENCIA
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Declaraciones testimoniales</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Los testigos: Coincidir no es lo mismo que tener razón
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Las probabilidades modelan la emisión de declaraciones, no la veracidad del hecho.
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
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
            <strong className="text-teal-300 block mb-0.5">E₁: Testigo 1 declara incriminación</strong>
            <span>Declara haber visto al guardia salir a las 23:05 h portando una bolsa. Complemento E₁ᶜ: No declara.</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
            <strong className="text-teal-300 block mb-0.5">E₂: Testigo 2 declara incriminación</strong>
            <span>Declara haber visto al guardia salir a las 23:05 h portando una bolsa. Complemento E₂ᶜ: No declara.</span>
          </div>
        </div>
      </div>

      {/* Disposición: Controles / Árbol y Tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA IZQUIERDA: CONTROLES Y ESCENARIOS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selector de Modelo / Escenario */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Selector de Escenario
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => selectScenario('independiente')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'independiente'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>A. Modelo independiente</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                    q₁ = q₀ = 60%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-normal">
                  P(E₁) = 70%, q₁ = 60%, q₀ = 60%.
                </p>
              </button>

              <button
                type="button"
                onClick={() => selectScenario('dependiente')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'dependiente'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>B. Modelo dependiente</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-400">
                    q₁=85%, q₀=20%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-normal">
                  P(E₁) = 70%, q₁ = 85%, q₀ = 20%.
                </p>
              </button>
            </div>

            {/* Banner de estado de independencia */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-400">Diagnóstico del modelo:</span>
              {results.esIndependiente ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Eventos Estadísticamente Independientes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">
                  <Split className="w-3.5 h-3.5" />
                  Eventos Condicionalmente Dependientes
                </span>
              )}
            </div>

            {/* Controles de Parámetros */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* Parámetro p = P(E1) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={pInputId} className="font-semibold text-slate-200">
                    p = P(E₁) [Testigo 1 declara]:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-400 font-bold text-xs">
                      {formatPercent(results.p, 1)}
                    </span>
                    <input
                      id={pInputId}
                      type="number"
                      step={0.01}
                      min={0.01}
                      max={0.99}
                      value={results.p}
                      onChange={(e) => handlePChange(Number(e.target.value))}
                      className="w-16 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0.01}
                  max={0.99}
                  step={0.01}
                  value={results.p}
                  onChange={(e) => handlePChange(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  aria-label="Deslizador para probabilidad p de declarar el testigo 1"
                />
                <p className="text-[10px] text-slate-500 font-mono">
                  Valores interiores (1% a 99%) para asegurar condicionamiento válido.
                </p>
              </div>

              {/* Si estamos en modo independiente */}
              {mode === 'independiente' ? (
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor={indepQInputId} className="font-semibold text-teal-300">
                      P(E₂) [Probabilidad del segundo testigo]:
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-teal-400 font-bold text-xs">
                        {formatPercent(results.q1, 1)}
                      </span>
                      <input
                        id={indepQInputId}
                        type="number"
                        step={0.01}
                        min={0}
                        max={1}
                        value={results.q1}
                        onChange={(e) => handleIndepQChange(Number(e.target.value))}
                        className="w-16 px-2 py-1 text-right bg-slate-900 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={results.q1}
                    onChange={(e) => handleIndepQChange(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                    aria-label="Deslizador único para segundo testigo en modo independiente"
                  />
                  <p className="text-[11px] text-slate-400">
                    Al ser independiente, se mantiene <span className="font-mono text-teal-300">q₁ = q₀ = {formatPercent(results.q1, 1)}</span>.
                  </p>
                </div>
              ) : (
                /* Controles separados para q1 y q0 en modo dependiente / personalizado */
                <div className="space-y-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Probabilidades condicionales separadas:
                  </span>

                  {/* q1 = P(E2 | E1) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={q1InputId} className="text-slate-300 font-medium">
                        q₁ = P(E₂ | E₁) [Testigo 2 dado que Testigo 1 declaró]:
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-teal-400 font-bold text-xs">
                          {formatPercent(results.q1, 1)}
                        </span>
                        <input
                          id={q1InputId}
                          type="number"
                          step={0.01}
                          min={0}
                          max={1}
                          value={results.q1}
                          onChange={(e) => handleQ1Change(Number(e.target.value))}
                          className="w-16 px-2 py-0.5 text-right bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={results.q1}
                      onChange={(e) => handleQ1Change(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                      aria-label="Deslizador para q1"
                    />
                  </div>

                  {/* q0 = P(E2 | E1c) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={q0InputId} className="text-slate-300 font-medium">
                        q₀ = P(E₂ | E₁ᶜ) [Testigo 2 dado que Testigo 1 NO declaró]:
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-teal-400 font-bold text-xs">
                          {formatPercent(results.q0, 1)}
                        </span>
                        <input
                          id={q0InputId}
                          type="number"
                          step={0.01}
                          min={0}
                          max={1}
                          value={results.q0}
                          onChange={(e) => handleQ0Change(Number(e.target.value))}
                          className="w-16 px-2 py-0.5 text-right bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={results.q0}
                      onChange={(e) => handleQ0Change(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                      aria-label="Deslizador para q0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comparación crítica de Marginales: P(E2 | E1) frente a P(E2) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Efecto en la probabilidad marginal P(E₂)
            </h3>
            <p className="text-xs text-slate-400">
              La probabilidad general de que el segundo testigo declare resulta de la ley de probabilidad total:
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Condicional P(E₂ | E₁):</span>
                <span className="text-amber-300 font-bold">{formatPercent(results.q1, 1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Marginal total P(E₂):</span>
                <span className="text-teal-300 font-bold">{formatPercent(results.pE2, 1)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Observá cómo al pasar del escenario independiente al dependiente, la probabilidad marginal P(E₂)
              cambia de <strong>60,0%</strong> a <strong>65,5%</strong> debido al peso de la influencia condicional.
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: ÁRBOL DE PROBABILIDAD, TABLA Y DISTINCIÓN DE COINCIDENCIA (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Árbol de Probabilidades */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Árbol de Probabilidades (Ramas y Conjuntas)</span>
              </h3>
              <span className="text-[11px] text-teal-400 font-mono font-semibold">
                Suma de ramas: {formatPercent(results.sumaRamas, 1)}
              </span>
            </div>

            {/* Diagrama de Árbol en SVG */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
              <svg viewBox="0 0 620 280" className="w-full min-w-[560px] h-auto" fill="none">
                {/* Raíz del árbol */}
                <circle cx="30" cy="140" r="8" fill="#f59e0b" />
                <text x="30" y="165" fill="#fde68a" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Inicio
                </text>

                {/* Rama 1: E1 (Arriba) */}
                <line x1="38" y1="135" x2="160" y2="70" stroke="#f59e0b" strokeWidth="2" />
                <rect x="70" y="80" width="75" height="18" rx="4" fill="#0f172a" stroke="#d97706" strokeWidth="1" />
                <text x="107" y="93" fill="#fde68a" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  p = {formatProbability(results.p, 2)}
                </text>

                {/* Nodo E1 */}
                <circle cx="160" cy="70" r="7" fill="#3b82f6" />
                <text x="160" y="52" fill="#93c5fd" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  E₁ (declara)
                </text>

                {/* Subrama E1 -> E2 */}
                <line x1="167" y1="65" x2="330" y2="35" stroke="#3b82f6" strokeWidth="2" />
                <rect x="220" y="32" width="85" height="18" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                <text x="262" y="45" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  q₁ = {formatProbability(results.q1, 2)}
                </text>

                {/* Hoja 1: E1 y E2 (Ambos) */}
                <circle cx="330" cy="35" r="5" fill="#14b8a6" />
                <text x="345" y="38" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  E₁ ∩ E₂ (Ambos declaran)
                </text>
                <text x="560" y="38" fill="#14b8a6" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="end">
                  {formatProbability(results.pAmbos, 3)} ({formatPercent(results.pAmbos, 1)})
                </text>

                {/* Subrama E1 -> E2c */}
                <line x1="167" y1="75" x2="330" y2="105" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="220" y="95" width="85" height="18" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                <text x="262" y="108" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  1−q₁ = {formatProbability(1 - results.q1, 2)}
                </text>

                {/* Hoja 2: E1 y E2c (Solo primero) */}
                <circle cx="330" cy="105" r="5" fill="#64748b" />
                <text x="345" y="108" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                  E₁ ∩ E₂ᶜ (Solo testigo 1)
                </text>
                <text x="560" y="108" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="end">
                  {formatProbability(results.pSoloPrimero, 3)} ({formatPercent(results.pSoloPrimero, 1)})
                </text>

                {/* Rama 2: E1c (Abajo) */}
                <line x1="38" y1="145" x2="160" y2="210" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="70" y="180" width="75" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="107" y="193" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  1−p = {formatProbability(1 - results.p, 2)}
                </text>

                {/* Nodo E1c */}
                <circle cx="160" cy="210" r="7" fill="#64748b" />
                <text x="160" y="235" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                  E₁ᶜ (no declara)
                </text>

                {/* Subrama E1c -> E2 */}
                <line x1="167" y1="205" x2="330" y2="175" stroke="#a855f7" strokeWidth="2" />
                <rect x="220" y="172" width="85" height="18" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                <text x="262" y="185" fill="#c084fc" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  q₀ = {formatProbability(results.q0, 2)}
                </text>

                {/* Hoja 3: E1c y E2 (Solo segundo) */}
                <circle cx="330" cy="175" r="5" fill="#64748b" />
                <text x="345" y="178" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                  E₁ᶜ ∩ E₂ (Solo testigo 2)
                </text>
                <text x="560" y="178" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="end">
                  {formatProbability(results.pSoloSegundo, 3)} ({formatPercent(results.pSoloSegundo, 1)})
                </text>

                {/* Subrama E1c -> E2c */}
                <line x1="167" y1="215" x2="330" y2="245" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="220" y="235" width="85" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="262" y="248" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  1−q₀ = {formatProbability(1 - results.q0, 2)}
                </text>

                {/* Hoja 4: E1c y E2c (Ninguno) */}
                <circle cx="330" cy="245" r="5" fill="#334155" />
                <text x="345" y="248" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                  E₁ᶜ ∩ E₂ᶜ (Ninguno declara)
                </text>
                <text x="560" y="248" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="end">
                  {formatProbability(results.pNinguno, 3)} ({formatPercent(results.pNinguno, 1)})
                </text>
              </svg>
            </div>
          </div>

          {/* Tabla de los cuatro resultados */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Tabla de Resultados Conjuntos (Partición del espacio muestral)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-3 py-2 rounded-l">Resultado</th>
                    <th className="px-3 py-2">Fórmula</th>
                    <th className="px-3 py-2 text-right">Probabilidad</th>
                    <th className="px-3 py-2 rounded-r text-right">Porcentaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="bg-teal-950/20 text-teal-200">
                    <td className="px-3 py-2 font-sans font-semibold">Ambos incriminan (E₁ ∩ E₂)</td>
                    <td className="px-3 py-2 text-slate-400">p × q₁</td>
                    <td className="px-3 py-2 text-right font-bold">{formatProbability(results.pAmbos, 3)}</td>
                    <td className="px-3 py-2 text-right font-bold text-teal-300">{formatPercent(results.pAmbos, 1)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-sans">Solo primero incrimina (E₁ ∩ E₂ᶜ)</td>
                    <td className="px-3 py-2 text-slate-400">p × (1 − q₁)</td>
                    <td className="px-3 py-2 text-right">{formatProbability(results.pSoloPrimero, 3)}</td>
                    <td className="px-3 py-2 text-right">{formatPercent(results.pSoloPrimero, 1)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-sans">Solo segundo incrimina (E₁ᶜ ∩ E₂)</td>
                    <td className="px-3 py-2 text-slate-400">(1 − p) × q₀</td>
                    <td className="px-3 py-2 text-right">{formatProbability(results.pSoloSegundo, 3)}</td>
                    <td className="px-3 py-2 text-right">{formatPercent(results.pSoloSegundo, 1)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-sans text-slate-400">Ninguno incrimina (E₁ᶜ ∩ E₂ᶜ)</td>
                    <td className="px-3 py-2 text-slate-400">(1 − p) × (1 − q₀)</td>
                    <td className="px-3 py-2 text-right">{formatProbability(results.pNinguno, 3)}</td>
                    <td className="px-3 py-2 text-right">{formatPercent(results.pNinguno, 1)}</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-slate-700 bg-slate-950/60 font-mono text-xs font-bold">
                  <tr>
                    <td colSpan={2} className="px-3 py-2 text-slate-300">
                      Comprobación obligatoria (Suma de las 4 ramas):
                    </td>
                    <td className="px-3 py-2 text-right text-teal-400">{formatProbability(results.sumaRamas, 3)}</td>
                    <td className="px-3 py-2 text-right text-teal-400">{formatPercent(results.sumaRamas, 1)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Diferenciación Crucial: Ambos incriminan vs Coinciden en cualquier sentido */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Diferenciación conceptual: «Ambos incriminan» vs «Coinciden en cualquier sentido»
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-teal-300 block">1. Ambos incriminan (E₁ ∩ E₂):</span>
                <p className="text-slate-400">
                  Ambos testigos declaran positivamente haber visto salir al guardia con la bolsa.
                </p>
                <div className="pt-2 text-base font-mono font-bold text-teal-400">
                  {formatPercent(results.pAmbos, 1)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-300 block">2. Coinciden en cualquiera de los dos sentidos:</span>
                <p className="text-slate-400">
                  Coinciden ya sea porque ambos incriminan (E₁ ∩ E₂) O porque ninguno incrimina (E₁ᶜ ∩ E₂ᶜ).
                </p>
                <div className="pt-2 text-base font-mono font-bold text-amber-400">
                  P(coincidencia) = {formatPercent(results.pCoinciden, 1)}
                </div>
              </div>
            </div>
          </div>

          {/* Explicaciones obligatorias epistemológicas */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Advertencias epistemológicas y metodológicas obligatorias:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>
                <strong>La independencia es un supuesto estadístico:</strong> Estar en salas físicamente separadas no garantiza independencia probabilística (comparten contexto cultural, exposición a noticias o memoria distorsionada).
              </li>
              <li>
                <strong>Causa narrativa vs cálculo:</strong> Una conversación previa en la cafetería es una hipótesis narrativa posible de la dependencia, no una causa demostrada matemáticamente por los números.
              </li>
              <li>
                <strong>Coincidencia no es veracidad:</strong> Una mayor coincidencia testimonial no demuestra mayor veracidad histórica del hecho.
              </li>
              <li>
                <strong>Sin verdad basal no hay veredicto:</strong> Sin probabilidades condicionadas al verdadero estado del mundo (si el hecho ocurrió o no), no podemos cuantificar el valor probatorio sobre la culpabilidad.
              </li>
            </ul>
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
                ¿Por qué presentar la coincidencia de los dos testigos como un acontecimiento de probabilidad {formatPercent(results.pAmbos, 1)} sin indagar si se comunicaron entre sí debilita la solidez probatoria ante un tribunal exigente?
              </p>
            ) : (
              <p>
                Si se demuestra que los testigos hablaron durante 20 minutos antes de declarar (modelo con dependencia, q₁ = 85%), ¿cómo desarticula la defensa el argumento acusatorio de que «dos personas independientes vieron lo mismo»?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
