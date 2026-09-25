/**
 * Bucle de juego con deltaTime independiente de la tasa de refresco
 * GDD Sección 6.3
 */

export type UpdateCallback = (dt: number) => void;
export type RenderCallback = () => void;

export class GameLoop {
  private isRunning: boolean = false;
  private lastTime: number = 0;
  private onUpdate: UpdateCallback;
  private onRender: RenderCallback;
  private animationFrameId: number | null = null;

  constructor(onUpdate: UpdateCallback, onRender: RenderCallback) {
    this.onUpdate = onUpdate;
    this.onRender = onRender;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private tick = (currentTime: number): void => {
    if (!this.isRunning) return;

    // Calcular delta time en segundos (con clamp a 0.1s para evitar saltos bruscos tras pausas)
    const rawDt = (currentTime - this.lastTime) / 1000;
    const dt = Math.min(rawDt, 0.1);
    this.lastTime = currentTime;

    // 1. Actualización de lógica
    this.onUpdate(dt);

    // 2. Renderizado
    this.onRender();

    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}
