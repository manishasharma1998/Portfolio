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
      className={`flex max-w-2xl flex-col gap-3 ${alignCls} ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <span className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
        {kicker}
      </span>
      <h2 className="font-display text-4xl leading-[1.05] font-normal tracking-tight text-bone-100 sm:text-5xl">
        {title}
      </h2>
      {content ? (
        <div className="mt-2 max-w-xl text-base leading-relaxed text-fog-500">
          {content}
        </div>
      ) : null}
    </Reveal>
  );
}