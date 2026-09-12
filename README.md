# Portfolio — Manisha Sharma

A single-page UX/XR design portfolio built with Next.js, Tailwind CSS v4 and Framer Motion.

**Everything that is copy or content lives in the `content/` folder.** You can edit this site without touching any code.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production preview:

```bash
npm run build && npm run start
```

## How to edit content

### The big three

| File | What it controls |
| --- | --- |
| `content/site.json` | Identity, nav, hero, metrics, About, Work, XR, Skills, Timeline, Contact — basically the whole homepage copy |
| `content/behance.json` | The "More on Behance" gallery (titles, links, covers, view counts) |
| `content/projects/*.md` | Case studies — one markdown file per project |

### Adding a new case study (without touching code)

1. Copy `content/project-template.md` to `content/projects/my-project.md`.
2. Edit the JSON block between the first `---` lines:
   - `slug` — unique, becomes the URL `/work/my-project`
   - `index` — order in the grid (`04`, `05`, ...), strings sort numerically
   - `published` — `true` shows the project, `false` hides it (keep the file, hide the card)
   - `title`, `category`, `problem`, `year`, `role`, `duration`, `platform`, `chips`, `cover`, `metrics`, `hero`, `tools`
   - `mode` — `"deep"` gets its own full case-study page; `"card"` opens an external link (add `"external": "https://..."`)
3. Edit the markdown body:
   - Paragraphs are separated by blank lines
   - Bullet lists are lines starting with `- `
   - Sections use `## Heading`, optional `### kicker: Some words`
   - A `## Reflection` section renders in the "What I'd do differently" box
4. Save. The project appears in **Selected Work** automatically on the `/work` page.
5. Run `npm run build && npm run start` (or `npm run dev`) to preview.

### Removing / hiding a project

- **Hide it temporarily** — set `"published": false` in that project's `.md` file. The card disappears from `/work` and its page stops resolving, but the file stays for later.
- **Remove it entirely** — delete the project's `.md` file from `content/projects/`.

### Editing copy

Most strings support `*asterisk*` emphasis — the word between the asterisks renders in the accent blue, e.g. `"line1": "UX Designer with a *Political Science* brain."`.

### Replacing images

Replace files in `public/images/` keeping the same filenames, or change the `src` paths in `content/site.json` / `content/behance.json` / component code. Photos are optimised at build time by Next's Image component.

### Notes

- `public/Manisha-Sharma-Resume.pdf` is a placeholder — replace it with the real resume before publishing.
- Local Behance covers (small optimised screenshots) are used instead of remote images so no remote-image config is needed. Re-export them from Behance if you want higher fidelity.
- The XR viewport in `content/site.json` → `xr.caption` explains where to plug in a real WebGL build / headset recording.

## Publishing + editing live (no code needed afterwards)

The site ships with a **Decap CMS** admin panel at `/admin` so case studies and the
Behance section can be added, hidden or removed from the browser — each save commits
to GitHub and the host redeploys automatically.

## The simple way (recommended): host on Netlify

On Netlify there is **no OAuth setup at all** — Netlify provides the GitHub login
itself. Three steps and the admin works:

### 1. Push the project to GitHub

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 2. Point the CMS at your site

In `public/admin/config.yml`, change `repo` to your GitHub repo (the same one from
step 1) and `site_domain` to your Netlify URL (you may need to do this after step 3
if you haven't deployed yet). Commit and push.

### 3. Deploy to Netlify (2–3 minutes, free)

1. **app.netlify.com → Add new site → Import an existing project** → pick the GitHub
   repo. Netlify detects *Next.js* automatically.
2. Leave build settings as suggested, click **Deploy**.
3. Your site is live at `<site-name>.netlify.app`.

That's it — no environment variables, no GitHub OAuth app.

## Manage projects from the browser

1. Open **`https://<site-name>.netlify.app/admin/index.html`** (link is also in the
   site footer → “Manage content”).
2. Sign in with GitHub. Allow it when it asks for repo access.
3. **Case Studies** → *New Case Study* to add a project, or open any existing one to
   edit. The `published` switch hides/shows projects without deleting them. Delete
   removes the file permanently. **Behance Projects** edits the gallery.
4. Saving writes to `main`; Netlify redeploys in a couple of minutes.

> Note: uploading images via the CMS stores them in `public/images/` (committed to
> the repo), so they deploy exactly like the current covers.

## Alternative: host on Vercel

Same idea, slightly more one-time setup (a GitHub OAuth app + two env vars):

1. Push to GitHub (step 1 above).
2. In `public/admin/config.yml`, uncomment `base_url` and `auth_endpoint` and set:
   ```yaml
   backend:
     name: github
     repo: <username>/<repo>
     branch: main
     base_url: https://your-site.vercel.app
     auth_endpoint: api/auth
   ```
3. Deploy on Vercel; add env vars `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
4. Create a GitHub OAuth app at **github.com → Settings → Developer settings →
   OAuth Apps**: Homepage URL `https://your-site.vercel.app`, Authorization callback
   URL `https://your-site.vercel.app/api/auth`. Copy the Client ID + secret into the
   Vercel env vars and redeploy.

The `/api/auth` proxy in this repo serves that flow — Vercel keeps the secret
server-side.

### Local editing after publishing

The CMS is optional — editing `content/` locally and pushing works exactly as before.
Existing `.md` files use JSON frontmatter; anything saved from the CMS is plain YAML.
Both are read automatically by the build, so the two styles can coexist.

### Security notes

- The OAuth proxy (`/api/auth`) keeps the GitHub client secret on the server.
- The admin login requires a GitHub account with access to the repo — content can
  only be changed through real GitHub commits, so changes are reviewable.
- Only you (or anyone you give repo access to) can edit; visitors never see the
  admin unless they know the URL and can sign in to GitHub.