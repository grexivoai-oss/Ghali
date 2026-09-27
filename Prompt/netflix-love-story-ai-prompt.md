# "The Story of Us" — Netflix-Style Relationship Website
### AI build prompt + reference notes

This is the popular "Netflix recap" gift-website trend: a single fake Netflix
interface, personalized as your relationship's "show." It has 3 screens and a
few small interactions — nothing exotic, totally buildable by an AI code tool
in one shot.

---

## 1. THE PROMPT (paste this into Claude, ChatGPT, v0.dev, bolt.new, Cursor, etc.)

```
Build a single-page website that recreates the Netflix app UI, personalized
as a relationship "show" gift for my girlfriend. Pure HTML, CSS, and vanilla
JavaScript (no framework, no build step — one index.html I can open directly
or host for free). Netflix's real dark theme: background #141414, red accent
#E50914, white/light-gray text, Netflix Sans / Helvetica Neue / Arial fallback.
Fully responsive, but the primary target is a phone screen held up and
filmed/cast to a TV, so keep touch targets and text large and legible.

There are 3 screens, navigated by simple JS show/hide (no routing needed):

--- SCREEN 1: "Who's Watching?" profile picker ---
- Netflix logo top-left.
- Centered heading "Who's watching?"
- A row of 4 profile tiles, each a square photo with a caption underneath
  showing a relationship milestone label (e.g. "1 month", "3 months",
  "6 months", "1 year" — I will swap in our real photos and our real
  milestones).
- Small "MANAGE PROFILES" text/button below the row, Netflix-style (outlined
  text, not functional, just for authenticity).
- Clicking/tapping any profile tile transitions to Screen 2.

--- SCREEN 2: Netflix Home / Browse page ---
- Left-hand thin icon sidebar (search, home, upcoming, TV, downloads, +),
  Netflix-style, purely decorative.
- Top-left small label "N SERIES" then a big bold title "THE STORY OF US"
  (this is our show title — make it easy for me to rename).
- Below the title, a 3–4 line description in the "quiet, narrative" Netflix
  tone — I'll supply my own text, placeholder: "A quiet collection of
  memories told through our camera roll — where fleeting moments, soft
  glances, and unspoken feelings capture our story."
- "Play" button (solid white) and "More Info" button (translucent gray),
  Netflix-style, side by side.
- A large hero image/photo on the right side of this header area (one of
  our photos), with a faint "now playing" vinyl-record/album-art overlay
  detail in the corner for a nostalgic touch (optional, skip if too complex).
- Below that: a horizontal-scrolling row titled "Trending Now" containing
  6–8 poster cards. Each poster is one of our photos with a bold title
  overlaid at the bottom, styled like a show title card (small red Netflix
  "N" logo badge, top-left of each poster). Chapter titles progress like a
  relationship arc, e.g.: "STRANGERS" → "BEST FRIENDS" → "MORE THAN FRIENDS"
  → "LOVERS" → "NOW INSEPARABLE" → "INFINITY & BEYOND" (I'll customize these).
- Clicking the hero's "Play" button (or any poster) transitions to Screen 3.

--- SCREEN 3: Episode Player ---
- Full-bleed photo/slideshow filling the screen, simulating a paused video
  frame.
- Top-left overlay text in the Netflix player font: "S1: E1: [episode title]"
  — I'll write custom episode titles per chapter (e.g. "S1: E1: Young, dumb,
  and broke high school kids").
- A slim red Netflix-style scrub/progress bar near the bottom, with a red
  circular playhead dot.
- Player control row under the progress bar: icon + "Episodes", icon +
  "Audio & Subtitles", icon + "Next Episode" (Netflix-style small icons,
  all non-functional except "Next Episode").
- "Next Episode" advances to the next photo/chapter in a slideshow (auto
  or on click), each with its own "S1: E[n]: [title]" caption, cycling
  through all the chapters defined in Screen 2's Trending Now row.
- Let the photo crossfade or use Ken-Burns slow-zoom between slides for a
  cinematic feel.

--- DATA STRUCTURE ---
Put all customizable content in one JS object/array at the top of the file
so I can edit it without touching any markup, e.g.:

const chapters = [
  {
    label: "1 month",              // used on profile tile
    posterTitle: "STRANGERS",      // used on Trending Now poster
    episodeTitle: "Young, dumb, and broke high school kids", // player overlay
    image: "images/photo1.jpg"
  },
  // ...more chapters
];

const show = {
  title: "THE STORY OF US",
  description: "A quiet collection of memories told through our camera roll...",
  heroImage: "images/hero.jpg"
};

--- STYLE DETAILS ---
- Font: Netflix Sans if available via CDN, else "Helvetica Neue", Arial, sans-serif.
- Background: #141414 everywhere.
- Netflix red: #E50914 for logo, accents, progress bar.
- Poster cards: subtle scale-up + shadow on hover (desktop) for the authentic
  browse-row feel.
- Use CSS Grid/Flexbox, no external UI libraries needed.
- Smooth 300–400ms transitions between the 3 screens (fade or slide).
- Add a tiny muted "Terms & Support / Privacy Policy" footer text on Screen 2
  purely for realism, non-functional.

Deliver the complete index.html with inline <style> and <script> (or
separate style.css/script.js if cleaner), plus a clear list of where to
drop in my photo filenames.
```

---

## 2. HOW TO USE THIS

1. Gather 6–8 photos of you two, roughly chronological (first meeting →
   present). Square-ish crops work best for the poster row; a wide photo
   works best for the hero.
2. Paste the prompt above into an AI coding tool. Good options:
   - **Claude** (this chat, or claude.ai — ask it to generate the file directly)
   - **v0.dev** or **bolt.new** — great for quick visual iteration
   - **Cursor** or **Windsurf** — if you want to keep editing locally
3. Once you have the HTML file, swap the placeholder `images/photo1.jpg` etc.
   with your real photos, and rewrite the `chapters` labels/titles/episode
   names with your real story.
4. To "gift" it: host it free on **Netlify**, **Vercel**, or **GitHub Pages**
   (drag-and-drop the folder onto Netlify's dashboard is the fastest), then
   open the link on your phone, cast/AirPlay to the TV, and hand her the
   remote — exactly like the video.

---

## 3. REFERENCE SCREENSHOTS (pulled from your video)

- `ref_1_profiles.png` — the "Who's watching?" profile-picker screen
- `ref_2_home.png` — the Netflix home/browse screen with hero + Trending Now row
- `ref_3_player.png` — the full-screen episode player with progress bar

Hand these to the AI tool alongside the prompt (most accept image uploads) —
it'll nail the exact layout and spacing much faster.
