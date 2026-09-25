/**
 * Código Libertad - Sistema de renderizado inicial (Fase 1)
 * Prepara la escena, WebGLRenderer y cámara de prueba
 */

import * as THREE from 'three';
import { CONFIG } from '../core/config';

export class Engine {
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private testCube: THREE.Mesh;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0c); // Fondo oscuro tipo survival horror

    // 2. Renderer básico (antialiasing false según GDD)
    this.renderer = new THREE.WebGLRenderer({
      antialias: CONFIG.ANTIALIAS,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // 3. Cámara de verificación inicial
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(CONFIG.CAMERA_DEFAULT_FOV, aspect, CONFIG.CAMERA_NEAR, CONFIG.CAMERA_FAR);
    this.camera.position.set(0, 2.5, 5);
    this.camera.lookAt(0, 0.5, 0);

    // 4. Luces sobrias acordes a la estética
    const ambientLight = new THREE.AmbientLight(0x222233, 1.2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xddeeff, 1.5);
    directionalLight.position.set(3, 6, 2);
    this.scene.add(directionalLight);

    // 5. Suelo y objeto neutro para verificar escala y render (1 unidad = 1 metro)
    const grid = new THREE.GridHelper(10, 10, 0x444455, 0x222233);
    grid.position.y = 0;
    this.scene.add(grid);

    // Cubo de verificación de 1m x 1m x 1m
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8899aa,
      roughness: 0.8,
    });
    this.testCube = new THREE.Mesh(geometry, material);
    this.testCube.position.set(0, 0.5, 0);
    this.scene.add(this.testCube);

    // Escuchar resize de ventana
    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  public update(dt: number): void {
    // Rotación suave del cubo de prueba para verificar continuidad del game loop
    this.testCube.rotation.y += 0.5 * dt;
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public destroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }
}
