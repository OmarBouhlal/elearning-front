# E-Learning App - Global Style Guide

## Design Philosophy
Modern, clean, and learner-focused interface that promotes engagement and reduces cognitive load. The design emphasizes clarity, accessibility, and a seamless learning experience.

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#3B82F6` - Main interactive elements, CTAs, links
- **Primary Dark**: `#1E40AF` - Hover states, emphasis
- **Primary Light**: `#DBEAFE` - Backgrounds, highlights

### Secondary Colors
- **Accent Purple**: `#8B5CF6` - Progress indicators, achievements
- **Success Green**: `#10B981` - Completion states, positive feedback
- **Warning Orange**: `#F59E0B` - Alerts, important notices
- **Error Red**: `#EF4444` - Errors, critical actions

### Neutral Colors
- **Text Primary**: `#111827` - Main text content
- **Text Secondary**: `#6B7280` - Supporting text, metadata
- **Border**: `#E5E7EB` - Dividers, card borders
- **Background**: `#F9FAFB` - Page background
- **Surface**: `#FFFFFF` - Cards, panels, modals

---

## Typography

### Font Family
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Monospace** (for code): 'Fira Code', monospace

### Font Sizes
- **Display**: `2.5rem` (40px) - Hero headings
- **H1**: `2rem` (32px) - Page titles
- **H2**: `1.5rem` (24px) - Section headings
- **H3**: `1.25rem` (20px) - Subsection headings
- **Body**: `1rem` (16px) - Regular text
- **Small**: `0.875rem` (14px) - Captions, metadata
- **Tiny**: `0.75rem` (12px) - Labels, tags

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

### Line Heights
- **Tight**: 1.25 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.75 - Long-form content

---

## Spacing System
Use consistent spacing based on 4px increments:
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

---

## Components

### Buttons
- **Primary Button**: Blue background (`#3B82F6`), white text, rounded corners (`0.5rem`), padding (`0.75rem 1.5rem`)
- **Secondary Button**: White background, blue border, blue text
- **Ghost Button**: Transparent background, hover with light blue background
- **Disabled State**: 50% opacity, no pointer events

### Cards
- **Style**: White background, subtle shadow (`0 1px 3px rgba(0,0,0,0.1)`), rounded corners (`0.75rem`)
- **Padding**: `1.5rem` (24px)
- **Hover State**: Slightly elevated shadow (`0 4px 6px rgba(0,0,0,0.1)`)

### Input Fields
- **Border**: `1px solid #E5E7EB`
- **Rounded**: `0.5rem` (8px)
- **Padding**: `0.75rem` (12px)
- **Focus State**: Blue border (`#3B82F6`), subtle shadow
- **Error State**: Red border (`#EF4444`)

### Progress Bars
- **Background**: Light gray (`#E5E7EB`)
- **Fill**: Purple gradient (`#8B5CF6` to `#3B82F6`)
- **Height**: `0.5rem` (8px)
- **Rounded**: Full rounded (`9999px`)

### Badges & Tags
- **Padding**: `0.25rem 0.75rem`
- **Rounded**: `9999px` (fully rounded)
- **Font Size**: `0.75rem` (12px)
- **Variants**: Different background colors based on type (info, success, warning, error)

---

## Layout Patterns

### Container
- **Max Width**: `1280px`
- **Padding**: `1rem` on mobile, `2rem` on desktop
- **Centered**: Horizontally centered on page

### Grid System
- **Desktop**: 12-column grid with `1.5rem` gap
- **Tablet**: 8-column grid with `1rem` gap
- **Mobile**: Single column with `1rem` gap

### Navigation
- **Top Navigation**: Fixed/sticky header, white background, shadow on scroll
- **Sidebar**: `280px` width on desktop, collapsible on mobile
- **Height**: `4rem` (64px)

---

## Interactive States

### Hover
- Slight scale increase (`scale(1.02)`) for cards
- Color darkening for buttons
- Subtle shadow enhancement

### Active/Pressed
- Slight scale decrease (`scale(0.98)`)
- Darker color variant

### Focus
- Blue outline ring (`#3B82F6`, 2px)
- Offset by 2px from element

### Disabled
- 50% opacity
- Cursor set to `not-allowed`
- No hover effects

---

## Animation & Transitions

### Duration
- **Fast**: `150ms` - Hover states, small interactions
- **Normal**: `300ms` - Page transitions, modals
- **Slow**: `500ms` - Complex animations

### Easing
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth, natural feel
- **In**: `cubic-bezier(0.4, 0, 1, 1)` - Accelerating
- **Out**: `cubic-bezier(0, 0, 0.2, 1)` - Decelerating

---

## Icons
- **Library**: Lucide React (consistent, modern icon set)
- **Size**: `1rem` (16px) for inline, `1.5rem` (24px) for standalone
- **Stroke Width**: 2px
- **Color**: Inherit from parent or use text secondary color

---

## Accessibility

### Contrast Ratios
- Body text: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

### Focus Indicators
- Always visible for keyboard navigation
- Clear distinction from non-focused state

### ARIA Labels
- Descriptive labels for all interactive elements
- Proper heading hierarchy (H1 → H2 → H3)

---

## Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

---

## Special Components for E-Learning

### Course Cards
- Thumbnail image at top (16:9 ratio)
- Progress bar at bottom
- Duration and difficulty badges
- Clear title and instructor name

### Lesson Navigation
- Sequential step indicator
- Previous/Next buttons consistently placed
- Progress percentage visible


### Video Player
- Custom controls matching app theme
- Progress bar with chapter markers
- Speed control and transcript toggle

---

## Dark Mode (Optional Future Enhancement)
Reserve complementary dark color palette:
- Background: `#111827`
- Surface: `#1F2937`
- Text: `#F9FAFB`
- Borders: `#374151`

---

## Implementation Notes
- Use Tailwind CSS utility classes where possible for consistency
- Create reusable component classes for common patterns
- Maintain this style guide as single source of truth
- All agents should reference this file before creating new pages or components