import { Reveal } from '../components/Reveal';

export function Hero() {
  const goToResume = () => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="section hero">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          Software Engineer · Autodesk
        </Reveal>

        <Reveal as="h1" delay={0.05}>
          Hi, I'm <span>Aditya Choudhary</span>
        </Reveal>

        <Reveal as="h2" delay={0.1}>
          I build backend systems that scale to millions.
        </Reveal>

        <Reveal as="p" delay={0.15}>
          I build scalable backend systems, robust distributed architectures, and AI-driven workflows.
          With 4+ years of experience across Java, Spring Boot, and AWS, I turn complex problems into
          highly-available, production-grade solutions — from AI agents that cut manual effort 6x, to
          distributed pipelines processing millions of records with zero downtime.
        </Reveal>

        <Reveal as="div" delay={0.2} className="hero-stats">
          <div className="hero-stat">
            <strong>4+</strong>
            <span>Years of Experience</span>
          </div>
          <div className="hero-stat">
            <strong>1M+</strong>
            <span>Projects Scaled via Distributed Batch</span>
          </div>
          <div className="hero-stat">
            <strong>30M+</strong>
            <span>Records Migrated, Zero Downtime</span>
          </div>
          <div className="hero-stat">
            <strong>6x</strong>
            <span>Efficiency Gain from AI Agent Tooling</span>
          </div>
        </Reveal>

        <Reveal as="div" delay={0.25} className="btn-row">
          <button className="btn btn-primary" onClick={goToResume}>
            View My Workspace
          </button>
          <a className="btn btn-secondary" href="/portfolio/resume.pdf" target="_blank" rel="noreferrer">
            Download Résumé
          </a>
        </Reveal>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-line" />
        Scroll
      </div>
    </section>
  );
}
