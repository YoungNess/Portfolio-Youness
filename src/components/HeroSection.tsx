"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroSectionProps {
  headline: ReactNode;
  subline: ReactNode;
  badge?: ReactNode;
  cta?: ReactNode;
}

export function HeroSection({ headline, subline, badge, cta }: HeroSectionProps) {
  return (
    <div style={{ width: "100%", maxWidth: "720px", padding: "80px 0 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0 }}
          style={{ marginBottom: "24px" }}
        >
          {badge}
        </motion.div>
      )}

      {/* Headline — clipReveal depuis le bas */}
      <div style={{ overflow: "hidden", marginBottom: "32px", width: "100%" }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline}
        </motion.div>
      </div>

      {/* Subline — fadeUp, 3 lignes distinctes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "40px" }}
      >
        {subline}
      </motion.div>

      {/* CTA */}
      {cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {cta}
        </motion.div>
      )}
    </div>
  );
}
