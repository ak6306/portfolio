import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ComputerDeskArea } from './ComputerDeskArea';
import { CodeParticles } from './CodeParticles';

// One camera pose per section, in document scroll order.
const KEYFRAMES = [
  { pos: new THREE.Vector3(0, 3.4, 2.6), lookAt: new THREE.Vector3(0, -0.6, -2.0) }, // hero
  { pos: new THREE.Vector3(-1.3, 2.2, 1.8), lookAt: new THREE.Vector3(0, -0.6, -2.0) }, // about
  { pos: new THREE.Vector3(-0.9, 1.3, 1.1), lookAt: new THREE.Vector3(0.05, -0.3, -2.1) }, // skills
  { pos: new THREE.Vector3(0.4, 0.9, 0.9), lookAt: new THREE.Vector3(0.1, -0.1, -2.2) }, // experience
  { pos: new THREE.Vector3(0.9, 0.6, 0.4), lookAt: new THREE.Vector3(0.1, 0.0, -2.3) }, // projects
  { pos: new THREE.Vector3(0.1, 0.2, -1.0), lookAt: new THREE.Vector3(0.1, 0.1, -2.5) }, // resume (on-screen)
  { pos: new THREE.Vector3(0, 1.8, 2.4), lookAt: new THREE.Vector3(0, -0.4, -2.0) }, // contact
];

// Fraction of each section's scroll range the camera spends holding still at
// that section's pose before it starts easing toward the next one. Keeping a
// long dwell means the camera is rock-steady while someone reads a section
// (crucial for the resume section) and only moves during the hand-off.
const DWELL = 0.65;
const FOLLOW_SPEED = 4;

function smoothstep(t) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export function Scene({ scrollProgress }) {
  const camPos = useRef(new THREE.Vector3().copy(KEYFRAMES[0].pos));
  const camLookAt = useRef(new THREE.Vector3().copy(KEYFRAMES[0].lookAt));
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  const keyLightRef = useRef();
  const screenGlowRef = useRef();

  const mouse = useRef(new THREE.Vector2(0, 0));
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const numSections = KEYFRAMES.length;
    const progress = scrollProgress.get();
    const sectionFloat = THREE.MathUtils.clamp(progress, 0, 0.999999) * numSections;
    const sectionIndex = Math.min(Math.floor(sectionFloat), numSections - 1);
    const nextIndex = Math.min(sectionIndex + 1, numSections - 1);
    const localT = sectionFloat - sectionIndex;
    const blend = smoothstep((localT - DWELL) / (1 - DWELL));

    targetPos.current.lerpVectors(KEYFRAMES[sectionIndex].pos, KEYFRAMES[nextIndex].pos, blend);
    targetLookAt.current.lerpVectors(KEYFRAMES[sectionIndex].lookAt, KEYFRAMES[nextIndex].lookAt, blend);

    // A whisper of mouse parallax during the intro, fully faded out by the
    // Skills section so it never fights the precise resume-screen framing.
    if (!reducedMotion.current) {
      const parallaxStrength = Math.max(0, 1 - sectionFloat / 2) * 0.15;
      targetPos.current.x += mouse.current.x * parallaxStrength;
      targetPos.current.y += mouse.current.y * parallaxStrength * 0.6;
    }

    const followSpeed = reducedMotion.current ? 14 : FOLLOW_SPEED;
    const damp = 1 - Math.exp(-delta * followSpeed);
    camPos.current.lerp(targetPos.current, damp);
    camLookAt.current.lerp(targetLookAt.current, damp);

    state.camera.position.copy(camPos.current);
    state.camera.lookAt(camLookAt.current);

    if (keyLightRef.current) {
      keyLightRef.current.target.updateMatrixWorld();
    }

    // Gentle "monitor glow" breathing so the screen light feels alive without flickering.
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 5.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.5;
    }
  });

  return (
    <>
      <color attach="background" args={['#0a0c11']} />
      <fog attach="fog" args={['#0a0c11', 4, 15]} />

      {/* Soft ambient fill so nothing falls into a pure black void */}
      <ambientLight intensity={0.2} />

      {/* Key light: warm desk-lamp softbox from above-front */}
      <spotLight
        ref={keyLightRef}
        position={[1.2, 3.6, 1.5]}
        target-position={[0, -0.6, -2]}
        angle={0.55}
        penumbra={0.6}
        intensity={150}
        color="#ffd9b3"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Rim light: cool fill from behind-left for depth separation */}
      <spotLight position={[-2.5, 2.2, -3.5]} angle={0.6} penumbra={0.8} intensity={70} color="#4fd1e8" />

      {/* Warm ambient glow the monitor itself would cast onto the desk */}
      <pointLight ref={screenGlowRef} position={[0.05, 0.9, -1.9]} intensity={5.5} distance={3} color="#ff8a65" />

      <CodeParticles scrollProgress={scrollProgress} />

      <group position={[0, -1, -2]}>
        <ComputerDeskArea />
      </group>

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2c313c" roughness={0.9} />
      </mesh>
    </>
  );
}
