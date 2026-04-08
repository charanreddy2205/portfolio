import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";
import SectionLabel from "./SectionLabel";

const experience = [
  {
    title: "Operations & Data Analyst Intern",
    institution: "Myno (RKMyno Services Pvt. Ltd.)",
    detail: "Data Analysis, Dashboards & Process Optimization",
    period: "Jul 2025 – Nov 2025",
    icon: Briefcase,
    points: [
      "Performed data analysis on operational datasets using Excel to identify trends in order volume, delivery time, and peak hours.",
      "Applied data cleaning and preprocessing techniques to ensure high-quality datasets for accurate analysis.",
      "Built interactive dashboards to monitor KPIs such as daily orders, average delivery time, and revenue trends.",
      "Generated actionable insights that improved operational efficiency and reduced delivery delays during peak hours.",
      "Assisted in data-driven decision-making by presenting insights to support business and operational strategies."
    ],
    link: "https://drive.google.com/drive/folders/1TX7R5RBXyI9Cfz9jX8BB3IEGfxr7a-Y1?usp=sharing"
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="experience" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-16">
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {experience.map((item, i) => (
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
                <div className="glass-card p-6 hover:glow-blue transition-shadow duration-500 group text-left">
                  <span className="text-xs font-mono text-primary">{item.period}</span>
                  <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                  
                  {item.detail && <p className="text-sm font-medium gradient-text mt-2">{item.detail}</p>}
                  
                  {item.points && (
                    <ul className="text-xs text-muted-foreground mt-3 space-y-2 list-disc pl-4 pb-2 text-left">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  )}
                  
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink size={14} /> View Certificate / Work
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
