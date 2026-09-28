import type { CSSProperties, ReactNode } from "react";
import { nebulaFonts } from "@/components/nebula/fonts";

/* Nebula token values (from the system's tokens.json). */
export const NB = {
  dark: {
    bg: "#07090d",
    s100: "#0d1117",
    s200: "#141a22",
    s300: "#1c2430",
    line: "#273140",
    lineStrong: "#66768b",
    ink: "#eef3f8",
    muted: "#a3b0bf",
    subtle: "#8593a3",
    plasma: "#2ee6c5",
    onPlasma: "#032019",
    plasmaSoft: "rgba(46,230,197,0.14)",
    flare: "#ff8a5b",
    ion: "#d4f25a",
    success: "#45d98f",
    successSoft: "rgba(69,217,143,0.14)",
    warning: "#ffc24b",
    warningSoft: "rgba(255,194,75,0.14)",
    danger: "#ff6b78",
    dangerSoft: "rgba(255,107,120,0.14)",
    info: "#62b8ff",
    infoSoft: "rgba(98,184,255,0.14)",
  },
  light: {
    bg: "#f3f5f8",
    s100: "#ffffff",
    s200: "#eef1f5",
    s300: "#e2e7ee",
    line: "#d7dde5",
    lineStrong: "#718090",
    ink: "#0b1117",
    muted: "#465261",
    subtle: "#5a6675",
    plasma: "#00735f",
    onPlasma: "#ffffff",
    plasmaSoft: "rgba(0,115,95,0.10)",
    flare: "#b93d0b",
    ion: "#56670a",
    success: "#1a7042",
    successSoft: "rgba(26,112,66,0.10)",
    warning: "#8a5a00",
    warningSoft: "rgba(138,90,0,0.10)",
    danger: "#b4232f",
    dangerSoft: "rgba(180,35,47,0.10)",
    info: "#1f5f9e",
    infoSoft: "rgba(31,95,158,0.10)",
  },
} as const;

export type NbTheme = (typeof NB)["dark"] | (typeof NB)["light"];

const display: CSSProperties = { fontFamily: "var(--font-nebula-display), sans-serif" };
const body: CSSProperties = { fontFamily: "var(--font-nebula-body), sans-serif" };

export function NebulaMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="18" fill="#2ee6c5" />
      <g transform="translate(14.9 6.9) scale(0.95)">
        <path
          d="M0 16V40M0 25A9 9 0 0 1 18 25V40M18 25A9 9 0 0 1 36 25V40"
          fill="none"
          stroke="#032019"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="52" cy="12" r="4.5" fill="#ff8a5b" />
    </svg>
  );
}

/** A framed Nebula surface that always renders in Nebula's own fonts and palette. */
export function NebulaStage({
  t = NB.dark,
  children,
  className = "",
}: {
  t?: NbTheme;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${nebulaFonts} overflow-hidden rounded-3xl border ${className}`}
      style={{ ...body, background: t.bg, color: t.ink, borderColor: t.line }}
    >
      {children}
    </div>
  );
}

function Btn({
  t,
  kind,
  children,
}: {
  t: NbTheme;
  kind: "primary" | "secondary" | "accent" | "ghost";
  children: ReactNode;
}) {
  const styles: Record<string, CSSProperties> = {
    primary: { background: t.plasma, color: t.onPlasma },
    secondary: { background: t.s200, color: t.ink, border: `1px solid ${t.lineStrong}` },
    accent: { background: t.flare, color: t === NB.dark ? "#2a0e02" : "#ffffff" },
    ghost: { color: t.ink },
  };
  return (
    <span
      className="inline-flex h-10 items-center rounded-xl px-4 text-sm font-medium whitespace-nowrap"
      style={styles[kind]}
    >
      {children}
    </span>
  );
}

function Chip({ t, tone, children }: { t: NbTheme; tone: "plasma" | "success" | "warning" | "outline"; children: ReactNode }) {
  const map: Record<string, CSSProperties> = {
    plasma: { background: t.plasmaSoft, color: t.plasma },
    success: { background: t.successSoft, color: t.success },
    warning: { background: t.warningSoft, color: t.warning },
    outline: { border: `1px solid ${t.lineStrong}`, color: t.ink },
  };
  return (
    <span className="inline-flex h-7 items-center rounded-full px-3 text-xs font-medium" style={map[tone]}>
      {children}
    </span>
  );
}

function Dot({ color, size = 10 }: { color: string; size?: number }) {
  return <span aria-hidden className="inline-block shrink-0 rounded-full" style={{ width: size, height: size, background: color }} />;
}

/** The same card composition used for theme comparisons. */
export function SampleCard({ t }: { t: NbTheme }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-5" style={{ background: t.s100, borderColor: t.line }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: t.muted }}>
          Research
        </span>
        <Chip t={t} tone="success">Shipped</Chip>
      </div>
      <p className="text-xl font-semibold tracking-tight" style={display}>
        Checkout drop-off study
      </p>
      <p className="text-sm leading-relaxed" style={{ color: t.muted }}>
        Abandonment fell from 60% to 35% once the real friction point was fixed.
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        <Btn t={t} kind="primary">Open case study</Btn>
        <Btn t={t} kind="ghost">Share</Btn>
      </div>
    </div>
  );
}

/** A board of core components: buttons, inputs, toggles, chips, alerts, card. */
export function ComponentBoard({ t = NB.dark }: { t?: NbTheme }) {
  return (
    <NebulaStage t={t} className="p-5 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Btn t={t} kind="primary">Start a project</Btn>
            <Btn t={t} kind="secondary">Download CV</Btn>
            <Btn t={t} kind="accent">New work</Btn>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" style={{ color: t.muted }}>
              Email
            </label>
            <span
              className="flex h-11 items-center rounded-xl border-2 px-3 text-sm"
              style={{ background: t.s100, borderColor: t.plasma }}
            >
              maonishasharma@gmail.com
            </span>
            <span className="text-xs" style={{ color: t.muted }}>
              I reply within a day.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-sm">
              <span className="relative inline-block h-6 w-10 rounded-full" style={{ background: t.plasma }}>
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full" style={{ background: t.onPlasma }} />
              </span>
              Motion on
            </span>
            <span className="inline-flex items-center gap-2 text-sm">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-bold"
                style={{ background: t.plasma, color: t.onPlasma }}
              >
                ✓
              </span>
              Remember me
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip t={t} tone="plasma">Live</Chip>
            <Chip t={t} tone="success">Shipped</Chip>
            <Chip t={t} tone="warning">In review</Chip>
            <Chip t={t} tone="outline">AR / VR</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm" style={{ background: t.successSoft }}>
            <Dot color={t.success} />
            <span>
              <b>Published.</b> Your case study is live.
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm" style={{ background: t.dangerSoft }}>
            <Dot color={t.danger} />
            <span>
              <b>Upload failed.</b> Not a valid GLB file.
            </span>
          </div>
          <SampleCard t={t} />
        </div>
      </div>
    </NebulaStage>
  );
}

export function PhoneMock() {
  const t = NB.dark;
  return (
    <div
      className={`${nebulaFonts} mx-auto flex h-[460px] w-[230px] flex-col overflow-hidden rounded-[36px] border-[7px] border-black shadow-2xl`}
      style={{ ...body, background: t.bg, color: t.ink }}
    >
      <div className="flex flex-col gap-2 px-4 pt-8 pb-3">
        <span className="text-[11px]" style={{ color: t.muted }}>
          Monday
        </span>
        <span className="text-2xl font-semibold" style={display}>
          Projects
        </span>
        <span className="rounded-lg px-3 py-1.5 text-xs" style={{ background: t.s300, color: t.subtle }}>
          Search projects
        </span>
      </div>
      <div style={{ background: t.s100 }}>
        {[
          ["Checkout redesign", "Web + mobile"],
          ["XR environments", "Meta Quest · 6 prototypes"],
          ["Brand refresh", "Logo and guidelines"],
        ].map(([a, b], i) => (
          <div key={a} className="px-4 py-3" style={{ borderTop: i ? `1px solid ${t.line}` : undefined }}>
            <p className="text-sm font-medium">{a}</p>
            <p className="text-xs" style={{ color: t.muted }}>
              {b}
            </p>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <div
        className="flex justify-around border-t px-2 pt-2.5 pb-5 text-[11px]"
        style={{ background: t.s300, borderColor: t.line, color: t.subtle }}
      >
        <span style={{ color: t.plasma, fontWeight: 600 }}>Home</span>
        <span>Search</span>
        <span>Inbox</span>
        <span>Me</span>
      </div>
    </div>
  );
}

export function SheetMock() {
  const t = NB.dark;
  return (
    <div
      className={`${nebulaFonts} mx-auto flex h-[460px] w-[230px] flex-col overflow-hidden rounded-[36px] border-[7px] border-black shadow-2xl`}
      style={{ ...body, background: t.s300, color: t.ink }}
    >
      <div className="flex-1" />
      <div className="flex flex-col gap-3 rounded-t-3xl px-4 pt-3 pb-6" style={{ background: t.s100 }}>
        <span className="mx-auto h-1 w-10 rounded-full" style={{ background: t.lineStrong }} />
        <p className="text-lg font-semibold" style={display}>
          Place model
        </p>
        {[
          ["Sofa", "2.1 × 0.9 m"],
          ["Lamp", "0.4 × 1.6 m"],
        ].map(([a, b], i) => (
          <div key={a} className="py-1.5" style={{ borderTop: i ? `1px solid ${t.line}` : undefined }}>
            <p className="text-sm font-medium">{a}</p>
            <p className="text-xs" style={{ color: t.muted }}>
              {b}
            </p>
          </div>
        ))}
        <span
          className="rounded-xl py-2.5 text-center text-sm font-medium"
          style={{ background: t.plasma, color: t.onPlasma }}
        >
          Place in room
        </span>
      </div>
    </div>
  );
}

export function XRMock() {
  const t = NB.dark;
  return (
    <div
      className={`${nebulaFonts} relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border px-5 py-10 sm:py-14`}
      style={{
        ...body,
        color: t.ink,
        borderColor: t.line,
        background: "radial-gradient(ellipse at 50% 115%, #1c2430, #07090d 62%)",
      }}
    >
      <div
        className="flex w-full max-w-md flex-col gap-4 rounded-[28px] border p-5 shadow-2xl"
        style={{ background: "rgba(28,36,48,0.82)", borderColor: "#33404f", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold" style={display}>
            Gallery
          </span>
          <span className="text-xs" style={{ color: t.muted }}>
            Vision Pro · Quest
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <span className="h-20 rounded-2xl" style={{ background: "#123a36" }} />
          <span className="h-20 rounded-2xl" style={{ background: "#3a2a24" }} />
          <span className="h-20 rounded-2xl" style={{ background: "#333d1f" }} />
        </div>
        <span
          className="rounded-full border py-2.5 text-center text-sm font-medium"
          style={{ background: "#2a3442", borderColor: "#33404f" }}
        >
          Place in room
        </span>
      </div>
      <div
        className="flex gap-2 rounded-full border p-1.5"
        style={{ background: "rgba(28,36,48,0.82)", borderColor: "#33404f" }}
        aria-hidden
      >
        <span className="h-10 w-10 rounded-full" style={{ background: t.ink }} />
        <span
          className="h-10 w-10 rounded-full border-2"
          style={{ background: "rgba(212,242,90,0.16)", borderColor: t.ion, boxShadow: "0 0 18px rgba(212,242,90,0.35)" }}
        />
        <span className="h-10 w-10 rounded-full" style={{ background: "#2a3442" }} />
      </div>
      <span className="h-1.5 w-24 rounded-full border" style={{ background: "#2a3442", borderColor: "#33404f" }} />
      <span className="text-xs" style={{ color: t.ion }}>
        Ion ring = where you&apos;re looking
      </span>
    </div>
  );
}
