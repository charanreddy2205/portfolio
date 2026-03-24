import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Activity, Server, Users, Database } from "lucide-react";
import SectionLabel from "./SectionLabel";

const LiveDataSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // KPIs state
  const [activeUsers, setActiveUsers] = useState(12450);
  const [serverLoad, setServerLoad] = useState(42);
  const [queriesSec, setQueriesSec] = useState(850);
  const [accuracy, setAccuracy] = useState(96.7);

  // Graph data state (15 points for a sparkline)
  const [graphData, setGraphData] = useState<number[]>(Array.from({ length: 15 }, () => Math.floor(Math.random() * 60) + 20));

  // Simulation loop
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      // Fluctuate KPIs
      setActiveUsers(prev => prev + Math.floor(Math.random() * 50) - 15);
      setServerLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 10 - 5))));
      setQueriesSec(prev => Math.max(0, prev + Math.floor(Math.random() * 100) - 50));
      setAccuracy(prev => Math.min(99.9, Math.max(90, prev + (Math.random() * 0.4 - 0.2))));

      // Update graph array (push new, shift old)
      setGraphData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = newData[newData.length - 1];
        let nextVal = lastVal + (Math.random() * 30 - 15);
        // keep within bounds 10 to 90
        nextVal = Math.max(10, Math.min(90, nextVal));
        newData.push(nextVal);
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [inView]);

  // Construct SVG path for the sparkline chart
  const createPath = (data: number[]) => {
    const w = 300, h = 100;
    const dx = w / (data.length - 1);
    
    // Convert data to y coordinates (y is inverted in SVG)
    const points = data.map((d, i) => `${i * dx},${h - d}`);
    return `M ${points.join(' L ')}`;
  };

  // Helper to format large numbers
  const formatNum = (num: number) => new Intl.NumberFormat().format(Math.floor(num));

  return (
    <section id="live-data" className="py-24" ref={ref}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel label="live data" />
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Real-time <span className="gradient-text">simulation</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-full w-fit">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-mono text-muted-foreground animate-pulse">Analyzing incoming data stream...</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* KPI Cards */}
          <div className="space-y-4 col-span-1 border-r border-white/5 pr-0 lg:pr-6">
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between group">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-2">
                  <Users size={14} className="text-blue-400" /> Active Users
                </p>
                <motion.p className="text-2xl font-bold font-mono text-foreground" key={activeUsers}>
                  {formatNum(activeUsers)}
                </motion.p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Activity size={20} className="text-blue-400" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-2">
                  <Server size={14} className="text-purple-400" /> Server Load
                </p>
                <motion.p className="text-2xl font-bold font-mono text-foreground">
                  {serverLoad.toFixed(1)}%
                </motion.p>
              </div>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${serverLoad}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-card p-5 rounded-2xl">
                <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-2">
                  <Database size={12} className="text-green-400" /> Queries/s
                </p>
                <p className="text-xl font-bold font-mono text-foreground">
                  {formatNum(queriesSec)}
                </p>
              </div>
              <div className="glass-card p-5 rounded-2xl">
                <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-2">
                  <Activity size={12} className="text-orange-400" /> Accuracy
                </p>
                <p className="text-xl font-bold font-mono text-foreground">
                  {accuracy.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Main Graph Area */}
          <div className="col-span-1 lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-mono font-semibold text-foreground/90">Prediction Network Latency</h3>
                  <p className="text-sm text-muted-foreground mt-1">Real-time model inference speed over last 30s</p>
                </div>
                <div className="px-3 py-1 bg-primary/10 rounded border border-primary/20 text-primary text-xs font-mono font-bold tracking-widest">
                  LIVE
                </div>
              </div>

              <div className="relative w-full h-[200px] mt-auto flex items-end">
                {/* SVG Line Graph */}
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Line Chart */}
                  <motion.path
                    d={createPath(graphData)}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                      transition: "d 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  
                  {/* Area under line */}
                  <motion.path
                    d={`${createPath(graphData)} L 300,100 L 0,100 Z`}
                    fill="url(#area-gradient)"
                    style={{
                      transition: "d 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 1)" />
                    </linearGradient>
                    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Data labels on X axis */}
              <div className="flex justify-between w-full text-[10px] text-muted-foreground/50 font-mono mt-4 pt-4 border-t border-white/5">
                <span>-30s</span>
                <span>-20s</span>
                <span>-10s</span>
                <span>NOW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDataSection;
