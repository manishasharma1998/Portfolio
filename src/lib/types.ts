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

export type EducationItem = {
  period: string;
  org: string;
  role: string;
  note?: string;
};

export type TimelineConfig = BlockConfig & {
  overlapNote: string;
  items: TimelineItem[];
  education: {
    label: string;
    items: EducationItem[];
  };
};

export type ContactConfig = BlockConfig & {
  relocationNote: string;
  resumeLabel: string;
  resumeNote: string;
};

export type UiLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export type ChatFaq = {
  q: string;
  keywords: string[];
  a: string;
  links?: UiLink[];
};

export type UiStrings = {
  announcement: { notice: string; change: string; dismiss: string };
  language: { label: string; switcherAria: string };
  nav: {
    resume: string;
    downloadResume: string;
    openMenu: string;
    closeMenu: string;
    primaryAria: string;
  };
  footer: {
    navigate: string;
    connect: string;
    built: string;
    avatarCredit: string;
    manage: string;
  };
  contactLinks: {
    email: string;
    linkedin: string;
    linkedinNote: string;
    behance: string;
    behanceNote: string;
    whatsapp: string;
  };
  caseCard: { view: string; open: string };
  workTabs: { caseStudies: string; designs: string };
  behance: { open: string; views: string; appreciations: string };
  caseVisuals: { before: string; after: string; imageAlt: string };
  casePage: {
    backAllWork: string;
    metricsAria: string;
    labels: { role: string; duration: string; platform: string; year: string };
    reflection: string;
    backToIndex: string;
    backToIndexBody: string;
    nextLabel: string;
    readIt: string;
    twoThings: string;
    story: {
      label: string;
      steps: string;
      prev: string;
      next: string;
    };
    ctaTitle: string;
    emailCta: string;
    keepExploring: string;
  };
  chat: {
    title: string;
    subtitle: string;
    speaking: string;
    badge: string;
    greeting: string;
    openAria: string;
    closeAria: string;
    panelAria: string;
    placeholder: string;
    askAria: string;
    send: string;
    voiceOn: string;
    voiceOff: string;
    stopReading: string;
    readAloud: string;
    noMatch: string;
    faq: ChatFaq[];
  };
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
  ui: UiStrings;
};

export type SiteContent = Omit<SiteConfig, "ui">;

export type LocaleBundle = {
  ui: UiStrings;
  site: SiteContent;
  projects: CaseStudy[];
};

export type CaseStudySection = {
  heading: string;
  kicker?: string;
  body: string[];
  bullets?: string[];
};

export type CaseVisual =
  | {
      kind: "compare";
      title: string;
      caption?: string;
      before: number;
      after: number;
      beforeLabel?: string;
      afterLabel?: string;
      unit?: string;
    }
  | {
      kind: "funnel";
      title: string;
      caption?: string;
      steps: { label: string; value: string }[];
    }
  | {
      kind: "bars";
      title: string;
      caption?: string;
      bars: { label: string; value: number; suffix?: string }[];
    }
  | {
      kind: "steps";
      title: string;
      caption?: string;
      steps: string[];
    }
  | {
      kind: "stack";
      title: string;
      caption?: string;
      layers: { label: string; detail?: string }[];
    };

export type CaseFigure = {
  eyebrow?: string;
  title?: string;
  text?: string;
  hue?: number;
  after: string;
};

export type StoryNote = {
  n: number;
  text: string;
  spot?: { x: number; y: number };
};

export type CaseStoryStep = {
  screen: string;
  chapter: string;
  title: string;
  body: string;
  quote?: string;
  notes?: StoryNote[];
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
  visuals?: CaseVisual[];
  images?: string[];
  figures?: CaseFigure[];
  story?: CaseStoryStep[];
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