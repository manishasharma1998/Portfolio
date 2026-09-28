import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { getDesignSystem } from "@/lib/design-system";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { nebulaFonts } from "@/components/nebula/fonts";
import {
  ComponentBoard,
  NB,
  NebulaMark,
  NebulaStage,
  PhoneMock,
  SampleCard,
  SheetMock,
  XRMock,
} from "@/components/nebula/previews";

export const metadata: Metadata = {
  title: "Nebula Design System · Manisha Sharma",
  description:
    "Nebula: a 238-component design system for web, mobile and XR, with dark and light themes. Designed, written and built by Manisha Sharma.",
};

function Block({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export default async function DesignSystemPage() {
  const locale = await getLocale();
  const site = await getSiteConfig(locale);
  const ds = getDesignSystem();
  const s = ds.sections;

  return (
    <main className="bg-background">
      <SiteNav links={site.nav} resumeHref={site.resume} locale={locale} ui={site.ui} />

      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <NebulaMark size={44} />
              <span className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
                {ds.page.eyebrow}
              </span>
            </div>
            <h1
              className={`${nebulaFonts} text-6xl leading-none font-semibold tracking-tight text-bone-100 sm:text-8xl`}
              style={{ fontFamily: "var(--font-nebula-display), sans-serif" }}
            >
              {ds.page.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-fog-400 sm:text-xl">{ds.page.lead}</p>
            <dl className="mt-2 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Role", ds.page.role],
                ["Platforms", ds.page.platforms],
                ["Built with", ds.page.tools],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">{k}</dt>
                  <dd className="mt-1 text-sm text-bone-100">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {ds.stats.map((st) => (
              <div key={st.label} className="bg-background px-5 py-6">
                <p className="font-display text-4xl tracking-tight text-bone-100 tnum sm:text-5xl">{st.value}</p>
                <p className="mt-1 text-sm text-fog-500">{st.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <ComponentBoard />
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <Block id="why">
        <div className="grid gap-8 lg:grid-cols-2">
          <SectionHeading kicker={ds.why.kicker} title={ds.why.title} />
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-fog-400">
            {ds.why.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Block>

      {/* Principles */}
      <Block id="principles">
        <SectionHeading kicker={s.principles.kicker} title={s.principles.title} />
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ds.principles.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-line bg-wash p-6">
              <p className="font-mono text-xs text-accent-400 tnum">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-xl tracking-tight text-bone-100">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-500">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </Block>

      {/* Foundations */}
      <Block id="foundations">
        <SectionHeading kicker={s.foundations.kicker} title={s.foundations.title} />
        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ds.colors.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-2xl border border-line">
              <div className="grid h-24 grid-cols-2">
                <div style={{ background: c.dark }} />
                <div style={{ background: c.light }} />
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-medium text-bone-100">{c.name}</p>
                  <p className="text-xs text-fog-500">{c.role}</p>
                </div>
                <p className="text-right font-mono text-[11px] leading-5 text-fog-400 uppercase">
                  {c.dark}
                  <br />
                  {c.light}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mt-3 font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
          Left: dark theme · Right: light theme
        </p>

        <Reveal className="mt-10">
          <NebulaStage t={NB.dark}>
            {ds.type.map((ty, i) => (
              <div
                key={ty.family}
                className="flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                style={{ borderColor: NB.dark.line, borderTopWidth: i ? 1 : 0 }}
              >
                <p
                  className={i === 0 ? "text-3xl font-semibold tracking-tight sm:text-4xl" : "text-lg"}
                  style={{
                    fontFamily:
                      i === 0
                        ? "var(--font-nebula-display), sans-serif"
                        : i === 1
                          ? "var(--font-nebula-body), sans-serif"
                          : "var(--font-jetbrains-mono), monospace",
                    color: i === 2 ? NB.dark.plasma : NB.dark.ink,
                  }}
                >
                  {ty.sample}
                </p>
                <p className="shrink-0 text-sm" style={{ color: NB.dark.muted }}>
                  {ty.family} · {ty.use}
                </p>
              </div>
            ))}
          </NebulaStage>
        </Reveal>
      </Block>

      {/* Components */}
      <Block id="components">
        <SectionHeading kicker={s.components.kicker} title={s.components.title} content={s.components.sub} />
        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ds.groups.map((g) => (
            <div key={g.name} className="flex items-baseline justify-between rounded-xl border border-line px-4 py-4">
              <span className="text-sm text-bone-100">{g.name}</span>
              <span className="font-display text-2xl text-accent-400 tnum">{g.count}</span>
            </div>
          ))}
        </Reveal>
      </Block>

      {/* Mobile */}
      <Block id="mobile">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading kicker={s.mobile.kicker} title={s.mobile.title} content={s.mobile.body} />
          <Reveal className="flex flex-wrap justify-center gap-6">
            <PhoneMock />
            <SheetMock />
          </Reveal>
        </div>
      </Block>

      {/* XR */}
      <Block id="xr">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading kicker={s.xr.kicker} title={s.xr.title} content={s.xr.body} />
          <Reveal>
            <XRMock />
          </Reveal>
        </div>
      </Block>

      {/* Themes */}
      <Block id="themes">
        <SectionHeading kicker={s.themes.kicker} title={s.themes.title} content={s.themes.body} />
        <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
          <NebulaStage t={NB.dark} className="p-5 sm:p-7">
            <p className="mb-3 text-xs tracking-[0.2em] uppercase" style={{ color: NB.dark.muted }}>
              Dark
            </p>
            <SampleCard t={NB.dark} />
          </NebulaStage>
          <NebulaStage t={NB.light} className="p-5 sm:p-7">
            <p className="mb-3 text-xs tracking-[0.2em] uppercase" style={{ color: NB.light.muted }}>
              Light
            </p>
            <SampleCard t={NB.light} />
          </NebulaStage>
        </Reveal>
      </Block>

      {/* Handoff */}
      <Block id="handoff">
        <SectionHeading kicker={s.handoff.kicker} title={s.handoff.title} />
        <Reveal className="mt-10 grid gap-4 md:grid-cols-3">
          {s.handoff.items.map((h) => (
            <div key={h.title} className="rounded-2xl border border-line bg-wash p-6">
              <h3 className="font-display text-xl tracking-tight text-bone-100">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-500">{h.body}</p>
            </div>
          ))}
        </Reveal>
      </Block>

      {/* Closing */}
      <Block>
        <Reveal className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-wash p-8 sm:p-12">
          <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight text-bone-100 sm:text-5xl">
            {ds.closing.title}
          </h2>
          <p className="max-w-xl text-base text-fog-500">{ds.closing.body}</p>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-400 px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {ds.closing.cta}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Block>

      <Footer />
    </main>
  );
}
