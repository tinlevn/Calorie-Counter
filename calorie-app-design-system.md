# Calorie Tracker App — Design System

**Theme:** Dark, earthy, mocha/hojicha/matcha with mango & passionfruit pop accents  
**Inspiration:** Monkeytype minimal theming, tropical fruit palette  
**Target:** Self-hosted, local-first web app (Angular/TypeScript)

---

## 1. Color Palette

### Base Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--bg-color` | Espresso Black | `#1C1712` | Page background, root container |
| `--bg-elevated` | Dark Mocha | `#2A2118` | Cards, panels, modals, elevated surfaces |
| `--text-primary` | Warm Cream | `#E8DCC8` | Body text, headings, primary labels |
| `--text-muted` | Taupe Gray | `#8C7C6C` | Secondary labels, placeholders, captions |

### Accent Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--accent-matcha` | Matcha Green | `#8BA888` | Progress rings (under goal), success states, navigation active |
| `--accent-hojicha` | Hojicha Brown | `#A87C5D` | Badges, streaks, secondary highlights |
| `--accent-mango` | Mango Yellow | `#FDBE02` | Primary CTA, goal hit, celebration states |
| `--accent-passionfruit` | Passionfruit Red | `#F0455C` | Alerts, over-budget warnings, destructive actions |

### Derived Colors (Optional)

```css
--border-color: rgba(232, 220, 200, 0.12);
--shadow-color: rgba(0, 0, 0, 0.4);
--overlay-color: rgba(28, 23, 18, 0.72);
```

---

## 2. Typography

### Font Stack

- **Primary UI Font:** Inter (variable weight, 400/500/600)
- **Numeric/Macro Display:** IBM Plex Mono (or Inter with `font-variant-numeric: tabular-nums`)
- **Fallback:** `system-ui, -apple-system, Segoe UI, Roboto, sans-serif`

### Font Loading

Self-host fonts via `@font-face` (no external CDN):

```css
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
}

@font-face {
  font-family: 'IBM Plex Mono';
  font-display: swap;
  src: url('/fonts/IBMPlexMono-Regular.woff2') format('woff2');
}
```

### Type Scale

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| H1 | Inter | 28px | 600 | 1.3 |
| H2 | Inter | 22px | 600 | 1.35 |
| H3 | Inter | 18px | 500 | 1.4 |
| Body | Inter | 15px | 400 | 1.5 |
| Caption | Inter | 13px | 400 | 1.5 |
| Numeric (macros, calories) | IBM Plex Mono | 15px | 500 | 1.5 |
| Button | Inter | 15px | 500 | 1.4 |

---

## 3. CSS Variables (Root)

```css
:root {
  /* Base */
  --bg-color: #1C1712;
  --bg-elevated: #2A2118;
  --text-primary: #E8DCC8;
  --text-muted: #8C7C6C;

  /* Accents */
  --accent-matcha: #8BA888;
  --accent-hojicha: #A87C5D;
  --accent-mango: #FDBE02;
  --accent-passionfruit: #F0455C;

  /* Derived */
  --border-color: rgba(232, 220, 200, 0.12);
  --shadow-color: rgba(0, 0, 0, 0.4);
  --overlay-color: rgba(28, 23, 18, 0.72);

  /* Typography */
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', 'Fira Code', monospace;
}
```

---

## 4. Component Styles

### Buttons

**Primary CTA (Mango)**

```css
.btn-primary {
  background: var(--accent-mango);
  color: #1C1712; /* Espresso for contrast */
  font-family: var(--font-ui);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  filter: brightness(1.08);
}
```

**Secondary (Matcha)**

```css
.btn-secondary {
  background: var(--accent-matcha);
  color: #1C1712;
  font-family: var(--font-ui);
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
```

**Tertiary (Outline)**

```css
.btn-tertiary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  font-family: var(--font-ui);
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-tertiary:hover {
  border-color: var(--accent-hojicha);
}
```

**Destructive (Passionfruit)**

```css
.btn-destructive {
  background: var(--accent-passionfruit);
  color: #ffffff;
  font-family: var(--font-ui);
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
```

### Cards / Panels

```css
.card {
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px var(--shadow-color);
}
```

### Progress Rings / Bars

**Under Goal (Matcha)**

```css
.progress-under {
  stroke: var(--accent-matcha);
  fill: none;
}
```

**At Goal (Mango)**

```css
.progress-at-goal {
  stroke: var(--accent-mango);
  fill: none;
}
```

**Over Goal (Passionfruit)**

```css
.progress-over {
  stroke: var(--accent-passionfruit);
  fill: none;
}
```

### Badges

**Streak Badge (Hojicha)**

```css
.badge-hojicha {
  background: var(--accent-hojicha);
  color: #1C1712;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
}
```

**Alert Badge (Passionfruit)**

```css
.badge-alert {
  background: var(--accent-passionfruit);
  color: #ffffff;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
}
```

### Input Fields

```css
.input {
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 15px;
  padding: 10px 14px;
  border-radius: 8px;
  outline: none;
}

.input:focus {
  border-color: var(--accent-matcha);
}

.input::placeholder {
  color: var(--text-muted);
}
```

### Numeric Display (Macros, Calories)

```css
.numeric {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  color: var(--text-primary);
}
```

---

## 5. Layout & Spacing

### Spacing Scale

Use a 4px base unit:

- `4px` — tight spacing (icon margins)
- `8px` — small gaps (inline elements)
- `12px` — standard padding
- `16px` — card padding
- `24px` — section spacing
- `32px` — large gaps

### Border Radius

- Small: `6px` (inputs, small buttons)
- Medium: `8px` (buttons, badges)
- Large: `12px` (cards, panels)
- Full: `999px` (pills, avatars)

---

## 6. Usage Guidelines

### Color Usage Rules

1. **Mango (`#FDBE02`)** — Use sparingly for:
   - Primary CTA buttons ("Log Meal", "Add Entry")
   - Goal hit celebrations
   - Milestone achievements
   - Do NOT use for static text or backgrounds

2. **Passionfruit (`#F0455C`)** — Use only for:
   - Over-budget warnings
   - Destructive actions (delete, remove)
   - Critical alerts
   - Do NOT use for decorative elements

3. **Matcha (`#8BA888`)** — Use for:
   - Progress indicators (under goal)
   - Success states
   - Navigation active states
   - Secondary buttons

4. **Hojicha (`#A87C5D`)** — Use for:
   - Streak badges
   - Secondary highlights
   - Non-critical info badges

5. **Backgrounds** — Never use pure black (`#000000`). Always use `--bg-color` or `--bg-elevated`.

### Typography Rules

1. Use **Inter** for all UI text, headings, buttons, and labels.
2. Use **IBM Plex Mono** (or Inter with `tabular-nums`) for:
   - Calorie counts
   - Macro breakdowns (protein, carbs, fat)
   - Weight entries
   - Any tabular numeric data
3. Maintain minimum font size of `13px` for readability.
4. Never use font weights lighter than 400 on dark backgrounds.

### Contrast & Accessibility

- Ensure minimum contrast ratio of **4.5:1** for text on backgrounds.
- Mango text on espresso background: `#FDBE02` on `#1C1712` = high contrast ✅
- Passionfruit text on espresso: `#F0455C` on `#1C1712` = high contrast ✅
- Matcha/Hojicha should be used on dark backgrounds, not as text colors on light surfaces.

---

## 7. Example Component Markup

### Calorie Progress Card

```html
<div class="card">
  <h2 class="numeric">1,842 / 2,200 kcal</h2>
  <svg class="progress-ring">
    <circle class="progress-under" r="40" cx="50" cy="50" />
  </svg>
  <div class="badge-hojicha">5-day streak</div>
</div>
```

### Over-Budget Alert

```html
<div class="card" style="border-color: var(--accent-passionfruit);">
  <h3 style="color: var(--accent-passionfruit);">Over Budget</h3>
  <p class="numeric">2,450 / 2,200 kcal</p>
  <button class="btn-destructive">Adjust Log</button>
</div>
```

### Primary CTA

```html
<button class="btn-primary">+ Log Meal</button>
```

---

## 8. Dark Mode Considerations

This design system is **dark-first**. If light mode is ever added:

- Invert backgrounds to warm off-whites (`#F5F0E8`)
- Use espresso (`#1C1712`) for text
- Keep mango and passionfruit as accents
- Reduce matcha/hojicha saturation slightly for light backgrounds

---

## 9. Implementation Checklist

- [ ] Self-host Inter and IBM Plex Mono fonts
- [ ] Define CSS variables in `styles.scss` or `global.css`
- [ ] Create button component variants (primary, secondary, tertiary, destructive)
- [ ] Build card component with proper elevation
- [ ] Implement progress ring with dynamic color switching (matcha → mango → passionfruit)
- [ ] Add numeric display class with tabular figures
- [ ] Test contrast ratios for all text/background combinations
- [ ] Ensure all inputs and focus states use accent colors appropriately

---

## 10. Color Reference Quick Copy

```css
/* Base */
--bg-color: #1C1712;
--bg-elevated: #2A2118;
--text-primary: #E8DCC8;
--text-muted: #8C7C6C;

/* Accents */
--accent-matcha: #8BA888;
--accent-hojicha: #A87C5D;
--accent-mango: #FDBE02;
--accent-passionfruit: #F0455C;
```

---

**Design Philosophy:**  
Keep it minimal, let the data breathe, use color as signal not decoration. The mocha/hojicha/matcha base creates a calm, earthy foundation — mango and passionfruit are your "traffic lights" for action and alert states.