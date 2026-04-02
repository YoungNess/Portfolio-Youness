# Portfolio Redesign — Spec Design
**Date:** 2026-04-02
**Projet:** magic-portfolio-for-next-js
**Stack:** Next.js 16, React 19, TypeScript, Once UI System, Framer Motion (à ajouter)

---

## Contexte

Le portfolio de Youness Eddabachi (Développeur Web / Product Designer) est actuellement basé sur le template Magic Portfolio avec un thème cyan/sombre. L'objectif est une refonte complète pour :
- Coller au mood éditorial rétro-moderne du CV (beige, noir, bordeaux)
- Ajouter une immersion totale via animations (curseur custom, grain, page transitions, scroll reveals)
- Cibler des clients freelance : WOW effect, créativité avant tout

---

## Section 1 — Palette & Design Tokens

### Couleurs

| Rôle | Token Once UI | Valeur | Usage |
|---|---|---|---|
| Background | `neutral-background` | `#F2E4C4` | Fond principal |
| Surface | `neutral-surface` | `#EDD8A8` | Cards, sections |
| Brand accent | `brand` | `#8B1A1A` | Boutons, liens, highlights |
| Accent secondaire | `accent` | `#1A1A1A` | Bordures, icônes |
| Texte principal | `neutral-strong` | `#111111` | Corps de texte |
| Texte faible | `neutral-weak` | `#5C4A2A` | Dates, labels, meta |

### Thème
- Mode forcé : **light uniquement** (le fond crème ne fonctionne qu'en clair)
- Désactiver le ThemeToggle ou proposer une variante sombre éditorial (`#1A1A1A` + crème + bordeaux) en v2
- Modifier `once-ui.config.ts` : `theme: "light"`, supprimer les options dark

### Typographie
- Police conservée : **Geist** (headings + body)
- Titres `h1`, `h2` : `text-transform: uppercase`, `letter-spacing: 0.05em à 0.1em`, `font-weight: 800`
- Style éditorial affirmé, fidèle au CV

### Bordures
- `style: "conservative"` → `"sharp"` dans `once-ui.config.ts` (coins carrés, 0 border-radius)

---

## Section 2 — Animations & Interactions

### Dépendance à ajouter
```bash
npm install framer-motion
```

### 2.1 Curseur Custom
- **Fichier :** `src/components/CustomCursor.tsx` (nouveau, `"use client"`)
- Remplace le curseur natif via `cursor: none` sur `body`
- Cercle bordeaux `#8B1A1A`, diamètre 12px, avec un follower plus grand (40px) qui suit avec lag (`lerp` sur `requestAnimationFrame`)
- Au survol d'un `a`, `button` : follower grossit à 60px + mix-blend-mode `difference`
- Ajouté dans `src/app/layout.tsx`

### 2.2 Grain Texture Overlay
- **Fichier :** `src/components/GrainOverlay.tsx` (nouveau, `"use client"`)
- SVG `feTurbulence` noise en `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 9999`
- Opacité : `0.04` — subtil, effet "papier imprimé"
- Animation CSS : le noise se déplace légèrement en continu (`@keyframes grain`)
- Ajouté dans `src/app/layout.tsx`

### 2.3 Page Transitions
- **Fichier :** `src/components/PageTransition.tsx` (nouveau, `"use client"`)
- Utilise `AnimatePresence` de Framer Motion dans `layout.tsx`
- Un voile `#8B1A1A` (bordeaux) sweep de bas en haut (durée 0.3s) puis se retire (durée 0.3s)
- Chaque page wrappée dans un `motion.div` avec variants `initial/animate/exit`
- Durée totale transition : ~0.6s

### 2.4 Scroll Reveals
- **Fichier :** `src/components/RevealOnScroll.tsx` (nouveau, wrapper générique)
- Utilise `motion.div` avec `whileInView`, `viewport: { once: true, amount: 0.2 }`
- **3 variantes :**
  - `fadeUp` : `opacity 0→1` + `y 30→0`, durée 0.6s
  - `stagger` : wrapper qui applique `staggerChildren: 0.1s` aux enfants directs
  - `clipReveal` : `clipPath` de `inset(100% 0 0 0)` → `inset(0% 0 0 0)` pour les titres

---

## Section 3 — Changements Page par Page

### Home (`src/app/page.tsx`)
- Hero : titre principal en `clipReveal` au chargement (pas au scroll)
- Sous-titre : `fadeUp` avec delay 0.4s
- Cards projets : wrapper `stagger` → chaque card en `fadeUp` décalé

### About (`src/app/about/page.tsx`)
- Sections expérience, formation, skills : `fadeUp` au scroll
- Barres de compétences : `width: 0% → X%` animé via `motion` + `whileInView`
- Titres de section : ligne bordeaux animée (`scaleX: 0→1`) en dessous

### Work (`src/app/work/page.tsx`)
- Cards : `stagger` + `fadeUp`
- Hover card : `y: -4px` + `boxShadow` bordeaux via Framer Motion `whileHover`

### Work Detail (`src/app/work/[slug]/page.tsx`)
- Titre projet : `clipReveal`
- Carousel : `fadeUp` au chargement

### Gallery (`src/app/gallery/page.tsx`)
- Images : `stagger` avec délai diagonal (index pair/impair)

---

## Fichiers à modifier

| Fichier | Type de changement |
|---|---|
| `src/resources/once-ui.config.ts` | Palette, thème light forcé, bordures sharp |
| `src/app/layout.tsx` | Ajout CustomCursor, GrainOverlay, PageTransition |
| `src/app/page.tsx` | Scroll reveals hero + cards |
| `src/app/about/page.tsx` | Scroll reveals sections + barres skills |
| `src/app/work/page.tsx` | Stagger cards |
| `src/app/work/[slug]/page.tsx` | ClipReveal titre |
| `src/app/gallery/page.tsx` | Stagger images |

## Nouveaux fichiers à créer

| Fichier | Rôle |
|---|---|
| `src/components/CustomCursor.tsx` | Curseur custom bordeaux |
| `src/components/GrainOverlay.tsx` | Texture grain paper |
| `src/components/PageTransition.tsx` | Transition de page bordeaux |
| `src/components/RevealOnScroll.tsx` | Wrapper scroll reveal générique |

---

## Contraintes techniques

- Les composants animés doivent être `"use client"` — les pages restent Server Components autant que possible
- `AnimatePresence` nécessite une `key` unique par page pour fonctionner correctement
- Le curseur custom doit être désactivé sur mobile (touch devices)
- Le grain overlay ne doit pas impacter les performances (SVG filter, pas canvas)
