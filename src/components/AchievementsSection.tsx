import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, ShieldCheck, Code2, Palette, Bot, ExternalLink } from "lucide-react";
import SectionLabel from "./SectionLabel";

const achievements = [
  { 
    title: "2nd Place – Startup Pitch Arena", 
    icon: Trophy,
    link: "https://www.linkedin.com/posts/charan-reddy-ranabothu_ideathon-innovation-entrepreneurship-activity-7404403067091345410-TI_g?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEYj43MBMxsR9v5rZO_u5TEJTNHxTlVMdd8"
  }
];

const certifications = [
  { 
    title: "NPTEL Privacy & Security", 
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1XThhZVSkCyhIgICVEkvqJQ8Mirv4l4JW/view?usp=sharing"
  },
  { 
    title: "Python ML Course", 
    icon: Code2,
    link: "https://drive.google.com/file/d/1tQr32rIm1DDizfzqYQX2G2kRv1hQq_e2/view?usp=sharing"
  },
  { 
    title: "FreeCodeCamp Web Design", 
    icon: Palette,
    link: "https://www.freecodecamp.org/certification/fcc60069f74-de77-4e8c-9238-e27e578cdbf0/responsive-web-design"
  },
  { title: "Udemy AI Course", icon: Bot },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="achievements" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Awards & <span className="gradient-text">certifications</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <h3 className="text-sm font-mono text-muted-foreground mb-4">// achievements</h3>
            <div className="space-y-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5 flex items-center gap-4 hover:glow-purple transition-shadow duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-secondary/10 text-secondary">
                    <a.icon size={22} />
                  </div>
                  {a.link ? (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium flex items-center gap-2 hover:text-secondary transition-colors"
                    >
                      {a.title}
                      <ExternalLink size={14} className="opacity-50" />
                    </a>
                  ) : (
                    <span className="font-medium">{a.title}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-mono text-muted-foreground mb-4">// certifications</h3>
            <div className="space-y-4">
              {certifications.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5 flex items-center gap-4 hover:glow-blue transition-shadow duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <c.icon size={22} />
                  </div>
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      {c.title}
                      <ExternalLink size={14} className="opacity-50" />
                    </a>
                  ) : (
                    <span className="font-medium">{c.title}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
