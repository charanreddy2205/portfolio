import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const roles = ["Data Analyst", "ML Enthusiast", "Problem Solver"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 40);
      }
    } else {
      if (text === currentRole) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="section-label font-mono">
            <span className="text-primary">//</span> hello world
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            I'm{" "}
            <span className="gradient-text">Charan Reddy</span>
            <br />
            Ranabothu
          </h1>
          <div className="h-8 flex items-center">
            <span className="font-mono text-lg text-muted-foreground">
              {text}
              <span className="border-r-2 border-primary animate-blink ml-0.5">&nbsp;</span>
            </span>
          </div>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
            Transforming data into actionable insights and real-world impact
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              View Projects <ArrowDown size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Charan_Reddy_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Download Resume <Download size={16} />
            </a>
          </div>
        </motion.div>

        {/* Right - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl animate-pulse-glow" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary/30 animate-float glow-blue">
              <img
                src={profilePhoto}
                alt="Charan Reddy Ranabothu"
                className="w-full h-full object-cover object-[center_20%] scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
