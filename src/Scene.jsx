import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ComputerDeskArea } from './ComputerDeskArea';
import { CodeParticles } from './CodeParticles';

export function Scene({ zoomed }) {
  const tempCamPos = useRef(new THREE.Vector3());
  const tempCamLookAt = useRef(new THREE.Vector3());
  const spotLightRef = useRef();
  const screenLightRef = useRef();
  
  // Keep track of our current animation progress (0 = zoomed out, 1 = zoomed in)
  const animProgress = useRef(0);
  
  // Track mouse securely at the window level
  const mouse = useRef(new THREE.Vector2(0, 0));
  const flashTimer = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Increase delta multiplier from 3 to 10 for a much snappier animation
    animProgress.current = THREE.MathUtils.lerp(animProgress.current, zoomed ? 1 : 0, delta * 10);
    const offset = animProgress.current;
    
    // Start position: Zoomed out, high up
    const startPos = new THREE.Vector3(0, 4, 1.5);
    const startLookAt = new THREE.Vector3(0, -1.0, -2.0);
    
    // End position: Centered on the monitor
    const endPos = new THREE.Vector3(0.1, 0.2, -1.0);
    const endLookAt = new THREE.Vector3(0.1, 0.1, -2.5);

    const currentPos = tempCamPos.current.lerpVectors(startPos, endPos, offset);
    const currentLookAt = tempCamLookAt.current.lerpVectors(startLookAt, endLookAt, offset);

    // Set camera immediately to current step
    state.camera.position.copy(currentPos);
    state.camera.lookAt(currentLookAt);

    // Interactive Flashlight Logic!
    if (spotLightRef.current) {
      const { raycaster } = state;
      
      // 1. Raycast to find exactly where the mouse is pointing on the virtual floor
      raycaster.setFromCamera(mouse.current, state.camera);
      const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1);
      const intersectPoint = new THREE.Vector3();
      const hit = raycaster.ray.intersectPlane(floorPlane, intersectPoint);
      
      if (!hit) {
        intersectPoint.set(0, -1, -2); // Fallback to center of desk if looking away from floor
      }
      
      // 2. Define the 'Flashlight' states (when on the landing page)
      // Flashlight is held slightly below and to the right of the camera
      const flashlightPos = new THREE.Vector3(state.camera.position.x + 0.5, state.camera.position.y - 0.5, state.camera.position.z + 0.2);
      const flashlightTarget = intersectPoint;
      let flashlightAngle = 0.07; // Much smaller radius!
      let flashlightIntensity = 180; // Standard torch brightness

      // Rare random ambient flashes (30-40 second frequency)
      if (!zoomed && offset < 0.1) {
        if (flashTimer.current > 0) {
          flashTimer.current -= delta;
          // During a flash, the light glitches, widens its beam, and surges brightly
          flashlightIntensity = 300 + Math.random() * 300; 
          flashlightAngle = 0.15 + Math.random() * 0.2;
        } else if (Math.random() > 0.9996) { // ~40 seconds average at 60fps
          flashTimer.current = 0.05 + Math.random() * 0.08;
        }
      }

      // 3. Define the 'Ceiling Light' states (when zoomed in to workspace)
      const ceilingLightPos = new THREE.Vector3(0, 6, -0.5);
      const ceilingLightTarget = new THREE.Vector3(0, -1, -2); // Centered on desk
      const ceilingLightAngle = 0.4; // Wide beam illuminating the whole desk
      const ceilingLightIntensity = 400; // Very bright

      // 4. Apply the light properties based on state
      if (!zoomed) {
        // Flashlight mode: strictly follows mouse
        spotLightRef.current.position.copy(flashlightPos);
        spotLightRef.current.target.position.copy(flashlightTarget);
        spotLightRef.current.angle = flashlightAngle;
        spotLightRef.current.intensity = flashlightIntensity;
      } else {
        // Ceiling mode: Instantly snap the light to the ceiling so the scene lights up immediately!
        spotLightRef.current.position.copy(ceilingLightPos);
        spotLightRef.current.target.position.copy(ceilingLightTarget);
        spotLightRef.current.angle = ceilingLightAngle;
        spotLightRef.current.intensity = ceilingLightIntensity;
      }
      
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 3, 10]} />
      
      {/* Tiny ambient light just so the shadows aren't pitch black voids */}
      <ambientLight intensity={0.05} />
      
      {/* Dramatic Cinematic Spotlight */}
      <spotLight 
        ref={spotLightRef}
        position={[0, 6, -0.5]} 
        angle={0.4} 
        penumbra={0.3} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Code Particles for the landing page (fades out when zoomed) */}
      <CodeParticles opacity={!zoomed ? 1 : 0} />

      {/* The realistic 3D Model */}
      <group position={[0, -1, -2]}>
        <ComputerDeskArea />
      </group>

      {/* Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        {/* Lighter color so the spotlight circle is highly visible, but stays black in the dark */}
        <meshStandardMaterial color="#aaaaaa" roughness={0.9} />
      </mesh>
    </>
  );
}
