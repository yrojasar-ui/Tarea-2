/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { UserRole } from '../types';
import {
  Scene3Parameters,
  calculateScene3,
  SCENE3_DEFAULT,
  SCENE3_PRESET_1,
  SCENE3_PRESET_2,
  SCENE3_PRESET_3,
  formatPercent,
  formatProbability,
  formatNumberEs,
} from '../utils/probabilityMath';
import { MathView } from './MathView';
import {
  RotateCcw,
  AlertTriangle,
  Dna,
  Info,
  Scale,
  ShieldCheck,
  Table2,
  HelpCircle,
} from 'lucide-react';

interface SceneMuestraProps {
  parameters: Scene3Parameters;
  onChangeParameters: (params: Scene3Parameters) => void;
  role: UserRole;
  onOpenTheory: () => void;
}

export const SceneMuestra: React.FC<SceneMuestraProps> = ({
  parameters,
  onChangeParameters,
  role,
  onOpenTheory,
}) => {
  const previaInputId = useId();
  const sensInputId = useId();
  const fpInputId = useId();

  const results = calculateScene3(parameters);

  // Manipuladores con conversión entre porcentaje visible y proporción interna
  const handlePreviaPctChange = (pct: number) => {
    const val = Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
    onChangeParameters({ ...parameters, previa: val / 100 });
  };

  const handleSensPctChange = (pct: number) => {
    const val = Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
    onChangeParameters({ ...parameters, sensibilidad: val / 100 });
  };

  const handleFpPctChange = (pct: number) => {
    const val = Math.min(100, Math.max(0, isNaN(pct) ? 0 : pct));
    onChangeParameters({ ...parameters, falsosPositivos: val / 100 });
  };

  const applyPreset = (preset: Scene3Parameters) => {
    onChangeParameters({ ...preset });
  };

  const handleReset = () => {
    onChangeParameters({ ...SCENE3_DEFAULT });
  };

  const previaPct = parameters.previa * 100;
  const sensPct = parameters.sensibilidad * 100;
  const fpPct = parameters.falsosPositivos * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                ESCENA 3 · TEOREMA DE BAYES
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Cotejo de muestra biológica ficticia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              La muestra: Un positivo necesita contexto
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Prueba ficticia de coincidencia biológica cerca del marco sustraído. No representa tasas de peritajes reales.
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
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-mono text-teal-400 font-bold block">H</span>
            <span className="text-slate-300">La muestra procede del sospechoso</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-mono text-slate-400 font-bold block">Hᶜ</span>
            <span className="text-slate-400">La muestra procede de otra persona</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-mono text-amber-400 font-bold block">+</span>
            <span className="text-slate-300">La prueba marca coincidencia positiva</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-mono text-slate-400 font-bold block">−</span>
            <span className="text-slate-400">La prueba no marca coincidencia</span>
          </div>
        </div>
      </div>

      {/* Disposición: Controles / Bayes y Matriz */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA IZQUIERDA: CONTROLES Y ESCENARIOS PREDEFINIDOS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Escenarios de Previa Predefinidos */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Escenarios de Probabilidad Previa P(H)
              </h3>
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-xs text-slate-400">
              Mantené f = 1% y s = 99% para comparar el efecto directo de la probabilidad de partida:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => applyPreset(SCENE3_PRESET_1)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all text-xs ${
                  Math.abs(parameters.previa - 0.0001) < 1e-6
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>Previa 0,01% (Sospechoso al azar)</span>
                  <span className="font-mono text-teal-400 font-bold">Posterior ≈ 0,98%</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">P(H) = 0,0001 · 1 de cada 10.000</span>
              </button>

              <button
                type="button"
                onClick={() => applyPreset(SCENE3_PRESET_2)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all text-xs ${
                  Math.abs(parameters.previa - 0.01) < 1e-6
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>Previa 1,00% (Indicios contextuales previos)</span>
                  <span className="font-mono text-teal-400 font-bold">Posterior = 50,00%</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">P(H) = 0,01 · 1 de cada 100</span>
              </button>

              <button
                type="button"
                onClick={() => applyPreset(SCENE3_PRESET_3)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all text-xs ${
                  Math.abs(parameters.previa - 0.10) < 1e-6
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>Previa 10,00% (Fuerte vinculación de partida)</span>
                  <span className="font-mono text-teal-400 font-bold">Posterior ≈ 91,67%</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">P(H) = 0,10 · 1 de cada 10</span>
              </button>
            </div>
          </div>

          {/* Controles de Parámetros de la Prueba */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
              Ajuste de Parámetros de la Prueba
            </h3>

            {/* 1. Previa r = P(H) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={previaInputId} className="font-semibold text-slate-200">
                  Previa r = P(H) [%]:
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">
                    r = {parameters.previa}
                  </span>
                  <input
                    id={previaInputId}
                    type="number"
                    step={0.01}
                    min={0}
                    max={100}
                    value={previaPct}
                    onChange={(e) => handlePreviaPctChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs font-mono text-slate-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min={0.01}
                max={20}
                step={0.01}
                value={previaPct}
                onChange={(e) => handlePreviaPctChange(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para probabilidad previa r"
              />
              <p className="text-[10px] text-slate-500 font-mono">
                Permite valores pequeños como 0,01% sin redondear a cero.
              </p>
            </div>

            {/* 2. Sensibilidad s = P(+ | H) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={sensInputId} className="font-semibold text-teal-300">
                  Sensibilidad s = P(+ | H) [%]:
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">
                    s = {parameters.sensibilidad}
                  </span>
                  <input
                    id={sensInputId}
                    type="number"
                    step={0.1}
                    min={0}
                    max={100}
                    value={sensPct}
                    onChange={(e) => handleSensPctChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-teal-400"
                  />
                  <span className="text-xs font-mono text-slate-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={0.1}
                value={sensPct}
                onChange={(e) => handleSensPctChange(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para sensibilidad de la prueba"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Falsos negativos (1 − s): {formatPercent(results.falsosNegativos, 1)}</span>
              </div>
            </div>

            {/* 3. Falsos positivos f = P(+ | Hc) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={fpInputId} className="font-semibold text-rose-300">
                  Falsos positivos f = P(+ | Hᶜ) [%]:
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">
                    f = {parameters.falsosPositivos}
                  </span>
                  <input
                    id={fpInputId}
                    type="number"
                    step={0.1}
                    min={0}
                    max={100}
                    value={fpPct}
                    onChange={(e) => handleFpPctChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 text-right bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-white focus:outline-none focus:border-rose-400"
                  />
                  <span className="text-xs font-mono text-slate-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={0.1}
                value={fpPct}
                onChange={(e) => handleFpPctChange(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                aria-label="Deslizador para tasa de falsos positivos"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Especificidad (1 − f): {formatPercent(results.especificidad, 1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADO BAYESIANO, MATRIZ ESPERADA Y ADVERTENCIA (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tarjeta de Actualización Bayesiana: Previa vs Posterior */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Dna className="w-4 h-4 text-teal-400" />
                <span>Actualización Bayesiana de la Evidencia</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                P(+) = {formatProbability(results.pPositivo, 6)}
              </span>
            </div>

            {/* Comparación visual entre Previa y Posterior */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  Probabilidad Previa P(H):
                </span>
                <div className="text-xl sm:text-2xl font-mono font-black text-amber-400">
                  {formatPercent(results.previa, 4)}
                </div>
                <p className="text-[11px] text-slate-500">
                  Antes de conocer el resultado del análisis de laboratorio.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/20 border-2 border-teal-500/60 space-y-1">
                <span className="text-xs text-teal-300 block font-medium">
                  Probabilidad Posterior P(H | +):
                </span>
                {results.estaDefinida && results.pPosterior !== null ? (
                  <>
                    <div className="text-xl sm:text-2xl font-mono font-black text-teal-300">
                      {formatPercent(results.pPosterior, 4)}
                    </div>
                    <p className="text-[11px] text-teal-400 font-mono">
                      ≈ {formatProbability(results.pPosterior, 8)}
                    </p>
                  </>
                ) : (
                  <div className="text-xs text-rose-400 font-bold p-1">
                    {results.mensajeIndefinido}
                  </div>
                )}
              </div>
            </div>

            {/* Sustitución matemática formal de Bayes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block">
                Fórmula con sustitución numérica actualizada:
              </span>
              {results.estaDefinida && results.pPosterior !== null ? (
                <div className="overflow-x-auto py-1 text-slate-200">
                  <MathView
                    math={`P(H \\mid +) = \\frac{${results.sensibilidad} \\times ${results.previa}}{(${results.sensibilidad} \\times ${results.previa}) + (${results.falsosPositivos} \\times ${formatProbability(1 - results.previa, 4)})} = \\frac{${formatProbability(results.sensibilidad * results.previa, 6)}}{${formatProbability(results.pPositivo, 6)}} = ${formatProbability(results.pPosterior, 8)}`}
                    block
                  />
                </div>
              ) : (
                <p className="text-rose-400 font-bold">
                  {results.mensajeIndefinido}
                </p>
              )}
            </div>
          </div>

          {/* Matriz de Valores Esperados para N = 100.000 comparaciones */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Table2 className="w-4 h-4 text-slate-400" />
                <span>Matriz de Valores Esperados en 100.000 comparaciones hipotéticas</span>
              </h3>
              <span className="text-[10px] font-mono text-teal-400 font-semibold">
                N = 100.000
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Cada celda muestra el número promedio de casos esperado si se evaluaran 100.000 sospechosos hipotéticos:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                    <th className="p-2 text-left">Estado Real \ Resultado</th>
                    <th className="p-2 bg-slate-950/80 text-teal-300">Positivo (+)</th>
                    <th className="p-2 bg-slate-950/80 text-slate-400">Negativo (−)</th>
                    <th className="p-2 text-right">Total Hipótesis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {/* Fila H (Es el donante) */}
                  <tr>
                    <td className="p-2 text-left font-sans font-semibold text-slate-200">
                      H (Es el sospechoso)
                    </td>
                    <td className="p-2 bg-teal-950/20 text-teal-300 font-bold">
                      {formatNumberEs(results.verdaderosPositivos, 1)}
                      <span className="block text-[9px] text-teal-500 font-normal">Verdaderos (+)</span>
                    </td>
                    <td className="p-2 text-slate-400">
                      {formatNumberEs(results.falsosNegativosCasos, 1)}
                      <span className="block text-[9px] text-slate-500 font-normal">Falsos (−)</span>
                    </td>
                    <td className="p-2 text-right text-slate-300">
                      {formatNumberEs(results.verdaderosPositivos + results.falsosNegativosCasos, 1)}
                    </td>
                  </tr>

                  {/* Fila Hc (No es el donante) */}
                  <tr>
                    <td className="p-2 text-left font-sans font-semibold text-slate-400">
                      Hᶜ (Otra persona)
                    </td>
                    <td className="p-2 bg-rose-950/20 text-rose-300 font-bold">
                      {formatNumberEs(results.falsosPositivosCasos, 1)}
                      <span className="block text-[9px] text-rose-400 font-normal">Falsos (+)</span>
                    </td>
                    <td className="p-2 text-slate-300">
                      {formatNumberEs(results.verdaderosNegativosCasos, 1)}
                      <span className="block text-[9px] text-slate-500 font-normal">Verdaderos (−)</span>
                    </td>
                    <td className="p-2 text-right text-slate-300">
                      {formatNumberEs(results.falsosPositivosCasos + results.verdaderosNegativosCasos, 1)}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-slate-700 bg-slate-950/60 font-mono text-xs font-bold">
                  <tr>
                    <td className="p-2 text-left font-sans text-slate-300">Total Prueba</td>
                    <td className="p-2 text-amber-300">
                      {formatNumberEs(results.verdaderosPositivos + results.falsosPositivosCasos, 1)}
                      <span className="block text-[9px] text-slate-400 font-normal">Total Positivos</span>
                    </td>
                    <td className="p-2 text-slate-300">
                      {formatNumberEs(results.falsosNegativosCasos + results.verdaderosNegativosCasos, 1)}
                    </td>
                    <td className="p-2 text-right text-teal-400">
                      {formatNumberEs(results.sumaMatriz, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Aclaración obligatoria sobre valores esperados */}
            <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              Nota epistemológica: Son <strong>valores esperados</strong> matemáticos calculados como N × probabilidad, por lo que admiten cifras decimales. No representan personas fraccionadas ni observaciones empíricas reales.
            </p>
          </div>

          {/* Explicaciones obligatorias y Falacia del Fiscal */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Puntos críticos sobre el teorema de Bayes en juicio:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>
                <strong>No confundir P(+ | H) con P(H | +):</strong> La sensibilidad describe cómo reacciona el reactivo ante la muestra del sospechoso (99%). La posterior describe la probabilidad de que el sospechoso sea el origen una vez que dio positivo.
              </li>
              <li>
                <strong>La previa no es el censo municipal:</strong> La probabilidad a priori es un supuesto metodológico educativo; no surge mágicamente dividiendo 1 entre los habitantes de una ciudad.
              </li>
              <li>
                <strong>Origen de muestra ≠ culpabilidad:</strong> Aun si la muestra perteneciera al guardia, eso no demuestra por sí solo que haya robado la pintura (pudo haber tocado el marco en sus rondas habituales).
              </li>
              <li>
                <strong>Evitar la expresión «99% de precisión»:</strong> Es engañosa porque enmascara la diferencia entre sensibilidad, especificidad y valor predictivo positivo.
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
                Si el fiscal afirma en su alegato que «la prueba tiene 99% de precisión, por ende hay un 99% de certeza de que el sospechoso estuvo allí», ¿por qué incurre en la falacia del fiscal y cómo se desploma su argumento si la previa era de 0,01%?
              </p>
            ) : (
              <p>
                Con una probabilidad previa baja (0,01%), de los {formatNumberEs(results.verdaderosPositivos + results.falsosPositivosCasos, 1)} positivos esperados, ¿cuántos son falsos positivos ({formatNumberEs(results.falsosPositivosCasos, 1)}) frente a verdaderos ({formatNumberEs(results.verdaderosPositivos, 1)})? ¿Cómo ilustra esto la duda razonable?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
