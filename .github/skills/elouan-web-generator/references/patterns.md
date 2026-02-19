# Common UI Patterns

This file contains reusable patterns for common UI components using Elouan's design system.

## Button Variants

**Primary button:**

```css
button {
    padding: 12px 24px;
    background-color: var(--accent);
    color: var(--stone-050);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}
```

**Secondary button:**

```css
.btn-secondary {
    background-color: var(--bg-surface);
    color: var(--text);
}
```

**Danger/Destructive button:**

```css
.btn-danger {
    background-color: transparent;
    color: var(--text-faint);
    border: 1px solid var(--border);
}

.btn-danger:hover {
    color: var(--danger);
    border-color: var(--danger);
    background-color: rgba(239, 68, 68, 0.08);
}
```

## Modal Overlay

**Overlay backdrop with centered panel:**

```css
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
}

.overlay.active {
    opacity: 1;
    visibility: visible;
}

.panel {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    padding: 28px 32px;
    min-width: 380px;
    max-width: 480px;
}
```

## Edge Cases & Solutions

**Zero border-radius breaking layout:**

- Adjust padding/margin instead
- Use subtle borders to define edges

**Monospace headings too large:**

- Reduce font-size by 0.1–0.2em
- Tighten line-height

**Colors from other sources:**

- Map to nearest stone scale value
- Use custom property, never raw hex
