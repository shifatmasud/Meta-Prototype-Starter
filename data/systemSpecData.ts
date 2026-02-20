export interface SpecItem {
  title: string;
  rules: (string | { subtitle: string; items: string[] })[];
}

export const systemSpecData: SpecItem[] = [
  {
    title: 'Core Rules',
    rules: [
      'Hide complexity until desired.',
      'Write Compact Helpful copy (max 3 lines, 40–80 chars per line, EL5 mode).',
      'One primary focus at a time.',
      'Design Mobile-first always (max width: 400px, max height: 600px).',
      'Prioritize Stability > Performance > Usability > Aesthetic.',
    ],
  },
  {
    title: 'Execution Rules',
    rules: [
      'Before any task, generate:',
      {
        subtitle: '',
        items: [
          'Summary (≤5 lines in chat & README.MD)',
          'Architecture (IPO)',
          'Action List (Ordered)',
        ],
      },
    ],
  },
  {
    title: 'Engineering Rules',
    rules: [
      'No Tailwind. Use JS style object.',
      'No CSS keyframes. Use Framer Motion.',
      'GSAP only for Three.js & external timelines.',
      'Mobile gestures replace hover (touch drag = mouse move).',
      'No native OS UI components. Use custom components.',
      'Modular Components folder structure: Core → Package → Section → Page → App.',
      'Reactive Architecture: [Realtime API] & Events → FSM → Event Bus → Store → Observer → Renderer',
    ],
  },
  {
    title: 'Design Rules',
    rules: [
      { subtitle: 'Typography', items: ['Bebas Neue (hero)', 'Inter (body)', 'Victor Mono (data)', 'Comic Neue (quotes)'] },
      { subtitle: 'Iconography', items: ['Phosphor Icons'] },
      { subtitle: 'Tokens', items: ['Use semantic format: Category.Purpose.Context.Level', 'Surface = background', 'Content = text/icon', 'Never use literal values.'] },
      { subtitle: 'Motion', items: ['Base = 100ms', 'Default = 300ms', 'Scale multiplicatively.'] },
      { subtitle: 'Grid', items: ['4pt base system.'] },
      { subtitle: 'Interaction States', items: ['Use state-layer & ripple-layer overlay. Do not change parent fill.'] },
    ],
  },
  {
    title: 'Documentation Rules',
    rules: [
      'Must generate:',
      {
        subtitle: '',
        items: [
          'README.md',
          'noteBook.md',
          'bugReport.md',
        ],
      },
      'Never overwrite previous entries.',
    ],
  },
];

export const systemSpecMarkdown = `
# System Spec

## Core Rules
- Hide complexity until desired.
- Write Compact Helpful copy (max 3 lines, 40–80 chars per line, EL5 mode).
- One primary focus at a time.
- Design Mobile-first always (max width: 400px, max height: 600px).
- Prioritize Stability > Performance > Usability > Aesthetic.

## Execution Rules
- Before any task, generate:
  - Summary (≤5 lines in chat & README.MD)
  - Architecture (IPO)
  - Action List (Ordered)

## Engineering Rules
- No Tailwind. Use JS style object.
- No CSS keyframes. Use Framer Motion.
- GSAP only for Three.js & external timelines.
- Mobile gestures replace hover (touch drag = mouse move).
- No native OS UI components. Use custom components.
- Modular Components folder structure: Core → Package → Section → Page → App.
- Reactive Architecture: [Realtime API] & Events → FSM → Event Bus → Store → Observer → Renderer

## Design Rules

### Typography
- Bebas Neue (hero)
- Inter (body)
- Victor Mono (data)
- Comic Neue (quotes)

### Iconography
- Phosphor Icons

### Tokens
- Use semantic format: Category.Purpose.Context.Level
- Surface = background
- Content = text/icon
- Never use literal values.

### Motion
- Base = 100ms
- Default = 300ms
- Scale multiplicatively.

### Grid
- 4pt base system.

### Interaction States
- Use state-layer & ripple-layer overlay. Do not change parent fill.

## Documentation Rules
- Must generate:
  - README.md
  - noteBook.md
  - bugReport.md
- Never overwrite previous entries.
`;
