import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import './index.css';

function App() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <Canvas shadows>
        <Scene zoomed={zoomed} />
      </Canvas>
      
      {/* Foreground Normal HTML Website Overlay */}
      <div className="website-overlay">
        
        {/* Landing Page */}
        <div className={`section hero ${zoomed ? 'fade-out' : 'fade-in'}`}>
          <h1>Hello! I am Aditya.</h1>
          <h2>Software Engineer</h2>
          <p>
            I build scalable backend systems, robust distributed architectures, and AI-driven workflows.
            With 4 years of experience using Java, Spring Boot, and AWS, I turn complex problems into highly-available solutions.
          </p>
          <button className="enter-btn" onClick={() => setZoomed(true)}>
            View Workspace
          </button>
        </div>

        {/* Resume Details Page */}
        <div className={`section details-overlay ${!zoomed ? 'fade-out' : 'fade-in'}`}>
           <button className="back-btn-floating" onClick={() => setZoomed(false)}>
              ← Back to Top
           </button>
           <a href="/portfolio/resume.pdf" target="_blank" rel="noreferrer" className="download-btn-floating">
              Download PDF
           </a>
        </div>

      </div>
    </>
  );
}

export default App;
