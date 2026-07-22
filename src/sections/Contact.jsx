import { Reveal } from '../components/Reveal';

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner section-inner--center">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>
        <Reveal as="h2" className="section-heading">
          Let's build something reliable.
        </Reveal>
        <Reveal as="p" delay={0.05} className="section-lede">
          Open to backend, distributed-systems, and AI-tooling roles or collaborations. Reach out any time.
        </Reveal>

        <Reveal delay={0.1}>
          <a className="contact-email" href="mailto:hello@adityachoudhary.dev">
            hello@adityachoudhary.dev
          </a>
          <p className="placeholder-note">Placeholder address — swap in your preferred contact email.</p>
        </Reveal>

        <Reveal delay={0.15} as="div" className="social-row">
          <a className="social-link" href="#" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a className="social-link" href="#" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </Reveal>

        <div className="footer-note">
          <p>
            "
            <a href="https://skfb.ly/orzBS" target="_blank" rel="noreferrer">
              COMPUTER-DESK-AREA
            </a>
            " by bhaveshchalke4513, licensed under{' '}
            <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
              CC Attribution 4.0
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
