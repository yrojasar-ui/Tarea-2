/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookCheck,
  Scale,
  ShieldCheck,
  PenTool,
  Save,
} from 'lucide-react';

interface QuestionItem {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: '1. ¿Por qué es matemáticamente obligatorio restar la intersección P(A ∩ B) al calcular P(A ∪ B) en la Escena 1?',
    options: [
      {
        id: '1a',
        text: 'Porque los eventos deudas y conflicto laboral son incompatibles en el expediente.',
        isCorrect: false,
        explanation: 'Incorrecto. Los eventos son compatibles: hay 15 expedientes que presentan ambos motivos de manera simultánea.',
      },
      {
        id: '1b',
        text: 'Para evitar el doble conteo de los expedientes que presentan ambos motivos simultáneos.',
        isCorrect: true,
        explanation: '¡Correcto! En P(A) y P(B) ya se cuenta a los individuos de la intersección. Al sumarlas directamente se los cuenta dos veces, por lo que es necesario restarlos una vez.',
      },
      {
        id: '1c',
        text: 'Para reducir artificialmente el porcentaje de sospecha del guardia.',
        isCorrect: false,
        explanation: 'Incorrecto. La resta no es una estrategia de conveniencia legal sino una exigencia axiomática de la teoría de conjuntos y la regla de la adición.',
      },
    ],
  },
  {
    id: 2,
    question: '2. En la Escena 2, dos testigos coinciden en acusar al guardia. ¿Por qué esto no garantiza que su declaración sea verídica?',
    options: [
      {
        id: '2a',
        text: 'Porque las declaraciones pueden estar condicionadas por comunicación previa, rumores compartidos o sugestión, y la probabilidad modela el testimonio, no la verdad material del hecho.',
        isCorrect: true,
        explanation: '¡Correcto! La probabilidad describe la tasa con la que ocurre el acto verbal de declarar. La concordancia puede provenir de dependencia comunicativa sin tener correlato con lo sucedido.',
      },
      {
        id: '2b',
        text: 'Porque si dos testigos dicen lo mismo en salas separadas, siempre son eventos estrictamente independientes.',
        isCorrect: false,
        explanation: 'Incorrecto. La separación física en comisaría no anula la posibilidad de contacto previo, información filtrada o sesgos contextuales comunes.',
      },
      {
        id: '2c',
        text: 'Porque la regla de la multiplicación solo se puede aplicar a pruebas de ADN y no a testimonios.',
        isCorrect: false,
        explanation: 'Incorrecto. La regla de la multiplicación es universal para cualquier par de eventos probabilísticos.',
      },
    ],
  },
  {
    id: 3,
    question: '3. En la Escena 3, la prueba científica tiene 99% de sensibilidad. ¿Por qué la probabilidad posterior de que la muestra sea del sospechoso es menor a 1% con previa del 0,01%?',
    options: [
      {
        id: '3a',
        text: 'Porque la prueba está defectuosa y tiene un margen de error del 99%.',
        isCorrect: false,
        explanation: 'Incorrecto. El reactivo funciona exactamente con 99% de sensibilidad y 99% de especificidad.',
      },
      {
        id: '3b',
        text: 'Porque en una población donde la hipótesis es muy rara (0,01%), el 1% de falsos positivos en los inocentes genera un número absoluto de falsas alarmas mucho mayor que los pocos positivos verdaderos.',
        isCorrect: true,
        explanation: '¡Exacto! Es la falacia del fiscal (o falacia de la tasa base): 999,9 falsos positivos superan abrumadoramente a los 9,9 verdaderos positivos en 100.000 comparaciones.',
      },
      {
        id: '3c',
        text: 'Porque la sensibilidad P(+ | H) y la posterior P(H | +) son siempre numéricamente iguales.',
        isCorrect: false,
        explanation: 'Incorrecto. P(+ | H) y P(H | +) solo coinciden bajo condiciones muy particulares de simetría previa. Asumirlas iguales es la falacia del condicional transpuesto.',
      },
    ],
  },
  {
    id: 4,
    question: '4. En la Escena 4, tras 10 extracciones consecutivas de legajos con motivo, ¿está la siguiente extracción obligada a salir sin motivo para compensar?',
    options: [
      {
        id: '4a',
        text: 'Sí, la ley de los grandes números impone un mecanismo correctivo para equilibrar la muestra inmediatamente.',
        isCorrect: false,
        explanation: 'Incorrecto. Es la falacia del apostador. El azar no tiene memoria ni voluntad teleológica.',
      },
      {
        id: '4b',
        text: 'No; cada extracción con reemplazo es independiente y la probabilidad de éxito sigue siendo exactamente p. La convergencia se da por dilución en grandes muestras, no por compensación.',
        isCorrect: true,
        explanation: '¡Correcto! Cada ensayo conserva la distribución idéntica (p). La convergencia asintótica opera diluyendo las fluctuaciones iniciales en un n muy grande.',
      },
      {
        id: '4c',
        text: 'Solo si el guardia es inocente, porque la verdad legal condiciona la simulación.',
        isCorrect: false,
        explanation: 'Incorrecto. Los números pseudoaleatorios del generador son independientes del estado legal o procesal del sospechoso.',
      },
    ],
  },
];

interface SceneConclusionProps {
  role: UserRole;
  onOpenTheory: () => void;
}

export const SceneConclusion: React.FC<SceneConclusionProps> = ({ role }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem('duda_razonable_notas') || '';
  });
  const [savedNoteStatus, setSavedNoteStatus] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
    setShowResults((prev) => ({ ...prev, [qId]: true }));
  };

  const handleRetryQuestion = (qId: number) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setShowResults((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleSaveNotes = () => {
    localStorage.setItem('duda_razonable_notas', studentNotes);
    setSavedNoteStatus(true);
    setTimeout(() => setSavedNoteStatus(false), 2500);
  };

  // Conteo de conceptos comprendidos (NUNCA puntuación de culpabilidad)
  const understoodCount = QUESTIONS.reduce((acc, q) => {
    const selected = selectedAnswers[q.id];
    if (!selected) return acc;
    const opt = q.options.find((o) => o.id === selected);
    return opt?.isCorrect ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la escena */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                EVALUACIÓN CONCEPTUAL
              </span>
              <span className="text-slate-500 text-xs">|</span>
              <span className="text-xs text-slate-400 font-mono">Pensamiento crítico forense</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Conclusión razonada: Lo que los datos permiten y no permiten sostener
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Auto-evaluación formativa de los 4 principios estadísticos explorados.
            </p>
          </div>

          {/* Marcador de conceptos comprendidos (NO de culpabilidad) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/15 text-teal-400">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                Progreso pedagógico
              </span>
              <div className="text-base font-mono font-bold text-teal-300">
                Conceptos comprendidos: <span className="text-white text-lg">{understoodCount}</span> de {QUESTIONS.length}
              </div>
            </div>
          </div>
        </div>

        {/* Perspectiva activa */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          {role === 'fiscalia' ? (
            <Scale className="w-4 h-4 text-amber-400" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          )}
          <span>
            Analizando desde la perspectiva de{' '}
            <strong className="text-white uppercase tracking-wider font-mono">{role}</strong>. Ambas buscan que la prueba no se interprete mediante falacias.
          </span>
        </div>
      </div>

      {/* Cuestionario de las 4 Preguntas */}
      <div className="space-y-6">
        {QUESTIONS.map((q) => {
          const selected = selectedAnswers[q.id];
          const hasAnswered = showResults[q.id];
          const selectedOpt = q.options.find((o) => o.id === selected);

          return (
            <div
              key={q.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4"
            >
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {q.question}
              </h3>

              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id;
                  let optStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      optStyle = 'bg-teal-950/30 border-teal-500/70 text-teal-200 font-medium';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'bg-rose-950/30 border-rose-500/70 text-rose-200';
                    } else {
                      optStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                        {opt.id.slice(1).toUpperCase()}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Retroalimentación pedagógica tras responder */}
              {hasAnswered && selectedOpt && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm flex flex-col sm:flex-row items-start justify-between gap-3 ${
                    selectedOpt.isCorrect
                      ? 'bg-teal-950/20 border-teal-500/40 text-teal-200'
                      : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {selectedOpt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block mb-1">
                        {selectedOpt.isCorrect ? 'Explicación del principio:' : 'Aclaración de la falacia:'}
                      </span>
                      <p className="leading-relaxed">{selectedOpt.explanation}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRetryQuestion(q.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors shrink-0 self-end sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Volver a intentar</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cierre epistemológico obligatorio */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1a38] to-slate-900 border border-amber-500/40 shadow-xl text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-block">
          SÍNTESIS DE RESPONSABILIDAD FORENSE
        </span>
        <blockquote className="text-base sm:text-lg font-bold text-white max-w-2xl mx-auto leading-relaxed">
          «Tu tarea fue evaluar qué permiten concluir los datos y qué información falta».
        </blockquote>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Un modelo de probabilidad no dicta sentencias: desnuda la fragilidad de las inferencias apresuradas,
          distingue la evidencia sólida de los sesgos cognitivos y garantiza que la duda razonable prevalezca
          donde los datos no alcanzan para sostener una certeza.
        </p>
      </div>

      {/* Cuaderno de Notas y Conclusión del Estudiante (Opcional) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <PenTool className="w-4 h-4 text-teal-400" />
            <span>Cuaderno de peritaje: Escribí tu conclusión razonada para la clase</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">CAMPO EDITABLE OPCIONAL</span>
        </div>

        <p className="text-xs text-slate-400">
          Sintetizá con tus propias palabras qué aspectos de la evidencia del caso Galería Aurora admiten
          duda razonable y por qué:
        </p>

        <textarea
          rows={4}
          value={studentNotes}
          onChange={(e) => setStudentNotes(e.target.value)}
          placeholder="Escribí aquí tus conclusiones académicas para el debate universitario..."
          className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400 font-mono leading-relaxed resize-y"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Se almacena en tu navegador local para que puedas consultarlo durante tu presentación.
          </span>
          <button
            type="button"
            onClick={handleSaveNotes}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{savedNoteStatus ? '¡Guardado con éxito!' : 'Guardar notas'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
