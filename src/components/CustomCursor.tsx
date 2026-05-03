import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-accent mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 18 : 6),
          y: pos.y - (hovering ? 18 : 6),
          width: hovering ? 36 : 12,
          height: hovering ? 36 : 12,
          opacity: hovering ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
      />
    </>
  );
}
