import { Reveal } from '../components/Reveal';

const ROLES = [
  {
    role: 'Software Development Engineer 2',
    meta: 'Autodesk · Current',
    bullets: [
      'Designed an AI-powered agent using MCP tools to automate workflows, reducing manual effort by 6x.',
      'Architected a distributed Spring Batch system, scaling parallel conversions for 1M+ projects.',
    ],
  },
  {
    role: 'Software Development Engineer 1 & Intern',
    meta: 'Autodesk',
    bullets: [
      'Migrated legacy services to AWS and built 20+ REST APIs, handling production incidents to maintain 99% uptime.',
      'Built processing jobs that migrated 30M+ records with zero downtime.',
    ],
  },
];

export function Experience() {
  const goToResume = () => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          Experience
        </Reveal>
        <Reveal as="h2" className="section-heading">
          Where the work has happened.
        </Reveal>

        <div className="timeline">
          {ROLES.map((r, i) => (
            <Reveal as="div" delay={i * 0.1} key={r.role} className="timeline-item">
              <div className="timeline-role">{r.role}</div>
              <div className="timeline-meta">{r.meta}</div>
              <ul>
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <button className="btn btn-ghost" onClick={goToResume}>
            See full résumé ↓
          </button>
        </Reveal>
      </div>
    </section>
  );
}
