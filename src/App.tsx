import { useEffect, useRef, useState } from 'react';
import { Engine } from './render/engine';
import { GameLoop } from './core/loop';
import { CONFIG } from './core/config';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fps, setFps] = useState<number>(0);
  const engineRef = useRef<Engine | null>(null);
  const loopRef = useRef<GameLoop | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new Engine(containerRef.current);
    engineRef.current = engine;

    let frames = 0;
    let lastFpsUpdate = performance.now();

    const loop = new GameLoop(
      (dt: number) => {
        engine.update(dt);

        frames++;
        const now = performance.now();
        if (now - lastFpsUpdate >= 500) {
          setFps(Math.round((frames * 1000) / (now - lastFpsUpdate)));
          frames = 0;
          lastFpsUpdate = now;
        }
      },
      () => {
        engine.render();
      }
    );

    loopRef.current = loop;
    loop.start();

    return () => {
      loop.stop();
      engine.destroy();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden select-none font-mono text-xs">
      {/* Contenedor del canvas Three.js */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Overlay de diagnóstico / Debug Fase 1 */}
      {CONFIG.DEBUG_MODE && (
        <div className="absolute top-3 left-3 bg-black/80 border border-neutral-700 text-neutral-300 p-2.5 rounded shadow space-y-1 pointer-events-none">
          <div className="text-emerald-400 font-bold tracking-wide">
            CÓDIGO LIBERTAD — FASE 1
          </div>
          <div>ESTADO: <span className="text-white">Three.js Inicializado</span></div>
          <div>FPS: <span className="text-yellow-400 font-semibold">{fps}</span></div>
          <div>ESCALA: <span className="text-neutral-400">1m grid / cubo 1x1x1m</span></div>
          <div className="text-neutral-500 pt-1 text-[10px]">
            Listo para FASE 2: WebGLRenderTarget 640×240
          </div>
        </div>
      )}
    </div>
  );
}
