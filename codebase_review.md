# Codebase Review — Calorie Counter SPA

**Date:** 2026-09-02
**Scope:** Full manual line-by-line audit of all 18 source files, plus automated gates: `npm audit`, `tsc -b --force`, `oxlint`, production `vite build`, WCAG contrast computation, and dependency version verification.
**Project:** React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + i18next calorie-expenditure calculator (vi/en).

---

## Executive Summary

The application has **no exploitable security vulnerabilities** — the attack surface is tiny by construction (no backend, no network calls, no XSS sinks, zero dependency vulnerabilities). The meaningful findings are:

1. **Defense-in-depth gaps** — no Content-Security-Policy, unguarded `localStorage` access that can white-screen the app, third-party font CDN in a "local-first" app.
2. **One real accessibility bug** — the log-entry delete button is unreachable on touch devices and invisible to keyboard users.
3. **Sub-WCAG-AA muted text color** used for most secondary text.
4. **A neutered type-checker** — `strict` mode is disabled, so the green `tsc` gate is misleading.
5. **Template dead code** shipped to production (unused CSS token bridge, Radix keyframes, unreferenced assets).

Fixing priorities 1–7 (see §7) takes roughly half a day and moves the app from "clean toy" to genuinely production-grade.

---

## 1. Scan Results

| Gate | Command | Result |
|---|---|---|
| Dependency vulnerabilities | `npm audit` | ✅ **0 vulnerabilities** (126 total deps: 43 prod, 34 dev, 69 optional) |
| Type checking | `tsc -b --force` | ✅ passes — **but see A1: `strict` is off, so this checks very little** |
| Linting | `oxlint` | ⚠️ **1 warning** (`ActivityPicker.tsx:44`) |
| Production build | `npm run build` | ✅ `dist/index.html` 1.58 kB, CSS 19.84 kB (4.75 kB gz), JS 276.97 kB (**85.75 kB gz**) |
| XSS / injection surface | manual grep + review | ✅ no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write`, or network calls |
| Dependency freshness | manual check | ✅ React 19.2.8, Vite 8.2.2, TypeScript 6.0.3, i18next 26.4.1, lucide-react 1.39.0 — all current |

**Verified dependency versions (installed):**

| Package | Version | Notes |
|---|---|---|
| react / react-dom | 19.2.8 | Latest major |
| vite | 8.2.2 | Latest major |
| typescript | 6.0.3 | Latest major |
| i18next / react-i18next | 26.4.1 / 17.0.13 | Latest |
| tailwindcss / @tailwindcss/vite | 4.3.3 | v4 engine |
| lucide-react | 1.39.0 | Latest |
| oxlint | 1.79.0 | Latest |

---

## 2. 🔴 High-Impact Issues

### A1 — TypeScript `strict` mode is disabled *(biggest finding)*

**Files:** `tsconfig.app.json`, `tsconfig.node.json`

Neither config sets `"strict": true`. As a result, `noImplicitAny`, `strictNullChecks`, `strictBindCallApply`, `strictFunctionTypes`, and `useUnknownInCatchVariables` are **all disabled**. The `tsc` gate passes precisely because it is not checking much.

This directly explains the defensive casts scattered through `App.tsx`:

```ts
// App.tsx:35, 47, 51 — the compiler can't narrow `number | ''`, so casts paper over it
return weightUnit === 'kg' ? (weight as number) : (weight as number) / 2.20462
return Math.round(met * (weightKg as number) * (durationHours as number))
```

The `number | ''` state pattern (empty input represented as empty string) fights the type system instead of using it.

**Remediation:**
1. Add `"strict": true` (and ideally `"noUncheckedIndexedAccess": true`) to both tsconfigs.
2. Replace `number | ''` state with `number | null`, or keep raw input strings and parse at the boundary with validation.
3. Delete the resulting unnecessary `as` casts.

---

### A2 — Delete button invisible to keyboard & touch users *(WCAG failure)*

**File:** `src/components/LogEntryRow.tsx:46`

```tsx
className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
```

The delete (trash) button is `opacity-0` and only appears on **mouse hover** via the parent's `group-hover`. Consequences:

- **Touch devices have no hover** — mobile users cannot discover how to delete a log entry at all.
- **Keyboard users** tabbing to the button see nothing — there is no `focus-within` fallback, so a focused element is invisible (WCAG 2.1 violations: 1.4.3 Contrast, 2.4.7 Focus Visible).

**Remediation:**

```tsx
className="p-2 rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 transition-all"
```

…or simply always show it — a trash icon is unobtrusive.

---

### A3 — Muted text fails WCAG AA contrast

**File:** `src/index.css:13` (`--text-muted: #8C7C6C`)

Computed contrast ratios (relative luminance per WCAG 2.1):

| Foreground | Background | Ratio | AA normal text (4.5:1) |
|---|---|---|---|
| `#8C7C6C` (muted) | `#2A2118` (card) | **3.92:1** | ❌ FAIL |
| `#8C7C6C` (muted) | `#1C1712` (page) | **4.42:1** | ❌ FAIL |
| `#8C7C6C` (muted) | `#161210` (input) | 4.62:1 | ✅ pass |
| `#8BA888` (matcha) | `#2A2118` (card) | 6.06:1 | ✅ pass |
| `#E8DCC8` (cream) | `#2A2118` (card) | 11.66:1 | ✅ pass |
| `#FFF8EC` (cream) | `#E8442F` (burn card) | 3.75:1 | ⚠️ large text only |

`--text-muted` is used for **form labels, hints, placeholders, and log metadata** — i.e., most secondary text in the app — and it fails AA on both surfaces where it most often appears.

**Remediation:** lighten to approximately `#A08D7A` (≈4.6:1 on card) or restrict the current color to large (≥18pt / 14pt bold) text only.

---

### A4 — Unguarded `localStorage` can crash the app on load

**Files:** `src/i18n/i18n.ts:6`, `src/components/AppHeader.tsx:9`

```ts
// i18n.ts:6 — runs at module scope, before React mounts
const savedLanguage = localStorage.getItem('i18nextLng') || 'vi'
```

In Safari private browsing and contexts where storage is blocked, `localStorage` access **throws `SecurityError`**. Because this runs at module scope, the exception **white-screens the entire application before React ever mounts** — no error boundary can catch it.

Additionally, the stored value is used **unvalidated**: `document.documentElement.lang` (i18n.ts:24) receives whatever arbitrary string is in storage.

**Remediation:**

```ts
function getSavedLanguage(): 'en' | 'vi' {
  try {
    const v = localStorage.getItem('i18nextLng')
    return v === 'en' || v === 'vi' ? v : 'vi'
  } catch {
    return 'vi'
  }
}
```

Apply the same try/catch to `localStorage.setItem` in `AppHeader.tsx:9`.

---

## 3. 🟠 Security & Hardening

The app is currently safe **by luck** (tiny surface), not **by design**. These changes make it safe by construction.

### B1 — No Content-Security-Policy

No CSP exists anywhere. XSS risk is near-zero today, but one careless future component or dependency changes that. **Blocker:** `index.html:28` uses an inline event handler:

```html
<link rel="stylesheet" href="..." media="print" onload="this.media='all'" />
```

Inline `onload` forces `'unsafe-inline'` in `script-src`, gutting the CSP. Move the handler to a small module script (or adopt the Fontsource approach in B3, which removes the pattern entirely), then ship:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'">
```

(Note: `style-src 'unsafe-inline'` remains necessary until B2 is addressed.)

### B2 — Inline styles everywhere (~60 `style={{}}` props)

Beyond being an architecture smell (see §5), pervasive inline styles permanently force `style-src 'unsafe-inline'` in any CSP. Migrating hover/focus states to CSS classes removes both problems at once.

### B3 — Google Fonts CDN (privacy + availability + self-hosting mismatch)

`index.html:15-35` loads Space Grotesk / Space Mono from `fonts.googleapis.com` / `fonts.gstatic.com`:

- Third-party runtime dependency — if Google Fonts is blocked or down, typography degrades.
- No Subresource Integrity is possible for dynamic CSS.
- **Leaks visitor IPs to Google** — directly contradicts the project's stated "self-hosted, local-first" goal (`calorie-app-design-system.md`).

**Remediation:** self-host via Fontsource (version-pinned, offline-friendly, faster — no extra connection):

```bash
npm install @fontsource/space-grotesk @fontsource/space-mono
```

```ts
// main.tsx
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
```

Then delete the preconnect/preload/print-media font block from `index.html` (which also unblocks B1).

### B4 — `Math.random()` for log entry IDs

`App.tsx:76`:

```ts
id: Math.random().toString(36).substring(7)
```

~6 base-36 characters of non-cryptographic randomness — collisions are possible. Not a vulnerability today, but it will bite when the log later persists or syncs. **Remediation:** `id: crypto.randomUUID()`.

### B5 — Missing `Referrer-Policy` / `Permissions-Policy`

One-line defense-in-depth additions to `index.html`:

```html
<meta name="referrer" content="no-referrer" />
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
```

---

## 4. 🟡 Bugs & Correctness

### C1 — Negative inputs accepted → negative calorie burn
**File:** `src/components/DetailsCard.tsx:66, 120`
The `min` attributes on `<input type="number">` do not prevent typing negative values. Entering weight `-50` produces a **negative calorie estimate** in the burn card. Clamp in the change handler or derive with `Math.max(0, ...)`.

### C2 — oxlint warning: expression used for side effects
**File:** `src/components/ActivityPicker.tsx:44`
```ts
next.has(cat) ? next.delete(cat) : next.add(cat)  // eslint(no-unused-expressions)
```
Use a plain `if/else`.

### C3 — Two competing calorie models silently coexist
**Files:** `src/App.tsx:43-52`, `src/data/activities.ts`
Only **38 of 76 activities** have a `met` value; the rest fall back to `calsPerMinutePerLb`. Where both exist, the two models **disagree** — e.g. *Aerobic dancing (low impact)* at 70 kg for 1 hour:
- MET path: `3.5 × 70 × 1` = **245 kcal**
- Legacy path: `0.0383 × 154.3 lb × 60 min` ≈ **355 kcal** (45% higher)

Results across the activity list are therefore not on one consistent scale. **Remediation:** standardize on MET (the Adult Compendium of Physical Activities standard) and backfill the missing 38 values; drop the legacy field.

### C4 — Array index used as React key
**Files:** `src/components/ActivityPicker.tsx:116`, `src/components/CategoryGroup.tsx:100`
`key={i}` on filtered lists defeats reconciliation. `activity.name` is unique and stable — use `key={activity.name}`.

### C5 — Stale documentation comment
**File:** `src/App.tsx:12-15`
The header comment claims the dataset "stores `calsPerMinutePerLb`" as *the* formula; MET is now the primary path. Update or remove.

### C6 — `toLocaleString()` ignores the selected app language
**Files:** `src/components/DailyLog.tsx:35`, `src/components/LogEntryRow.tsx:39`
Number formatting uses the *browser* locale, not the user's vi/en selection. Pass `i18n.language`: `n.toLocaleString(i18n.language)`.

### C7 — Unit-switch edge case
**File:** `src/components/DetailsCard.tsx`
Toggling weight kg→lbs keeps the raw number (70 kg becomes "70 lbs"), silently changing the estimate by 2.2×. Arguably intended, but consider converting the displayed value on unit toggle.

---

## 5. 🟡 Architecture & Code Quality

### D1 — JS-driven hover states (worst pattern in the app)
Five components mutate `e.currentTarget.style` in `onMouseEnter`/`onMouseLeave`: `ActivityButton.tsx:25-36`, `CategoryGroup.tsx:52-59`, `LogEntryRow.tsx:18-25, 48-55`, `CalorieBurnCard.tsx:85-90`, `DetailsCard.tsx:51-52, 99-100` (focus/blur variants).

Problems:
- **No keyboard/touch equivalent** (same class of bug as A2).
- **Fights React's style diffing** — imperatively mutated DOM styles can get "stuck" when props change mid-hover.
- **Untestable and un-themable** — visual states live in JS, not CSS.

Every one of these is a one-line Tailwind `hover:` / `focus-visible:` class. Migrating deletes ~80 lines of JS and simultaneously unblocks the strict CSP (B1/B2).

### D2 — Dead code shipped to production
| Artifact | Location | Status |
|---|---|---|
| `src/App.css` | 1-line comment file | Never imported |
| `public/icons.svg` | 5 KB | Never referenced anywhere |
| HSL token bridge | `index.css:36-55, 61-95` | Copied from a shadcn template; no component uses `bg-card`, `text-muted-foreground`, etc. |
| Radix accordion keyframes | `index.css:85-94` | Reference `--radix-accordion-content-height`, which does not exist in this project |
| Duplicate universal border rules | `index.css:101-111` | `border-color` set twice with **two different colors** (`var(--border-color)` then `@apply border-border`) |

### D3 — Design-system drift
- Doc (`calorie-app-design-system.md`) specifies `--accent-passionfruit: #F0455C`; CSS has `#E8442F`.
- Doc states the target is "Angular/TypeScript"; the app is React.
- `README.md` doesn't mention i18n, the lint script, or the design system.

### D4 — Hand-maintained category list
`src/data/activities.ts:102-112` — `ACTIVITY_CATEGORIES` is maintained separately from the data. Adding a category to the data without updating the list makes it **silently vanish** from the browse view. Derive it instead:

```ts
export const ACTIVITY_CATEGORIES = [...new Set(activities.map(a => a.category))]
```

### D5 — `number | ''` state + 8 `as` casts
Encode emptiness as `null` or parse at the input boundary. The current pattern defeated the type system into casts (see A1).

### D6 — No error boundary
Any render throw = white screen. A ~15-line `ErrorBoundary` class wrapped around `<App />` in `main.tsx` fixes that.

### D7 — Housekeeping
- `package.json` name is still `"temp_app"`.
- `main.tsx:7` uses a non-null assertion on `#root` — standard, but a one-line guard produces a meaningful error instead of `Cannot read properties of null`.
- **No tests, no CI.** The calorie math and unit conversion are pure functions — ideal Vitest targets, and the exact logic that must never regress. (This is also the real "Stryker gap": with zero tests, mutation coverage is 0% by definition.)

---

## 6. 🟢 What's Genuinely Good

- **Zero dependency vulnerabilities**; every dependency current (React 19.2, Vite 8, TS 6).
- **No XSS sinks** — all user input rendered through React text interpolation; no `dangerouslySetInnerHTML`, `eval`, or network calls.
- **i18n properly wired** — `<html lang>` sync, fallback language, and `escapeValue: false` is *correct* for React (React already escapes).
- **Good semantics** — `header`/`main` landmarks, `aria-expanded`/`aria-pressed` present, labeled inputs, `aria-label`s on icon buttons.
- **Font loading** is properly non-render-blocking with a `<noscript>` fallback.
- **Clean component decomposition**; `useMemo` on the expensive derivations; `StrictMode` enabled.
- Sensible bundle: **85.75 kB gzipped** JS.

---

## 7. 📋 Prioritized Fix List (impact ÷ effort)

| Pri | Fix | Files | Effort |
|---|---|---|---|
| 1 | `"strict": true` in both tsconfigs + fix fallout | `tsconfig.app.json`, `tsconfig.node.json`, `App.tsx`, `DetailsCard.tsx` | ~30 min |
| 2 | Delete-button visibility (`group-focus-within` / always visible) | `LogEntryRow.tsx:46` | 2 min |
| 3 | try/catch + whitelist on `localStorage` | `i18n.ts:6`, `AppHeader.tsx:9` | 10 min |
| 4 | Lighten `--text-muted` to ≥4.5:1 (≈`#A08D7A`) | `index.css:13` | 1 min |
| 5 | Replace JS hover/focus handlers with Tailwind `hover:`/`focus-visible:` classes | 5 components | ~1 h, deletes ~80 lines |
| 6 | Clamp negative numbers; `crypto.randomUUID()`; `key={name}`; if/else in `toggleCategory` | `DetailsCard.tsx`, `App.tsx`, `ActivityPicker.tsx`, `CategoryGroup.tsx` | 20 min |
| 7 | Delete dead code (App.css, icons.svg, HSL token bridge, radix keyframes, duplicate border rule) | `index.css`, `public/`, `src/` | 15 min |
| 8 | Self-host fonts via Fontsource → enables strict CSP meta (`default-src 'self'`) + `Referrer-Policy` | `index.html`, `main.tsx` | 30 min |
| 9 | Unify on MET-only data model (backfill 38 missing values) | `activities.ts`, `App.tsx` | data work |
| 10 | Vitest for calc/conversion logic + ErrorBoundary + CI (lint + typecheck + test + build) | new | half day |

---

## 8. Bottom Line

No exploitable vulnerabilities — the attack surface is tiny by construction. The real findings are **defense-in-depth gaps** (no CSP, unguarded storage), **one mobile/keyboard-breaking accessibility bug**, **a sub-AA text color**, **a type-checker that's been neutered**, and **a pile of template dead code**. Priorities 1–7 are all small, safe, and independently verifiable; together they take the app from "clean toy" to production-grade.
