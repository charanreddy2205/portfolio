import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import {
  BarChart3,
  Brain,
  Database,
  FileSpreadsheet,
  Code2,
  TrendingUp,
  LineChart,
  Layers,
  Terminal,
  Cpu,
  Users,
  Lightbulb,
  Zap,
  HeartHandshake
} from "lucide-react";

const skillCategories = [
  {
    id: "programming",
    label: "Programming Languages",
    icon: Terminal,
    skills: [
      { name: "Python", level: 90, icon: Code2, color: "from-primary to-secondary" },
      { name: "Java", level: 85, icon: Code2, color: "from-secondary to-accent" },
      { name: "C++", level: 80, icon: Code2, color: "from-accent to-primary" },
      { name: "C", level: 75, icon: Code2, color: "from-primary to-accent" },
    ],
  },
  {
    id: "data",
    label: "Data & ML",
    icon: Brain,
    skills: [
      { name: "Machine Learning", level: 80, icon: Brain, color: "from-primary to-secondary" },
      { name: "EDA", level: 85, icon: Layers, color: "from-accent to-secondary" },
      { name: "Statistical Analysis", level: 78, icon: TrendingUp, color: "from-primary to-accent" },
      { name: "Data Visualization", level: 87, icon: LineChart, color: "from-secondary to-primary" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Tech",
    icon: Cpu,
    skills: [
      { name: "SQL", level: 85, icon: Database, color: "from-primary to-accent" },
      { name: "Power BI", level: 88, icon: BarChart3, color: "from-secondary to-accent" },
      { name: "Excel / Sheets", level: 92, icon: FileSpreadsheet, color: "from-accent to-primary" },
    ],
  },
  {
    id: "soft-skills",
    label: "Soft Skills",
    icon: HeartHandshake,
    skills: [
      { name: "Problem-Solving", level: 90, icon: Lightbulb, color: "from-primary to-secondary" },
      { name: "Team Player", level: 95, icon: Users, color: "from-secondary to-accent" },
      { name: "Adaptability", level: 90, icon: Zap, color: "from-accent to-primary" },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("all");

  const displayedCategories = activeTab === "all" 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="skills" />
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="gradient-text">toolkit</span>
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-2xl w-fit relative z-20">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "all" 
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                  : "hover:bg-primary/10 text-muted-foreground"
              }`}
            >
              All Skills
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === cat.id 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {displayedCategories.map((category, catIdx) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 }}
              className="relative"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-foreground/90">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                  <category.icon size={20} />
                </div>
                {category.label}
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIdx * 0.1 + i * 0.05 }}
                    className="glass-card p-6 group hover:glow-blue hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden border border-border/50 hover:border-primary/50"
                  >
                    {/* Background glow effect on hover */}
                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`} />
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${skill.color} bg-opacity-20 shadow-inner`}>
                        <skill.icon size={20} className="text-white drop-shadow-md" />
                      </div>
                      <span className="font-semibold tracking-wide text-foreground/90 group-hover:text-foreground transition-colors">{skill.name}</span>
                    </div>
                    
                    <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden relative z-10 backdrop-blur-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + catIdx * 0.1 + i * 0.05 }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 relative z-10">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/30 group-hover:text-muted-foreground/80 transition-colors duration-300">
                        Proficiency
                      </span>
                      <p className="text-sm font-bold text-foreground/60 group-hover:text-primary transition-colors duration-300">{skill.level}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
