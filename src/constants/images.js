/**
 * Photography, all images are from Unsplash (free to use under the Unsplash
 * License, no attribution required) and were shot in Lagos and Ota, Nigeria.
 * Photographers: Ninthgrid (@ninthgrid_) and Oluwakemi Solaja (@kemi_ii).
 *
 * `img(id, w, h)` builds a resized, auto-format (WebP/AVIF) URL so pages stay
 * light. Swap any entry for your own team photos when you have them, every
 * page reads from here.
 */
const BASE = 'https://images.unsplash.com/';

export const img = (id, w = 1600, h) =>
  `${BASE}${id}?auto=format&fit=crop&q=75&w=${w}${h ? `&h=${h}` : ''}`;

/** srcSet helper for responsive <img>. */
export const srcSet = (id, widths = [640, 960, 1280, 1920], ratio) =>
  widths
    .map((w) => `${img(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(', ');

export const photos = {
  teamTable: {
    id: 'photo-1739298061709-cfc57e6b620e',
    alt: 'Four members of the Trovina team talking and laughing around a table',
  },
  teamHandshake: {
    id: 'photo-1739298061766-e2751d92e9db',
    alt: 'Trovina project lead shaking hands with a client after a planning session',
  },
  groupLaptop: {
    id: 'photo-1739302750702-e26a61113758',
    alt: 'Designers and engineers gathered around a laptop reviewing a product build',
  },
  groupMeeting: {
    id: 'photo-1739302750695-31a8c978c770',
    alt: 'Team sitting around a table during a product discovery workshop',
  },
  pairLaptops: {
    id: 'photo-1739303987830-ca19742b19bc',
    alt: 'Two product designers holding laptops and reviewing a web app together',
  },
  pairDesk: {
    id: 'photo-1739303987861-1b0c1104b747',
    alt: 'Two colleagues working through an e-commerce dashboard on a laptop',
  },
  pairWorking: {
    id: 'photo-1739302750727-d5375c509ad3',
    alt: 'Engineer and project manager pairing on a feature at a shared desk',
  },
  soloLaptop: {
    id: 'photo-1739301674006-75fe9653368f',
    alt: 'Developer working on a laptop at a bright studio desk',
  },
  designer: {
    id: 'photo-1532708059644-5590ed51ce4c',
    alt: 'Designer sketching interface ideas beside a laptop, seen from above',
  },
};

export default photos;
