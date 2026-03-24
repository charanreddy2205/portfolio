import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "./SectionLabel";
import profilePhoto from "@/assets/profile-photo.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="about" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Get to know <span className="gradient-text">me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Terminal / Code IDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl relative"
          >
            {/* Subtle glow behind the terminal */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10" />
            
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1e1e1e]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-xs text-muted-foreground font-mono ml-2 tracking-wider">charan_profile.py</span>
            </div>
            
            <div className="p-6 font-mono text-sm sm:text-[14px] leading-relaxed overflow-x-auto whitespace-pre bg-[#1e1e1e] text-[#d4d4d4]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="text-[#569cd6]">class</span> <span className="text-[#4ec9b0]">DataAnalyst</span>:<br />
                {"    "}<span className="text-[#569cd6]">def</span> <span className="text-[#dcdcaa]">__init__</span>(<span className="text-[#9cdcfe]">self</span>):<br />
                {"        "}<span className="text-[#9cdcfe]">self</span>.name <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"Charan Reddy Ranabothu"</span><br />
                {"        "}<span className="text-[#9cdcfe]">self</span>.role <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"Data Analyst"</span><br />
                {"        "}<span className="text-[#9cdcfe]">self</span>.location <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"India"</span><br />
                {"        "}<span className="text-[#9cdcfe]">self</span>.skills <span className="text-[#d4d4d4]">=</span> [<br />
                {"            "}<span className="text-[#ce9178]">"Python"</span>, <span className="text-[#ce9178]">"SQL"</span>, <span className="text-[#ce9178]">"Excel"</span>,<br />
                {"            "}<span className="text-[#ce9178]">"Power BI"</span>, <span className="text-[#ce9178]">"Machine Learning"</span><br />
                {"        "}]<br />
                {"        "}<span className="text-[#9cdcfe]">self</span>.education <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"B.Tech Computer Science"</span><br />
                <br />
                {"    "}<span className="text-[#569cd6]">def</span> <span className="text-[#dcdcaa]">analyze_data</span>(<span className="text-[#9cdcfe]">self</span>):<br />
                {"        "}<span className="text-[#c586c0]">return</span> <span className="text-[#ce9178]">"Transforming raw data into actionable insights 🚀"</span><br />
                <br />
                charan <span className="text-[#d4d4d4]">=</span> <span className="text-[#4ec9b0]">DataAnalyst</span>()<br />
                <span className="text-[#dcdcaa]">print</span>(charan.<span className="text-[#dcdcaa]">analyze_data</span>())<span className="animate-blink border-l-[2px] border-[#d4d4d4] ml-0.5" />
              </motion.div>
            </div>
          </motion.div>

          {/* About text + photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 flex items-center gap-6 group hover:glow-blue transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={profilePhoto}
                alt="Charan Reddy"
                className="w-20 h-20 rounded-xl object-cover object-top scale-110 border border-primary/20 relative z-10"
              />
              <div className="relative z-10">
                <h3 className="font-semibold text-lg text-foreground/90 group-hover:text-primary transition-colors">Charan Reddy Ranabothu</h3>
                <p className="text-muted-foreground text-sm">Data Analyst & ML Enthusiast</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate Data Analyst with a strong foundation in Python, SQL, Excel and Power BI.
                I specialize in transforming raw data into meaningful insights that drive business decisions.
                With a keen interest in Machine Learning, I build predictive models and interactive dashboards
                that make complex data accessible and actionable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing B.Tech in Computer Science at Lovely Professional University,
                I combine academic knowledge with hands-on project experience to solve real-world problems
                through data-driven approaches.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
