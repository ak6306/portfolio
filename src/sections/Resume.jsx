import { Reveal } from '../components/Reveal';

export function Resume() {
  const goToTop = () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="resume" className="section resume-section">
      <div className="section-inner resume-hint">
        <Reveal as="p" className="eyebrow">
          Resume
        </Reveal>
        <Reveal as="h2" className="section-heading">
          My full résumé, live on screen.
        </Reveal>
        <Reveal as="p" delay={0.05} className="section-lede">
          Everything above, laid out in full on the monitor in front of you — scroll back up any time, or
          download a copy below.
        </Reveal>
      </div>

      <div className="resume-actions">
        <button className="btn btn-ghost" onClick={goToTop}>
          ← Back to top
        </button>
        <a className="btn btn-primary" href="/portfolio/resume.pdf" target="_blank" rel="noreferrer">
          Download PDF
        </a>
      </div>
    </section>
  );
}
