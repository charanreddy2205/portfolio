import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const chapters = [
  { id: "hero", label: "Intro", start: 0 },
  { id: "skills", label: "Skills", start: 0 },
  { id: "projects", label: "Projects", start: 0 },
  { id: "dashboard", label: "Intelligence", start: 0 },
  { id: "education", label: "Impact", start: 0 },
  { id: "contact", label: "Contact", start: 0 },
];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setProgress(v);
      // Determine active chapter
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = v * docH;
      let active = 0;
      chapters.forEach((ch, i) => {
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop - 200 <= scrollY) active = i;
      });
      setActiveChapter(active);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <motion.div
        className="h-0.5 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, hsl(225 73% 57%), hsl(270 60% 55%))",
        }}
      />
      {/* Chapter labels */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-[10px] font-mono tracking-wider">
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" })}
            className={`transition-all duration-300 uppercase ${
              i === activeChapter
                ? "text-primary scale-110"
                : i < activeChapter
                ? "text-muted-foreground"
                : "text-muted-foreground/40"
            }`}
          >
            {i <= activeChapter && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 align-middle" />
            )}
            {ch.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollProgress;
