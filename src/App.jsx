import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Scene } from './Scene';

function App() {
  return (
    <>
      <Canvas shadows>
        {/* We use 2 pages of scroll to go from top view to monitor view */}
        <ScrollControls pages={2} damping={0.2}>
          <Scene />
          
          {/* Foreground Normal HTML Website Overlay */}
          <Scroll html style={{ width: '100vw' }}>
            <div className="website-content">
              
              {/* Top Page / Landing */}
              <div className="section hero">
                <h1>Hello! I am Aditya.</h1>
                <h2>Software Engineer</h2>
                <p>
                  I build scalable backend systems, robust distributed architectures, and AI-driven workflows.
                  With 4 years of experience using Java, Spring Boot, and AWS, I turn complex problems into highly-available solutions.
                </p>
                <p><em>↓ Scroll down to view my workspace ↓</em></p>
              </div>

              {/* Bottom Page / At the desk */}
              <div className="section details">
                <div className="details-box">
                  <h3>My Resume</h3>
                  <p><strong>Autodesk</strong> - Software Development Engineer 2</p>
                  <p><strong>KIIT University</strong> - BTech Computer Science</p>
                  <p><strong>AWS</strong> - Certified Cloud Practitioner</p>
                  
                  <a href="/portfolio/resume.pdf" target="_blank" rel="noreferrer" className="download-btn">
                    Download Full Resume
                  </a>
                </div>
              </div>

            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
