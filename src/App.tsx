/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SceneId, UserRole } from './types';
import {
  Scene1Distribution,
  SCENE1_DEFAULT,
  calculateScene1,
  Scene2Parameters,
  SCENE2_SCENARIO_A,
  calculateScene2,
  Scene3Parameters,
  SCENE3_DEFAULT,
  calculateScene3,
  SimulationRunResult,
} from './utils/probabilityMath';
import { Header } from './components/Header';
import { TheoryDrawer } from './components/TheoryDrawer';
import { SceneApertura } from './components/SceneApertura';
import { SceneMotivos } from './components/SceneMotivos';
import { SceneTestigos } from './components/SceneTestigos';
import { SceneMuestra } from './components/SceneMuestra';
import { SceneSimulacion } from './components/SceneSimulacion';
import { SceneConclusion } from './components/SceneConclusion';
import { SceneMetodologia } from './components/SceneMetodologia';

export default function App() {
  // Estado de navegación
  const [currentScene, setCurrentScene] = useState<SceneId>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return 'motivos';
    const sceneParam = params.get('scene') as SceneId | null;
    if (sceneParam && ['apertura', 'motivos', 'testigos', 'muestra', 'simulacion', 'conclusion', 'metodologia'].includes(sceneParam)) {
      return sceneParam;
    }
    return 'apertura';
  });

  // Perspectiva de rol: Fiscalía o Defensa
  const [role, setRole] = useState<UserRole>('fiscalia');

  // Drawer de Teoría
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);

  // Estados de cada escena matemática
  const [scene1Distribution, setScene1Distribution] = useState<Scene1Distribution>({ ...SCENE1_DEFAULT });
  const [scene2Parameters, setScene2Parameters] = useState<Scene2Parameters>({ ...SCENE2_SCENARIO_A });
  const [scene3Parameters, setScene3Parameters] = useState<Scene3Parameters>({ ...SCENE3_DEFAULT });
  const [simResult, setSimResult] = useState<SimulationRunResult | null>(null);

  // Resultados calculados mediante funciones puras
  const scene1Results = calculateScene1(scene1Distribution);
  const scene2Results = calculateScene2(scene2Parameters);
  const scene3Results = calculateScene3(scene3Parameters);

  // Sincronización de título accesible
  useEffect(() => {
    document.title = 'DUDA RAZONABLE: El robo en la galería · Laboratorio de Probabilidad';
  }, []);

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
      {/* Encabezado y Barra de Navegación Principal */}
      <Header
        currentScene={currentScene}
        onSelectScene={(scene) => setCurrentScene(scene)}
        role={role}
        onToggleRole={(newRole) => setRole(newRole)}
        onOpenTheory={() => setIsTheoryOpen(true)}
      />

      {/* Contenido Principal de la Escena Activa */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentScene === 'apertura' && (
          <SceneApertura
            role={role}
            onToggleRole={(r) => setRole(r)}
            onProceed={() => setCurrentScene('motivos')}
          />
        )}

        {currentScene === 'motivos' && (
          <SceneMotivos
            distribution={scene1Distribution}
            onChangeDistribution={setScene1Distribution}
            role={role}
            onOpenTheory={() => setIsTheoryOpen(true)}
          />
        )}

        {currentScene === 'testigos' && (
          <SceneTestigos
            parameters={scene2Parameters}
            onChangeParameters={setScene2Parameters}
            role={role}
            onOpenTheory={() => setIsTheoryOpen(true)}
          />
        )}

        {currentScene === 'muestra' && (
          <SceneMuestra
            parameters={scene3Parameters}
            onChangeParameters={setScene3Parameters}
            role={role}
            onOpenTheory={() => setIsTheoryOpen(true)}
          />
        )}

        {currentScene === 'simulacion' && (
          <SceneSimulacion
            scene1Distribution={scene1Distribution}
            simResult={simResult}
            onSetSimResult={setSimResult}
            role={role}
            onOpenTheory={() => setIsTheoryOpen(true)}
          />
        )}

        {currentScene === 'conclusion' && (
          <SceneConclusion
            role={role}
            onOpenTheory={() => setIsTheoryOpen(true)}
          />
        )}

        {currentScene === 'metodologia' && (
          <SceneMetodologia />
        )}
      </main>

      {/* Panel lateral "Ver teoría" */}
      <TheoryDrawer
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        activeScene={currentScene}
        scene1Data={scene1Results}
        scene2Data={scene2Results}
        scene3Data={scene3Results}
        simData={simResult}
      />

      {/* Pie de página institucional */}
      <footer className="border-t border-slate-800/80 bg-[#060a17] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">«DUDA RAZONABLE»</span>
            <span className="text-slate-600">·</span>
            <span>El robo en la galería</span>
            <span className="text-slate-600">·</span>
            <span>Proyecto de Probabilidad y Estadística</span>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Simulación educativa con fines universitarios. Fórmulas locales verificadas y datos ficticios.
          </div>
        </div>
      </footer>
    </div>
  );
}
