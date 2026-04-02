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
