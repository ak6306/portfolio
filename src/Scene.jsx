import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const scroll = useScroll();
  
  // Refs for animation
  const personRef = useRef();
  const cameraGroupRef = useRef();
  const cupRef = useRef();

  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1
    const offset = scroll.offset;
    
    // We animate based on the scroll offset directly
    
    if (personRef.current) {
      // Sitting position: z = -2, standing/walking target: z = 2
      const targetZ = THREE.MathUtils.lerp(-2, 2, offset * 1.5);
      
      // Rotation: starts facing -Z (Math.PI), turns around to face +Z (0)
      const targetRotY = THREE.MathUtils.lerp(Math.PI, 0, Math.min(offset * 2.5, 1));
      
      // Simulating getting up: Y position changes
      const targetY = offset > 0.1 ? 0 : -0.5; // Sitting vs standing
      
      // Apply with damping for smooth motion
      personRef.current.position.z = THREE.MathUtils.damp(personRef.current.position.z, Math.min(targetZ, 2), 4, delta);
      personRef.current.position.y = THREE.MathUtils.damp(personRef.current.position.y, targetY, 4, delta);
      personRef.current.rotation.y = THREE.MathUtils.damp(personRef.current.rotation.y, targetRotY, 4, delta);
    }
    
    // Animate camera to move forward slightly as we scroll
    if (cameraGroupRef.current) {
      cameraGroupRef.current.position.z = THREE.MathUtils.lerp(5, 3, offset);
    }
    
    // Animate the cup being picked up
    if (cupRef.current && personRef.current) {
      // When the person reaches the foreground (offset > 0.8), they "pick up" the cup
      if (offset > 0.8) {
        // Attach cup near person's hand (approximate local offset)
        cupRef.current.position.copy(personRef.current.position);
        cupRef.current.position.x += 0.4;
        cupRef.current.position.y += 0.2;
        cupRef.current.position.z += 0.3;
      } else {
        // Cup remains on foreground table
        cupRef.current.position.set(1.5, -0.9, 1);
      }
    }
  });

  return (
    <>
      <group ref={cameraGroupRef}>
        <perspectiveCamera makeDefault position={[0, 1.5, 5]} fov={50} />
      </group>
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[0, 1, -2.5]} intensity={0.5} color="#00ffff" /> {/* Screen glow */}

      {/* Main Desk */}
      <mesh position={[0, -0.6, -2.5]} receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#222" roughness={0.7} />
      </mesh>
      
      {/* Monitor Base */}
      <mesh position={[0, -0.4, -2.8]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Monitor Screen */}
      <mesh position={[0, 0.1, -2.8]} castShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1, 0.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Screen Display (Glowing) */}
      <mesh position={[0, 0.1, -2.74]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      
      {/* Foreground Table (where cup is placed) */}
      <mesh position={[1.5, -1, 1]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Coffee Cup */}
      <mesh ref={cupRef} position={[1.5, -0.9, 1]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>

      {/* Person (Abstract Representation) */}
      <group ref={personRef} position={[0, -0.5, -2]} castShadow>
        {/* Torso */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.5, 0.8, 0.3]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#fca5a5" roughness={0.4} />
        </mesh>
        {/* Legs (Simple abstraction) */}
        <mesh position={[-0.15, 0.1, 0]} castShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0.15, 0.1, 0]} castShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>
      
      {/* Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#111827" roughness={0.8} />
      </mesh>

      {/* Decorative Grid */}
      <gridHelper args={[50, 50, "#334155", "#1e293b"]} position={[0, -1.99, 0]} />
    </>
  );
}
