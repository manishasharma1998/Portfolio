---
{
  "slug": "my-new-project",
  "index": "04",
  "published": true,
  "title": "My Next Project Name",
  "category": "Category · Platform",
  "problem": "One line about the problem this project solved.",
  "year": "2026",
  "role": "Your role here",
  "duration": "X weeks",
  "platform": "Web / Mobile / VR",
  "chips": ["metric 1", "metric 2", "tag"],
  "cover": {
    "hue": 232,
    "title": "BIG NUMBER",
    "subtitle": "a short supporting line"
  },
  "metrics": [
    { "value": "xx%", "label": "what improved" },
    { "value": "xx", "label": "another number" },
    { "value": "xx", "label": "another number" },
    { "value": "xx", "label": "another number" }
  ],
  "hero": "Two or three sentences that open the story. This shows as the lead under the title on the case study page.",
  "tools": ["Figma", "Unity", "Blender"],
  "mode": "deep",
  "external": ""
}
---
Intro paragraph one. Write 1–3 short paragraphs before the first section.

You can use **bold** text too — it will render as bold.

## Context
### kicker: The assignment

Write what the project was and why it existed.

## Research & Discovery
### kicker: Before a single pixel

Write what you found out. Sentences separated by blank lines become paragraphs:

Paragraph one.

Paragraph two.

Bullets are lines that start with a dash:

- Finding number one
- Finding number two
- Finding number three

## Process

Write about your process without a kicker if you like — the kicker line is optional.

## Solution

What you shipped.

## Outcome

What the numbers said.

## Reflection

What you would do differently. This is the part most designers skip — keep it.

---
HOW TO ADD A PROJECT (delete this block before saving):
1. Copy this file and rename it, e.g. content/projects/my-app-redesign.md
2. Edit the JSON between the first --- and --- lines:
   - slug      -> unique; becomes the URL: /work/my-app-redesign
   - index     -> order in the grid (04, 05, ...)
   - published -> show (true) or hide (false) this project WITHOUT deleting the file
   - mode      -> "deep" = full case-study page; "card" = external link (add "external")
3. Edit the markdown body — paragraphs are separated by blank lines, bullets start with "- ".
4. Save. It appears automatically on the /work page.

TO REMOVE A PROJECT ENTIRELY: delete its .md file.
TO HIDE A PROJECT TEMPORARILY: set "published": false, keep the file.
---