"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
};

export default function AnimateOnScroll({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px" });
  const controls = useAnimation();

  // Animations variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slideUp" ? 50 : 0,
      x: animation === "slideLeft" ? 50 : animation === "slideRight" ? -50 : 0,
      scale: animation === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: animation === "slideUp" ? 50 : 0,
          x: animation === "slideLeft" ? 50 : animation === "slideRight" ? -50 : 0,
          scale: animation === "scale" ? 0.8 : 1,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            duration: duration,
            delay: delay,
            ease: [0.43, 0.13, 0.23, 0.96] // Improved easing curve for smoother animation
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}