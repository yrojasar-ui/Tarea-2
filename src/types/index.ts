/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'fiscalia' | 'defensa';

export type SceneId =
  | 'apertura'
  | 'motivos'
  | 'testigos'
  | 'muestra'
  | 'simulacion'
  | 'conclusion'
  | 'metodologia';

export interface SceneMeta {
  id: SceneId;
  number: string;
  title: string;
  subtitle: string;
  concept: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'apertura',
    number: '0',
    title: 'Apertura del expediente',
    subtitle: 'El caso de la Galería Aurora',
    concept: 'Contexto e investigación forense',
  },
  {
    id: 'motivos',
    number: '1',
    title: 'Los motivos',
    subtitle: '¿Estamos contando dos veces?',
    concept: 'Inclusión-Exclusión y Espacio Muestral',
  },
  {
    id: 'testigos',
    number: '2',
    title: 'Los testigos',
    subtitle: 'Coincidir no es lo mismo que tener razón',
    concept: 'Regla de la multiplicación e Independencia',
  },
  {
    id: 'muestra',
    number: '3',
    title: 'La muestra',
    subtitle: 'Un positivo necesita contexto',
    concept: 'Probabilidad Condicional y Teorema de Bayes',
  },
  {
    id: 'simulacion',
    number: '4',
    title: 'Laboratorio de simulación',
    subtitle: 'De la teoría a la frecuencia',
    concept: 'Enfoque frecuencial y Ley de Grandes Números',
  },
  {
    id: 'conclusion',
    number: '5',
    title: 'Conclusión razonada',
    subtitle: 'Evaluación conceptual',
    concept: 'Pensamiento crítico y no culpabilidad',
  },
  {
    id: 'metodologia',
    number: '6',
    title: 'Metodología y uso de IA',
    subtitle: 'Transparencia pedagógica y referencias',
    concept: 'Auditoría académica y verificación',
  },
];
