import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function Nav({ scrollYProgress }) {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} />
      <nav className="nav">
        <button className="nav-brand" onClick={() => goTo('hero')} aria-label="Back to top">
          Aditya<span>.</span>
        </button>
        <div className="nav-links">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={active === id ? 'active' : ''}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
