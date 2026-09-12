---
{
  "slug": "saas-design-system",
  "index": "02",
  "published": true,
  "title": "Two Hundred Components, Zero Confusion",
  "category": "SaaS · Design System · Dev Handoff",
  "problem": "A SaaS platform that added features faster than its interface could stay consistent — live at Technoid Infusion.",
  "year": "2024 — Present",
  "role": "UI/UX Designer · System Owner",
  "duration": "Ongoing",
  "platform": "Web App",
  "chips": ["200+ components", "Org-wide adoption", "Agile handoff"],
  "cover": {
    "hue": 262,
    "title": "200+",
    "subtitle": "components, adopted org-wide"
  },
  "metrics": [
    { "value": "200+", "label": "system components" },
    { "value": "4×", "label": "faster pattern reuse" },
    { "value": "0", "label": "design-sprint debates" },
    { "value": "1", "label": "source of truth" }
  ],
  "hero": "When three teams build on the same platform, “just fix this one screen” is never just one screen. The system had to come first — or every screen would keep quietly fighting the last one.",
  "tools": ["Figma", "Storybook", "Jira", "Miro"],
  "visuals": [
    {
      "kind": "stack",
      "title": "The system pyramid",
      "caption": "Every layer inherits the one beneath it, so decisions stay cheap and screens stop arguing with each other.",
      "layers": [
        { "label": "Design tokens", "detail": "semantic colour · type · spacing · radius" },
        { "label": "200+ components", "detail": "states, usage rules, accessibility notes" },
        { "label": "Patterns", "detail": "empty states, pagination, forms" },
        { "label": "Product surfaces", "detail": "adopted org-wide, shipping weekly" }
      ]
    },
    {
      "kind": "compare",
      "title": "One component, one belief",
      "caption": "Status-pill variants collapsed from three to one token-driven source of truth.",
      "before": 3,
      "after": 1,
      "unit": " variants",
      "beforeLabel": "Before · three conflicting pills",
      "afterLabel": "After · one source of truth"
    }
  ]
}
---
The failure mode of a fast-growing SaaS product isn’t bad design. It’s inconsistent design — the same button doing five things.

My brief on this product wasn’t to design screens. It was to make screens stop arguing with each other.

## Context
### kicker: The assignment

A B2B SaaS platform, shipped rapidly, had accumulated conflicting patterns: three variants of the same status pill, two different empty states for the same data type, a button that deleted in one place and saved in another.

Design debt turns into product debt fast. The audit made that unignorable.

## Research & Discovery
### kicker: The audit before the build

I catalogued every screen in the product, ran a pattern-frequency analysis against the codebase, and sat with two front-end engineers to map which components existed in code versus which existed only in my head.

The gap between the Figma library and the shipped UI was the actual deliverable — the components were the by-product.

## Constraints
### kicker: What couldn’t move

No full redesign. No rewrite. Teams shipped features weekly and could not wait for a “perfect” system to appear and then migrate.

So the system had to be introduced the way good systems are: one token, one component, one deprecated pattern at a time — while production never stopped.

## Process
### kicker: Design tokens first, components second

I started with tokens — the decisions everything else inherits — then grouped components into a dependency-aware hierarchy so nothing referenced something that was about to change.

Every component shipped with its own usage rules, accessibility notes and a documented “when not to use this.”

## Solution
### kicker: What shipped

A 200+ component design system with semantic tokens, pattern guidance, and a handoff workflow that made the weekly release cycle faster instead of slower.

Handoff isn’t “here are the frames.” It’s “here is the decision, here is the logic, here is where it plugs in.”

## Outcome
### kicker: What changed

The system got adopted org-wide. Pattern debates stopped resetting screens, releases stopped shipping visual regressions, and features started landing with the same visual grammar.

When you normalise the boring layer — tokens, states, spacing — the interesting work suddenly has a foundation to stand on.

## Reflection

I’d name this play differently in hindsight: it read as “design system” but it was “organisational alignment.” The reframe would have gotten buy-in from the product team weeks earlier than the tech pitch did.

Systems people don’t build tokens. They build the agreement that makes decisions cheap.