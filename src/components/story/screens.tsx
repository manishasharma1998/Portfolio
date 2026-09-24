import type { ReactNode } from "react";

function SkeletonBar({
  w = "w-2/3",
  h = "h-2",
  tone = "bg-white/15",
}: {
  w?: string;
  h?: string;
  tone?: string;
}) {
  return <div className={`rounded-full ${tone} ${w} ${h}`} />;
}

function ScreenNav({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] font-medium text-bone-100/90">
      <span className="text-bone-100/50" aria-hidden>
        ‹
      </span>
      {title}
    </div>
  );
}

export function CartBeforeScreen({ hue }: { hue: number }) {
  const accent = `hsl(${hue} 80% 60%)`;
  return (
    <div
      dir="ltr"
      className="flex h-full flex-col gap-3 px-4 pb-5 pt-11 text-left"
    >
      <ScreenNav title="Checkout" />
      {[0, 1].map((r) => (
        <div
          key={r}
          className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.035] p-2.5"
        >
          <div className="h-10 w-10 shrink-0 rounded-lg bg-white/10" />
          <div className="flex flex-1 flex-col gap-1.5">
            <SkeletonBar w="w-3/4" h="h-2" />
            <SkeletonBar w="w-1/3" h="h-1.5" />
          </div>
        </div>
      ))}
      <div className="space-y-1.5 rounded-xl border border-white/8 bg-white/[0.025] p-2.5">
        <div className="flex justify-between text-[11px] text-fog-400">
          <span>Subtotal</span>
          <span>₹1,200</span>
        </div>
        <div className="flex justify-between text-[11px] text-fog-500">
          <span>Delivery</span>
          <span>at the next step</span>
        </div>
      </div>
      <button
        className="rounded-xl py-2.5 text-center text-[13px] font-semibold text-ink-950 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)]"
        style={{ background: accent }}
      >
        Proceed to checkout
      </button>
      <p className="text-center text-[10px] text-fog-500">
        No security signals. No reassurance.
      </p>
    </div>
  );
}

export function PaymentRevealScreen() {
  return (
    <div
      dir="ltr"
      className="flex h-full flex-col gap-2.5 px-4 pb-4 pt-11 text-left"
    >
      <ScreenNav title="Payment" />
      <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-2.5">
        <p className="text-[11px] font-semibold text-red-300">
          Delivery fee ₹99 added
        </p>
        <SkeletonBar w="w-1/2" h="h-1.5" tone="bg-red-300/20" />
      </div>
      <div className="space-y-2.5 rounded-xl border border-white/8 bg-white/[0.035] p-2.5">
        <div>
          <p className="mb-1 text-[10px] text-fog-500">Card number</p>
          <SkeletonBar w="w-4/5" h="h-2" />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <p className="mb-1 text-[10px] text-fog-500">Expiry</p>
            <SkeletonBar w="w-3/4" h="h-2" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-[10px] text-fog-500">CVV</p>
            <SkeletonBar w="w-3/4" h="h-2" />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-[12px]">
        <span className="text-fog-400">Total</span>
        <span className="font-semibold text-bone-100">₹1,399</span>
      </div>
      <button className="rounded-xl bg-white/10 py-2.5 text-[13px] font-medium text-bone-100/70">
        Pay ₹1,399
      </button>
      <p className="text-center text-[10px] text-fog-500">
        Payments by PaySecure+
      </p>
    </div>
  );
}

export function MobileKeyboardScreen({ hue }: { hue: number }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫", "Go"];
  return (
    <div
      dir="ltr"
      className="flex h-full flex-col pt-11 text-left"
    >
      <div className="px-4">
        <ScreenNav title="Payment" />
      </div>
      <div className="mt-3 space-y-2.5 px-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
          <p className="mb-1 text-[10px] text-fog-500">Card number</p>
          <div className="flex items-center gap-1">
            <SkeletonBar w="w-3/4" h="h-2" />
            <span
              className="inline-block h-4 w-[2px]"
              style={{ background: `hsl(${hue} 80% 60%)` }}
              aria-hidden
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skyline />
          <Skyline />
        </div>
      </div>
      <div className="mt-auto">
        <div className="relative flex h-9 items-center justify-center overflow-hidden rounded-t-lg bg-white/10 text-[11px] font-medium text-fog-500">
          Pay ₹1,399
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-900" />
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-t-2xl border-t border-white/10 bg-ink-850 p-2">
          {keys.map((k) => (
            <div
              key={k}
              className="grid h-7 place-items-center rounded-md bg-white/10 text-[11px] text-bone-100/80"
            >
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skyline() {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.035] p-2.5">
      <SkeletonBar w="w-2/3" h="h-2" />
      <SkeletonBar w="w-1/2" h="h-1.5" tone="bg-white/10" />
    </div>
  );
}

export function CheckoutAfterScreen({ hue }: { hue: number }) {
  const accent = `hsl(${hue} 80% 60%)`;
  return (
    <div
      dir="ltr"
      className="flex h-full flex-col gap-2.5 px-4 pb-5 pt-11 text-left"
    >
      <ScreenNav title="Payment" />
      <div className="flex items-center justify-between rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-400/30 text-[8px]">
            ✓
          </span>
          Secured · PCI-DSS
        </span>
        <span className="text-[9px] text-emerald-300/70">
          UPI · Visa · Mastercard
        </span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.035] px-2.5 py-2 text-[11px]">
        <span className="text-fog-400">
          ₹1,200 + ₹99 delivery · all included
        </span>
        <span className="font-semibold text-bone-100">₹1,299</span>
      </div>
      <div className="space-y-2 rounded-xl border border-white/8 bg-white/[0.035] p-2.5">
        <div>
          <p className="mb-1 text-[10px] text-fog-500">Card number</p>
          <SkeletonBar w="w-4/5" h="h-2" />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <p className="mb-1 text-[10px] text-fog-500">Expiry</p>
            <SkeletonBar w="w-3/4" h="h-2" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-[10px] text-fog-500">CVV</p>
            <SkeletonBar w="w-3/4" h="h-2" />
          </div>
        </div>
        <div>
          <p className="mb-1 text-[10px] text-fog-500">Name on card</p>
          <SkeletonBar w="w-2/3" h="h-2" />
        </div>
      </div>
      <button
        className="rounded-xl py-2.5 text-center text-[13px] font-semibold text-ink-950 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)]"
        style={{ background: accent }}
      >
        Pay ₹1,299 · all included
      </button>
      <p className="text-center text-[10px] text-fog-500">
        One clear action. Fees already declared.
      </p>
    </div>
  );
}

export function CurveCard({ hue }: { hue: number }) {
  const accent = `hsl(${hue} 80% 60%)`;
  const grid = `hsl(${hue} 60% 65% / 0.15)`;
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-ink-850 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <p className="text-center font-mono text-[10px] tracking-[0.25em] text-fog-500 uppercase">
        Checkout abandonment — 6 weeks
      </p>
      <svg
        viewBox="0 0 300 150"
        className="mt-4 w-full"
        role="img"
        aria-label="Abandonment dropping from sixty percent to thirty five percent over six weeks"
      >
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            x2="300"
            y1={30 + i * 30}
            y2={30 + i * 30}
            stroke={grid}
            strokeWidth="1"
          />
        ))}
        <path
          d="M30 28 L80 34 L130 96 L210 78 L270 82"
          fill="none"
          stroke="hsl(0 80% 55%)"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        <path
          d="M30 28 C60 62 110 96 150 84 C190 72 230 52 270 78"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="28" r="4.5" fill={accent} />
        <circle cx="270" cy="78" r="4.5" fill={accent} />
        <text x="30" y="18" fill="#e7e2d6" fontSize="11" fontWeight="600">
          60%
        </text>
        <text x="270" y="98" fill="#e7e2d6" fontSize="11" fontWeight="600">
          35%
        </text>
        <text x="150" y="140" fill="#8b93a7" fontSize="9" textAnchor="middle">
          Week 0 → Week 6
        </text>
      </svg>
    </div>
  );
}

export function FallbackScreen() {
  return (
    <div
      dir="ltr"
      className="flex h-full flex-col gap-3 px-4 pb-5 pt-11 text-left"
    >
      <ScreenNav title="Screen" />
      <div className="space-y-2 rounded-xl border border-white/8 bg-white/[0.035] p-3">
        <SkeletonBar w="w-3/4" h="h-2.5" />
        <SkeletonBar w="w-1/2" h="h-2" />
        <SkeletonBar w="w-2/3" h="h-2" tone="bg-white/10" />
      </div>
      <SkeletonBar w="w-full" h="h-16" tone="bg-white/[0.06]" />
    </div>
  );
}

export function ScreenFor(id: string, hue: number): ReactNode {
  switch (id) {
    case "cart-before":
      return <CartBeforeScreen hue={hue} />;
    case "payment-reveal":
      return <PaymentRevealScreen />;
    case "mobile-keyboard":
      return <MobileKeyboardScreen hue={hue} />;
    case "checkout-after":
      return <CheckoutAfterScreen hue={hue} />;
    case "curve":
      return <CurveCard hue={hue} />;
    default:
      return <FallbackScreen />;
  }
}