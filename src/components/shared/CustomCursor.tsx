import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const CustomCursor = () => {
  const [cursorColor, setCursorColor] = useState("#703BF7");
  const [position, setPosition] = useState({ x: -20, y: -20 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const element = document.elementFromPoint(e.clientX, e.clientY);
      const section = element?.closest("[data-cursor-color]") as HTMLElement;

      if (section) {
        const color = section.dataset.cursorColor;
        if (color) setCursorColor(color);
      } else {
        setCursorColor("#703BF7");
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x,
          y,
          width: 30,
          height: 30,
          marginLeft: -15,
          marginTop: -15,
          backgroundColor: `${cursorColor}22`,
          boxShadow: `0 0 12px 5px ${cursorColor}66`,
          border: `1px solid ${cursorColor}88`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed rounded-full pointer-events-none z-[9998]"
            initial={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              opacity: 0.4,
              scale: 0,
              backgroundColor: cursorColor,
            }}
            animate={{
              scale: 3,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
