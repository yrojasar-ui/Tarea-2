/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Bookmark,
  ShieldAlert,
} from 'lucide-react';

export const SceneMetodologia: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            METODOLOGÍA ACADÉMICA Y TRANSPARENCIA
          </span>
          <span className="text-slate-500 text-xs">|</span>
          <span className="text-xs text-slate-400 font-mono">Proyecto de Probabilidad y Estadística</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Metodología, Verificaciones y Declaración de IA
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Memoria técnica sobre enfoques teóricos, comprobaciones computacionales del modelo y referencias bibliográficas reconocidas.
        </p>
      </div>

      {/* 1. Datos Ficticios y Alcance Educativo */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider font-mono">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>1. Datos ficticios y alcance educativo</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Toda la narrativa del caso «Galería Aurora», el número de legajos del personal nocturno,
          las declaraciones testimoniales y los parámetros de sensibilidad del análisis biológico
          son <strong>ficticios y concebidos exclusivamente con fines didácticos universitarios</strong>.
          No representan tasas de ADN de peritajes reales, ni procedimientos judiciales de ningún tribunal,
          ni información sobre personas reales. La aplicación tiene como objetivo pedagógico ejercitar el
          razonamiento formal y desarticular falacias estadísticas comunes.
        </p>
      </div>

      {/* 2. Enfoques Teóricos y Distinción Epistemológica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enfoque Clásico vs Frecuencial */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>2. Enfoque clásico vs frecuencial</span>
          </h3>
          <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-teal-300 block mb-1">Enfoque Clásico (Laplaciano):</strong>
              Basado en el principio de razón insuficiente sobre espacios muestrales finitos equiprobables.
              En la Escena 1, cada legajo tiene exactamente probabilidad 1/100 de ser extraído, permitiendo
              deducir probabilidades directas mediante conteo combinatorio.
            </li>
            <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-amber-300 block mb-1">Enfoque Frecuencial:</strong>
              Basado en el límite de la frecuencia relativa observada en series de ensayos independientes
              bajo idénticas condiciones. En la Escena 4, las extracciones con reemplazo ilustran cómo la
              frecuencia muestral converge empíricamente hacia la probabilidad teórica.
            </li>
          </ul>
        </div>

        {/* Valores Teóricos vs Esperados vs Simulados */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>3. Teóricos, esperados y simulados</span>
          </h3>
          <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-teal-300 block mb-1">Valores Teóricos (Probabilidad p):</strong>
              Parámetros formales exactos definidos por los axiomas de Kolmogorov (ej. p = 0,60 o P(H|+) = 0,0098).
            </li>
            <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-purple-300 block mb-1">Valores Esperados (E[X] = N × p):</strong>
              Promedios matemáticos de una variable aleatoria en una cohorte hipotética (ej. 9,9 verdaderos positivos
              en 100.000 casos). Admiten decimales porque no representan personas físicas individuales.
            </li>
            <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-amber-300 block mb-1">Resultados Simulados (k / n):</strong>
              Conteos enteros discretos generados aleatoriamente en una corrida concreta, sujetos a variabilidad muestral finita.
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Declaración de Herramientas de Inteligencia Artificial */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>4. Herramientas de inteligencia artificial utilizadas y alcance</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          En cumplimiento con las normas de integridad académica y transparencia de la cátedra,
          se documenta el uso de herramientas de inteligencia artificial durante la preparación del proyecto:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-white block font-mono">DiálogoX</strong>
            <p className="text-slate-400 text-[11px]">
              Indagación conceptual y formulación de preguntas pedagógicas de reflexión procesal (Fiscalía y Defensa).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-white block font-mono">ChatGPT</strong>
            <p className="text-slate-400 text-[11px]">
              Revisión y validación de las derivaciones de la regla de la multiplicación y consistencia en el árbol condicional.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-white block font-mono">Google AI Studio</strong>
            <p className="text-slate-400 text-[11px]">
              Asistencia en el desarrollo del código TypeScript, pruebas unitarias automatizadas y maquetación interactiva.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
          <strong>Alcance declarado:</strong> Las herramientas de IA actuaron como asistentes de apoyo para indagación conceptual,
          revisión de expresiones matemáticas y desarrollo de software. Todos los razonamientos, conclusiones y evaluaciones
          fueron estructurados bajo los lineamientos metodológicos de la cátedra.
        </div>
      </div>

      {/* 5. Tabla de Verificaciones del Modelo (Ejecutadas vs Revisiones Pendientes) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
          <span>5. Lista de verificaciones del modelo matemático</span>
          <span className="text-[11px] font-normal text-slate-400">
            Diferenciación entre suite automatizada y revisiones manuales
          </span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2.5 rounded-l">Ítem de verificación</th>
                <th className="px-3 py-2.5">Criterio evaluado</th>
                <th className="px-3 py-2.5 text-center">Tipo de prueba</th>
                <th className="px-3 py-2.5 rounded-r text-center">Estado real</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 1 Inicial</td>
                <td className="px-3 py-2.5 text-slate-400">P(A∪B) = 0,60; P(ninguno) = 0,40; suma = 100</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 1 Rangos</td>
                <td className="px-3 py-2.5 text-slate-400">Enteros no negativos con suma acotada a 100</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 2 Independiente</td>
                <td className="px-3 py-2.5 text-slate-400">0,42; 0,28; 0,18; 0,12 y P(E₂) = 0,60</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 2 Dependiente</td>
                <td className="px-3 py-2.5 text-slate-400">0,595; 0,105; 0,060; 0,240 y marginal 0,655</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 2 Suma de ramas</td>
                <td className="px-3 py-2.5 text-slate-400">Suma estricta igual a 1,00 con tolerancia</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 3 Bayes Inicial</td>
                <td className="px-3 py-2.5 text-slate-400">P(+) = 0,010098; P(H|+) ≈ 0,0098039216</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 3 Bayes Presets</td>
                <td className="px-3 py-2.5 text-slate-400">Previa 1% → 50,0%; Previa 10% → 91,67%</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 3 Cero Denominador</td>
                <td className="px-3 py-2.5 text-slate-400">P(+) = 0 manejado con texto, no NaN ni Inf</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 3 Matriz de Contingencia</td>
                <td className="px-3 py-2.5 text-slate-400">Suma de valores esperados igual a 100.000</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Escena 4 Casos Límite</td>
                <td className="px-3 py-2.5 text-slate-400">p = 0 produce k = 0; p = 1 produce k = n</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Automática (node:test)</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado por entorno
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-sans font-medium text-white">Auditoría Ética Forense</td>
                <td className="px-3 py-2.5 text-slate-400">Ausencia de índices combinados de culpabilidad</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Revisión de Código</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-teal-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verificado en código
                  </span>
                </td>
              </tr>
              <tr className="bg-slate-950/40">
                <td className="px-3 py-2.5 font-sans font-medium text-amber-200">Revisión en clase con docente</td>
                <td className="px-3 py-2.5 text-slate-400">Validación de exposición oral y debate de respuestas</td>
                <td className="px-3 py-2.5 text-center text-slate-400">Evaluación Humana</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Pendiente de revisión del estudiante
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Referencias Bibliográficas Identificables */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider font-mono">
          <Bookmark className="w-4 h-4 text-teal-400" />
          <span>6. Referencias bibliográficas académicas</span>
        </div>

        <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-mono">
          <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            Blitzstein, J. K., & Hwang, J. (2019). <em>Introduction to Probability</em> (2nd ed.). Chapman and Hall/CRC. [Tratamiento axiomático de probabilidad condicional, particiones y Teorema de Bayes].
          </li>
          <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            Feller, W. (1968). <em>An Introduction to Probability Theory and Its Applications</em> (Vol. 1, 3rd ed.). John Wiley & Sons. [Fundamentos del espacio muestral, combinatoria, inclusión-exclusión y ensayos independientes].
          </li>
          <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            Ross, S. M. (2014). <em>A First Course in Probability</em> (9th ed.). Pearson. [Ley de la probabilidad total, independencia estocástica y convergencia de frecuencias].
          </li>
          <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            Kahneman, D., & Tversky, A. (1973). On the psychology of prediction. <em>Psychological Review</em>, 80(4), 237–251. [Análisis experimental de la desestimación de la tasa base / falacia del fiscal].
          </li>
          <li className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            Lindley, D. V. (2006). <em>Understanding Uncertainty</em>. John Wiley & Sons. [Epistemología del razonamiento bayesiano y evaluación de evidencia en contextos forenses y jurídicos].
          </li>
        </ul>
      </div>
    </div>
  );
};
