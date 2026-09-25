"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/primitives/reveal";
import { AccentText } from "@/components/primitives/accent-text";
import type { SiteConfig } from "@/lib/types";

const plates = [
  {
    src: "/images/xr-1.jpg",
    alt: "Manisha Sharma in the IIT Delhi XR lab, working in a VR environment",
    caption: "IIT Delhi · XR lab",
  },
  {
    src: "/images/xr-2.jpg",
    alt: "Manisha Sharma with immersive setup during the VR/AR programme at IIT Delhi",
    caption: "VR/AR · Executive Programme",
  },
  {
    src: "/images/certificate.jpg",
    alt: "IIT Delhi — Executive Programme in VR/AR certificate, Grade A",
    caption: "Certified · Grade A",
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
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.5);

      source.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      nodeRefs.current = [source, lowpass, gain];
      setEnabled(true);
    } catch {
      /* audio unavailable */
    }
  }, []);

  return {
    enabled,
    toggle: () => (enabled ? stop() : start()),
  };
}

export function XRPlayground({ copy }: { copy: SiteConfig["xr"] }) {
  const { enabled, toggle } = useAmbient();

  return (
    <section id="xr" className="border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            {copy.kicker}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] font-normal tracking-tight text-bone-100 sm:text-5xl">
            {copy.titleBefore}
            <br />
            <AccentText text={copy.titleBreak ?? ""} />
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-500 sm:text-lg">
            {copy.blurb}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {plates.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.06} className="h-full">
              <figure className="group flex h-full flex-col">
                <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-line">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover [filter:saturate(0.86)]"
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-[10px] tracking-[0.15em] text-fog-500 uppercase">
                  Fig. 0{i + 1} — {p.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-2xl">
            <p className="text-[15px] leading-relaxed text-fog-500">
              {copy.caption}
            </p>
            {copy.soundNote ? (
              <p className="mt-2 text-[15px] leading-relaxed text-fog-500 italic">
                {copy.soundNote}
              </p>
            ) : null}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              className="mt-5 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-bone-100 uppercase transition-colors hover:text-accent-400"
            >
              <span
                className={`relative flex h-2 w-2 rounded-full border border-accent-400/60 ${
                  enabled ? "bg-accent-400" : ""
                }`}
              />
              Spatial ambience {enabled ? "· on" : "· off"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}