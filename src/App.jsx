import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { Scene } from './Scene';
import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';
import './index.css';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="scene-fixed">
        <Canvas shadows>
          <Scene scrollProgress={scrollYProgress} />
        </Canvas>
      </div>
      <div className="vignette" />
      <div className="grain-static" />

      <Nav scrollYProgress={scrollYProgress} />

      <div className="page">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </div>
    </>
  );
}

export default App;
