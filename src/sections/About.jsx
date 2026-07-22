import { Reveal } from '../components/Reveal';

export function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          About
        </Reveal>
        <Reveal as="h2" className="section-heading">
          Backend systems, built to hold up under scale.
        </Reveal>

        <div className="about-grid">
          <Reveal as="div" delay={0.05} className="about-bio">
            <p>
              I'm a backend-focused software engineer currently working as an <strong>SDE 2 at Autodesk</strong>,
              where I design distributed systems, large-scale data pipelines, and AI-driven agentic workflows.
            </p>
            <p>
              My work centers on <strong>Java and Spring Boot</strong> services running on <strong>AWS</strong>,
              built to stay reliable at scale — whether that's migrating tens of millions of records with zero
              downtime, or wiring up <strong>AI agents with MCP tools</strong> to automate workflows that used
              to take a full team.
            </p>
            <p>
              I care about systems that are boring in the right way: predictable, observable, and easy to
              reason about when something breaks at 2am.
            </p>
          </Reveal>

          <Reveal as="dl" delay={0.15} className="about-facts">
            <div className="about-fact">
              <dt>Currently</dt>
              <dd>SDE 2, Autodesk</dd>
            </div>
            <div className="about-fact">
              <dt>Focus</dt>
              <dd>Distributed systems &amp; AI workflows</dd>
            </div>
            <div className="about-fact">
              <dt>Education</dt>
              <dd>B.Tech CS, KIIT University</dd>
            </div>
            <div className="about-fact">
              <dt>Certification</dt>
              <dd>AWS Certified Cloud Practitioner</dd>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
