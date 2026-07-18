import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Scene } from './Scene';

function App() {
  return (
    <>
      <Canvas shadows>
        <ScrollControls pages={3} damping={0.2}>
          <Scene />
          
          {/* HTML Overlay tied to scroll */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {/* Page 1 */}
            <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1 style={{ color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.5)', margin: 0, fontSize: '4rem', zIndex: 10 }}>Hello, I'm a Developer</h1>
              <p style={{ color: '#00ffcc', fontSize: '1.5rem', fontWeight: 600 }}>Scroll down to see my world</p>
            </div>
            
            {/* Page 2 */}
            <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1 style={{ color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.5)', margin: 0, fontSize: '4rem', zIndex: 10 }}>My Portfolio</h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.5rem', maxWidth: '600px', textAlign: 'center' }}>
                I build premium, interactive experiences.
              </p>
            </div>
            
            {/* Page 3 */}
            <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '10vw' }}>
              <h1 style={{ color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.5)', margin: 0, fontSize: '3rem', zIndex: 10 }}>Time for Coffee</h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.2rem', maxWidth: '400px' }}>
                And time to get to work.
                Check out my resume by downloading the PDF from my repository!
              </p>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                style={{ 
                  marginTop: '20px', 
                  padding: '12px 24px', 
                  backgroundColor: '#ff4444', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  pointerEvents: 'auto'
                }}
              >
                View Resume
              </a>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
