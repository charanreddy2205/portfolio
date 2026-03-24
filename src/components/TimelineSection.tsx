import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, School } from "lucide-react";
import SectionLabel from "./SectionLabel";

const timeline = [
  {
    title: "Bachelor of Technology (CSE)",
    institution: "Lovely Professional University, Phagwara",
    detail: "CGPA: 7.04",
    period: "Aug 2023 – Present",
    icon: GraduationCap,
  },
  {
    title: "Intermediate",
    institution: "Race Junior College, Telangana",
    detail: "Percentage: 92%",
    period: "Apr 2021 – Mar 2023",
    icon: BookOpen,
  },
  {
    title: "Matriculation",
    institution: "SRM High School, Telangana",
    detail: "Percentage: 100%",
    period: "Apr 2020 – Mar 2021",
    icon: School,
  },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="education" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-16">
          My <span className="gradient-text">journey</span>
        </h2>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center z-10 glow-blue">
                <item.icon size={20} className="text-primary" />
              </div>

              {/* Card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-4" : "md:pl-4"}`}>
                <div className="glass-card p-6 hover:glow-blue transition-shadow duration-500 group">
                  <span className="text-xs font-mono text-primary">{item.period}</span>
                  <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                  <p className="text-sm font-medium gradient-text mt-2">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
