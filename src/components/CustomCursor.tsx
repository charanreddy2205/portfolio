import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState("default");
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      let type = "default";
      
      const isClickable = target.closest('a') || target.closest('button');

      if (isClickable) {
        type = "pointer";
      } else {
        const elementWithCursor = target.closest('[data-cursor]');
        if (elementWithCursor) {
          type = elementWithCursor.getAttribute('data-cursor') || "default";
        }
      }
      
      setCursorType(type);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.6)",
    },
    pointer: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      border: "1px solid rgba(59, 130, 246, 0.9)",
    },
    glow: {
      x: mousePosition.x - 80,
      y: mousePosition.y - 80,
      height: 160,
      width: 160,
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      border: "none",
      filter: "blur(25px)",
      mixBlendMode: "screen" as any,
    },
    lens: {
      x: mousePosition.x - 45,
      y: mousePosition.y - 45,
      height: 90,
      width: 90,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(2px)",
    },
    dot: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(59, 130, 246, 1)",
      border: "none",
      boxShadow: "0 0 15px 4px rgba(59, 130, 246, 0.8)",
    }
  };

  // Only render on fine pointer devices
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center transition-colors duration-300"
        variants={variants}
        animate={cursorType}
        transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.1 }}
      >
        <AnimatePresence>
          {cursorType === "lens" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white/40"
            >
              <Search size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
