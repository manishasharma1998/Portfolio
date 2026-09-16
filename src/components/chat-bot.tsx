"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Avatar3D = dynamic<{ speaking: boolean }>(
  () => import("./avatar3d").then((m) => m.Avatar3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Avatar size={54} speaking={false} />
      </div>
    ),
  }
);

type Action = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

type FaqEntry = {
  q: string;
  keywords: string[];
  answer: { text: string; actions?: Action[] };
};

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: Action[];
};

function Avatar({
  size = 40,
  speaking = false,
}: {
  size?: number;
  speaking?: boolean;
}) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className={`absolute -inset-1 rounded-full bg-lens-400/30 blur-md transition-opacity duration-300 ${
          speaking ? "opacity-100" : "opacity-0"
        }`}
      />
      {speaking ? (
        <>
          <span className="absolute -inset-1 animate-ping rounded-full border border-lens-400/40" />
          <span className="absolute -inset-2 animate-ping rounded-full border border-accent-400/30 [animation-delay:400ms]" />
        </>
      ) : null}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 210deg, #6c8cff, #9d7fff, #5b6cf0, #6c8cff)",
        }}
      />
      <span
        className="relative flex items-center justify-center rounded-full bg-ink-950 font-display font-semibold text-lens-300"
        style={{ width: size - 6, height: size - 6, fontSize: size * 0.3 }}
      >
        {size >= 34 ? "MS" : "M"}
      </span>
      <span className="absolute -right-1 -bottom-0.5 rounded-md border border-white/15 bg-ink-900 px-1 font-mono text-[8px] leading-3 text-lens-300 uppercase">
        AI
      </span>
    </span>
  );
}

export function ChatBot({
  name,
  email,
  whatsapp,
  resume,
}: {
  name: string;
  email: string;
  whatsapp: string;
  resume: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const scrolledRef = useRef(false);
  const lastScrollRef = useRef(performance.now());
  const msgId = () => idRef.current++;

  const faqSeed: { q: string; a: string; actions?: Action[] }[] = [
    {
      q: "See my work",
      a: "Three deep-dives worth your time: a checkout nobody could blame on price, a 200-component design system, and the XR build.",
      actions: [
        { label: "Checkout recovery", href: "/work/checkout-recovery" },
        { label: "Design system", href: "/work/saas-design-system" },
        { label: "XR build", href: "/work/iit-delhi-xr" },
      ],
    },
    {
      q: "Skills & tools",
      a: "Research, UI/UX, XR and design systems — backed by Figma, Unity, Blender, Maze, GA4 and a stubborn refusal to design on vibes.",
      actions: [{ label: "View skills", href: "/#skills" }],
    },
    {
      q: "Hire or collaborate",
      a: "The fastest path is email or WhatsApp — read carefully, replies quickly, motivated to move.",
      actions: [
        { label: "Email", href: `mailto:${email}` },
        { label: "WhatsApp", href: whatsapp, external: true },
        { label: "Contact section", href: "/#contact" },
      ],
    },
    {
      q: "Download resume",
      a: "One click, straight to the PDF.",
      actions: [{ label: "Download resume", href: resume, download: true }],
    },
    {
      q: "XR & VR background",
      a: "The real thing — environments people walk into, built in Unity + Blender, walked through in a Meta Quest. IIT Delhi, Grade A.",
      actions: [{ label: "Explore the XR section", href: "/#xr" }],
    },
    {
      q: "Experience & education",
      a: "The full arc: Technoid Infusion (2024–26), freelancing before that, IIT Delhi XR, Times Pro AI certified, UI/UX diploma, IGNOU and DU behind the scenes.",
      actions: [{ label: "View the journey", href: "/#journey" }],
    },
    {
      q: "Can you relocate?",
      a: "Yes — relocation-ready and committed to the move. On-site or remote, open either way.",
      actions: [{ label: "More details", href: "/#contact" }],
    },
  ];

  const faq: FaqEntry[] = faqSeed.map((f) => ({
    ...f,
    keywords: f.q.toLowerCase().split(" "),
    answer: { text: f.a, actions: f.actions },
  }));

  function match(text: string): FaqEntry | undefined {
    const t = text.toLowerCase();
    const scored = faq.map((f) => {
      let score = 0;
      for (const kw of f.keywords) {
        if (kw && t.includes(kw)) score += 1;
      }
      return { f, score };
    });
    const best = scored.sort((a, b) => b.score - a.score)[0];
    return best.score > 0 ? best.f : undefined;
  }

  function push(
    role: Message["role"],
    text: string,
    actions?: Message["actions"]
  ) {
    setMessages((m) => [...m, { id: msgId(), role, text, actions }]);
  }

  function greet() {
    setStarted(true);
    setTyping(true);
    const text = `Hi, I'm ${name.split(" ")[0]} — your AI guide here. Ask me about the work, skills, XR, or hiring, or tap a question below.`;
    window.setTimeout(() => {
      setTyping(false);
      push("assistant", text, fallbackSeed());
      speakText(text);
    }, reduce ? 0 : 700);
  }

  function fallbackSeed() {
    return faqSeed.map((f) => ({ label: f.q, href: "#" })).slice(0, 6);
  }

  function send(value: string) {
    const text = value.trim();
    if (!text) return;
    push("user", text);
    setTyping(true);
    window.setTimeout(() => {
      const hit = match(text);
      setTyping(false);
      if (hit) {
        push("assistant", hit.answer.text, hit.answer.actions);
      } else {
        push(
          "assistant",
          "No clean match for that one — but these will get you where you’re going faster:",
          fallbackSeed()
        );
      }
    }, reduce ? 0 : 650);
  }

  function onSuggestion(label: string) {
    const hit = faq.find((f) => f.q === label);
    if (!hit) return;
    push("user", label);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      push("assistant", hit.answer.text, hit.answer.actions);
    }, reduce ? 0 : 650);
  }

  function setOpenOnce(v: boolean) {
    if (v && !started) greet();
    setOpen(v);
  }

  function pickFemaleVoice(): SpeechSynthesisVoice | null {
    try {
      const voices = window.speechSynthesis?.getVoices() ?? [];
      if (!voices.length) return null;
      const prefs = [
        "Samantha",
        "Google US English",
        "Zira",
        "Jenny",
        "Aria",
        "Allison",
        "Ava",
        "Victoria",
        "Karen",
        "Moira",
        "Sonia",
        "Libby",
        "Female",
      ];
      for (const p of prefs) {
        const v = voices.find((v) => v.lang.startsWith("en") && v.name.includes(p));
        if (v) return v;
      }
      return voices.find((v) => v.lang.startsWith("en")) ?? null;
    } catch {
      return null;
    }
  }

  function stop() {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* noop */
    }
    setSpeaking(null);
  }

  function speakText(text: string) {
    if (!voiceOn) return;
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      stop();
      const u = new SpeechSynthesisUtterance(text);
      const voice = pickFemaleVoice();
      if (voice) u.voice = voice;
      u.rate = 1.02;
      u.pitch = 1.05;
      u.onstart = () => setSpeaking(text);
      u.onend = () => setSpeaking(null);
      u.onerror = () => setSpeaking(null);
      setSpeaking(text);
      synth.speak(u);
    } catch {
      setSpeaking(null);
    }
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem("chat-voice");
      if (stored === "off") setVoiceOn(false);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("chat-voice", voiceOn ? "on" : "off");
    } catch {
      /* noop */
    }
    if (!voiceOn) stop();
  }, [voiceOn]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const reload = () => {
      try {
        synth.getVoices();
      } catch {
        /* noop */
      }
    };
    synth?.addEventListener?.("voiceschanged", reload);
    return () => synth?.removeEventListener?.("voiceschanged", reload);
  }, []);

  useEffect(
    () => () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* noop */
      }
    },
    []
  );

  useEffect(() => {
    const onScroll = () => {
      lastScrollRef.current = performance.now();
      if (window.scrollY > 120) scrolledRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-open after ~30s of active scrolling, once per session.
  useEffect(() => {
    if (open) return;
    if (sessionStorage.getItem("chat-guide-dismissed")) return;
    let last = performance.now();
    let acc = 0;
    let raf = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (performance.now() - lastScrollRef.current < 1500) acc += dt;
      if (acc >= 30000) {
        setOpenOnce(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, started]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing, open]);

  const close = () => {
    try {
      sessionStorage.setItem("chat-guide-dismissed", "1");
    } catch {
      /* noop */
    }
    setOpen(false);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => (open ? close() : setOpenOnce(true))}
        initial={false}
        animate={open ? { scale: 0 } : { scale: 1 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className="fixed right-4 bottom-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-lens-400/40 bg-ink-850 text-lens-300 shadow-[0_10px_40px_-10px_rgba(108,140,255,0.5)] transition-colors hover:border-lens-400 hover:bg-lens-400/10 sm:right-6 sm:bottom-6"
      >
        {open ? null : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <AnimatePresence>
          {open ? (
            <motion.span
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 45, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl leading-none text-lens-300"
            >
              +
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-3 bottom-24 z-[70] flex w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-900/95 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:right-6 sm:bottom-28 sm:w-[24rem]"
            style={{ height: "min(560px, 72vh)" }}
            role="dialog"
            aria-label={`${name} portfolio chat`}
          >
            {/* 3D avatar banner */}
            <div className="relative overflow-hidden border-b border-white/[0.06]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-lens-400/60 to-transparent" />
              <div className="relative h-40 sm:h-44">
                <div className="pointer-events-none absolute inset-0">
                  <Avatar3D speaking={Boolean(speaking)} />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/15 to-transparent" />
                <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5 rounded-full border border-lens-400/30 bg-ink-900/70 px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] text-lens-300 uppercase backdrop-blur">
                  <span className={`h-1.5 w-1.5 rounded-full ${speaking ? "animate-pulse bg-lens-300" : "bg-lens-400"}`} />
                  AI
                </div>
                <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVoiceOn((v) => !v)}
                    aria-pressed={voiceOn}
                    aria-label={voiceOn ? "Turn voice off" : "Turn voice on"}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition-colors ${
                      voiceOn
                        ? "border-lens-400/40 bg-ink-900/50 text-lens-300 hover:bg-lens-400/10"
                        : "border-white/10 bg-ink-900/50 text-fog-500 hover:border-white/20 hover:text-bone-100"
                    }`}
                  >
                    {voiceOn ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close chat"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-ink-900/50 text-fog-400 backdrop-blur transition-colors hover:border-white/20 hover:text-bone-100"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-3 left-4 z-10">
                  <p className="font-display text-sm font-semibold text-bone-100">
                    {name.split(" ")[0]} · AI
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
                    {speaking ? "Speaking…" : "Greeting — female AI guide"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.role === "user" ? "flex justify-end" : "flex items-end gap-2"}
                >
                  {m.role === "assistant" ? (
                    <Avatar size={26} speaking={speaking === m.text} />
                  ) : null}
                  <div
                    className={`max-w-[85%] ${
                      m.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-lens-400 px-3.5 py-2.5 text-sm font-medium text-ink-950"
                        : "rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-fog-300"
                    }`}
                  >
                    {m.text}
                    {m.actions && m.actions.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.actions.map((a) =>
                          a.href === "#" ? (
                            <button
                              key={a.label}
                              type="button"
                              onClick={() => onSuggestion(a.label)}
                              className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                                m.role === "user"
                                  ? ""
                                  : "border-lens-400/30 bg-lens-400/[0.08] text-lens-300 hover:bg-lens-400/15"
                              }`}
                            >
                              {a.label}
                            </button>
                          ) : a.external || a.href.startsWith("http") || a.href.startsWith("mailto") ? (
                            <a
                              key={a.label}
                              href={a.href}
                              target={a.href.startsWith("http") ? "_blank" : undefined}
                              rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="rounded-full border border-lens-400/30 bg-lens-400/[0.08] px-3 py-1 text-[11px] font-medium text-lens-300 transition-colors hover:bg-lens-400/15"
                            >
                              {a.label} →
                            </a>
                          ) : (
                            <Link
                              key={a.label}
                              href={a.href}
                              download={a.download}
                              className="rounded-full border border-lens-400/30 bg-lens-400/[0.08] px-3 py-1 text-[11px] font-medium text-lens-300 transition-colors hover:bg-lens-400/15"
                            >
                              {a.label} →
                            </Link>
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                  {m.role === "assistant" ? (
                    <button
                      type="button"
                      onClick={() => (speaking === m.text ? stop() : speakText(m.text))}
                      aria-label={speaking === m.text ? "Stop reading answer" : "Read answer aloud"}
                      className={`mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        speaking === m.text
                          ? "border-lens-400/50 text-lens-300"
                          : "border-white/10 text-fog-500 hover:border-lens-400/40 hover:text-lens-300"
                      }`}
                    >
                      {speaking === m.text ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
                          <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  ) : null}
                </div>
              ))}

              {typing ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.05] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-lens-400"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 ? (
              <div className="flex gap-2 overflow-x-auto border-t border-white/[0.06] px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {faqSeed.slice(0, 6).map((f) => (
                  <button
                    key={f.q}
                    type="button"
                    onClick={() => onSuggestion(f.q)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-fog-300 transition-colors hover:border-lens-400/40 hover:text-lens-300"
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            ) : null}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
                setInput("");
              }}
              className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                aria-label="Ask a question"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-bone-100 placeholder:text-fog-500 focus:border-lens-400/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lens-400 text-ink-950 transition-opacity disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 11l17-8-8 17-1.5-6.5L3 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}