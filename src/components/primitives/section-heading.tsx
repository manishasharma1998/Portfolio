import { type ReactNode } from "react";
import { Reveal } from "@/components/primitives/reveal";

export function SectionHeading({
  kicker,
  title,
  content,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  content?: ReactNode;
  align?: "left" | "center";
}) {
  const alignCls =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <span className="font-mono text-xs tracking-[0.3em] text-lens-400 uppercase">
        {kicker}
      </span>
      <h2 className="font-display text-3xl font-medium tracking-tight text-bone-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {content ? (
        <div className="text-base leading-relaxed text-fog-400">{content}</div>
      ) : null}
    </Reveal>
  );
}

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs tracking-wide text-fog-300 ${className}`}
    >
      {children}
    </span>
  );
}