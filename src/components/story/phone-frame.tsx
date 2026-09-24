import { type CSSProperties, type ReactNode } from "react";
import type { StoryNote } from "@/lib/types";

export function PhoneFrame({
  hue,
  children,
  notes,
  className = "",
  style,
}: {
  hue: number;
  children: ReactNode;
  notes?: StoryNote[];
  className?: string;
  style?: CSSProperties;
}) {
  const accent = `hsl(${hue} 82% 62%)`;
  return (
    <div dir="ltr" className={`relative mx-auto w-full ${className}`} style={style}>
      {/* Phone body */}
      <div className="relative aspect-[9/19.4] rounded-[2.4rem] bg-gradient-to-b from-ink-750 via-ink-850 to-ink-900 p-[3px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] border border-white/[0.08] bg-gradient-to-b from-ink-800 to-ink-925">
          {/* Dynamic island */}
          <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-center">
            <span className="h-[22px] w-[92px] rounded-full bg-ink-950" />
          </div>
          {/* Screen chrome row (time + signals) */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-2.5 text-[10px] font-medium text-white" dir="ltr">
            <span>9:41</span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="grid h-2.5 w-4 grid-cols-4 items-end gap-px">
                <span className="h-1 rounded-sm bg-current" />
                <span className="h-1.5 rounded-sm bg-current" />
                <span className="h-2 rounded-sm bg-current" />
                <span className="h-2.5 rounded-sm bg-white/60" />
              </span>
              <span className="h-2.5 w-3 rounded-[3px] border border-white/70 p-px" dir="ltr">
                <span className="block h-full w-3/4 rounded-[1px] bg-white" />
              </span>
            </span>
          </div>

          {children}

          {/* Home indicator */}
          <div className="absolute inset-x-0 bottom-1.5 z-10 flex justify-center" aria-hidden>
            <span className="h-1 w-[110px] rounded-full bg-white/70" />
          </div>

          {/* Annotation badges */}
          {notes?.map((note) =>
            note.spot ? (
              <span
                key={note.n}
                aria-hidden
                className="pointer-events-none absolute z-30 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-[11px] font-bold text-ink-950 shadow-[0_4px_14px_rgba(0,0,0,0.5)] ring-4"
                style={{
                  left: `${note.spot.x}%`,
                  top: `${note.spot.y}%`,
                  background: accent,
                  boxShadow: `0 0 0 5px ${accent}55, 0 6px 18px -4px ${accent}aa`,
                }}
              >
                {note.n}
              </span>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
