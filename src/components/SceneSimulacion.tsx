/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  Scene1Distribution,
  SimulationRunResult,
  runEmpiricalSimulation,
  formatPercent,
  formatProbability,
  formatNumberEs,
} from '../utils/probabilityMath';
import {
  Play,
  RotateCcw,
  RefreshCw,
  AlertTriangle,
  LineChart,
  Table,
  CheckCircle2,
  Info,
  Scale,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { MathView } from './MathView';

interface SceneSimulacionProps {
  scene1Distribution: Scene1Distribution;
  simResult: SimulationRunResult | null;
  onSetSimResult: (result: SimulationRunResult | null) => void;
  role: UserRole;
  onOpenTheory: () => void;
}

export const SceneSimulacion: React.FC<SceneSimulacionProps> = ({
  scene1Distribution,
  simResult,
  onSetSimResult,
  role,
  onOpenTheory,
}) => {
  const [selectedN, setSelectedN] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Probabilidad teórica actual derivada de la Escena 1
  const currentTheoreticalP =
    (scene1Distribution.soloA + scene1Distribution.soloB + scene1Distribution.ambos) / 100;

  // Comprobar si la corrida previa pertenece a otra distribución de la Escena 1
  const isStaleConfiguration =
    simResult !== null &&
    Math.abs(simResult.probabilidadTeorica - currentTheoreticalP) > 1e-6;

  const handleRun = (nToRun = selectedN) => {
    setIsRunning(true);
    // Simulación asíncrona breve para dar feedback interactivo
    setTimeout(() => {
      const res = runEmpiricalSimulation(nToRun, currentTheoreticalP);
      onSetSimResult(res);
      setIsRunning(false);
    }, 120);
  };

  const handleReset = () => {
    onSetSimResult(null);
  };

  // Renderizado del gráfico SVG de trayectoria
  const renderChart = (res: SimulationRunResult) => {
    const width = 640;
    const height = 240;
    const padding = { top: 20, right: 30, bottom: 35, left: 50 };

    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    // Escalas
    const maxN = res.n;
    const pTheor = res.probabilidadTeorica;

    // Y oscila entre 0 y 1, o enfocado alrededor de p con margen
    const minY = 0;
    const maxY = 1;

    const scaleX = (nVal: number) => padding.left + (nVal / maxN) * innerWidth;
    const scaleY = (fVal: number) => padding.top + (1 - (fVal - minY) / (maxY - minY)) * innerHeight;

    const theorY = scaleY(pTheor);

    // Puntos de la curva
    const pathD = res.puntosTrayectoria.reduce((acc, pt, idx) => {
      const x = scaleX(pt.n);
      const y = scaleY(pt.frecuenciaRelativa);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" fill="none">
        {/* Fondo del área de datos */}
        <rect
          x={padding.left}
          y={padding.top}
          width={innerWidth}
          height={innerHeight}
          fill="#060c1c"
          stroke="#1e293b"
          strokeWidth="1"
        />

        {/* Rejilla horizontal */}
        {[0.25, 0.5, 0.75].map((level) => {
          const y = scaleY(level);
          return (
            <g key={level}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#1e293b"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="10"
                fontFamily="monospace"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Ejes */}
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={width - padding.right}
          y2={padding.top + innerHeight}
          stroke="#475569"
          strokeWidth="1.5"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerHeight}
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Línea horizontal de referencia teórica p */}
        <line
          x1={padding.left}
          y1={theorY}
          x2={width - padding.right}
          y2={theorY}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text
          x={width - padding.right - 5}
          y={theorY - 6}
          textAnchor="end"
          fill="#f59e0b"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          p teórica = {formatPercent(pTheor, 1)}
        </text>

        {/* Trayectoria empírica k/n */}
        <path d={pathD} stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Punto final observado */}
        {res.puntosTrayectoria.length > 0 && (
          <circle
            cx={scaleX(res.n)}
            cy={scaleY(res.frecuenciaRelativa)}
            r="4"
            fill="#14b8a6"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        )}

        {/* Etiquetas de eje X */}
        <text
          x={padding.left}
          y={height - 12}
          textAnchor="start"
          fill="#64748b"
          fontSize="10"
          fontFamily="monospace"
        >
          n = 1
        </text>
        <text
          x={padding.left + innerWidth / 2}
          y={height - 12}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="monospace"
        >
          Total extracciones con reemplazo (n)
        </text>
        <text
          x={width - padding.right}
          y={height - 12}
          textAnchor="end"
          fill="#64748b"
          fontSize="10"
          fontFamily="monospace"
        >
          n = {res.n.toLocaleString('es-ES')}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ESCENA 4 · ENFOQUE FRECUENCIAL
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Ley de los Grandes Números</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Laboratorio de simulación: De la teoría a la frecuencia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Extracción uniforme con reemplazo sobre los 100 legajos configurados en la Escena 1 (p = {formatPercent(currentTheoreticalP, 1)}).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer simulación</span>
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

        {/* Alerta de configuración congelada / desfasada */}
        {isStaleConfiguration && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/60 text-amber-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Aviso de configuración desfasada:</strong> La distribución de la Escena 1 cambió (la p teórica pasó de{' '}
                <span className="font-mono font-bold text-white">
                  {formatPercent(simResult.probabilidadTeorica, 1)}
                </span>{' '}
                a{' '}
                <span className="font-mono font-bold text-teal-300">
                  {formatPercent(currentTheoreticalP, 1)}
                </span>
                ). Los resultados anteriores corresponden a la distribución previa.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRun()}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0"
            >
              Simular con nueva p
            </button>
          </div>
        )}
      </div>

      {/* Disposición: Controles / Gráfico y Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMNA IZQUIERDA: CONTROLES DE LA SIMULACIÓN (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
              Parámetros de Extracción
            </h3>

            {/* Selector de Repeticiones n */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Número de repeticiones (n):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[100, 1000, 10000].map((nOption) => (
                  <button
                    key={nOption}
                    type="button"
                    onClick={() => setSelectedN(nOption)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                      selectedN === nOption
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {nOption.toLocaleString('es-ES')}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                disabled={isRunning}
                onClick={() => handleRun(selectedN)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Muestreando...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Ejecutar simulación (n={selectedN.toLocaleString('es-ES')})</span>
                  </>
                )}
              </button>

              {simResult && (
                <button
                  type="button"
                  disabled={isRunning}
                  onClick={() => handleRun(simResult.n)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Repetir con mismos parámetros</span>
                </button>
              )}
            </div>

            {/* Parámetro de la Escena 1 asociado */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
              <span className="text-slate-400 block text-[11px] font-mono">
                Probabilidad de éxito en cada extracción:
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">p = P(A ∪ B) teórica:</span>
                <span className="font-mono text-teal-400 font-bold text-sm">
                  {formatPercent(currentTheoreticalP, 1)}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Vinculada directamente a la distribución activa de la Escena 1 ({scene1Distribution.soloA + scene1Distribution.soloB + scene1Distribution.ambos} legajos con motivo).
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADOS, GRÁFICO Y RESUMEN ACCESIBLE (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {simResult ? (
            <>
              {/* Tarjetas de Métricas de la Corrida */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Extracciones (n)
                  </span>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    {simResult.n.toLocaleString('es-ES')}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Éxitos (k)
                  </span>
                  <div className="text-xl font-mono font-bold text-teal-400 mt-1">
                    {simResult.k.toLocaleString('es-ES')}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">con al menos 1 motivo</span>
                </div>

                <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Frecuencia k/n
                  </span>
                  <div className="text-xl font-mono font-bold text-teal-300 mt-1">
                    {formatPercent(simResult.frecuenciaRelativa, 2)}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Teórica: {formatPercent(simResult.probabilidadTeorica, 1)}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Diferencia absoluta
                  </span>
                  <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                    {formatNumberEs(simResult.diferenciaPuntosPorcentuales, 2)} pp
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    100 × |k/n − p|
                  </span>
                </div>
              </div>

              {/* Gráfico de Trayectoria */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-teal-400" />
                    <span>Convergencia de la Frecuencia Acumulada k/n</span>
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-teal-400">
                      <span className="w-3 h-0.5 bg-teal-400 inline-block" /> Frecuencia empírica
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-3 h-0.5 bg-amber-400 inline-block stroke-dash" /> Teórica p
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {renderChart(simResult)}
                </div>

                {/* Resumen Accesible de los Datos del Gráfico */}
                <div className="space-y-2 pt-2">
                  <details className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <summary className="cursor-pointer font-mono font-medium text-slate-300 hover:text-white flex items-center gap-2">
                      <Table className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ver resumen tabular accesible de la trayectoria ({simResult.puntosTrayectoria.length} puntos)</span>
                    </summary>
                    <div className="mt-3 max-h-48 overflow-y-auto">
                      <table className="w-full text-left font-mono text-[11px]">
                        <thead className="text-slate-500 border-b border-slate-800">
                          <tr>
                            <th className="py-1">Extracción (n)</th>
                            <th className="py-1">Éxitos acum.</th>
                            <th className="py-1">Frecuencia k/n</th>
                            <th className="py-1">Diferencia con p</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850">
                          {simResult.puntosTrayectoria.map((pt) => (
                            <tr key={pt.n}>
                              <td className="py-1 text-slate-300">{pt.n.toLocaleString('es-ES')}</td>
                              <td className="py-1 text-slate-400">{pt.exitosAcumulados}</td>
                              <td className="py-1 text-teal-400 font-bold">{formatPercent(pt.frecuenciaRelativa, 2)}</td>
                              <td className="py-1 text-amber-400">
                                {formatNumberEs(100 * Math.abs(pt.frecuenciaRelativa - simResult.probabilidadTeorica), 2)} pp
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
              </div>
            </>
          ) : (
            /* Estado Inicial sin simulación ejecutada */
            <div className="bg-slate-900/60 border border-dashed border-slate-850 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center mx-auto">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-white">Listo para iniciar la simulación empírica</h3>
                <p className="text-xs text-slate-400">
                  Seleccioná el número de repeticiones y presioná «Ejecutar simulación» para contrastar la frecuencia observada con la probabilidad teórica p = {formatPercent(currentTheoreticalP, 1)}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRun()}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                Ejecutar 1.000 extracciones
              </button>
            </div>
          )}

          {/* Explicaciones Pedagógicas Obligatorias */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Conclusiones del Enfoque Frecuencial:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              <li>
                <strong>Ley de los grandes números:</strong> A mayor tamaño de muestra (<MathView math="n" />), la frecuencia relativa tiende a presentar menor dispersión en torno a <MathView math="p" />, pero la aproximación no tiene que mejorar en cada paso individual.
              </li>
              <li>
                <strong>Sin memoria (Falacia del apostador):</strong> Las extracciones pasadas no obligan a «compensaciones» en extracciones futuras. Cada extracción es estadísticamente independiente.
              </li>
              <li>
                <strong>Discreción con muestras pequeñas:</strong> Con <MathView math="n = 100" />, las frecuencias relativas posibles avanzan exclusivamente en pasos discretos de 1 punto porcentual (<MathView math="1\%" />).
              </li>
              <li>
                <strong>Límite probatorio:</strong> Esta simulación ilustra el comportamiento asintótico de un modelo frecuencial; no demuestra la culpabilidad de ninguna persona.
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
                Si en las primeras 20 extracciones simuladas la frecuencia de legajos con motivos da 85%, ¿por qué sería engañoso para la acusación pretender que esa muestra inicial reducida refleja el comportamiento general del personal?
              </p>
            ) : (
              <p>
                Al aumentar a 10.000 repeticiones, ¿cómo demuestra la ley de los grandes números que las anomalías o rachas transitorias de sospecha se diluyen ante el verdadero valor estructural {formatPercent(currentTheoreticalP, 1)}?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
