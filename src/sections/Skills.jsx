import { Reveal } from '../components/Reveal';

const GROUPS = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript'] },
  { title: 'Backend', items: ['Spring Boot', 'REST APIs', 'Distributed Systems'] },
  { title: 'Cloud', items: ['AWS EC2', 'AWS S3', 'AWS Lambda'] },
  { title: 'AI & Frontend', items: ['LangChain', 'AI Agent Integrations (MCP)', 'React'] },
];

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          Skills
        </Reveal>
        <Reveal as="h2" className="section-heading">
          Tools I reach for.
        </Reveal>
        <Reveal as="p" delay={0.05} className="section-lede">
          A pragmatic toolkit for backend services, cloud infrastructure, and the AI tooling layered on top
          of them.
        </Reveal>

        <div className="skills-groups">
          {GROUPS.map((group, i) => (
            <Reveal as="div" delay={0.1 + i * 0.05} key={group.title} className="skills-group">
              <h3>{group.title}</h3>
              <div className="chip-row">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
