import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ExternalLink, Brain, TrendingUp, BarChart3, CloudRain, FileSpreadsheet } from "lucide-react";
import { createPortal } from "react-dom";
import SectionLabel from "./SectionLabel";

const projects = [
  {
    title: "NyayaSetu",
    subtitle: "AI Powered Smart Grievance Redressal System",
    description:
      "Built an AI-driven grievance redressal platform that intelligently classifies and routes citizen complaints. Uses NLP for sentiment analysis and automated categorization, reducing resolution time significantly.",
    tags: ["Python", "NLP", "AI", "Flask"],
    icon: Brain,
    span: "lg:col-span-2",
    link: "https://github.com/charanreddy2205/Nyayasetu-",
  },
  {
    title: "Agricultural Market Price Prediction",
    subtitle: "96.7% R² Accuracy",
    description:
      "Developed a machine learning model to predict agricultural commodity prices with 96.7% R² accuracy. Leveraged historical data and ensemble methods to help farmers make informed selling decisions.",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    icon: TrendingUp,
    span: "",
    link: "https://github.com/charanreddy2205/Agricultural-Market-Price-Prediction",
  },
  {
    title: "Telangana Horticulture Dashboard",
    subtitle: "Interactive Power BI Dashboard",
    description:
      "Created a comprehensive Power BI dashboard analyzing horticulture data across Telangana districts. Features interactive filters, trend analysis, and geographic visualizations for policy insights.",
    tags: ["Power BI", "DAX", "Data Modeling"],
    icon: BarChart3,
    span: "",
    link: "https://github.com/charanreddy2205/Telangana-Horticulture-Dashboard",
  },
  {
    title: "Rainfall Analysis (EDA)",
    subtitle: "Exploratory Data Analysis",
    description:
      "Performed in-depth exploratory data analysis on rainfall patterns across Indian states. Identified seasonal trends, anomalies, and correlations using statistical methods and visualizations.",
    tags: ["Python", "Matplotlib", "Seaborn", "Pandas"],
    icon: CloudRain,
    span: "",
    link: "https://github.com/charanreddy2205/Rainfall-Analysis-EDA-Exploratory-Data-Analysis",
  },
  {
    title: "Excel Dashboard",
    subtitle: "Business Analytics Dashboard",
    description:
      "Designed an advanced Excel dashboard with pivot tables, conditional formatting, and dynamic charts for business performance tracking and KPI monitoring.",
    tags: ["Excel", "VBA", "Data Analysis"],
    icon: FileSpreadsheet,
    span: "",
    link: "https://github.com/charanreddy2205/Excel-Dashboard-Business-Analytics-Dashboard",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="projects" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Featured <span className="gradient-text">work</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 cursor-pointer group hover:-translate-y-1 hover:glow-blue transition-all duration-300 ${project.span}`}
              onClick={() => setSelected(i)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <project.icon size={24} />
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 -mr-2 -mt-2 hover:bg-white/5 rounded-full transition-colors flex items-center justify-center"
                    aria-label={`View ${project.title} source code`}
                  >
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ) : (
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {createPortal(
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto"
                onClick={() => setSelected(null)}
              >
                <div className="flex min-h-full w-full p-4 sm:p-8">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-card p-8 max-w-lg w-full glow-blue relative m-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {(() => {
                        const Icon = projects[selected].icon;
                        return <Icon size={28} />;
                      })()}
                    </div>
                    <button 
                      onClick={() => setSelected(null)} 
                      className="text-muted-foreground hover:text-foreground p-1"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{projects[selected].title}</h3>
                  <p className="text-primary text-sm mb-4">{projects[selected].subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{projects[selected].description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[selected].tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {projects[selected].link && (
                    <div className="mt-8 flex justify-end">
                      <a
                        href={projects[selected].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium w-full sm:w-auto"
                      >
                        <ExternalLink size={18} />
                        View Project
                      </a>
                    </div>
                  )}
                </motion.div>
               </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
