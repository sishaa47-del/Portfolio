/* Live prototypes, embedded rather than linked.

   Each one is a real page loaded in an iframe so a recruiter can use it
   without leaving the case study. Every embed also carries an "open in a
   new tab" escape hatch — an iframe can be blocked by the host's framing
   policy or by a privacy extension, and the work should still be reachable
   when that happens. */

export const prototypes = {
  "luxfeud-vaishalis-couture": [
    {
      id: "hamsa",
      label: "HAMSĀ",
      caption: "The advisor-side client memory layer — Craft Passport, Black Book and the anti-recommendation engine.",
      url: "https://vishalcsl.github.io/hamsa-vaishali/",
      device: "desktop",
    },
  ],
  "dot-inkling-2026": [
    {
      id: "dot-games",
      label: "Dot Games",
      caption: "Decoder and Connect the Dots — the low-pressure entry points for readers who never comment.",
      url: "https://vishalcsl.github.io/dot-games-mockup/",
      device: "phone",
    },
    {
      id: "have-your-say",
      label: "Have Your Say",
      caption: "Commit to a position before you see anyone else's — participation without the social cost.",
      url: "https://vishalcsl.github.io/dot-have-your-say-mockup/",
      device: "phone",
    },
    {
      id: "viral-postmortem",
      label: "Viral Postmortem",
      caption: "What actually happened when the campaign ran: 12,402 views, 84% non-follower reach.",
      url: "https://vishalcsl.github.io/dot-viral-postmortem/",
      device: "desktop",
    },
  ],
};

export const getPrototypes = (slug) => prototypes[slug] ?? [];
