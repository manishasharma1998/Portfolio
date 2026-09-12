import fs from "node:fs";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";
import type {
  BehanceConfig,
  CaseStudy,
  CaseStudySection,
  CaseVisual,
  SiteConfig,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

function readJsonFile<T>(rel: string): T {
  const file = path.join(CONTENT_DIR, rel);
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Could not read content/${rel}: ${msg}`);
  }
}

function blockLines(lines: string[]) {
  const body: string[] = [];
  const bullets: string[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      body.push(paragraph.join(" ").replace(/\s+/g, " ").trim());
      paragraph = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      flush();
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flush();
      bullets.push(trimmed.slice(2).trim());
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return { body, bullets };
}

function parseSections(rawLines: string[]): {
  intro: string[];
  sections: CaseStudySection[];
  reflection: { body: string[]; bullets?: string[] };
} {
  const head: string[] = [];
  const grouped: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of rawLines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      current = { heading: headingMatch[1].trim(), lines: [] };
      grouped.push(current);
      continue;
    }
    if (current) current.lines.push(line);
    else head.push(line);
  }

  // intro = leading non-empty lines (before the first section)
  const intro = head
    .join("\n")
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  let reflection: { body: string[]; bullets?: string[] } = { body: [] };
  const sections: CaseStudySection[] = [];

  for (const group of grouped) {
    let kicker: string | undefined;
    const lines = [...group.lines];
    const kickerMatch = lines[0]?.match(/^###\s+kicker:\s*(.+)$/);
    if (kickerMatch) {
      kicker = kickerMatch[1].trim();
      lines.shift();
    }
    const { body, bullets } = blockLines(lines);

    if (group.heading.trim().toLowerCase() === "reflection") {
      reflection = { body, bullets };
    } else {
      sections.push({
        heading: group.heading.trim(),
        ...(kicker ? { kicker } : {}),
        body,
        ...(bullets.length ? { bullets } : {}),
      });
    }
  }

  return { intro, sections, reflection };
}

export function parseProjectMarkdown(
  text: string,
  filename: string
): CaseStudy {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(
      `content/projects/${filename}: file must start with a --- frontmatter block.`
    );
  }
  let meta: Record<string, unknown>;
  try {
    meta = JSON.parse(match[1]);
  } catch {
    try {
      const parsed = yamlLoad(match[1]);
      meta =
        parsed && typeof parsed === "object"
          ? (parsed as Record<string, unknown>)
          : {};
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(
        `content/projects/${filename}: invalid frontmatter (tried JSON then YAML) — ${msg}`
      );
    }
  }

  const { intro, sections, reflection } = parseSections(match[2].split(/\r?\n/));

  const cover = (meta.cover ?? {}) as Record<string, unknown>;
  const mode =
    meta.mode === "card" || meta.external ? "card" : "deep";

  return {
    slug: String(meta.slug ?? filename.replace(/\.md$/, "")),
    index: String(meta.index ?? "99"),
    published: typeof meta.published === "boolean" ? meta.published : true,
    title: String(meta.title ?? "Untitled project"),
    category: String(meta.category ?? "Case study"),
    problem: String(meta.problem ?? ""),
    year: String(meta.year ?? ""),
    role: String(meta.role ?? ""),
    duration: String(meta.duration ?? ""),
    platform: String(meta.platform ?? ""),
    chips: Array.isArray(meta.chips) ? meta.chips.map(String) : [],
    cover: {
      hue: Number(cover.hue ?? 232),
      title: String(cover.title ?? meta.title ?? ""),
      subtitle: String(cover.subtitle ?? ""),
    },
    metrics: Array.isArray(meta.metrics)
      ? (meta.metrics as { value: string; label: string }[])
      : [],
    hero: String(meta.hero ?? ""),
    intro,
    sections,
    reflection,
    tools: Array.isArray(meta.tools) ? meta.tools.map(String) : [],
    visuals: Array.isArray(meta.visuals) ? (meta.visuals as CaseVisual[]) : [],
    images: Array.isArray(meta.images) ? meta.images.map(String) : [],
    mode,
    ...(typeof meta.external === "string" && meta.external.length
      ? { external: meta.external }
      : {}),
  };
}

function orderOf(study: CaseStudy): number {
  const n = Number(study.index);
  return Number.isFinite(n) ? n : 99;
}

let cachedSite: SiteConfig | null = null;
let cachedBehance: BehanceConfig | null = null;
let cachedProjects: CaseStudy[] | null = null;

export function getSiteConfig(): SiteConfig {
  if (!cachedSite) cachedSite = readJsonFile<SiteConfig>("site.json");
  return cachedSite;
}

export function getBehanceProjects(): BehanceConfig {
  if (!cachedBehance) cachedBehance = readJsonFile<BehanceConfig>("behance.json");
  return cachedBehance;
}

export function getProjects(): CaseStudy[] {
  if (cachedProjects) return cachedProjects;
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  cachedProjects = files
    .map((f) => {
      const text = fs.readFileSync(path.join(PROJECTS_DIR, f), "utf8");
      return parseProjectMarkdown(text, f);
    })
    .filter((p) => p.published)
    .sort((a, b) => orderOf(a) - orderOf(b));
  return cachedProjects;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getDeepProjects(): CaseStudy[] {
  return getProjects().filter((p) => p.mode === "deep");
}