/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Funciones matemáticas puras y verificables para el laboratorio «Duda Razonable».
 * Todas las fórmulas siguen las definiciones estándar de la teoría de probabilidad.
 */

// ==========================================
// ESCENA 1: Inclusión - Exclusión (Los motivos)
// ==========================================

export interface Scene1Distribution {
  soloA: number; // Expedientes con solo deudas
  soloB: number; // Expedientes con solo conflicto laboral
  ambos: number; // Expedientes con ambos motivos
}

export interface Scene1Results {
  soloA: number;
  soloB: number;
  ambos: number;
  ninguno: number;
  total: number;
  pA: number;          // P(A)
  pB: number;          // P(B)
  pInterseccion: number; // P(A ∩ B)
  pUnion: number;      // P(A ∪ B)
  pNinguno: number;    // P((A ∪ B)ᶜ)
  sumaMarginalesIncorrecta: number; // P(A) + P(B)
  excesoConteoDoble: number;        // P(A ∩ B)
}

export const SCENE1_DEFAULT: Scene1Distribution = {
  soloA: 25,
  soloB: 20,
  ambos: 15,
};

export function calculateScene1(dist: Scene1Distribution): Scene1Results {
  const soloA = Math.max(0, Math.floor(dist.soloA));
  const soloB = Math.max(0, Math.floor(dist.soloB));
  const ambos = Math.max(0, Math.floor(dist.ambos));
  const sumaOcupada = soloA + soloB + ambos;
  const ninguno = Math.max(0, 100 - sumaOcupada);
  const total = soloA + soloB + ambos + ninguno;

  const pA = (soloA + ambos) / 100;
  const pB = (soloB + ambos) / 100;
  const pInterseccion = ambos / 100;
  const pUnion = pA + pB - pInterseccion;
  const pNinguno = 1 - pUnion;
  const sumaMarginalesIncorrecta = pA + pB;
  const excesoConteoDoble = pInterseccion;

  return {
    soloA,
    soloB,
    ambos,
    ninguno,
    total,
    pA,
    pB,
    pInterseccion,
    pUnion,
    pNinguno,
    sumaMarginalesIncorrecta,
    excesoConteoDoble,
  };
}

// ==========================================
// ESCENA 2: Regla de Multiplicación e Independencia (Los testigos)
// ==========================================

export interface Scene2Parameters {
  p: number;  // P(E1): probabilidad de que el testigo 1 declare
  q1: number; // P(E2 | E1): probabilidad de que el testigo 2 declare dado que el testigo 1 declaró
  q0: number; // P(E2 | E1ᶜ): probabilidad de que el testigo 2 declare dado que el testigo 1 NO declaró
}

export interface Scene2Results {
  p: number;
  q1: number;
  q0: number;
  pAmbos: number;        // P(E1 ∩ E2) = p * q1
  pSoloPrimero: number;  // P(E1 ∩ E2ᶜ) = p * (1 - q1)
  pSoloSegundo: number;  // P(E1ᶜ ∩ E2) = (1 - p) * q0
  pNinguno: number;      // P(E1ᶜ ∩ E2ᶜ) = (1 - p) * (1 - q0)
  pE2: number;           // P(E2) = p * q1 + (1 - p) * q0 (Probabilidad total)
  sumaRamas: number;     // Debe sumar 1
  pCoinciden: number;    // P(E1 ∩ E2) + P(E1ᶜ ∩ E2ᶜ)
  esIndependiente: boolean;
}

export const SCENE2_SCENARIO_A: Scene2Parameters = {
  p: 0.70,
  q1: 0.60,
  q0: 0.60,
};

export const SCENE2_SCENARIO_B: Scene2Parameters = {
  p: 0.70,
  q1: 0.85,
  q0: 0.20,
};

export function calculateScene2(params: Scene2Parameters): Scene2Results {
  const p = Math.min(0.99, Math.max(0.01, params.p));
  const q1 = Math.min(1.0, Math.max(0.0, params.q1));
  const q0 = Math.min(1.0, Math.max(0.0, params.q0));

  const pAmbos = p * q1;
  const pSoloPrimero = p * (1 - q1);
  const pSoloSegundo = (1 - p) * q0;
  const pNinguno = (1 - p) * (1 - q0);

  const pE2 = p * q1 + (1 - p) * q0;
  const sumaRamas = pAmbos + pSoloPrimero + pSoloSegundo + pNinguno;
  const pCoinciden = pAmbos + pNinguno;
  const esIndependiente = Math.abs(q1 - q0) < 1e-7;

  return {
    p,
    q1,
    q0,
    pAmbos,
    pSoloPrimero,
    pSoloSegundo,
    pNinguno,
    pE2,
    sumaRamas,
    pCoinciden,
    esIndependiente,
  };
}

// ==========================================
// ESCENA 3: Teorema de Bayes (La muestra biológica)
// ==========================================

export interface Scene3Parameters {
  previa: number;       // r = P(H)
  sensibilidad: number; // s = P(+ | H)
  falsosPositivos: number; // f = P(+ | Hᶜ)
  totalCasosMatriz?: number; // N, por defecto 100,000
}

export interface Scene3Results {
  previa: number;
  sensibilidad: number;
  falsosPositivos: number;
  falsosNegativos: number; // 1 - s
  especificidad: number;   // 1 - f
  pPositivo: number;       // P(+) = s * r + f * (1 - r)
  pPosterior: number | null; // P(H | +), null si P(+) === 0
  estaDefinida: boolean;
  mensajeIndefinido?: string;
  // Matriz de valores esperados para N comparaciones
  matrizN: number;
  verdaderosPositivos: number; // N * r * s
  falsosNegativosCasos: number; // N * r * (1 - s)
  falsosPositivosCasos: number; // N * (1 - r) * f
  verdaderosNegativosCasos: number; // N * (1 - r) * (1 - f)
  sumaMatriz: number;
}

export const SCENE3_DEFAULT: Scene3Parameters = {
  previa: 0.0001,       // 0.01%
  sensibilidad: 0.99,   // 99%
  falsosPositivos: 0.01 // 1%
};

export const SCENE3_PRESET_1: Scene3Parameters = {
  previa: 0.0001, // 0.01%
  sensibilidad: 0.99,
  falsosPositivos: 0.01,
};

export const SCENE3_PRESET_2: Scene3Parameters = {
  previa: 0.01, // 1%
  sensibilidad: 0.99,
  falsosPositivos: 0.01,
};

export const SCENE3_PRESET_3: Scene3Parameters = {
  previa: 0.10, // 10%
  sensibilidad: 0.99,
  falsosPositivos: 0.01,
};

export function calculateScene3(params: Scene3Parameters): Scene3Results {
  const r = Math.min(1.0, Math.max(0.0, params.previa));
  const s = Math.min(1.0, Math.max(0.0, params.sensibilidad));
  const f = Math.min(1.0, Math.max(0.0, params.falsosPositivos));
  const N = params.totalCasosMatriz ?? 100000;

  const falsosNegativos = 1 - s;
  const especificidad = 1 - f;

  // P(+) = P(+ | H) * P(H) + P(+ | Hᶜ) * P(Hᶜ)
  const pPositivo = s * r + f * (1 - r);

  let pPosterior: number | null = null;
  let estaDefinida = true;
  let mensajeIndefinido: string | undefined = undefined;

  if (pPositivo === 0 || Math.abs(pPositivo) < 1e-14) {
    estaDefinida = false;
    pPosterior = null;
    mensajeIndefinido = 'Probabilidad condicional no definida: el modelo no permite resultados positivos';
  } else {
    pPosterior = (s * r) / pPositivo;
  }

  // Valores esperados de la matriz de contingencia
  const verdaderosPositivos = N * r * s;
  const falsosNegativosCasos = N * r * (1 - s);
  const falsosPositivosCasos = N * (1 - r) * f;
  const verdaderosNegativosCasos = N * (1 - r) * (1 - f);
  const sumaMatriz =
    verdaderosPositivos +
    falsosNegativosCasos +
    falsosPositivosCasos +
    verdaderosNegativosCasos;

  return {
    previa: r,
    sensibilidad: s,
    falsosPositivos: f,
    falsosNegativos,
    especificidad,
    pPositivo,
    pPosterior,
    estaDefinida,
    mensajeIndefinido,
    matrizN: N,
    verdaderosPositivos,
    falsosNegativosCasos,
    falsosPositivosCasos,
    verdaderosNegativosCasos,
    sumaMatriz,
  };
}

// ==========================================
// ESCENA 4: Laboratorio de Simulación Frecuencial
// ==========================================

export interface SimulationStepPoint {
  n: number;
  exitosAcumulados: number;
  frecuenciaRelativa: number;
}

export interface SimulationRunResult {
  n: number;                      // Total de extracciones realizadas
  k: number;                      // Selecciones con al menos un motivo
  frecuenciaRelativa: number;     // k / n
  probabilidadTeorica: number;    // p usada durante la corrida
  diferenciaPuntosPorcentuales: number; // 100 * |k/n - p|
  errorEstandarTeoricoPuntos: number;   // 100 * sqrt(p * (1 - p) / n)
  puntosTrayectoria: SimulationStepPoint[];
  marcaTiempo: number;
}

export function runEmpiricalSimulation(
  n: number,
  probabilidadTeorica: number,
  rng: () => number = Math.random
): SimulationRunResult {
  const p = Math.min(1.0, Math.max(0.0, probabilidadTeorica));
  const total = Math.max(1, Math.floor(n));

  let exitos = 0;
  // Submuestreo para graficar hasta 150 puntos si n es grande
  const pasoMuestreo = Math.max(1, Math.floor(total / 100));
  const puntos: SimulationStepPoint[] = [];

  for (let i = 1; i <= total; i++) {
    const r = rng();
    if (r < p) {
      exitos++;
    }
    if (i % pasoMuestreo === 0 || i === total || i === 1) {
      puntos.push({
        n: i,
        exitosAcumulados: exitos,
        frecuenciaRelativa: exitos / i,
      });
    }
  }

  const frecuenciaRelativa = exitos / total;
  const diferenciaPuntosPorcentuales = 100 * Math.abs(frecuenciaRelativa - p);
  const errorEstandarTeoricoPuntos = 100 * Math.sqrt((p * (1 - p)) / total);

  return {
    n: total,
    k: exitos,
    frecuenciaRelativa,
    probabilidadTeorica: p,
    diferenciaPuntosPorcentuales,
    errorEstandarTeoricoPuntos,
    puntosTrayectoria: puntos,
    marcaTiempo: Date.now(),
  };
}

// ==========================================
// Utilidades de formato en español
// ==========================================

export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value)) return '—';
  const pct = value * 100;
  return pct.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }) + '%';
}

export function formatProbability(value: number, decimals: number = 4): string {
  if (isNaN(value)) return '—';
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatNumberEs(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '—';
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
