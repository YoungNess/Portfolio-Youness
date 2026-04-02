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
