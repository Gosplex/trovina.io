import React from 'react';
import { Section, Container, SectionHeading } from '../ui/Section';
import { team } from '../../constants/siteContent';
import { img } from '../../constants/images';

/** Portrait crop centred on faces (Unsplash `crop=faces`). */
const faceCrop = (id, w) => `${img(id, w, Math.round(w * 1.25))}&crop=faces`;
const faceSrcSet = (id) => [320, 480, 640].map((w) => `${faceCrop(id, w)} ${w}w`).join(', ');

/** Team grid. Shows a photo when `photo` is set, otherwise an initials tile. */
export default function Team({ data = team, variant = 'default', id = 'team' }) {
  return (
    <Section id={id} variant={variant}>
      <Container>
        <SectionHeading
          layout="split"
          title="The people you will work with"
          description="A small senior team of designers and engineers. The people on your first call are the people who build your product."
        />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((member) => (
            <li key={member.name}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#efe1f9]">
                {member.photo ? (
                  <img
                    src={typeof member.photo === 'string' ? member.photo : faceCrop(member.photo.id, 640)}
                    srcSet={typeof member.photo === 'string' ? undefined : faceSrcSet(member.photo.id)}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    alt={typeof member.photo === 'string' ? `Illustration of ${member.name}` : member.photo.alt}
                    width="640"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${typeof member.photo === 'string' ? 'object-contain object-bottom pt-6' : 'object-cover'}`}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full w-full items-end bg-brand-100 p-6 dark:bg-brand-950"
                  >
                    <span className="text-6xl font-semibold tracking-tight text-brand-700 dark:text-brand-300">
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mt-5 text-lg font-medium text-foreground">{member.name}</h3>
              <p className="text-sm text-brand-700 dark:text-brand-300">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
