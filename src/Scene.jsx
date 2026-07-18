import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { ComputerDeskArea } from './ComputerDeskArea';

export function Scene() {
  const scroll = useScroll();
  
  const tempCamPos = useRef(new THREE.Vector3());
  const tempCamLookAt = useRef(new THREE.Vector3());

  useFrame((state) => {
    const offset = scroll.offset;
    
    // Start position: Zoomed out, high up
    const startPos = new THREE.Vector3(0, 4, 1.5);
    const startLookAt = new THREE.Vector3(0, -1.0, -2.0);
    
    // End position: Centered on the monitor
    const endPos = new THREE.Vector3(0.1, 0.2, -1.0);
    const endLookAt = new THREE.Vector3(0.1, 0.1, -2.5);

    const currentPos = tempCamPos.current.lerpVectors(startPos, endPos, offset);
    const currentLookAt = tempCamLookAt.current.lerpVectors(startLookAt, endLookAt, offset);

    // Smooth movement
    state.camera.position.lerp(currentPos, 0.1);
    state.camera.lookAt(currentLookAt);
  });

  return (
    <>
      <color attach="background" args={['#3e2723']} />
      <fog attach="fog" args={['#3e2723', 5, 15]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      
      {/* Light specifically to illuminate the screen and desk area */}
      <pointLight position={[0.1, 0.2, -1.5]} intensity={0.5} color="#00ffff" distance={3} decay={2} />

      {/* The realistic 3D Model */}
      <group position={[0, -1, -2]}>
        <ComputerDeskArea />
      </group>


      {/* Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111827" roughness={0.8} />
      </mesh>
    </>
  );
}
