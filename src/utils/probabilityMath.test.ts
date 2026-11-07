/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Verificaciones y pruebas unitarias de las funciones matemáticas
 * para el laboratorio «Duda Razonable».
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScene1,
  SCENE1_DEFAULT,
  calculateScene2,
  SCENE2_SCENARIO_A,
  SCENE2_SCENARIO_B,
  calculateScene3,
  SCENE3_DEFAULT,
  SCENE3_PRESET_2,
  SCENE3_PRESET_3,
  runEmpiricalSimulation,
} from './probabilityMath';

const TOLERANCE = 1e-9;

function closeTo(actual: number, expected: number, tol = TOLERANCE): boolean {
  return Math.abs(actual - expected) < tol;
}

test('Escena 1 inicial: unión 0,60 y complemento 0,40', () => {
  const res = calculateScene1(SCENE1_DEFAULT);
  assert.equal(res.soloA, 25);
  assert.equal(res.soloB, 20);
  assert.equal(res.ambos, 15);
  assert.equal(res.ninguno, 40);
  assert.equal(res.total, 100);

  assert.ok(closeTo(res.pA, 0.40));
  assert.ok(closeTo(res.pB, 0.35));
  assert.ok(closeTo(res.pInterseccion, 0.15));
  assert.ok(closeTo(res.pUnion, 0.60));
  assert.ok(closeTo(res.pNinguno, 0.40));
  assert.ok(closeTo(res.sumaMarginalesIncorrecta, 0.75));
});

test('Escena 1: Las cuatro categorías son enteras no negativas y suman 100', () => {
  const testCases = [
    { soloA: 0, soloB: 0, ambos: 0 },
    { soloA: 30, soloB: 30, ambos: 40 },
    { soloA: 50, soloB: 20, ambos: 10 },
  ];
  for (const tc of testCases) {
    const res = calculateScene1(tc);
    assert.ok(res.soloA >= 0 && Number.isInteger(res.soloA));
    assert.ok(res.soloB >= 0 && Number.isInteger(res.soloB));
    assert.ok(res.ambos >= 0 && Number.isInteger(res.ambos));
    assert.ok(res.ninguno >= 0 && Number.isInteger(res.ninguno));
    assert.equal(res.soloA + res.soloB + res.ambos + res.ninguno, 100);
  }
});

test('Escena 2 independiente: ramas 0,42; 0,28; 0,18; 0,12 y P(E2) = 0,60', () => {
  const res = calculateScene2(SCENE2_SCENARIO_A);
  assert.ok(closeTo(res.pAmbos, 0.42));
  assert.ok(closeTo(res.pSoloPrimero, 0.28));
  assert.ok(closeTo(res.pSoloSegundo, 0.18));
  assert.ok(closeTo(res.pNinguno, 0.12));
  assert.ok(closeTo(res.pE2, 0.60));
  assert.equal(res.esIndependiente, true);
});

test('Escena 2 dependiente: 0,595; 0,105; 0,060; 0,240 y marginal P(E2) = 0,655', () => {
  const res = calculateScene2(SCENE2_SCENARIO_B);
  assert.ok(closeTo(res.pAmbos, 0.595));
  assert.ok(closeTo(res.pSoloPrimero, 0.105));
  assert.ok(closeTo(res.pSoloSegundo, 0.060));
  assert.ok(closeTo(res.pNinguno, 0.240));
  assert.ok(closeTo(res.pE2, 0.655));
  assert.equal(res.esIndependiente, false);
});

test('Escena 2: Suma de ramas igual a 1 con tolerancia numérica', () => {
  const arbParams = [
    { p: 0.1, q1: 0.2, q0: 0.9 },
    { p: 0.5, q1: 0.5, q0: 0.5 },
    { p: 0.99, q1: 0.99, q0: 0.01 },
  ];
  for (const param of arbParams) {
    const res = calculateScene2(param);
    assert.ok(closeTo(res.sumaRamas, 1.0));
  }
});

test('Escena 3 Bayes inicial: P(H | +) ≈ 0,0098039216 y P(+) = 0,010098', () => {
  const res = calculateScene3(SCENE3_DEFAULT);
  assert.ok(closeTo(res.pPositivo, 0.010098));
  assert.ok(res.pPosterior !== null);
  assert.ok(closeTo(res.pPosterior!, 0.0098039215686, 1e-7));
  assert.equal(res.estaDefinida, true);
});

test('Escena 3 Bayes con previa 0,01 (1%): P(H | +) = 0,50', () => {
  const res = calculateScene3(SCENE3_PRESET_2);
  assert.ok(res.pPosterior !== null);
  assert.ok(closeTo(res.pPosterior!, 0.50));
});

test('Escena 3 Bayes con previa 0,10 (10%): P(H | +) ≈ 0,9166666667', () => {
  const res = calculateScene3(SCENE3_PRESET_3);
  assert.ok(res.pPosterior !== null);
  assert.ok(closeTo(res.pPosterior!, 0.9166666667, 1e-6));
});

test('Escena 3: Denominador cero controlado cuando P(+) = 0', () => {
  const res = calculateScene3({
    previa: 0,
    sensibilidad: 0,
    falsosPositivos: 0,
  });
  assert.equal(res.estaDefinida, false);
  assert.equal(res.pPosterior, null);
  assert.ok(res.mensajeIndefinido?.includes('no definida'));
});

test('Escena 3: Matriz de valores esperados suma exactamente N (100.000)', () => {
  const res = calculateScene3(SCENE3_DEFAULT);
  assert.ok(closeTo(res.verdaderosPositivos, 9.9));
  assert.ok(closeTo(res.falsosNegativosCasos, 0.1));
  assert.ok(closeTo(res.falsosPositivosCasos, 999.9));
  assert.ok(closeTo(res.verdaderosNegativosCasos, 98990.1));
  assert.ok(closeTo(res.sumaMatriz, 100000));
});

test('Laboratorio de simulación: p = 0 produce cero éxitos y p = 1 produce todos éxitos', () => {
  const resZero = runEmpiricalSimulation(100, 0);
  assert.equal(resZero.k, 0);
  assert.equal(resZero.frecuenciaRelativa, 0);

  const resOne = runEmpiricalSimulation(100, 1);
  assert.equal(resOne.k, 100);
  assert.equal(resOne.frecuenciaRelativa, 1);
});

test('Laboratorio de simulación: conteos simulados enteros y frecuencia igual a k/n', () => {
  const res = runEmpiricalSimulation(1000, 0.6);
  assert.ok(Number.isInteger(res.n));
  assert.ok(Number.isInteger(res.k));
  assert.ok(res.k >= 0 && res.k <= res.n);
  assert.ok(closeTo(res.frecuenciaRelativa, res.k / res.n));
  assert.ok(closeTo(res.diferenciaPuntosPorcentuales, 100 * Math.abs(res.frecuenciaRelativa - 0.6)));
});
