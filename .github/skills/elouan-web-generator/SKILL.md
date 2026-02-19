---
name: elouan-web-generator
description: Generates plain HTML, CSS, and JavaScript websites following Elouan's dark-first design system with zero border-radius, flat UI, stone color palette, and strict file organization. Use when creating or scaffolding web projects for Elouan, when asked to generate static sites with his design preferences, when user asks to create a website/web page/web project, when user requests a static site or front-end project, when user mentions generating HTML/CSS/JS, or when user references Elouan's design system or style preferences.
license: MIT
metadata:
  author: elouangrimm
  version: "1.0.0"
---

# Elouan Web Generator

Generate production-ready static websites using Elouan's design system: dark-first aesthetic, zero border-radius, flat UI, stone neutral palette, and minimal motion.

## Core principles

1. **Dark-first**: Near-black backgrounds (`--stone-950`), light stone text
2. **Zero border-radius**: Sharp corners on all elements
3. **Flat UI**: No gradients, no shadows (except tooltips/modals)
4. **Minimal motion**: Transitions 0.15s–0.3s max
5. **Semantic colors**: Always CSS custom properties, never raw hex in rules
6. **Two font stacks**: System sans for body, monospace for headings/code/UI

## Repository structure

Every project uses this flat structure:

```
project-name/
├── index.html
├── style.css
├── script.js
├── page1/
│   └── index.html
├── assets/
│   ├── images/
│   └── fonts/
└── README.md
```

**Rules:**
- Root-level files: `index.html`, `style.css`, `script.js`
- All media/fonts in `assets/` subdirectories
- No build tools, preprocessors, or frameworks by default
- Multi-page projects add additional HTML files at root
- **Deploy target: Vercel** (all projects deployed to Vercel)

## Step-by-step generation

### 1. Create HTML structure

**Format:**
- 4-space indentation (no tabs)
- Zero comments unless documenting complex structure
- Lowercase tags and attributes
- Double quotes for attributes
- One blank line between major sections
- Self-closing tags without trailing slash

**Required meta tags:**

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark">
<meta name="description" content="[Project description for SEO]">
<meta name="author" content="Elouan Grimm">

<meta property="og:title" content="[Project name]">
<meta property="og:description" content="[Project description]">
<meta property="og:type" content="website">
<meta property="og:url" content="[Project URL]">
<meta property="og:image" content="[URL to preview image]"> <!-- Optional but recommended -->

<meta name="twitter:card" content="summary_large_image"> <!-- Optional but recommended -->
<meta name="twitter:title" content="[Project name]">
<meta name="twitter:description" content="[Project description]">
<meta name="twitter:image" content="[URL to preview image]"> <!-- Optional but recommended -->
```

**Favicon:**

Generate a basic SVG favicon and include it:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><!-- code here --></svg>"> <!-- or whatever -->
```

Or create a custom minimal SVG based on project theme (geometric shape, initial letter, etc.) using the stone color palette.

**Complete HTML template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="dark">
    <meta name="description" content="[Project description]">
    <meta name="author" content="Elouan Grimm">
    
    <meta property="og:title" content="[Project name]">
    <meta property="og:description" content="[Project description]">
    <meta property="og:type" content="website">
    
    <meta name="twitter:card" content="summary_large_image">
    
    <title>Project Name</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌐</text></svg>">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Project Name</h1>
    </header>

    <main>
        <section>
            <h2>Section Title</h2>
            <p>Content here.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Elouan Grimm</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### 2. Create CSS with design tokens

Reference the complete design system at [references/style.css](references/style.css) (Elouan's reference stylesheet).

**Organization order:**
1. Design tokens (`:root` variables)
2. Reset (including `border-radius: 0 !important`)
3. Base / body
4. Typography
5. Links
6. Buttons
7. Forms
8. Layout
9. Components
10. Utilities

**Required tokens:**

```css
:root {
    --stone-050: #fafaf9;
    --stone-100: #f5f5f4;
    --stone-200: #e7e5e4;
    --stone-300: #d6d3d1;
    --stone-400: #a8a29e;
    --stone-500: #78716c;
    --stone-600: #57534e;
    --stone-700: #44403c;
    --stone-800: #292524;
    --stone-900: #1c1917;
    --stone-950: #0c0a09;
    
    --blue: #3b82f6;
    --red: #ef4444;
    --green: #22c55e;
    --amber: #f59e0b;
    
    --bg: var(--stone-950);
    --bg-raised: var(--stone-900);
    --bg-surface: var(--stone-800);
    --border: var(--stone-800);
    --border-strong: var(--stone-500);
    --text: var(--stone-200);
    --text-muted: var(--stone-400);
    --text-faint: var(--stone-500);
    --text-bright: var(--stone-100);
    --accent: var(--blue);
    --accent-hover: #5193f8;
    
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-mono: "JetBrains Mono", "SF Mono", "Fira Code", "Roboto Mono", "Cascadia Code", monospace;
    --line-height: 1.6;
    --line-height-tight: 1.2;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 0 !important;
}

body {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    line-height: var(--line-height);
}
```

**Format rules:**
- 4-space indentation
- Zero comments
- One blank line between rule blocks
- Properties in logical order: layout → box model → typography → visual
- Never use raw hex values in rules, only in `:root` token definitions

### 3. Create JavaScript logic

**Organization order:**
1. Constants and configuration
2. DOM element references
3. State variables
4. Helper functions
5. Event listeners
6. Initialization code

**Format:**
- 4-space indentation
- Zero comments
- `const` by default, `let` for reassignment, never `var`
- Arrow functions for callbacks
- Template literals for strings
- Semicolons required
- One blank line between logical sections

**Naming:**
- `camelCase` for variables/functions
- `SCREAMING_SNAKE_CASE` for constants
- Descriptive names, no abbreviations

**Example:**

```javascript
const ANIMATION_DURATION = 300;

const modal = document.querySelector('.overlay');
const openButton = document.querySelector('#open-modal');

let isModalOpen = false;

function toggleModal() {
    isModalOpen = !isModalOpen;
    modal.classList.toggle('active', isModalOpen);
}

openButton.addEventListener('click', toggleModal);

document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
});
```

### 4. Create README

Use this structure:

```markdown
# Project Name

One-sentence description.

## Features

- Feature one
- Feature two
- Feature three

## Usage

Brief instructions.

## Deployment

Deployed on [Vercel](https://vercel.com).

## Tech Stack

- Plain HTML5
- CSS3 (custom properties, no preprocessor)
- Vanilla JavaScript (ES6+)

## Design System

This project uses [Elouan's Design System](https://e5g.dev/css).

## License

MIT
```

## Integration with other skills

You may use the `frontend-design` skill for layout assistance, but:

- Override any conflicting styles with reference stylesheet tokens
- Remove all `border-radius` values or set to `0`
- Flatten any gradients or shadows (except tooltips/modals)
- Replace color schemes with stone scale and accent colors

## Common patterns

For reusable UI component patterns (buttons, modals, etc.) and solutions to common edge cases, see [references/patterns.md](references/patterns.md).

## Validation checklist

Before delivering:

- [ ] All files use 4-space indentation
- [ ] Zero comments in any file
- [ ] CSS uses only custom properties for colors (no raw hex in rules)
- [ ] All elements have `border-radius: 0`
- [ ] Headings use `var(--font-mono)`
- [ ] Body text uses `var(--font-sans)`
- [ ] HTML includes `<meta name="color-scheme" content="dark">`
- [ ] HTML includes complete meta and Open Graph tags
- [ ] HTML includes basic SVG favicon
- [ ] README mentions Vercel deployment
- [ ] Repository matches flat structure

## Reference

Complete design system: [references/style.css](references/style.css)
