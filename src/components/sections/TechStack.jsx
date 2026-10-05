import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';

/**
 * "Tools we build with": two rows of self-hosted brand logos that drift in
 * opposite directions. Hover or keyboard focus pauses the motion; visitors who
 * prefer reduced motion get a static, wrapped layout instead (see index.css).
 *
 * Logos live in /public/tech. Monochrome marks ship a `-dark` variant so they
 * stay visible in dark mode.
 */
const t = (name, file, opts = {}) => ({ name, file, ...opts });

const ROW_ONE = [
  t('React', 'react.svg'),
  t('Next.js', 'nextjs.svg', { dark: 'nextjs-dark.svg' }),
  t('TypeScript', 'typescript.svg'),
  t('Tailwind CSS', 'tailwind.svg'),
  t('Vue', 'vue.svg'),
  t('Node.js', 'nodejs.svg'),
  t('NestJS', 'nestjs.svg'),
  t('Python', 'python.svg'),
  t('FastAPI', 'fastapi.svg'),
  t('Laravel', 'laravel.svg'),
  t('GraphQL', 'graphql.svg'),
  t('React Native', 'react.svg'),
  t('Flutter', 'flutter.svg'),
  t('Swift', 'swift.svg'),
  t('Kotlin', 'kotlin.svg'),
  t('Expo', 'expo.svg', { dark: 'expo-dark.svg' }),
  t('Figma', 'figma.svg'),
];

const ROW_TWO = [
  t('AWS', 'aws.svg', { dark: 'aws-dark.svg' }),
  t('Google Cloud', 'googlecloud.svg'),
  t('Azure', 'azure.svg'),
  t('Vercel', 'vercel.svg', { dark: 'vercel-dark.svg' }),
  t('Firebase', 'firebase.svg'),
  t('Cloudflare', 'cloudflare.svg'),
  t('PostgreSQL', 'postgresql.svg'),
  t('MongoDB', 'mongodb.svg'),
  t('OpenAI', 'openai.svg', { dark: 'openai-dark.svg' }),
  t('LangChain', 'langchain.svg'),
  t('Pinecone', 'pinecone-mark.png', { dark: 'pinecone-mark-dark.png' }),
  t('TensorFlow', 'tensorflow.svg'),
  t('Hugging Face', 'huggingface.svg'),
  t('n8n', 'n8n.svg'),
  t('Docker', 'docker.svg'),
  t('Kubernetes', 'kubernetes.svg'),
  t('GitHub Actions', 'githubactions.svg'),
  t('Terraform', 'terraform.svg'),
  t('Grafana', 'grafana.svg'),
  t('Stripe', 'stripe.svg'),
];

function Logo({ item }) {
  const common = { width: 28, height: 28, loading: 'lazy', decoding: 'async', alt: '' };
  return (
    <li className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-background py-2.5 pl-3 pr-5">
      <span className="flex h-7 w-7 items-center justify-center">
        <img src={`/tech/${item.file}`} {...common} className={`h-7 w-7 object-contain ${item.dark ? 'dark:hidden' : ''}`} />
        {item.dark && <img src={`/tech/${item.dark}`} {...common} className="hidden h-7 w-7 object-contain dark:block" />}
      </span>
      <span className="whitespace-nowrap text-[15px] font-medium text-foreground">{item.name}</span>
    </li>
  );
}

function MarqueeRow({ items, duration, reverse = false, label }) {
  return (
    <div className="marquee-pause marquee-fade-x overflow-hidden" role="group" aria-label={label}>
      <div
        className="marquee-x flex w-max gap-3"
        style={{ '--marquee-duration': duration, '--marquee-direction': reverse ? 'reverse' : 'normal' }}
      >
        <ul className="flex gap-3">
          {items.map((item) => (
            <Logo key={item.name} item={item} />
          ))}
        </ul>
        {/* duplicate set for a seamless loop; hidden from assistive tech */}
        <ul className="marquee-dup flex gap-3" aria-hidden="true">
          {items.map((item) => (
            <Logo key={`${item.name}-dup`} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TechStack({ variant = 'default', id = 'technologies' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          layout="split"
          title="Tools we build with"
          description="Proven, well-supported technology chosen for speed, security and easy hand-over to your own team later."
        />
      </Container>
      <div className="mt-14 space-y-3">
        <MarqueeRow items={ROW_ONE} duration="55s" label="Frontend, backend and mobile tools" />
        <MarqueeRow items={ROW_TWO} duration="60s" reverse label="Cloud, data, AI and DevOps tools" />
      </div>
    </Section>
  );
}
