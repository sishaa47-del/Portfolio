/* Homepage folds: minimal copy, one measurable outcome, one image each.
   Full narrative lives on each case study page.

   THEME — every fold carries its own palette, taken from the colour
   specified for it in the content doc. Several of those are pastels that
   cannot hold white text, so each fold also declares its own ink: light
   folds flip to dark type. Secondary tones are derived from the fold's own
   colour rather than a fixed grey, so nothing reads as a foreign element.

   Verified on every fold: body >= 6.5:1, secondary >= 4.8:1,
   meta >= 4.6:1, accent >= 4.6:1.

   Two colours are tuned rather than used raw — noted inline. Both keep the
   given hue and saturation and only drop lightness, because at the supplied
   value neither white nor black type cleared AA. */

export const slides = [
  /* ---------- professional experience ---------- */
  {
    slug: "restroworks",
    group: "work",
    title: "Restroworks",
    award: null,
    where: "Product Marketing Manager · Aug 2023 – Oct 2024",
    line: "Rebuilding the brand behind a platform pivot — Posist to Restroworks, POS to platform.",
    metric: { value: "40+", unit: "pages rebuilt end to end in three months, with a team of 3–4" },
    theme: {
      // given #755DA2; darkened to hold white type, hue and saturation kept
      bg: "#524171", fg: "#F7F5F3", soft: "#C4BDCB", faint: "#BFB8C7", accent: "#E4B363",
    },
    hero: "restroworks-hero",
    heroAlt: "The rebuilt Restroworks platform site",
    heroNote: "The rebuilt corporate site, shown on a laptop.",
    stack: null,
  },
  {
    slug: "highradius",
    group: "work",
    title: "HighRadius",
    award: null,
    where: "Intern → Analyst → Principal · Aug 2020 – Aug 2023",
    line: "Scaling a learning platform from prototype to monetised product across three years and three roles.",
    metric: { value: "4.5 → 28%", unit: "monthly active users, across the lifecycle programme" },
    theme: {
      bg: "#5CAEF3", fg: "#171320", soft: "#283A55", faint: "#2A3D59", accent: "#07375F",
    },
    hero: "highradius-hero",
    heroAlt: "Highako learning platform growth work",
    heroNote: "The Customer Academy, or the growth curve as a clean chart.",
    stack: null,
  },

  /* ---------- the case files ---------- */
  {
    slug: "luxfeud-vaishalis-couture",
    group: "case",
    title: "Vaishali S",
    award: "1st Position",
    where: "Team Vantage · La Conquista 2026",
    line: "Scaling intimacy without making luxury feel automated. The problem wasn't personalisation — it was memory.",
    metric: { value: "₹1.71 Cr", unit: "projected incremental annual revenue, 3.4-year payback" },
    theme: {
      bg: "#E9C4C3", fg: "#171320", soft: "#5E4F57", faint: "#605159", accent: "#7E2725",
    },
    hero: "hamsa-hero",
    heroAlt: "HAMSĀ — the Heritage And Memory-powered Style Advisor",
    heroNote: "Supplied with the content doc.",
    stack: null,
  },
  {
    slug: "dot-inkling-2026",
    group: "case",
    title: "Dot",
    award: "1st Position",
    where: "Team Banana · Inkling 2026",
    line: "Curiosity, not compulsion. Build participation around curiosity rather than performance — then test it in market.",
    metric: { value: "12,402", unit: "views on the product explainer, 84% non-follower reach" },
    theme: {
      bg: "#1B2136", fg: "#F7F5F3", soft: "#8B8D96", faint: "#878993", accent: "#E4B363",
    },
    hero: "dot-hero",
    heroAlt: "Dot — curiosity, made contagious",
    heroNote: "Supplied with the content doc.",
    stack: null,
  },

  /* ---------- live brand work ---------- */
  {
    slug: "zimyo-channel-partner-strategy",
    group: "live",
    title: "Zimyo",
    award: null,
    where: "Live Strategy Project · HR-Tech",
    line: "Designing a channel partner acquisition engine — and deciding which partner was worth betting on first.",
    metric: { value: "90 days", unit: "Acquire → Activate → Validate pilot, 30–50% activation target" },
    theme: {
      // given #2E6B54; darkened to hold white type, hue and saturation kept
      bg: "#235240", fg: "#F7F5F3", soft: "#B5C2BC", faint: "#AFBEB6", accent: "#E4B363",
    },
    hero: "zimyo-hero",
    heroAlt: "Zimyo channel partner acquisition model",
    heroNote: "Supplied with the content doc.",
    stack: null,
  },
  {
    slug: "vivi-honey-gtm",
    group: "live",
    title: "VIVI Honey",
    award: "Winning Proposal",
    where: "Industry-Linked Challenge · Allied Natural Product",
    line: "From export credentials to consumer trust. Not a product-quality problem — a visibility problem.",
    metric: { value: "8", unit: "retail platforms targeted, where credibility meets the purchase decision" },
    theme: {
      bg: "#E4803C", fg: "#171320", soft: "#3E2825", faint: "#442B26", accent: "#48230A",
    },
    hero: "vivi-hero",
    heroAlt: "VIVI honey brand strategy",
    heroNote: "Supplied with the content doc.",
    stack: null,
  },

  /* ---------- independent ---------- */
  {
    slug: "a24-cult-of-prestige",
    group: "study",
    title: "A24",
    award: null,
    where: "Independent Brand Strategy Case Study · 2026",
    line: "From film distributor to cultural cult. How a brand turned taste into an owned asset.",
    metric: { value: "5", unit: "strategic moves traced, from Spring Breakers to the A24 filter" },
    theme: {
      bg: "#0A0A0C", fg: "#F7F5F3", soft: "#7E7D7D", faint: "#7C7B7B", accent: "#E4B363",
    },
    hero: "a24-hero",
    heroAlt: "A24 — from distributor to cultural cult",
    heroNote: "Supplied with the content doc.",
    stack: null,
  },
];

/* Black at the hero because attention peaks at entry and nothing should
   compete with the name; black again at the close so the page reads as an
   arc rather than a slideshow. */
export const BASE_THEME = {
  bg: "#0A0A0C", fg: "#F7F5F3", soft: "#7E7D7D", faint: "#7C7B7B", accent: "#E4B363",
};
export const NUMBERS_THEME = {
  bg: "#0F161C", fg: "#F7F5F3", soft: "#82858A", faint: "#7F8287", accent: "#E4B363",
};

/* The hero fold gets a portrait — a personal site should show a face. */
export const INTRO_IMAGE = {
  name: "portrait",
  alt: "Manasi Sharma, brand strategist, working at a laptop",
  note: "Seated portrait, cropped to 4:5.",
  size: "1200 × 1500",
};

export const GROUP_LABEL = {
  work: "Professional experience",
  case: "The case files",
  live: "Live brand work",
  study: "Independent study",
};

/* Every image slot the site expects — drives the /images planning page. */
export const imageSlots = [
  {
    project: "Hero fold",
    kind: "Portrait",
    file: `${INTRO_IMAGE.name}.jpg`,
    size: INTRO_IMAGE.size,
    note: INTRO_IMAGE.note,
  },
  ...slides.flatMap((s) => {
    const out = [
      {
        project: s.title,
        kind: "Hero",
        file: `${s.hero}.jpg`,
        size: "1600 × 900",
        note: s.heroNote,
      },
    ];
    if (s.stack) {
      out.push({
        project: s.title,
        kind: "Secondary",
        file: `${s.stack}.jpg`,
        size: "1200 × 900",
        note: s.stackNote,
      });
    }
    return out;
  }),
];

export const getSlide = (slug) => slides.find((s) => s.slug === slug);
