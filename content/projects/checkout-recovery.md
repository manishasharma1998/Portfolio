---
{
  "slug": "checkout-recovery",
  "index": "01",
  "published": true,
  "title": "The Checkout That Kept Dropping People",
  "category": "E-commerce · Flow Optimisation",
  "problem": "60% of users were starting checkout and abandoning it. The business assumed it was price. It wasn’t.",
  "year": "2025",
  "role": "Lead UX Designer",
  "duration": "6 weeks",
  "platform": "Web",
  "chips": ["−42% drop-off", "Research-led", "A/B tested"],
  "cover": {
    "hue": 232,
    "title": "60% → 35%",
    "subtitle": "abandonment, removed by finding the actual cause"
  },
  "metrics": [
    { "value": "60% → 35%", "label": "drop-off on checkout" },
    { "value": "42 pts", "label": "improvement, one quarter" },
    { "value": "2", "label": "real causes found" },
    { "value": "3", "label": "A/B tests before shipping" }
  ],
  "hero": "A checkout flow losing 60% of users looks like a business problem. It was a trust problem, a clarity problem, and a friction problem disguised as one page. Six weeks of research and testing later, the numbers told a story the client stopped guessing.",
  "tools": ["Figma", "Maze", "GA4", "Hotjar"]
}
---
A checkout flow losing 60% of users looks like a business problem. It was a trust problem, a clarity problem, and a friction problem disguised as one page. Six weeks of research and testing later, the numbers told a story the client stopped guessing.

## Context
### kicker: The assignment

Every stakeholder had a theory. Price. Competition. Slow delivery. Nobody had looked at the screen the user actually stared at.

A mid-market e-commerce brand was haemorrhaging revenue at the final step. Their funnel looked healthy until “Proceed to checkout”, where it collapsed. The brief I was handed was blunt: “make it convert better.”

I refused the tempting version of that brief — the one where you move a button up and call it a win — and went looking for the actual failure instead.

## Research & Discovery
### kicker: Before a single pixel

I interviewed 12 users who had abandoned in the last 30 days, ran a heuristic evaluation of the flow, and traced session recordings of every completed path.

Three facts survived the interrogation:

- 65% of abandonments happened on the payment step — not the cart, not shipping.
- Users trusted the brand but not the page: missing security cues, an unfamiliar payment gateway, and a surprise fee that appeared only after card details were entered.
- On mobile, the keyboard swallowed the “Pay” button for the most common device class.

## Constraints
### kicker: What couldn’t move

The payment gateway was a contractual red line. The surprise fee was a pricing decision above my pay grade — but its placement in the flow was not.

I had to fix the experience without being allowed to “fix” the revenue model. That means the design had to be honest about costs users would see, early, instead of ambushing them.

## Process
### kicker: Wireframes → prototypes → tests

Three flows went into testing: the control, a trust-first variant (cues, clarity, fee transparency at the top), and a friction-first variant (fewer fields, autofocus, keyboard-proof layout).

I tested with real users before writing any final UI, then prototyped the winning structure and A/B tested it against the live site.

## Solution
### kicker: What shipped

A checkout that says “everything is clear” before asking for money: fees disclosed up front, trust markers where users look, a payment step that survived the mobile keyboard.

Then — because good design is a hypothesis — I measured. The control stayed live alongside it.

## Outcome
### kicker: What the numbers said

Checkout drop-off fell from 60% to 35%. The company stopped blaming price, and the change survived two A/B tests and a post-launch audit.

The fix took six weeks. The theory took six days to dismantle.

## Reflection

Given it again, I’d start the A/B test three weeks earlier and package the “surprise fee discovery” as a product decision, not just a UX one. The flow is fixed; the pricing policy still sneaks.

The lesson I keep: users rarely abandon because they’re not interested. They abandon because something in the system quietly told them not to trust it.