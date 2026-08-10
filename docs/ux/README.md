# UX — Week 3–4 Mock Sprint

Design artifacts for the Mock Sprint feature: **restyled login → successful authentication → Team
Page**.

- **Owner:** Viet Tran Anh (Vince) — UX/UI Designer, Group 10
- **Planner task:** `[BOOTSTRAP RESTYLING] Design Login Style & Team Page Layout :120`
- **Status:** ready for review (not yet PM-approved)

---

## Purpose

Give the team a real, inspectable visual design to review and sign off **before** anyone writes
production code, and give the implementing developer a spec precise enough that implementation is
translation rather than invention.

## Scope

**In scope**

- Visual design of the existing login page (`frontend/src/app/(auth)/auth/signin/page.tsx`)
- Layout and card design for a Team Page that does not exist yet
- Error, focus, responsive and edge-case states
- An implementation spec expressed in this repo's existing Tailwind v4 conventions

**Out of scope — deliberately not designed or built here**

- Any change to authentication, session, cookie or validation logic
- Team Page routing, data model, member data source, or backend work
- The post-login redirect change described in FR-03 (see _Open dependencies_ below)
- Sign-up, password reset, dashboard, or any other existing screen

## Requirements this design implements

Source: `context/Mock Sprint Requirements.pdf` (BA: Viet Nguyen), Group 10 Mock Sprint.

| ID                       | Requirement                                                   | Where it is covered                              |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------ |
| Login FR-01              | Session/cookie behaviour unchanged                             | Design is presentational only — see design-spec  |
| Login FR-02              | Authentication logic unchanged                                 | Design is presentational only — see design-spec  |
| Login FR-03              | Successful login lands on the Team Page                        | Flow designed; implementation is a dependency    |
| Login FR-04              | Invalid credentials show the existing message, restyled        | Mockup 02                                        |
| Team FR-01               | Cards show Name, Photo, Role, Blurb                            | Mockups 04, 05, 06                               |
| Team FR-02               | Name, Role, Blurb mandatory                                    | design-spec § Team Member Card                   |
| Team FR-03               | Photo optional                                                 | Mockup 05 (placeholder avatar)                   |
| Team FR-04               | Name plain text, max 80 characters                             | Mockup 05 (72-char name), design-spec            |
| Team FR-05               | Role limited to PM / BA / UX-UI / Developer                    | Mockups 04, 05, design-spec § Role badge         |
| Team FR-06               | Blurb plain text, max 500 characters                           | Mockups 05, 06, design-spec § Blurb              |
| NFR-01                   | Consistent across Chrome, Safari, Firefox, Edge                | design-spec § Browser support                    |
| NFR-02                   | Keyboard reachable, visible focus indicators                   | Mockups 03, 06, design-spec § Accessibility      |

## Screens and states covered

| #   | State                                     | File                                        |
| --- | ----------------------------------------- | ------------------------------------------- |
| 01  | Login — default                           | `mockups/01-login-default.html`             |
| 02  | Login — invalid credentials               | `mockups/02-login-error.html`               |
| 03  | Login — keyboard focus and tab order      | `mockups/03-login-focus.html`               |
| 04  | Team page — normal cards, all four roles  | `mockups/04-team-default.html`              |
| 05  | Team page — missing photo                 | `mockups/05-team-edge-cases.html` (card 1)  |
| 06  | Team page — long blurb, collapsed         | `mockups/05-team-edge-cases.html` (card 2)  |
| 07  | Team page — long blurb, expanded          | `mockups/06-team-blurb-expanded.html`       |
| 08  | Team page — long name, two-line wrap      | `mockups/05-team-edge-cases.html` (card 3)  |

Rendered PNGs of every frame, plus 390px-wide mobile captures of the login and team page, are in
`mockups/screenshots/`.

## How to review these

There is **no Figma file** for this sprint. The mockups are static HTML + one plain CSS file, with
no build step, no JavaScript and no dependencies:

```bash
open docs/ux/mockups/index.html
```

Or, if your browser blocks local file loads:

```bash
cd docs/ux/mockups && python3 -m http.server 8777
# then open http://localhost:8777/
```

The frames are **design artifacts, not application code**. Nothing in `docs/ux/` is imported by the
Next.js app, and `prototype.css` is never loaded by it. Every value in `prototype.css` maps to a
Tailwind v4 token documented in [`design-spec.md`](./design-spec.md), which is what the implementer
should actually work from.

Each frame carries its own design notes in a band at the bottom explaining the decisions in it.

## Open dependencies for the team

1. **FR-03 redirect.** The login page currently redirects to `/dashboard`
   (`signin/page.tsx`, and again in `proxy.ts` for already-authenticated users). There is no `/team`
   route in the repo. Changing that redirect is routing logic, not styling, so it is **not** part of
   the UX restyling task — it belongs to whoever owns the Team Page implementation task.
2. **Team member data.** The cards are designed against a shape of
   `{ name, photoUrl?, role, blurb }`. Where that data lives (hard-coded array, Firestore
   collection, etc.) is the developer's call and is not decided here.
3. **Real member details.** Names, photos and blurbs in the mockups are placeholders.

## Related documents

- `context/Mock Sprint Requirements.pdf` — BA requirements (source of truth for this design)
- `docs/DESIGN.md` — the boilerplate's existing design system, which this design extends
- `docs/GIT-WORKFLOW.md` — branch and commit conventions
