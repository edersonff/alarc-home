"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Show({
  direction = "bottom",
  duration = 0.5,
  delay = 0,
  children,
  ...props
}: {
  direction?: "top" | "right" | "bottom" | "left";
  duration?: number;
  delay?: number;
  children: React.ReactNode;
} & JSX.IntrinsicElements["div"]) {
  const whileInView = useMemo(() => {
    switch (direction) {
      case "top":
        return { opacity: 1, y: 0 };
      case "right":
        return { opacity: 1, x: 0 };
      case "bottom":
        return { opacity: 1, y: 0 };
      case "left":
        return { opacity: 1, x: 0 };
    }
  }, [direction]);

  const initial = useMemo(() => {
    switch (direction) {
      case "top":
        return { opacity: 0, y: -20 };
      case "right":
        return { opacity: 0, x: 20 };
      case "bottom":
        return { opacity: 0, y: 20 };
      case "left":
        return { opacity: 0, x: -20 };
    }
  }, [direction]);

  return (
    <motion.div
      transition={{ duration, delay, repeat: false }}
      initial={initial}
      viewport={{ once: true }}
      whileInView={whileInView}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
