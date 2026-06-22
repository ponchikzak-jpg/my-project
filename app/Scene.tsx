"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Living data-lattice — a hand-built Three.js point cloud.
   A flowing spherical field of points (the "system") that breathes
   via layered noise, rotates slowly, and parallaxes toward the cursor.
   Monochrome with a jade band. No libraries, no presets, no images.
------------------------------------------------------------------- */

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---- main flowing sphere of points (fibonacci distribution) ---- */
    const COUNT = 7000;
    const radius = 3.2;
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3); // unit directions
    const colors = new Float32Array(COUNT * 3);

    const cLight = new THREE.Color("#e7e3f7");
    const cMid = new THREE.Color("#6f6a82");
    const cJade = new THREE.Color("#a78bfa");

    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const dx = Math.cos(theta) * r;
      const dy = y;
      const dz = Math.sin(theta) * r;
      base[i * 3] = dx;
      base[i * 3 + 1] = dy;
      base[i * 3 + 2] = dz;
      positions[i * 3] = dx * radius;
      positions[i * 3 + 1] = dy * radius;
      positions[i * 3 + 2] = dz * radius;

      // jade band around the equator + scattered sparks, otherwise grey
      const band = 1 - Math.min(Math.abs(dy) / 0.42, 1);
      const spark = Math.random() > 0.93 ? 1 : 0;
      const jadeAmt = Math.max(band * 0.9, spark);
      const c = cMid.clone().lerp(cLight, Math.random() * 0.6).lerp(cJade, jadeAmt);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    group.add(points);

    /* ---- sparse depth particles behind ---- */
    const BG = 1400;
    const bgPos = new Float32Array(BG * 3);
    for (let i = 0; i < BG; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 22;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({
      size: 0.02, color: 0x534d66, transparent: true, opacity: 0.5,
      depthWrite: false, sizeAttenuation: true,
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPoints);

    /* ---- flow displacement (cheap layered trig noise) ---- */
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    function flow(t: number) {
      for (let i = 0; i < COUNT; i++) {
        const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
        const n =
          Math.sin(bx * 2.6 + t) * 0.5 +
          Math.cos(by * 3.1 - t * 0.8) * 0.35 +
          Math.sin(bz * 2.2 + t * 0.6) * 0.3;
        const rr = radius + n * 0.34;
        posAttr.array[i * 3] = bx * rr;
        posAttr.array[i * 3 + 1] = by * rr;
        posAttr.array[i * 3 + 2] = bz * rr;
      }
      posAttr.needsUpdate = true;
    }
    flow(0);

    /* ---- pointer parallax ---- */
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    function onMove(e: MouseEvent) {
      target.x = (e.clientX / window.innerWidth - 0.5);
      target.y = (e.clientY / window.innerHeight - 0.5);
    }
    if (!reduced) window.addEventListener("mousemove", onMove);

    /* ---- resize ---- */
    function resize() {
      const w = mount!.clientWidth, h = mount!.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---- loop ---- */
    let raf = 0;
    const start = performance.now();
    function tick() {
      const t = (performance.now() - start) / 1000;
      if (!reduced) {
        flow(t * 0.45);
        group.rotation.y = t * 0.06;
        group.rotation.x = Math.sin(t * 0.18) * 0.12;
        cur.x += (target.x - cur.x) * 0.04;
        cur.y += (target.y - cur.y) * 0.04;
        group.rotation.y += cur.x * 0.5;
        group.rotation.x += cur.y * 0.35;
        bgPoints.rotation.y = t * 0.015;
        camera.position.x = cur.x * 0.6;
        camera.position.y = -cur.y * 0.4;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      geo.dispose(); mat.dispose(); bgGeo.dispose(); bgMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}
