'use client';

import { useEffect, useRef } from 'react';

export default function ThreeCountertopHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE: typeof import('three');
    let renderer: import('three').WebGLRenderer;
    let scene: import('three').Scene;
    let camera: import('three').PerspectiveCamera;
    let slab: import('three').Mesh;
    let particles: import('three').Points;
    let running = true;

    // Returns true when the canvas is in a portrait/narrow mobile layout
    const isMobile = () => canvas.clientWidth < canvas.clientHeight || canvas.clientWidth < 640;

    // Apply camera position based on viewport shape
    const applyCameraForViewport = () => {
      if (isMobile()) {
        // Higher, closer, steeper angle — surface reads as a flat countertop
        camera.position.set(0, 5.5, 4.5);
        camera.fov = 52;
      } else {
        camera.position.set(0, 3.5, 9);
        camera.fov = 45;
      }
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    async function init() {
      if (!canvas) return;
      THREE = await import('three');

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0e0a0a);
      scene.fog = new THREE.FogExp2(0x0e0a0a, 0.04);

      // Camera
      camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
      applyCameraForViewport();

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      // ── Countertop slab ──
      const slabGeo = new THREE.BoxGeometry(8, 0.22, 3.5, 64, 4, 32);

      // Procedural stone-like texture via canvas
      const texSize = 512;
      const offscreen = document.createElement('canvas');
      offscreen.width = texSize;
      offscreen.height = texSize;
      const ctx = offscreen.getContext('2d')!;

      // Base: dark charcoal stone
      ctx.fillStyle = '#1e1a1a';
      ctx.fillRect(0, 0, texSize, texSize);

      // Vein network — thin light lines
      for (let v = 0; v < 22; v++) {
        const x0 = Math.random() * texSize;
        const y0 = Math.random() * texSize;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        let cx = x0;
        let cy = y0;
        for (let s = 0; s < 8; s++) {
          cx += (Math.random() - 0.5) * 80;
          cy += (Math.random() - 0.5) * 80;
          ctx.lineTo(cx, cy);
        }
        const opacity = 0.05 + Math.random() * 0.18;
        ctx.strokeStyle = `rgba(200,190,180,${opacity})`;
        ctx.lineWidth = 0.4 + Math.random() * 1.2;
        ctx.stroke();
      }

      // Subtle speckle — mineral flecks
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * texSize;
        const y = Math.random() * texSize;
        const r = Math.random() * 2;
        const gray = Math.floor(30 + Math.random() * 80);
        ctx.fillStyle = `rgba(${gray},${gray - 5},${gray - 10},${0.3 + Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const stoneTex = new THREE.CanvasTexture(offscreen);
      stoneTex.wrapS = THREE.RepeatWrapping;
      stoneTex.wrapT = THREE.RepeatWrapping;
      stoneTex.repeat.set(2, 1);

      const slabMat = new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.18,
        metalness: 0.05,
        envMapIntensity: 1.2,
      });

      slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = 0;
      slab.castShadow = true;
      slab.receiveShadow = true;
      scene.add(slab);

      // ── Reflective floor plane ──
      const floorGeo = new THREE.PlaneGeometry(60, 60);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x100c0c,
        roughness: 0.5,
        metalness: 0.3,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.12;
      floor.receiveShadow = true;
      scene.add(floor);

      // ── Lighting ──

      // Warm key light above-left (studio look)
      const keyLight = new THREE.SpotLight(0xfff5e8, 180, 30, Math.PI / 7, 0.3, 1.2);
      keyLight.position.set(-4, 10, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 30;
      keyLight.target.position.set(0, 0, 0);
      scene.add(keyLight);
      scene.add(keyLight.target);

      // Cool fill from the right
      const fillLight = new THREE.DirectionalLight(0xc8d8f0, 25);
      fillLight.position.set(6, 6, -4);
      scene.add(fillLight);

      // Rim/back light — burgundy tint to match brand
      const rimLight = new THREE.PointLight(0x800020, 60, 12);
      rimLight.position.set(0, 2, -5);
      scene.add(rimLight);

      // Ambient
      scene.add(new THREE.AmbientLight(0x180a0a, 40));

      // ── Floating particles (mineral dust) ──
      const partCount = 400;
      const partPositions = new Float32Array(partCount * 3);
      for (let i = 0; i < partCount; i++) {
        partPositions[i * 3] = (Math.random() - 0.5) * 20;
        partPositions[i * 3 + 1] = Math.random() * 6 - 1;
        partPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
      const partGeo = new THREE.BufferGeometry();
      partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
      const partMat = new THREE.PointsMaterial({ color: 0xfff0e8, size: 0.04, transparent: true, opacity: 0.5 });
      particles = new THREE.Points(partGeo, partMat);
      scene.add(particles);

      // ── Resize handler ──
      const onResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        applyCameraForViewport();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // ── Animate ──
      let t = 0;
      const animate = () => {
        if (!running) return;
        animRef.current = requestAnimationFrame(animate);
        t += 0.008;

        const mobile = isMobile();

        // Gentle slab bob and tilt
        slab.position.y = Math.sin(t * 0.7) * 0.04;
        slab.rotation.y = Math.sin(t * 0.4) * 0.06;
        slab.rotation.x = Math.sin(t * 0.3) * 0.015;

        // Slow camera arc — tighter on mobile to keep countertop framed
        if (mobile) {
          camera.position.x = Math.sin(t * 0.18) * 0.6;
          camera.position.y = 5.5 + Math.sin(t * 0.25) * 0.2;
          camera.position.z = 4.5;
        } else {
          camera.position.x = Math.sin(t * 0.18) * 1.5;
          camera.position.y = 3.5 + Math.sin(t * 0.25) * 0.3;
          camera.position.z = 9;
        }
        camera.lookAt(0, 0, 0);

        // Particles drift upward
        const pos = particles.geometry.attributes.position as import('three').BufferAttribute;
        for (let i = 0; i < partCount; i++) {
          pos.array[i * 3 + 1] += 0.005;
          if ((pos.array[i * 3 + 1] as number) > 5) {
            pos.array[i * 3 + 1] = -1;
          }
        }
        pos.needsUpdate = true;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }

    const cleanup = init();

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      cleanup.then((fn) => fn?.());
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', backgroundColor: '#0e0a0a' }}
    />
  );
}
