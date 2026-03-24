import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { Database, GitBranch, Coffee, Award } from "lucide-react";
import SectionLabel from "./SectionLabel";

const kpis = [
  { label: "Projects Completed", value: 6, icon: Database, suffix: "+" },
  { label: "ML Models Built", value: 5, icon: GitBranch, suffix: "+" },
  { label: "Cups of Coffee", value: 300, icon: Coffee, suffix: "+" },
  { label: "Certifications", value: 4, icon: Award, suffix: "" },
];

const barData = [
  { name: "Python", value: 90, insight: "Primary language for data analysis & ML pipelines" },
  { name: "SQL", value: 85, insight: "Complex queries, joins, and database optimization" },
  { name: "Power BI", value: 88, insight: "Interactive dashboards with DAX & data modeling" },
  { name: "ML", value: 80, insight: "Regression, classification & ensemble methods" },
  { name: "Excel", value: 92, insight: "Advanced formulas, pivot tables & VBA automation" },
];

const areaData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  projects: Math.floor(Math.random() * 3) + 1,
  commits: Math.floor(Math.random() * 30) + 10,
}));

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const DashboardSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dashboard" className="py-24" ref={ref}>
      <div className="container">
        <SectionLabel label="dashboard" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Live <span className="gradient-text">metrics</span>
        </h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <kpi.icon className="mx-auto mb-3 text-primary" size={24} />
              <p className="text-3xl font-bold gradient-text">
                <CountUp end={kpi.value} suffix={kpi.suffix} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Skill Proficiency</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(225 20% 10%)", border: "1px solid hsl(225 15% 22%)", borderRadius: 8, color: "hsl(210 40% 96%)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="glass-card p-3 border border-glass-border rounded-lg max-w-[200px]">
                          <p className="text-sm font-semibold text-foreground">{data.name}</p>
                          <p className="text-xs text-primary font-mono">{data.value}% proficiency</p>
                          {data.insight && <p className="text-[10px] text-muted-foreground mt-1">{data.insight}</p>}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(225 73% 57%)" />
                    <stop offset="100%" stopColor="hsl(270 60% 55%)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Activity Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData}>
                <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(225 20% 10%)", border: "1px solid hsl(225 15% 22%)", borderRadius: 8, color: "hsl(210 40% 96%)" }}
                />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(225 73% 57%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(270 60% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="commits" stroke="hsl(225 73% 57%)" fill="url(#areaGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
