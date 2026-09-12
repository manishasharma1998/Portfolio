export type NavLink = { label: string; href: string };
export type Metric = { value: number; suffix: string; label: string };

export type HeroConfig = {
  eyebrow: string;
  line1: string;
  line2: string;
  warning: string;
  scrollHint: string;
  primaryCta: string;
  secondaryCta: string;
  portraitCaption: string;
  portraitLabel: string;
};

export type AboutPhoto = { src: string; alt: string; caption: string; hue: number };

export type AboutConfig = {
  kicker: string;
  titleBefore: string;
  titleAccent: string;
  paragraphs: string[];
  polisciLabel: string;
  polisci: string[];
  bridge: string;
  uxLabel: string;
  ux: string[];
  pivotLabel: string;
  pivot: string;
  noVibe: string;
  photos: AboutPhoto[];
};

export type BlockConfig = {
  kicker: string;
  titleBefore: string;
  titleBreak?: string;
  blurb?: string;
};

export type SkillsColumn = { title: string; note: string; items: string[] };

export type SkillsConfig = BlockConfig & {
  columns: {
    research: SkillsColumn;
    design: SkillsColumn;
    xr: SkillsColumn;
  };
  toolkitLabel: string;
  toolkit: string[];
};

export type TimelineItem = {
  period: string;
  org: string;
  role: string;
  body: string;
};

export type TimelineConfig = BlockConfig & {
  overlapNote: string;
  items: TimelineItem[];
};

export type ContactConfig = BlockConfig & {
  dubaiNote: string;
  resumeLabel: string;
  resumeNote: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  behance: string;
  resume: string;
  location: string;
  nav: NavLink[];
  relocationBadge: string;
  hero: HeroConfig;
  metrics: Metric[];
  about: AboutConfig;
  work: BlockConfig & { closer: string };
  xr: { caption: string } & BlockConfig;
  skills: SkillsConfig;
  timeline: TimelineConfig;
  contact: ContactConfig;
};

export type CaseStudySection = {
  heading: string;
  kicker?: string;
  body: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  index: string;
  published: boolean;
  title: string;
  category: string;
  problem: string;
  year: string;
  role: string;
  duration: string;
  platform: string;
  chips: string[];
  cover: { hue: number; title: string; subtitle: string };
  metrics: { value: string; label: string }[];
  hero: string;
  intro: string[];
  sections: CaseStudySection[];
  reflection: { body: string[]; bullets?: string[] };
  tools: string[];
  mode: "deep" | "card";
  external?: string;
};

export type BehanceProject = {
  title: string;
  url: string;
  cover: string;
  views: number;
  appreciations: number;
  tags: string[];
};

export type BehanceConfig = BlockConfig & {
  profileLabel: string;
  profileBlurb: string;
  profileUrl: string;
  projects: BehanceProject[];
};