# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonte complète du portfolio avec palette éditoriale crème/bordeaux/noir + animations Framer Motion (curseur custom, grain texture, page transitions, scroll reveals).

**Architecture:** On ajoute Framer Motion comme seule nouvelle dépendance. Les composants animés sont des Client Components (`"use client"`) importés par les Server Component pages existantes. `src/app/template.tsx` (nouveau) gère les transitions de page via `AnimatePresence` — Next.js re-monte ce fichier à chaque navigation, ce qui est le mécanisme officiel pour les transitions. Les couleurs custom sont définies via des variables CSS dans `custom.css`, activées en passant `brand/neutral/accent` à `"custom"` dans `once-ui.config.ts`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Framer Motion, Once UI System (CSS variables custom)

---

## Map des fichiers

| Fichier | Action | Responsabilité |
|---|---|---|
| `package.json` | Modifier | Ajouter framer-motion |
| `src/resources/once-ui.config.ts` | Modifier | theme light, brand/neutral/accent custom, border conservative |
| `src/resources/custom.css` | Modifier | Variables CSS pour la palette éditoriale |
| `src/app/template.tsx` | Créer | Page transitions via AnimatePresence |
| `src/app/layout.tsx` | Modifier | Ajouter GrainOverlay + CustomCursor |
| `src/components/GrainOverlay.tsx` | Créer | Texture grain paper fixed overlay |
| `src/components/CustomCursor.tsx` | Créer | Curseur custom bordeaux avec follower |
| `src/components/RevealOnScroll.tsx` | Créer | Wrapper scroll reveal générique (fadeUp / clipReveal) |
| `src/components/StaggerItem.tsx` | Créer | Wrapper pour enfants dans une grille stagger |
| `src/components/work/AnimatedProjects.tsx` | Créer | Version client animée de Projects avec stagger |
| `src/components/work/Projects.tsx` | Modifier | Passer les données à AnimatedProjects |
| `src/app/page.tsx` | Modifier | Hero clipReveal + stagger cards |
| `src/app/about/page.tsx` | Modifier | fadeUp sections + animated skill bars |
| `src/app/work/[slug]/page.tsx` | Modifier | clipReveal titre |
| `src/components/gallery/GalleryView.tsx` | Modifier | Stagger images |
| `src/components/index.ts` | Modifier | Exporter les nouveaux composants |

---

## Task 1: Installer Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Installer framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Vérifier l'installation**

```bash
node -e "require('framer-motion'); console.log('OK')"
```
Résultat attendu: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion dependency"
```

---

## Task 2: Mise à jour once-ui.config.ts

**Files:**
- Modify: `src/resources/once-ui.config.ts`

- [ ] **Step 1: Mettre à jour le bloc `style` et `display`**

Dans `src/resources/once-ui.config.ts`, remplacer le bloc `style` et `display` :

```typescript
const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: false, // désactivé — thème light forcé
};
```

```typescript
const style: StyleConfig = {
  theme: "light",        // était "system"
  neutral: "custom",     // était "gray"
  brand: "custom",       // était "cyan"
  accent: "custom",      // était "red"
  solid: "contrast",
  solidStyle: "flat",
  border: "conservative", // était "playful" — coins les plus carrés
  surface: "filled",      // était "translucent" — surfaces solides
  transition: "all",
  scaling: "100",
};
```

- [ ] **Step 2: Désactiver les dots d'arrière-plan** (le grain texture remplace cet effet)

Dans le bloc `effects`, passer `dots.display` à `false` :

```typescript
const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: false, // était true
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add src/resources/once-ui.config.ts
git commit -m "feat: switch to editorial theme — light, custom palette, conservative borders"
```

---

## Task 3: Palette éditoriale dans custom.css

**Files:**
- Modify: `src/resources/custom.css`

- [ ] **Step 1: Remplacer le contenu de custom.css**

Le fichier `custom.css` contient des variables commentées à titre d'exemple. Le remplacer intégralement par la palette éditoriale activée :

```css
/* ============================================
   PALETTE ÉDITORIALE — Crème / Bordeaux / Noir
   Mood: CV de Youness Eddabachi
   ============================================ */

:root {
  /* --- BRAND : Bordeaux (#8B1A1A comme 600) --- */
  --scheme-brand-100:  #1a0404;
  --scheme-brand-200:  #2e0808;
  --scheme-brand-300:  #4a0e0e;
  --scheme-brand-400:  #651414;
  --scheme-brand-500:  #7c1818;
  --scheme-brand-600:  #8B1A1A;
  --scheme-brand-700:  #a83535;
  --scheme-brand-800:  #c26060;
  --scheme-brand-900:  #d88c8c;
  --scheme-brand-1000: #e8b5b5;
  --scheme-brand-1100: #f3d5d5;
  --scheme-brand-1200: #faeeee;
  --scheme-brand-600-10: rgba(139, 26, 26, 0.1);
  --scheme-brand-600-30: rgba(139, 26, 26, 0.3);
  --scheme-brand-600-50: rgba(139, 26, 26, 0.5);

  /* --- ACCENT : Quasi-noir (#1A1A1A comme 400) --- */
  --scheme-accent-100:  #030303;
  --scheme-accent-200:  #080808;
  --scheme-accent-300:  #111111;
  --scheme-accent-400:  #1a1a1a;
  --scheme-accent-500:  #2a2a2a;
  --scheme-accent-600:  #3a3a3a;
  --scheme-accent-700:  #606060;
  --scheme-accent-800:  #888888;
  --scheme-accent-900:  #aaaaaa;
  --scheme-accent-1000: #c8c8c8;
  --scheme-accent-1100: #e0e0e0;
  --scheme-accent-1200: #f0f0f0;
  --scheme-accent-600-10: rgba(58, 58, 58, 0.1);
  --scheme-accent-600-30: rgba(58, 58, 58, 0.3);
  --scheme-accent-600-50: rgba(58, 58, 58, 0.5);

  /* --- NEUTRAL : Crème chaude (#F2E4C4 comme fond clair) --- */
  --scheme-neutral-100:  #0a0400;
  --scheme-neutral-200:  #140a02;
  --scheme-neutral-300:  #251508;
  --scheme-neutral-400:  #3d2810;
  --scheme-neutral-500:  #5c4220;
  --scheme-neutral-600:  #7e6030;
  --scheme-neutral-700:  #9e8040;
  --scheme-neutral-800:  #bea058;
  --scheme-neutral-900:  #d4b870;
  --scheme-neutral-1000: #e5cb8a;
  --scheme-neutral-1100: #EDD8A8;
  --scheme-neutral-1200: #F2E4C4;
  --scheme-neutral-600-10: rgba(126, 96, 48, 0.1);
  --scheme-neutral-600-30: rgba(126, 96, 48, 0.3);
  --scheme-neutral-600-50: rgba(126, 96, 48, 0.5);
}

/* Typographie éditoriale — uppercase + letter-spacing sur les titres */
h1, h2, [class*="display-strong"], [class*="heading-strong"] {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Curseur natif masqué pour le curseur custom */
* {
  cursor: none !important;
}
```

- [ ] **Step 2: Vérifier visuellement en dev**

```bash
npm run dev
```
Ouvrir http://localhost:3000. Le fond doit être crème, les titres en bordeaux uppercase.

- [ ] **Step 3: Commit**

```bash
git add src/resources/custom.css
git commit -m "feat: apply editorial color palette — cream, bordeaux, near-black"
```

---

## Task 4: GrainOverlay component

**Files:**
- Create: `src/components/GrainOverlay.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9998,
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
```

- [ ] **Step 2: Exporter depuis index.ts**

Dans `src/components/index.ts`, ajouter :
```typescript
export { GrainOverlay } from "@/components/GrainOverlay";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GrainOverlay.tsx src/components/index.ts
git commit -m "feat: add GrainOverlay — paper texture effect"
```

---

## Task 5: CustomCursor component

**Files:**
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Désactiver sur mobile / touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      followerPos.current.x = lerp(followerPos.current.x, pos.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, pos.current.y, 0.12);
      if (followerRef.current) {
        const size = isHovering ? 60 : 40;
        followerRef.current.style.transform = `translate(${followerPos.current.x - size / 2}px, ${followerPos.current.y - size / 2}px)`;
        followerRef.current.style.width = `${size}px`;
        followerRef.current.style.height = `${size}px`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(animId);
    };
  }, [isHovering]);

  if (isMobile) return null;

  return (
    <>
      {/* Point central */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#8B1A1A",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
      {/* Follower */}
      <div
        ref={followerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #8B1A1A",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform, width, height",
          transition: "width 0.2s ease, height 0.2s ease",
          mixBlendMode: "multiply",
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Exporter**

Dans `src/components/index.ts`, ajouter :
```typescript
export { CustomCursor } from "@/components/CustomCursor";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CustomCursor.tsx src/components/index.ts
git commit -m "feat: add CustomCursor — bordeaux dot + follower with lerp"
```

---

## Task 6: RevealOnScroll + StaggerItem components

**Files:**
- Create: `src/components/RevealOnScroll.tsx`
- Create: `src/components/StaggerItem.tsx`

- [ ] **Step 1: Créer RevealOnScroll.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "fadeUp" | "clipReveal" | "fadeIn";

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  clipReveal: {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: { clipPath: "inset(0% 0 0 0)" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function RevealOnScroll({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  style,
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Créer StaggerItem.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({ children, index, className, style }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Exporter**

Dans `src/components/index.ts`, ajouter :
```typescript
export { RevealOnScroll } from "@/components/RevealOnScroll";
export { StaggerItem } from "@/components/StaggerItem";
```

- [ ] **Step 4: Commit**

```bash
git add src/components/RevealOnScroll.tsx src/components/StaggerItem.tsx src/components/index.ts
git commit -m "feat: add RevealOnScroll and StaggerItem animation wrappers"
```

---

## Task 7: Page transitions via template.tsx

**Files:**
- Create: `src/app/template.tsx`

Next.js re-monte `template.tsx` à chaque navigation (contrairement à `layout.tsx` qui persiste). C'est le mécanisme officiel pour les transitions de page avec `AnimatePresence`.

- [ ] **Step 1: Créer src/app/template.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Voile de transition — sweeps up en bordeaux */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#8B1A1A",
          transformOrigin: "bottom",
          zIndex: 99997,
          pointerEvents: "none",
        }}
      />
      {/* Contenu de la page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/template.tsx
git commit -m "feat: add page transitions via template.tsx — bordeaux sweep"
```

---

## Task 8: Mise à jour layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Ajouter GrainOverlay et CustomCursor dans layout.tsx**

Ajouter les imports après les imports existants :
```typescript
import { GrainOverlay, CustomCursor } from "@/components";
```

Ajouter les composants juste avant la fermeture de `</Column>` (après `<Footer />`):

```tsx
          <Footer />
          <GrainOverlay />
          <CustomCursor />
        </Column>
```

- [ ] **Step 2: Forcer le thème light dans le script d'initialisation**

Dans le `dangerouslySetInnerHTML`, changer la ligne `const defaultTheme = 'system';` :
```javascript
const defaultTheme = 'light';
```
Et remplacer la logique `savedTheme` pour forcer light :
```javascript
// Force light theme — editorial palette only works in light
root.setAttribute('data-theme', 'light');
localStorage.setItem('data-theme', 'light');
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add GrainOverlay and CustomCursor to root layout, force light theme"
```

---

## Task 9: AnimatedProjects — stagger cards Work

**Files:**
- Create: `src/components/work/AnimatedProjects.tsx`
- Modify: `src/components/work/Projects.tsx`

- [ ] **Step 1: Créer AnimatedProjects.tsx**

```tsx
"use client";

import { StaggerItem } from "@/components/StaggerItem";
import { ProjectCard } from "@/components/ProjectCard";
import { Column } from "@once-ui-system/core";

interface ProjectData {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    images: string[];
    link?: string;
    team?: { avatar: string }[];
  };
  content: string;
}

interface AnimatedProjectsProps {
  projects: ProjectData[];
}

export function AnimatedProjects({ projects }: AnimatedProjectsProps) {
  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((post, index) => (
        <StaggerItem key={post.slug} index={index}>
          <ProjectCard
            priority={index < 2}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
          />
        </StaggerItem>
      ))}
    </Column>
  );
}
```

- [ ] **Step 2: Modifier Projects.tsx pour utiliser AnimatedProjects**

```tsx
import { getPosts } from "@/utils/utils";
import { AnimatedProjects } from "@/components/work/AnimatedProjects";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return <AnimatedProjects projects={displayedProjects} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/work/AnimatedProjects.tsx src/components/work/Projects.tsx
git commit -m "feat: add stagger animation to project cards via AnimatedProjects"
```

---

## Task 10: Animations page Home

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Remplacer les RevealFx par Framer Motion dans page.tsx**

Ajouter l'import en haut :
```typescript
import { RevealOnScroll } from "@/components/RevealOnScroll";
```

Retirer l'import `RevealFx` du bloc `@once-ui-system/core`.

Remplacer le bloc hero (du premier `<RevealFx` jusqu'au dernier `</RevealFx>` du hero) par :

```tsx
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealOnScroll variant="fadeIn" delay={0}>
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealOnScroll>
          )}
          <RevealOnScroll variant="clipReveal" delay={0.1}>
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealOnScroll>
          <RevealOnScroll variant="fadeUp" delay={0.3}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealOnScroll>
          <RevealOnScroll variant="fadeUp" delay={0.5}>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealOnScroll>
        </Column>
      </Column>
```

Le bloc `<RevealFx translateY="16" delay={0.6}>` autour du premier `<Projects>` est remplacé par :
```tsx
      <RevealOnScroll variant="fadeUp" delay={0}>
        <Projects range={[1, 1]} />
      </RevealOnScroll>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: animate home page hero with clipReveal and stagger"
```

---

## Task 11: Animations page About

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Ajouter les imports**

```typescript
import { RevealOnScroll } from "@/components/RevealOnScroll";
```

- [ ] **Step 2: Wrapper les sections principales**

Wrapper chaque bloc `{about.work.display && ...}`, `{about.studies.display && ...}`, `{about.technical.display && ...}` dans `<RevealOnScroll variant="fadeUp">`:

```tsx
          {about.work.display && (
            <RevealOnScroll variant="fadeUp">
              <>
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                  {about.work.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.work.experiences.map((experience, index) => (
                    // ... contenu existant inchangé
                  ))}
                </Column>
              </>
            </RevealOnScroll>
          )}
```

Appliquer le même pattern à `about.studies.display` et `about.technical.display`.

Wrapper le bloc intro :
```tsx
          {about.intro.display && (
            <RevealOnScroll variant="fadeUp" delay={0.1}>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
            </RevealOnScroll>
          )}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: animate about page sections with fadeUp scroll reveals"
```

---

## Task 12: Animations Work Detail

**Files:**
- Modify: `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Ajouter import**

```typescript
import { RevealOnScroll } from "@/components/RevealOnScroll";
```

- [ ] **Step 2: Wrapper le titre avec clipReveal**

Trouver le bloc `<Heading variant="display-strong-m">{post.metadata.title}</Heading>` (ligne ~103) et le wrapper :

```tsx
          <RevealOnScroll variant="clipReveal">
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
          </RevealOnScroll>
```

Wrapper aussi le Carousel :
```tsx
      <RevealOnScroll variant="fadeUp">
        {post.metadata.images.length > 0 && (
          <Carousel ... />
        )}
      </RevealOnScroll>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "feat: animate work detail page — clipReveal title, fadeUp carousel"
```

---

## Task 13: Animations Gallery

**Files:**
- Modify: `src/components/gallery/GalleryView.tsx`

`GalleryView.tsx` est déjà `"use client"`. Framer Motion peut être importé directement.

- [ ] **Step 1: Ajouter animations dans GalleryView**

```tsx
"use client";

import { motion } from "framer-motion";
import { Flex, Heading, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";
import Carousel from "./Carousel";

export default function GalleryView() {
  return (
    <Flex direction="column" gap="xl" fillWidth>
      {gallery.projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="m" fillWidth>
            <Flex direction="column" gap="s">
              <Heading as="h2" variant="display-strong-s">
                {project.name}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {project.description}
              </Text>
            </Flex>
            <Carousel images={project.images} />
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/gallery/GalleryView.tsx
git commit -m "feat: animate gallery items with stagger scroll reveal"
```

---

## Task 14: Push final et vérification

- [ ] **Step 1: Build local pour vérifier l'absence d'erreurs TypeScript**

```bash
npm run build
```
Résultat attendu: `✓ Compiled successfully` sans erreurs TypeScript.

- [ ] **Step 2: Push**

```bash
git push
```

- [ ] **Step 3: Vérifier le déploiement Vercel**

Ouvrir le dashboard Vercel et attendre `✓ Build Completed`.
