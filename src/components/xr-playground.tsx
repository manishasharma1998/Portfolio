"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "@/components/primitives/reveal";
import { AccentText } from "@/components/primitives/accent-text";
import type { SiteConfig } from "@/lib/types";

const panels = [
  {
    id: "a",
    label: "SCENE // LOBBY",
    sub: "Ambient spatial UI",
    className: "left-[8%] top-[20%] w-44 sm:w-56 -rotate-3",
    depth: "translateZ(70px)",
  },
  {
    id: "b",
    label: "SIMULATION // STEP",
    sub: "Walkthrough #03",
    className: "right-[10%] top-[14%] w-52 sm:w-64 rotate-2",
    depth: "translateZ(120px)",
  },
  {
    id: "c",
    label: "ASSET // LOADED",
    sub: "Blender · fbx · rigged",
    className: "bottom-[18%] left-[14%] w-48 sm:w-60 -rotate-2",
    depth: "translateZ(40px)",
  },
];

function useAmbient() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodeRefs = useRef<AudioNode[]>([]);
  const [enabled, setEnabled] = useState(false);

  const stop = useCallback(() => {
    setEnabled(false);
    try {
      nodeRefs.current.forEach((n) => {
        try {
          n.disconnect();
        } catch {
          /* noop */
        }
      });
      nodeRefs.current = [];
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        void ctxRef.current.close();
      }
      ctxRef.current = null;
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => stop, [stop]);

  const start = useCallback(() => {
    try {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return;
      const ctx = ctxRef.current ?? new AC();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();

      const ctx_now = ctx.currentTime;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 190;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx_now);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx_now + 1.5);

      source.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      nodeRefs.current = [source, lowpass, gain];
      setEnabled(true);
    } catch {
      /* audio unavailable — keep toggle honest by not flipping on */
    }
  }, []);

  return {
    enabled,
    toggle: () => (enabled ? stop() : start()),
  };
}

export function XRPlayground({ copy }: { copy: SiteConfig["xr"] }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const { enabled, toggle } = useAmbient();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { damping: 25, stiffness: 80, mass: 0.5 });
  const sy = useSpring(py, { damping: 25, stiffness: 80, mass: 0.5 });

  const rotX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotY = useTransform(sx, [-0.5, 0.5], ["-9deg", "9deg"]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["-60px", "60px"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["-40px", "40px"]);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="xr"
      className="relative overflow-hidden border-y border-line bg-xr-bg"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-lens-300 uppercase">
            {copy.kicker}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-bone-100 sm:text-4xl md:text-5xl">
            {copy.titleBefore}
            <br />
            <AccentText text={copy.titleBreak ?? ""} />
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            {copy.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div
            ref={rootRef}
            onMouseMove={onMove}
            className="group relative overflow-hidden rounded-3xl border border-line bg-black shadow-[0_0_80px_-20px_rgba(108,140,255,0.25)]"
          >
            {/* scene */}
            <div className="relative aspect-[4/3] w-full [perspective:1200px] sm:aspect-[16/9]">
              {/* horizon glow */}
              <motion.div
                aria-hidden
                style={{ left: glowX, top: glowY }}
                className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(108,140,255,0.28),transparent_65%)] blur-2xl"
              />

              <motion.div
                style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
                className="absolute inset-0 [transform-style:preserve-3d]"
              >
                {/* scene image */}
                <Image
                  src="/images/xr-scene.jpg"
                  alt="Manisha Sharma's XR environment — spatial UI scene"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />

                {/* desktop floating panels */}
                <div className="hidden sm:block">
                  {panels.map((p) => (
                    <div
                      key={p.id}
                      className={`absolute ${p.className} [transform-style:preserve-3d]`}
                      style={{ transform: p.depth }}
                    >
                      <motion.div
                        className="rounded-xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md"
                        whileHover={reduce ? undefined : { y: -6 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-lens-300">
                          <span className="h-1 w-1 rounded-full bg-lens-400" />
                          {p.label}
                        </p>
                        <p className="mt-2 font-display text-sm font-medium text-bone-100 sm:text-base">
                          {p.sub}
                        </p>
                        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-2/3 rounded-full bg-lens-400/80" />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
              </motion.div>

              {/* mobile stacked panel cards */}
              <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-2 sm:hidden">
                {panels.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-white/12 bg-black/60 px-3.5 py-2.5 backdrop-blur-md"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lens-400" />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[10px] tracking-[0.2em] text-lens-300">
                        {p.label}
                      </p>
                      <p className="mt-0.5 truncate font-display text-xs font-medium text-bone-100">
                        {p.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* viewport meta */}
              <div className="absolute top-4 left-5 z-10 flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1 backdrop-blur-md">
                  <span className="flex h-2 w-2 gap-0.5" aria-hidden>
                    <span className="h-full w-0.5 animate-pulse rounded-full bg-red-400" />
                    <span className="h-full w-0.5 animate-pulse rounded-full bg-red-400 [animation-delay:0.2s]" />
                    <span className="h-full w-0.5 animate-pulse rounded-full bg-red-400 [animation-delay:0.4s]" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-bone-100/80">
                    REC · HEAD-ON
                  </span>
                </span>
                <span className="hidden rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-fog-400 backdrop-blur-md sm:inline-flex">
                  UNITY · BLENDER · QUEST
                </span>
              </div>

              {/* sound toggle */}
              <button
                type="button"
                onClick={toggle}
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-lens-400/40 sm:top-auto sm:right-5 sm:bottom-4"
                aria-pressed={enabled}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-lens-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lens-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase sm:hidden">
                  Ambience {enabled ? "· on" : "· off"}
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.18em] uppercase sm:inline">
                  Spatial ambience {enabled ? "· on" : "· off"}
                </span>
              </button>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.06]" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-850">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/xr-1.jpg"
                  alt="Manisha Sharma in the IIT Delhi XR lab, working in a VR environment"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <p className="absolute bottom-3 left-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-lens-300 uppercase backdrop-blur-sm">
                  IIT Delhi · XR lab
                </p>
              </div>
            </figure>
            <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-850">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/xr-2.jpg"
                  alt="Manisha Sharma with immersive setup during the VR/AR programme at IIT Delhi"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <p className="absolute bottom-3 left-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-lens-300 uppercase backdrop-blur-sm">
                  VR/AR · Executive Programme
                </p>
              </div>
            </figure>
            <figure className="relative overflow-hidden rounded-2xl border border-lens-400/25 bg-ink-850">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/certificate.jpg"
                  alt="IIT Delhi — Executive Programme in VR/AR certificate, Grade A"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <p className="absolute bottom-3 left-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-lens-300 uppercase backdrop-blur-sm">
                  Certified · Grade A
                </p>
              </div>
            </figure>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fog-500">
            {copy.caption}
          </p>
          {copy.soundNote ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fog-500">
              {copy.soundNote}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}