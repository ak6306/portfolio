import { Reveal } from '../components/Reveal';

const PLACEHOLDERS = [
  { tag: 'Distributed Systems', title: 'Case study in progress' },
  { tag: 'AI Agents & MCP Tools', title: 'Case study in progress' },
  { tag: 'Cloud Infrastructure', title: 'Case study in progress' },
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          Selected Work
        </Reveal>
        <Reveal as="h2" className="section-heading">
          Case studies, coming soon.
        </Reveal>
        <Reveal as="p" delay={0.05} className="section-lede">
          I'm writing up detailed breakdowns of the systems I've built — architecture, scale, and impact.
          Here's a preview of what's on the way.
        </Reveal>

        <div className="project-grid">
          {PLACEHOLDERS.map((p, i) => (
            <Reveal as="div" delay={0.1 + i * 0.05} key={p.tag} className="project-card">
              <span className="project-card-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>Full write-up with architecture, scale, and impact details is on its way.</p>
              <span className="project-card-status">Coming soon</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
