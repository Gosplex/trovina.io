import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { fadeUp, inView } from '../../lib/motion';

/**
 * "Technologies We Build With" — official brand logos presented on a vertically
 * rolling marquee (desktop) and a clean static grid (mobile).
 *
 * Logos: 29 sourced live from the Simple Icons CDN (brand-colored SVGs); 4 that
 * Simple Icons doesn't carry (AWS, Azure, OpenAI, Pinecone) are bundled locally
 * under /public/tech. Any image that fails to load falls back to an initials
 * badge, so a broken CDN never leaves an empty tile.
 */
const si = (slug) => `https://cdn.simpleicons.org/${slug}`;

const TECHNOLOGIES = [
  // Frontend
  { name: 'React', logo: si('react') },
  { name: 'Next.js', logo: si('nextdotjs') },
  { name: 'TypeScript', logo: si('typescript') },
  { name: 'Tailwind CSS', logo: si('tailwindcss') },
  { name: 'Vue', logo: si('vuedotjs') },
  { name: 'Framer Motion', logo: si('framer') },
  // Backend
  { name: 'Node.js', logo: si('nodedotjs') },
  { name: 'NestJS', logo: si('nestjs') },
  { name: 'Python', logo: si('python') },
  { name: 'FastAPI', logo: si('fastapi') },
  { name: 'Laravel', logo: si('laravel') },
  { name: 'GraphQL', logo: si('graphql') },
  // Mobile
  { name: 'React Native', logo: si('react') },
  { name: 'Flutter', logo: si('flutter') },
  { name: 'Swift', logo: si('swift') },
  { name: 'Kotlin', logo: si('kotlin') },
  { name: 'Expo', logo: si('expo') },
  // Cloud & Infra
  { name: 'AWS', logo: '/tech/aws.svg' },
  { name: 'Google Cloud', logo: si('googlecloud') },
  { name: 'Azure', logo: '/tech/azure.svg' },
  { name: 'Vercel', logo: si('vercel') },
  { name: 'Firebase', logo: si('firebase') },
  { name: 'Cloudflare', logo: si('cloudflare') },
  // AI & Data
  { name: 'OpenAI', logo: '/tech/openai.svg' },
  { name: 'LangChain', logo: si('langchain') },
  { name: 'Pinecone', logo: '/tech/pinecone.png' },
  { name: 'TensorFlow', logo: si('tensorflow') },
  { name: 'Hugging Face', logo: si('huggingface') },
  // DevOps
  { name: 'Docker', logo: si('docker') },
  { name: 'Kubernetes', logo: si('kubernetes') },
  { name: 'GitHub Actions', logo: si('githubactions') },
  { name: 'Terraform', logo: si('terraform') },
  { name: 'Grafana', logo: si('grafana') },
];

const initialsOf = (name) => {
  const words = name.replace(/[.]/g, '').split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
};

/** Swap a failed logo image for its initials badge — keeps every tile filled. */
const handleLogoError = (e) => {
  e.currentTarget.style.display = 'none';
  const badge = e.currentTarget.nextElementSibling;
  if (badge) badge.style.display = 'flex';
};

function TechTile({ name, logo }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-soft">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          className="h-8 w-8 object-contain"
          onError={handleLogoError}
        />
        <span
          aria-hidden="true"
          className="hidden h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-[11px] font-bold text-white"
        >
          {initialsOf(name)}
        </span>
      </span>
      <span className="text-sm font-semibold text-slate-800">{name}</span>
    </div>
  );
}

// Distribute round-robin so each marquee column carries a balanced mix.
const COLUMNS = 3;
const columns = Array.from({ length: COLUMNS }, (_, c) =>
  TECHNOLOGIES.filter((_, i) => i % COLUMNS === c)
);
// Alternate scroll direction + speed per column for an organic, premium feel.
const COLUMN_STYLE = [
  { '--marquee-duration': '36s', '--marquee-direction': 'normal' },
  { '--marquee-duration': '30s', '--marquee-direction': 'reverse' },
  { '--marquee-duration': '40s', '--marquee-direction': 'normal' },
];

export default function TechStack({ variant = 'surface', id = 'technologies' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          eyebrow="Our Stack"
          eyebrowIcon={Layers}
          title="Technologies We Build With"
          description="A modern, battle-tested toolchain across frontend, backend, mobile, cloud, AI, and DevOps — chosen to keep your product fast, secure, and scalable."
        />

        {/* Desktop (lg+): vertically rolling logo marquee */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="marquee-pause marquee-fade mt-14 hidden h-[34rem] grid-cols-3 gap-5 overflow-hidden lg:grid"
        >
          {columns.map((col, ci) => (
            <div key={ci} className="relative">
              <div className="marquee-track flex flex-col gap-5" style={COLUMN_STYLE[ci]}>
                {/* duplicated set enables a seamless loop */}
                {[...col, ...col].map((tech, i) => (
                  <TechTile key={`${tech.name}-${i}`} {...tech} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile / tablet (<lg): clean static logo grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden"
        >
          {TECHNOLOGIES.map((tech) => (
            <TechTile key={tech.name} {...tech} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
