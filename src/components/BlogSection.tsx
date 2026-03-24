import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, BookOpen, Clock, Calendar, X } from "lucide-react";
import { createPortal } from "react-dom";
import SectionLabel from "./SectionLabel";

const posts = [
  {
    title: "How I achieved 96.7% accuracy with Ensemble Methods",
    date: "March 15, 2026",
    readTime: "5 min read",
    summary: "A deep dive into combining multiple machine learning models (Random Forest, Gradient Boosting) to accurately predict agricultural market prices while minimizing overfitting.",
    content: [
      "Predicting agricultural market prices is notoriously difficult due to extreme volatility, seasonal changes, and localized supply chain issues. When I started working on the Agricultural Market Price Prediction project, standard linear regression models plateaued around 82% R² accuracy.",
      "The Breakthrough: \nI realized that a single model couldn't capture both the long-term seasonal trends and the short-term market shocks. I implemented an Ensemble framework combining Random Forest Regressors, Gradient Boosting (XGBoost), and Support Vector Machines.",
      "Key Techniques: \n• Feature Engineering: I created rolling average windows for the past 7, 14, and 30 days.\n• Hyperparameter Tuning: Used GridSearchCV to find optimal depths and estimators.\n• Stacking: The final predictions were fed into a robust Ridge regularized meta-learner.",
      "The result was a highly stable model hitting 96.7% R² accuracy, effectively reducing the predictive error margin for farmers from 15% down to under 4%. This gives agricultural distributors a massive analytical advantage in supply management."
    ],
    tags: ["Machine Learning", "Python", "Scikit-Learn"],
    link: "#",
  },
  {
    title: "My Top 5 Power BI Tricks for Massive Datasets",
    date: "February 28, 2026",
    readTime: "4 min read",
    summary: "Working with massive public datasets? Here are my favorite DAX optimizations, data modeling tricks, and query folding techniques to keep your dashboard lightning fast.",
    content: [
      "When building the Telangana Horticulture Dashboard, I had to compile years of unstructured geographic data across multiple districts. Standard imports caused the dashboard to drag and stutter. Here are the 5 techniques I used to optimize it:",
      "1. Star Schema over Flat Files: \nNever use massive flat tables. I separated Lookup/Dimension tables (Districts, Crop Types) from the central Fact table (Yields/Sales) ensuring a highly efficient 1-to-Many relationship structure.",
      "2. Query Folding First: \nI pushed as much transformation logic back to the SQL source query as possible via Power Query, ensuring the engine didn't have to load raw data before filtering.",
      "3. DAX Variables (VAR): \nInstead of recalculating complex measures on every row context, I stored intermediate results in DAX variables, cutting calculation times by over 50%.",
      "4. Removing High-Cardinality Columns: \nColumns with unique IDs (like transaction hashes) destroy the VertiPaq engine's compression capabilities. I removed them from the data model entirely if they weren't needed for visuals.",
      "5. Aggregation Tables: \nFor year-over-year charts, I created pre-aggregated tables in Power Query rather than relying on DAX summing millions of rows on the fly."
    ],
    tags: ["Power BI", "Data Viz", "DAX"],
    link: "#",
  },
  {
    title: "Building an AI-Powered Grievance Redressal System",
    date: "January 10, 2026",
    readTime: "8 min read",
    summary: "The full architectural breakdown behind NyayaSetu. How I utilized Natural Language Processing and Flask to automatically classify and route citizen complaints.",
    content: [
      "NyayaSetu was built to solve a massive bureaucratic bottleneck: manually reading, categorizing, and assigning thousands of citizen grievances to the correct government departments.",
      "The Architecture: \nWe built the backend on Python and Flask, ensuring lightweight, rapid API responses. The core intelligence relies on advanced NLP techniques to parse unstructured citizen complaints.",
      "Text Processing Pipeline: \n• Cleaning & Tokenization: Using NLTK to strip out stop words, stemming, and normalizing text.\n• Sentiment Analysis: Determining the urgency and tone of the complaint to flag critical issues automatically.\n• TF-IDF & Classification: Using a trained classifier to map the complaint text to specific departments (e.g., 'pothole' -> 'Public Works', 'bribe' -> 'Anti-Corruption').",
      "Impact: \nBy automating the routing process, NyayaSetu drops the initial processing time from several days down to under 500 milliseconds, fundamentally shifting how municipalities can respond to citizens."
    ],
    tags: ["NLP", "AI", "Flask"],
    link: "#",
  }
];

const BlogSection = () => {
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
    <section id="notes" className="py-24" ref={ref}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel label="notes & articles" />
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Technical <span className="gradient-text">writings</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
            View all notes
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 group cursor-pointer hover:-translate-y-2 hover:glow-blue transition-all duration-300 flex flex-col h-full"
              onClick={() => setSelected(i)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <BookOpen size={24} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-muted text-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Article Modal */}
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
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="glass-card p-6 sm:p-8 max-w-3xl w-full glow-blue relative overflow-hidden text-left m-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setSelected(null)} 
                      className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 bg-muted/80 backdrop-blur rounded-full text-foreground hover:bg-muted transition-colors z-10"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>

                    <div className="flex flex-col gap-3 mt-1">
                      <div className="flex gap-4 mb-1">
                        <span className="text-xs font-mono text-primary flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full">
                          <Calendar size={12} /> {posts[selected].date}
                        </span>
                        <span className="text-xs font-mono text-secondary flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full">
                          <Clock size={12} /> {posts[selected].readTime}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight pr-6">{posts[selected].title}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-6">
                        {posts[selected].tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-[15px]">
                        {posts[selected].content.map((paragraph, idx) => (
                          <p key={idx} className="whitespace-pre-line text-foreground/80">
                            {paragraph.includes(': \n') ? (
                              <>
                                <strong className="text-foreground text-lg font-bold block mb-1 mt-3">{paragraph.split(': \n')[0]}</strong>
                                <span className="block pl-3 sm:pl-4 border-l-2 border-primary/30 mt-1.5">{paragraph.split(': \n')[1]}</span>
                              </>
                            ) : (
                              paragraph
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
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

export default BlogSection;
