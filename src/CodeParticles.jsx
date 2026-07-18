import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function CodeParticles({ opacity = 1 }) {
  const group = useRef();
  
  // Generate random particles that will "fan out" from the monitor
  const particles = useMemo(() => {
    const symbols = [
      '< />', '{}', '();', '[]', '=>', '||', '&&', '++', '--',
      'print("hello world!")', 'Exception', 'NullPointerException', 'return 0;', 'SELECT * FROM'
    ];
    
    return Array.from({ length: 8 }).map(() => {
      // 85% chance to pick a small symbol, 15% chance to pick a long phrase
      const isRare = Math.random() > 0.85;
      const chosenText = isRare 
        ? symbols[9 + Math.floor(Math.random() * 5)] 
        : symbols[Math.floor(Math.random() * 9)];

      return {
        // Starting spawn point (roughly where the computer monitor is)
        x: (Math.random() - 0.5) * 0.5,
        // Start them staggered vertically so they don't spawn in a clump
        y: 0.8 + Math.random() * 6.0,
        z: -0.5 + (Math.random() * 0.2), 
        // Velocity vectors for an extremely slow, lazy fanning out
        vx: (Math.random() - 0.5) * 0.004, // Extremely slow left/right spread
        vy: Math.random() * 0.002 + 0.002, // Extremely slow upward drift
        vz: Math.random() * 0.005,         // Extremely slow float towards camera
        // Rendering properties
        text: chosenText,
        scale: Math.random() * 0.25 + 0.15, // Scaled down slightly to fit the long phrases better
        color: ['#ff8a65', '#00ffff', '#4caf50', '#ffeb3b', '#e0e0e0'][Math.floor(Math.random() * 5)]
      };
    });
  }, []);

  useFrame(() => {
    if (group.current && opacity > 0) {
      group.current.children.forEach((child, i) => {
        const p = particles[i];
        
        // Move particle according to velocity
        child.position.x += p.vx;
        child.position.y += p.vy;
        child.position.z += p.vz;
        
        // Slowly rotate for a more dynamic floating effect
        child.rotation.z += p.vx * 0.2;

        // If it floats too high, reset it to the computer screen origin
        if (child.position.y > 6) {
          child.position.set(
            (Math.random() - 0.5) * 0.5, // Reset X near monitor
            0.8,                         // Reset Y near monitor base
            -0.5 + (Math.random() * 0.2) // Reset Z
          );
        }
      });
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={[p.x, p.y, p.z]}
          fontSize={0.4 * p.scale}
          color={p.color}
          fillOpacity={opacity * 0.8} // Slightly more opaque
          material-transparent
        >
          {p.text}
        </Text>
      ))}
    </group>
  );
}
