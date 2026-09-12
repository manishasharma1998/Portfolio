---
{
  "slug": "iit-delhi-xr",
  "index": "03",
  "published": true,
  "title": "Walking Inside the Interface",
  "category": "XR · Unity · Blender",
  "problem": "Most “spatial design” is flat design with extra shadows. This was the real thing — building environments people walk into.",
  "year": "2025",
  "role": "XR Designer · Prototyper",
  "duration": "6 months",
  "platform": "VR · Unity · Blender",
  "chips": ["Unity", "Blender", "IIT Delhi"],
  "cover": {
    "hue": 176,
    "title": "Walkable",
    "subtitle": "environments, not flatland mockups"
  },
  "metrics": [
    { "value": "6", "label": "VR prototypes built" },
    { "value": "0", "label": "tutorial assets used" },
    { "value": "1", "label": "completed headset-run simulation" },
    { "value": "Grade A", "label": "at IIT Delhi" }
  ],
  "hero": "A VR experience is a UX problem with gravity and scale. This is where I stopped designing for a rectangle and started designing for a body — Unity mechanics, Blender environments, and the uncomfortable questions of what spatial UX should even mean.",
  "tools": ["Unity", "Blender", "Meta Quest", "Midjourney"],
  "visuals": [
    {
      "kind": "stack",
      "title": "The asset pipeline",
      "caption": "On a standalone headset every object costs compute — nothing entered a scene without a reason.",
      "layers": [
        { "label": "Blender", "detail": "modelling · materials · environments" },
        { "label": "Unity", "detail": "scene building · interactions · animation" },
        { "label": "Build", "detail": "headset-ready, held at 90fps" },
        { "label": "Verification", "detail": "walked through by real people" }
      ]
    },
    {
      "kind": "steps",
      "title": "Build → Walk → Learn → Repeat",
      "caption": "Revisions were dictated by scale, reach and glance-line — never the editor viewport.",
      "steps": [
        "Blender — model and texture every object",
        "Unity — assemble the scene and its interactions",
        "Headset — walk a real person through it",
        "Iterate — measure reach, adjust scale, redo"
      ]
    }
  ]
}
---
Figma doesn’t have a floor. Blender does. The six months at IIT Delhi’s Executive Programme in VR/AR were spent learning what changes when the interface becomes somewhere you stand.

Warning: nothing in this case study is a mockup. Everything is a build.

## Context
### kicker: Why XR, and why now

Flat interfaces assume a screen, a scroll, a thumb. XR assumes a person — with spatial memory, proprioception, and genuine discomfort when the scale is off by half a metre.

I went into the programme less to learn tools and more to check a hypothesis: that the design skill that matters most in XR is the same one from user research — reading how people actually behave in a system, then building for the behaviour, not the demo.

## Research & Discovery
### kicker: The uncomfortable questions

Before building, I interrogated what “user research” means in headset. Heat maps? Gaze tracking? The answers were sparse — which is exactly why spatial design is a frontier and not a template.

I studied embodied interaction frameworks, affordances in 3D space, and the failure of porting 2D metaphors (cards, slides) into scenes where their physics makes no sense.

## Constraints
### kicker: The hardware decided

Performance budgets on standalone headsets are brutal: draw calls, texture memory, frame rate. A beautiful Blender scene is a lie until it runs at 90fps in a headset.

Every object needed a reason to exist, because every one of them cost compute. This constraint is the best design teacher I’ve had.

## Process
### kicker: Unity + Blender loop

The workflow alternated between Blender — modelling, materials, environments — and Unity — scene building, interactions, animation, asset integration.

Prototypes were loaded onto a headset and walked through by real people, not just admired in the editor viewport. Scale, reach, and glance-line dictated revisions.

## Solution
### kicker: What got built

Six VR prototypes and a completed, headset-run interactive simulation: scene building, animation, spatial UI, and the full asset pipeline from model to environment to interaction.

The deliverable was earned in a headset, not a deck.

## Outcome
### kicker: What it proved

I completed the Executive Programme in VR/AR at IIT Delhi with a Grade A — and, more usefully, I left knowing exactly what I don’t know, which is how you build on a frontier.

The prototypes now serve as the interactive spine of this portfolio’s XR section. Screenshots are not the medium; the experience is.

## Reflection

I over-invested early in a hero environment and under-invested in interaction depth. A room people walk through but can’t affect is a decoration, not a product.

Next build: an XR experience with a research question attached. Because even spatial design should be a testable hypothesis — that’s the whole point of the discipline.