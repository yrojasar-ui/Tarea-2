/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SceneId, SCENES } from '../types';
import {
  Scene1Results,
  Scene2Results,
  Scene3Results,
  SimulationRunResult,
  formatPercent,
  formatProbability,
  formatNumberEs,
} from '../utils/probabilityMath';
import { MathView } from './MathView';
import { X, BookOpen, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface TheoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScene: SceneId;
  scene1Data: Scene1Results;
  scene2Data: Scene2Results;
  scene3Data: Scene3Results;
  simData: SimulationRunResult | null;
}

export const TheoryDrawer: React.FC<TheoryDrawerProps> = ({
  isOpen,
  onClose,
  activeScene,
  scene1Data,
  scene2Data,
  scene3Data,
  simData,
}) => {
  const [selectedScene, setSelectedScene] = React.useState<SceneId>(activeScene);

  // Sincronizar con la escena activa al abrir
  React.useEffect(() => {
    setSelectedScene(activeScene);
  }, [activeScene, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theory-title"
    >
      <div
        className="w-full max-w-2xl bg-[#091124] border-l border-slate-700 h-full flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Cabecera del panel */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="theory-title" className="text-lg font-bold text-white flex items-center gap-2">
                <span>Fundamento Teórico y Formalización</span>
              </h2>
              <p className="text-xs text-slate-400">
                Fórmulas, derivaciones y análisis de falacias estadísticas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar panel de teoría"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selector de escena dentro de la teoría */}
        <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-mono text-[11px] mr-1">Tema:</span>
          {SCENES.filter((s) => s.id !== 'apertura' && s.id !== 'metodologia').map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedScene(s.id)}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                selectedScene === s.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Contenido scrolleable de teoría */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* TEORÍA ESCENA 1: MOTIVOS (INCLUSIÓN-EXCLUSIÓN) */}
          {selectedScene === 'motivos' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Escena 1 · Principio de Inclusión-Exclusión
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  ¿Estamos contando dos veces?
                </h3>
              </div>

              {/* 1. Definición en lenguaje sencillo */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> 1. Definición en lenguaje sencillo
                </h4>
                <p>
                  Cuando dos categorías comparten elementos en común (intersección), sumar directamente
                  sus tamaños produce un conteo inflado porque los elementos compartidos se contabilizan
                  dos veces. Para hallar la proporción real de casos que presentan al menos una de las
                  dos características, es obligatorio restar la intersección una vez.
                </p>
              </div>

              {/* 2. Eventos y espacio muestral */}
              <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Eventos y espacio muestral
                </h4>
                <p className="text-xs text-slate-300">
                  Espacio muestral <MathView math="\Omega" />: Conjunto finito de 100 expedientes de personal
                  ficticios seleccionados con probabilidad uniforme (<MathView math="P(\{\omega\}) = 1/100" />).
                </p>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-400 mt-1">
                  <li><strong className="text-slate-200">A:</strong> El expediente registra deudas financieras.</li>
                  <li><strong className="text-slate-200">B:</strong> El expediente registra conflicto laboral previo.</li>
                  <li><strong className="text-slate-200"><MathView math="A \cap B" />:</strong> El expediente registra ambos motivos.</li>
                  <li><strong className="text-slate-200"><MathView math="(A \cup B)^c" />:</strong> El expediente no registra ninguno de los dos motivos.</li>
                </ul>
              </div>

              {/* 3. Fórmula general */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  3. Fórmula general (Regla de la adición)
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-teal-500/30 text-center font-mono">
                  <MathView math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" block />
                </div>
              </div>

              {/* 4. Sustitución con valores actuales */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  4. Sustitución con los valores actuales en la interfaz
                </h4>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                  <div>
                    <MathView
                      math={`P(A) = \\frac{${scene1Data.soloA} + ${scene1Data.ambos}}{100} = ${formatProbability(scene1Data.pA, 2)}`}
                    />
                  </div>
                  <div>
                    <MathView
                      math={`P(B) = \\frac{${scene1Data.soloB} + ${scene1Data.ambos}}{100} = ${formatProbability(scene1Data.pB, 2)}`}
                    />
                  </div>
                  <div>
                    <MathView
                      math={`P(A \\cap B) = \\frac{${scene1Data.ambos}}{100} = ${formatProbability(scene1Data.pInterseccion, 2)}`}
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-teal-300 font-semibold">
                    <MathView
                      math={`P(A \\cup B) = ${formatProbability(scene1Data.pA, 2)} + ${formatProbability(scene1Data.pB, 2)} - ${formatProbability(scene1Data.pInterseccion, 2)} = ${formatProbability(scene1Data.pUnion, 2)}`}
                      block
                    />
                  </div>
                </div>
              </div>

              {/* 5. Resultado e interpretación */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  5. Resultado e interpretación
                </h4>
                <p>
                  El resultado es <strong className="text-teal-300">{formatPercent(scene1Data.pUnion, 0)}</strong>.
                  Significa que exactamente {scene1Data.soloA + scene1Data.soloB + scene1Data.ambos} de los 100 expedientes
                  revisados presentan al menos una de las dos condiciones de motivo.
                </p>
              </div>

              {/* 6. Supuestos */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  6. Supuestos del modelo
                </h4>
                <p className="text-xs text-slate-400">
                  Selección equiprobable dentro de un archivo cerrado y estático de 100 legajos. No se
                  asume independencia a priori entre deudas y conflicto laboral (la intersección se mide
                  empíricamente a partir de los datos registrados).
                </p>
              </div>

              {/* 7. Error frecuente */}
              <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5 text-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  7. Error frecuente: Falacia del doble conteo
                </div>
                <p>
                  Sumar ciegamente las probabilidades marginales: <br />
                  <span className="font-mono text-rose-300">
                    P(A) + P(B) = {formatPercent(scene1Data.pA, 0)} + {formatPercent(scene1Data.pB, 0)} = {formatPercent(scene1Data.sumaMarginalesIncorrecta, 0)}
                  </span>.
                  Ese cálculo es matemáticamente inválido porque cuenta a los {scene1Data.ambos} individuos
                  con ambos motivos dos veces, sobrestimando el universo de sospecha en {formatPercent(scene1Data.excesoConteoDoble, 0)}.
                </p>
              </div>
            </div>
          )}

          {/* TEORÍA ESCENA 2: TESTIGOS (MULTIPLICACIÓN E INDEPENDENCIA) */}
          {selectedScene === 'testigos' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Escena 2 · Regla de la Multiplicación e Independencia
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Coincidir no es lo mismo que tener razón
                </h3>
              </div>

              {/* 1. Definición */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> 1. Definición en lenguaje sencillo
                </h4>
                <p>
                  Dos eventos son independientes cuando el hecho de que ocurra uno no altera la probabilidad
                  de que ocurra el otro. En testimonios, que dos personas declaren lo mismo no significa que
                  sus declaraciones sean independientes (pudieron conversar antes o estar expuestas al mismo rumor),
                  ni tampoco implica que lo que afirman sea la verdad material del hecho.
                </p>
              </div>

              {/* 2. Eventos */}
              <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Eventos y espacio muestral
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong className="text-slate-100">E₁:</strong> El testigo 1 declara haber visto al guardia salir con una bolsa.</li>
                  <li><strong className="text-slate-100">E₂:</strong> El testigo 2 declara haber visto al guardia salir con una bolsa.</li>
                  <li><strong className="text-slate-100">E₁ᶜ, E₂ᶜ:</strong> Los testigos no realizan dicha declaración incriminatoria.</li>
                </ul>
                <p className="text-amber-400/90 font-medium mt-1">
                  Advertencia epistemológica: Las probabilidades describen el acto verbal de declarar, no la certeza
                  histórica de lo ocurrido.
                </p>
              </div>

              {/* 3. Fórmulas generales */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  3. Fórmulas generales
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-teal-500/30 text-xs font-mono space-y-2">
                  <p className="text-slate-400">Regla de la multiplicación general:</p>
                  <MathView math="P(E_1 \cap E_2) = P(E_1) \cdot P(E_2 \mid E_1)" block />
                  <p className="text-slate-400 pt-2 border-t border-slate-800">Ley de probabilidad total para E₂:</p>
                  <MathView math="P(E_2) = P(E_1)P(E_2 \mid E_1) + P(E_1^c)P(E_2 \mid E_1^c)" block />
                  <p className="text-slate-400 pt-2 border-t border-slate-800">Condición formal de independencia:</p>
                  <MathView math="P(E_2 \mid E_1) = P(E_2 \mid E_1^c) = P(E_2)" block />
                </div>
              </div>

              {/* 4. Sustitución con valores actuales */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  4. Sustitución con los parámetros activos
                </h4>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5 font-mono text-xs">
                  <div><MathView math={`p = P(E_1) = ${formatProbability(scene2Data.p, 2)}`} /></div>
                  <div><MathView math={`q_1 = P(E_2 \\mid E_1) = ${formatProbability(scene2Data.q1, 2)}`} /></div>
                  <div><MathView math={`q_0 = P(E_2 \\mid E_1^c) = ${formatProbability(scene2Data.q0, 2)}`} /></div>
                  <div className="pt-2 border-t border-slate-800">
                    <MathView
                      math={`P(E_1 \\cap E_2) = ${formatProbability(scene2Data.p, 2)} \\times ${formatProbability(scene2Data.q1, 2)} = ${formatProbability(scene2Data.pAmbos, 3)}`}
                      block
                    />
                  </div>
                  <div>
                    <MathView
                      math={`P(E_2) = (${formatProbability(scene2Data.p, 2)} \\times ${formatProbability(scene2Data.q1, 2)}) + (${formatProbability(1 - scene2Data.p, 2)} \\times ${formatProbability(scene2Data.q0, 2)}) = ${formatProbability(scene2Data.pE2, 3)}`}
                      block
                    />
                  </div>
                </div>
              </div>

              {/* 5. Resultado e interpretación */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  5. Diagnóstico de independencia
                </h4>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  {scene2Data.esIndependiente ? (
                    <p className="text-teal-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                      <span>
                        Los eventos son <strong>estadísticamente independientes</strong> porque{' '}
                        <MathView math="P(E_2 \mid E_1) = P(E_2 \mid E_1^c) = P(E_2)" /> ({formatPercent(scene2Data.q1, 1)}).
                      </span>
                    </p>
                  ) : (
                    <p className="text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>
                        Existe <strong>dependencia condicional</strong>:{' '}
                        <MathView math="P(E_2 \mid E_1)" /> ({formatPercent(scene2Data.q1, 1)}) difiere de{' '}
                        <MathView math="P(E_2 \mid E_1^c)" /> ({formatPercent(scene2Data.q0, 1)}).
                        El conocimiento de la declaración del primero condiciona la del segundo.
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* 6. Error frecuente */}
              <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5 text-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Error frecuente: Confundir acuerdo testimonial con veracidad probatoria
                </div>
                <p>
                  Dos declaraciones idénticas pueden originarse por contaminación mutua, colusión previa
                  o sugestión compartida. Una mayor probabilidad conjunta <MathView math="P(E_1 \cap E_2)" /> no
                  prueba que el guardia haya salido con la bolsa, solo cuantifica la tasa teórica con que ambos coincidirían en declarar.
                </p>
              </div>
            </div>
          )}

          {/* TEORÍA ESCENA 3: MUESTRA Y TEOREMA DE BAYES */}
          {selectedScene === 'muestra' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Escena 3 · Teorema de Bayes
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Un positivo necesita contexto
                </h3>
              </div>

              {/* 1. Definición */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> 1. Definición en lenguaje sencillo
                </h4>
                <p>
                  El Teorema de Bayes permite actualizar la probabilidad de una hipótesis a la luz de
                  nueva evidencia. Cuando una hipótesis de partida es extremadamente infrecuente (baja probabilidad
                  a priori), incluso una prueba con alta sensibilidad y baja tasa de falsos positivos puede generar
                  más falsas alarmas que verdaderos aciertos en la población total evaluada.
                </p>
              </div>

              {/* 2. Eventos */}
              <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Hipótesis y resultados de la prueba
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong className="text-slate-100">H:</strong> La muestra biológica hallada procede del sospechoso.</li>
                  <li><strong className="text-slate-100">Hᶜ:</strong> La muestra procede de otra persona de la población.</li>
                  <li><strong className="text-slate-100">+ :</strong> La prueba de laboratorio marca coincidencia positiva.</li>
                  <li><strong className="text-slate-100">− :</strong> La prueba de laboratorio no marca coincidencia.</li>
                </ul>
              </div>

              {/* 3. Fórmula de Bayes */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  3. Teorema de Bayes formal
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-teal-500/30 text-xs font-mono text-center space-y-2">
                  <MathView
                    math="P(H \mid +) = \frac{P(+ \mid H) \cdot P(H)}{P(+)} = \frac{P(+ \mid H) \cdot P(H)}{P(+ \mid H)P(H) + P(+ \mid H^c)P(H^c)}"
                    block
                  />
                </div>
              </div>

              {/* 4. Sustitución con valores actuales */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  4. Sustitución numérica exacta
                </h4>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                  <div><MathView math={`P(H) = r = ${scene3Data.previa}`} /> ({formatPercent(scene3Data.previa, 4)})</div>
                  <div><MathView math={`P(+ \\mid H) = s = ${scene3Data.sensibilidad}`} /> ({formatPercent(scene3Data.sensibilidad, 1)})</div>
                  <div><MathView math={`P(+ \\mid H^c) = f = ${scene3Data.falsosPositivos}`} /> ({formatPercent(scene3Data.falsosPositivos, 2)})</div>
                  <div className="pt-2 border-t border-slate-800">
                    <MathView
                      math={`P(+) = (${scene3Data.sensibilidad} \\times ${scene3Data.previa}) + (${scene3Data.falsosPositivos} \\times ${formatNumberEs(1 - scene3Data.previa, 4)}) = ${formatProbability(scene3Data.pPositivo, 6)}`}
                      block
                    />
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-teal-300 font-semibold">
                    {scene3Data.estaDefinida && scene3Data.pPosterior !== null ? (
                      <MathView
                        math={`P(H \\mid +) = \\frac{${scene3Data.sensibilidad} \\times ${scene3Data.previa}}{${formatProbability(scene3Data.pPositivo, 6)}} = ${formatProbability(scene3Data.pPosterior, 6)} \\; (${formatPercent(scene3Data.pPosterior, 4)})`}
                        block
                      />
                    ) : (
                      <span className="text-rose-400">{scene3Data.mensajeIndefinido}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Falacia del fiscal */}
              <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5 text-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  La falacia del fiscal (Transposición del condicional)
                </div>
                <p>
                  Consiste en afirmar erróneamente que <MathView math="P(H \mid +) = P(+ \mid H)" />.
                  Es decir, asegurar que como la prueba tiene una sensibilidad del 99%, la persona con resultado
                  positivo tiene 99% de probabilidad de ser el donante de la muestra.
                </p>
                <p>
                  Si la probabilidad a priori es baja (<MathView math="0,01\%" />), la abrumadora mayoría de los
                  positivos en la población corresponden a falsos positivos ({formatNumberEs(scene3Data.falsosPositivosCasos, 1)} frente a {formatNumberEs(scene3Data.verdaderosPositivos, 1)} verdaderos).
                </p>
              </div>
            </div>
          )}

          {/* TEORÍA ESCENA 4: SIMULACIÓN FRECUENCIAL */}
          {selectedScene === 'simulacion' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Escena 4 · Enfoque Frecuencial y Ley de los Grandes Números
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  De la teoría a la frecuencia empírica
                </h3>
              </div>

              {/* 1. Definición */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> 1. Enfoque frecuencial vs clásico
                </h4>
                <p>
                  El enfoque clásico calcula probabilidades a priori mediante conteos en espacios equiprobables.
                  El enfoque frecuencial define la probabilidad como el límite al que tiende la frecuencia
                  relativa de un evento tras infinitas repeticiones independientes bajo condiciones idénticas.
                </p>
              </div>

              {/* 2. Ley de los grandes números */}
              <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Ley Débil de los Grandes Números (Teorema de Bernoulli / Khinchin)
                </h4>
                <p className="text-slate-300">
                  Para cualquier margen de tolerancia <MathView math="\epsilon > 0" />, la probabilidad de que
                  la frecuencia relativa observada <MathView math="k/n" /> difiera de la probabilidad teórica <MathView math="p" /> en más
                  de <MathView math="\epsilon" /> tiende a cero cuando el número de repeticiones <MathView math="n" /> tiende a infinito:
                </p>
                <div className="p-2.5 bg-slate-950 rounded text-center font-mono my-2 border border-slate-800">
                  <MathView math="\lim_{n \to \infty} P\left(\left|\frac{k}{n} - p\right| \ge \epsilon\right) = 0" block />
                </div>
              </div>

              {/* 3. Error estándar teórico */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  3. Error estándar teórico de la proporción
                </h4>
                <p className="text-xs text-slate-400">
                  La variabilidad típica de la frecuencia muestral respecto a <MathView math="p" /> viene dada por:
                </p>
                <div className="p-3 bg-slate-950 rounded-lg border border-teal-500/30 text-center font-mono text-xs">
                  <MathView math="\sigma_{\hat{p}} = \sqrt{\frac{p(1 - p)}{n}}" block />
                </div>
                {simData && (
                  <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-xs font-mono">
                    <p className="text-slate-300">
                      Con <MathView math={`p = ${formatProbability(simData.probabilidadTeorica, 2)}`} /> y{' '}
                      <MathView math={`n = ${simData.n}`} />:
                    </p>
                    <p className="text-teal-300 mt-1">
                      Error estándar teórico = {formatNumberEs(simData.errorEstandarTeoricoPuntos, 2)} puntos porcentuales (±{formatPercent(simData.errorEstandarTeoricoPuntos / 100, 2)}).
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic">
                      Nota metodológica: No es un límite garantizado ni un intervalo de confianza al 100%,
                      sino una medida de dispersión esperada del estimador.
                    </p>
                  </div>
                )}
              </div>

              {/* 4. Falacia del apostador */}
              <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5 text-rose-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Falacia del apostador (Compensación de rachas)
                </div>
                <p>
                  El mecanismo aleatorio carece de memoria. Si en las primeras 10 extracciones salieron
                  8 expedientes con motivos, las siguientes no están «obligadas» a compensar arrojando menos
                  motivos. La convergencia se produce por dilución matemática de los resultados anteriores
                  en un denominador creciente, nunca por corrección teleológica del azar.
                </p>
              </div>
            </div>
          )}

          {/* TEORÍA ESCENA 5: CONCLUSIÓN Y RESPONSABILIDAD FORENSE */}
          {selectedScene === 'conclusion' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Escena 5 · Epistemología Forense
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Evaluación probatoria y no culpabilidad
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p>
                  En un proceso judicial con rigor técnico, las matemáticas tienen la función de
                  <strong> evaluar la solidez del vínculo inferencial entre la evidencia y las hipótesis</strong>,
                  no de fabricar mecánicamente una condena o absolución.
                </p>
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-300">Las cuatro reglas de oro del razonamiento probabilístico forense:</h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                    <li><strong className="text-slate-200">No sumar marginales:</strong> Verificar siempre si existe solapamiento entre eventos sospechosos.</li>
                    <li><strong className="text-slate-200">No asumir independencia sin contrastación:</strong> La concordancia entre declaraciones puede ser fruto de dependencia comunicativa.</li>
                    <li><strong className="text-slate-200">Sensibilidad no es probabilidad de culpabilidad:</strong> El teorema de Bayes demuestra que el contexto previo es determinante.</li>
                    <li><strong className="text-slate-200">El azar no compensa:</strong> Las rachas iniciales no predicen desviaciones correctivas futuras.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del drawer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Duda Razonable · Laboratorio de Probabilidad</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};
