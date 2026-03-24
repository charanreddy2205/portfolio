import { useEffect, useState } from "react";

const sectionIds = ["about", "skills", "projects", "dashboard", "education", "achievements", "contact"];

const FocusMode = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!activeSection) {
        el.style.opacity = "1";
        el.style.transition = "opacity 0.5s ease";
        return;
      }
      el.style.transition = "opacity 0.5s ease";
      el.style.opacity = id === activeSection ? "1" : "0.4";
    });
  }, [activeSection]);

  return null;
};

export default FocusMode;
