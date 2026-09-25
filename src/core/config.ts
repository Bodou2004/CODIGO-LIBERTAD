/**
 * Código Libertad - Configuración Centralizada
 * GDD Sección 6.2 y 25
 */

export const CONFIG = {
  // Render & Resolución Interna fija (GDD Sección 5.1 y 9)
  INTERNAL_WIDTH: 640,
  INTERNAL_HEIGHT: 240,
  ASPECT_RATIO: 640 / 240, // 2.666...
  ANTIALIAS: false,

  // Jugador / Locomoción inicial (GDD Sección 8)
  PLAYER_WALK_SPEED: 2.2, // unidades/s (metros/s)
  PLAYER_RUN_SPEED: 4.0,
  PLAYER_BACK_SPEED: 1.2,
  PLAYER_TURN_SPEED: 2.8, // rad/s
  PLAYER_COLLIDER_RADIUS: 0.35,
  PLAYER_COLLIDER_HEIGHT: 1.75,

  // Cámaras (GDD Sección 7)
  CAMERA_DEFAULT_FOV: 45,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 50.0,

  // Estética PS1 (GDD Sección 5.2, 5.5)
  VERTEX_SNAPPING: true,
  VERTEX_SNAP_STEPS: 120.0, // granularidad del jitter en pantalla
  DITHERING: false,         // Desactivado al inicio según GDD
  COLOR_LEVELS: 32,

  // Debug y Diagnóstico (GDD Sección 16)
  DEBUG_MODE: true,
} as const;
