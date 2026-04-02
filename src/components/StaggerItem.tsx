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
