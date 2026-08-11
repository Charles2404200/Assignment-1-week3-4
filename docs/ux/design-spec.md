# Design Spec — Mock Sprint (Login restyle + Team Page)

Implementation reference for the Week 3–4 Mock Sprint. Written against this repo's existing
stack — **Tailwind CSS v4, CSS-first config, no `tailwind.config.js`** — and follows
[`docs/DESIGN.md`](../DESIGN.md). Nothing here requires a new dependency, a new styling system, or
a component library.

> **Note on the Planner card title.** The task is labelled `[BOOTSTRAP RESTYLING]`. That means
> restyling the **boilerplate**, not adding the Bootstrap CSS framework. This repo styles
> everything with Tailwind v4 and `docs/DESIGN.md` explicitly rules out third-party UI frameworks.
> Do not add Bootstrap.

---

## 1. Design tokens

Add the brand ramp to `frontend/src/app/globals.css` inside `@theme`. This is the only new token
group; everything else reuses Tailwind defaults.

```css
@theme {
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-900: #312e81;
}
```

Utilities such as `bg-brand-600`, `text-brand-700` and `outline-brand-600` are generated from these
automatically.

### Colour usage

| Role                   | Token                          | Notes                                    |
| ---------------------- | ------------------------------ | ---------------------------------------- |
| Primary action         | `bg-brand-600`, hover `-700`   | Sign-in button, links                    |
| Brand panel            | `from-brand-700 to-brand-900`  | Decorative login panel only              |
| Page background        | `bg-zinc-50`                   | Team page                                |
| Surface / card         | `bg-white` + `border-zinc-200` |                                          |
| Body text              | `text-zinc-900`                |                                          |
| Muted text             | `text-zinc-500` / `-600`       | Subtitles, blurbs                        |
| Input border           | `border-zinc-300`              |                                          |
| Error surface          | `bg-red-50` + `border-red-200` | Alert                                    |
| Error text             | `text-red-700`                 |                                          |
| Focus ring             | `outline-brand-600`            | 2px, 2px offset                          |

### Contrast (WCAG 2.1 AA)

| Pair                             | Ratio  | Requirement          |
| -------------------------------- | ------ | -------------------- |
| `zinc-900` on `white`            | 17.4:1 | 4.5:1 body text ✅   |
| `zinc-600` on `white`            | 7.0:1  | 4.5:1 body text ✅   |
| `zinc-500` on `white`            | 4.8:1  | 4.5:1 body text ✅   |
| `white` on `brand-600`           | 6.3:1  | 4.5:1 button text ✅ |
| `red-700` on `red-50`            | 7.4:1  | 4.5:1 body text ✅   |
| `brand-600` on `white`           | 6.3:1  | 3:1 focus ring ✅    |
| `brand-700` on `brand-50`        | 8.0:1  | 4.5:1 badge text ✅  |

`zinc-400` is used **only** for placeholder text and the `OR` divider label — never for content
that has to be read.

---

## 2. Typography

Type comes from the root layout's `next/font` variables. No new fonts.

| Element                | Classes                                                     |
| ---------------------- | ----------------------------------------------------------- |
| Login heading          | `text-2xl font-bold tracking-tight`                          |
| Login subtitle         | `text-sm text-zinc-500`                                      |
| Team page heading      | `text-3xl font-bold tracking-tight`                          |
| Team page subtitle     | `text-base text-zinc-500`                                    |
| Member name            | `text-[1.0625rem] font-semibold leading-snug tracking-tight` |
| Role badge             | `text-xs font-semibold`                                      |
| Blurb                  | `text-sm leading-relaxed text-zinc-600`                      |
| Field label            | `text-sm font-medium text-zinc-700`                          |
| Field error            | `text-xs text-red-700`                                       |
| Button label           | `text-sm font-semibold`                                      |

Member name uses one arbitrary value (17px) because 16px reads too close to the blurb and 18px
pushes long names to three lines. If the team prefers no arbitrary values, use `text-base` and
re-check the two-line clamp.

---

## 3. Spacing and layout

Default Tailwind scale only.

- Card padding: `p-6`
- Input padding: `px-3 py-2.5`
- Button padding: `px-4 py-2.5`
- Field group gap: `gap-1.5`, fields stacked `space-y-4`
- Team grid gap: `gap-5`
- Team page container: `max-w-6xl mx-auto px-6 py-10`

### Responsive behaviour

Mobile-first. Breakpoints used: `sm` (640), `lg` (1024).

| Region             | < 640px          | 640–1023px       | ≥ 1024px                          |
| ------------------ | ---------------- | ---------------- | --------------------------------- |
| Login brand panel  | hidden           | hidden           | visible, 50% width                |
| Login form card    | full width, `max-w-sm` centred | same | right half, `max-w-sm` centred |
| Team grid          | 1 column         | 2 columns        | 3 columns                         |

Login page: `grid grid-cols-1 lg:grid-cols-2` with the brand panel `hidden lg:flex`. The panel is
decorative and contains no content or controls, so hiding it below `lg` loses nothing.

Team grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch`.

Verified by rendering: no horizontal overflow at 390px on either page.

---

## 4. Login page

### 4.1 What must not change

The restyle is presentational. Do **not** touch:

- `signInWithEmail` / `signInWithGoogle` from `useAuth`, or anything in `lib/firebase/`
- `loginSchema` in `lib/validations/auth.ts`, or its message strings
- the `useEffect` that redirects an already-authenticated user
- the session cookie route (`app/api/auth/session/route.ts`) or `proxy.ts`
- `react-hook-form` wiring: `register`, `handleSubmit`, `isSubmitting`

Field order, `name` attributes, `autoComplete` values, input `type`s, the Google button, the
`Create one` link and every user-facing string stay exactly as they are today.

### 4.2 Layout

```
┌──────────────────────┬──────────────────────┐
│  brand panel         │   form card          │
│  (hidden lg:flex)    │   max-w-sm           │
│  wordmark            │   ┌────────────────┐ │
│                      │   │ G10 mark       │ │
│  headline            │   │ Sign in        │ │
│  supporting line     │   │ subtitle       │ │
│                      │   │ [alert?]       │ │
│  course footnote     │   │ [Google btn]   │ │
│                      │   │ ── or ──       │ │
│                      │   │ Email          │ │
│                      │   │ Password       │ │
│                      │   │ [Sign in]      │ │
│                      │   │ Create one     │ │
│                      │   └────────────────┘ │
└──────────────────────┴──────────────────────┘
```

The existing `(auth)/layout.tsx` centres a `max-w-sm` column. Keep that constraint; the split is
achieved inside the page or by widening the layout wrapper — implementer's choice, as long as the
form column stays `max-w-sm`.

### 4.3 Input

```
class="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm shadow-sm
       placeholder:text-zinc-400
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
       focus-visible:outline-brand-600
       aria-invalid:border-red-600"
```

### 4.4 Buttons

**Primary (Sign in)**

```
class="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm
       transition-colors hover:bg-brand-700
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
       focus-visible:outline-brand-600
       disabled:cursor-not-allowed disabled:opacity-60"
```

**Secondary (Continue with Google)**

```
class="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-300 bg-white
       px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
       focus-visible:outline-brand-600"
```

**Loading state.** Keep the existing behaviour: the button is `disabled` while `isSubmitting` and
its label swaps to `Signing in…`. Optionally prefix a `<Loader2Icon className="size-4 animate-spin" />`
from `lucide-react` (already a dependency). Do not add a spinner overlay or block the page.

### 4.5 Error presentation (FR-04)

Two levels, visually distinct:

**Form-level — authentication failure.** A restyled inline alert placed between the subtitle and
the Google button:

```
<div role="alert" aria-live="polite"
     class="mb-5 flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-[0.8125rem]
            leading-snug text-red-700">
  <AlertCircleIcon class="size-4 shrink-0 mt-px" aria-hidden="true" />
  <span><strong class="block font-semibold">Sign-in failed</strong>{message}</span>
</div>
```

`{message}` must be the **existing** string produced by the current page — `Invalid email or
password`, or `Please verify your email before signing in.` for the `email-not-verified` branch. The
strings and the branch that chooses between them do not change; only where and how they are
rendered does.

> **Implementation note.** Today those strings go to a `sonner` toast. `docs/DESIGN.md` says to use
> `sonner` for user-facing feedback, but the BA's acceptance criterion asks for "the existing error
> message using updated UI **alert** styling", which a transient toast does not satisfy — it
> disappears, and a keyboard or screen-reader user can miss it entirely. **Recommended:** render the
> inline alert *and* keep the existing `toast.error(...)` call untouched, so no existing behaviour
> is removed and the sprint requirement is met additively. This is the lowest-risk reading; confirm
> with the PM/BA at review.

**Field-level — validation.** Unchanged Zod messages from `loginSchema`, rendered under their input
with `role="alert"`, an icon, `text-xs text-red-700`, and `aria-invalid` + `aria-describedby` on the
input (both already present in the current code — keep them).

Errors never rely on colour alone: every error carries an icon and a text label, and invalid inputs
get a border change as well as a hue change.

### 4.6 Focus (NFR-02)

One rule everywhere:

```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
focus-visible:outline-brand-600
```

`focus-visible` rather than `focus` so keyboard users get the ring and mouse users don't get one on
every click. Tab order is DOM order — no positive `tabindex` anywhere. The brand panel holds no
focusable elements. The current page's `focus:ring-2 focus:ring-zinc-500` is replaced by this; that
is a purely visual change.

### 4.7 Success flow (FR-03)

```
valid credentials → existing signInWithEmail() → existing session cookie → Team Page
```

**Not implemented by the styling task.** The page currently does `router.replace('/dashboard')`, and
`proxy.ts` sends already-authenticated users to `/dashboard` too. Redirecting to the Team Page is
routing logic and is a dependency for the Team Page implementer. See `README.md` § Open dependencies.

---

## 5. Team Page

### 5.1 Page structure

```
<header>  wordmark · Sign out
<main>    h1 "Meet Group 10" + one-line intro
          <ul> grid of member cards </ul>
```

Semantic HTML: `<header>`, `<main>`, `<h1>` once, cards as `<li>` inside a `<ul>` so assistive tech
announces the list and its length, member name as `<h2>`.

### 5.2 Team Member Card

```
class="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
```

Data shape the design assumes:

```ts
type TeamMember = {
  name: string // mandatory, plain text, max 80 chars
  role: 'Project Manager' | 'Business Analyst' | 'UX/UI Designer' | 'Developer' // mandatory
  blurb: string // mandatory, plain text, max 500 chars
  photoUrl?: string // optional
}
```

Vertical order inside the card: avatar → name → role badge → blurb → (Read more).

`h-full` plus `items-stretch` on the grid makes every card in a row match the tallest.

### 5.3 Avatar and the missing-photo case (FR-03)

```
// with photo
<img src={photoUrl} alt="" class="size-16 shrink-0 rounded-full border border-zinc-200 object-cover" />

// without photo — same 64px footprint
<div role="img" aria-label="No profile photo provided"
     class="grid size-16 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700">
  <UserIcon class="size-7" aria-hidden="true" />
</div>
```

The placeholder occupies an identical `size-16` circle, so a missing photo cannot shift anything
below it — card alignment is unchanged, which is exactly what the acceptance criterion asks for.

Photos use `alt=""` because the name is right underneath as text; repeating it in `alt` would make a
screen reader say it twice. `object-cover` means non-square uploads crop rather than distort.

### 5.4 Name — 80 characters, max two lines (FR-04)

```
class="mt-4 mb-2 line-clamp-2 min-h-[calc(2*1.35em)] text-[1.0625rem] font-semibold leading-snug
       tracking-tight [overflow-wrap:anywhere]"
```

Three things working together:

- `line-clamp-2` caps the name at two lines with an ellipsis
- `min-h-[calc(2*1.35em)]` **reserves** two lines of height whether or not the name uses them, so a
  one-line name and a two-line name produce identical card geometry
- `[overflow-wrap:anywhere]` breaks a single unbroken 80-character token instead of overflowing

Add `title={name}` so the full name is available on hover when it is clamped.

### 5.5 Role badge (FR-05)

```
class="self-start inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5
       text-xs font-semibold"
```

| Role             | Classes                                             |
| ---------------- | --------------------------------------------------- |
| Project Manager  | `bg-brand-50 text-brand-700 border-brand-100`        |
| Business Analyst | `bg-emerald-50 text-emerald-700 border-emerald-100`  |
| UX/UI Designer   | `bg-amber-100 text-amber-800 border-amber-200`       |
| Developer        | `bg-blue-50 text-blue-700 border-blue-100`           |

Only these four values are valid. Type the role as a union (above) so an invalid role is a
compile-time error rather than a rendering surprise. The role is always readable as text — colour is
decoration, never the only signal.

### 5.6 Blurb and Read More (FR-06)

- ≤ 250 characters: render as-is, no control.
- 251–500 characters: truncate at **250 characters**, append `…`, then an inline `Read more` button.

Truncate on character count, not CSS line clamp, because the requirement is stated in characters.
The repo already has a helper — `truncate(str, length)` in `frontend/src/lib/utils.ts` — which
slices and appends `…`. Reuse it.

```
<button type="button"
        aria-expanded={expanded}
        aria-controls={`blurb-${id}`}
        class="ml-1 rounded font-semibold text-brand-600 underline underline-offset-2
               hover:text-brand-700
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-brand-600">
  {expanded ? 'Show less' : 'Read more'}
</button>
```

Behaviour:

- Expansion happens **in place** — no modal, no navigation, nothing that moves the reader
- The same control toggles both ways and stays at the end of the text, so focus never jumps
- `aria-expanded` flips, so a screen reader announces the state change without the user losing place
- Only the expanded card grows. Use `items-start` on the grid when any card is expandable so a
  single expanded card does not stretch its whole row; `items-stretch` is also acceptable if the
  team prefers uniform row heights.

State is per-card local component state (`useState`). No data fetching, no URL state.

---

## 6. Accessibility

| Requirement                     | How the design meets it                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| Keyboard reachable (NFR-02)     | Every control is a native `<button>`, `<input>` or `<a>`; no `<div onClick>`         |
| Visible focus (NFR-02)          | One `focus-visible` outline rule, 2px + 2px offset, ≥3:1 contrast, on all controls   |
| Logical tab order               | DOM order; no positive `tabindex`                                                    |
| Not colour-alone                | Errors carry icon + text + border change; roles carry text labels                    |
| Contrast                        | All pairs listed in § 1 meet AA                                                      |
| Labels                          | Every input has `<label htmlFor>`; icon-only controls have `aria-label`              |
| Error association               | `aria-invalid` + `aria-describedby` on inputs; `role="alert"` on messages            |
| Expander semantics              | `aria-expanded` + `aria-controls` on Read more                                       |
| Images                          | Photos `alt=""` (name adjacent); placeholder `role="img"` + `aria-label`             |
| Headings                        | One `<h1>` per page; member names as `<h2>`                                          |

## 7. Browser support (NFR-01)

Targets current Chrome, Safari, Firefox and Edge. Everything used is broadly supported:

- CSS Grid, Flexbox, custom properties — universal
- `:focus-visible` — supported in all four since 2022
- `line-clamp` — the spec includes `-webkit-line-clamp` with `-webkit-box-orient`, which Tailwind's
  `line-clamp-*` emits; this is the standard cross-browser form
- `overflow-wrap: anywhere` — supported in all four
- No `@container`, no `:has()`, no subgrid, no experimental syntax

No JavaScript beyond React state. No animation beyond `transition-colors`, so `prefers-reduced-motion`
needs no special handling.

---

## 8. Implementation handoff notes

**For the developer restyling the login page (styling only):**

1. Add the `--color-brand-*` tokens to `globals.css` under `@theme`.
2. Change only JSX class names and presentational markup in `signin/page.tsx`, plus the wrapper in
   `(auth)/layout.tsx` if the split layout needs it.
3. Do not touch `useAuth`, `lib/firebase/*`, `loginSchema`, `proxy.ts`, or the session route.
4. Keep every existing string, `name`, `autoComplete`, input `type` and the `react-hook-form` wiring.
5. Add the inline error alert; keep the existing `toast.error(...)` calls in place (§ 4.5).
6. Run `pnpm lint`, `pnpm typecheck`, `pnpm test:component` before opening the PR.
7. Verify with the keyboard only: Tab reaches Google button → Email → Password → Sign in → Create
   one, and the focus ring is visible at every stop.

**For the developer implementing the Team Page:**

1. FR-03's redirect to the Team Page is yours, not the styling task's — it needs the route to exist
   first (§ 4.7).
2. Add the new route to `PROTECTED_ROUTES` in `proxy.ts` so it sits behind the session cookie like
   `/dashboard` does.
3. Enforce the field limits in the data layer, not just visually: name ≤ 80, blurb ≤ 500, role from
   the union type. Truncation at 250 is presentation and belongs in the card.
4. Cards must render correctly with a missing `photoUrl`, an 80-character name and a 500-character
   blurb — those three cases are the acceptance criteria, and mockup 05 shows all three together.

**Known open question for the PM/BA at review:** inline alert vs. toast for the sign-in error
(§ 4.5). The recommendation is "both", which removes no existing behaviour.
