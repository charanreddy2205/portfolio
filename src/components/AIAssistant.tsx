import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const predefinedQA = [
  {
    q: "Tell me about NyayaSetu",
    a: "NyayaSetu is an AI-powered Smart Grievance Redressal System I built. It uses NLP for sentiment analysis and automated categorization of citizen complaints, intelligently routing them for faster resolution. Built with Python, Flask, and advanced NLP techniques.",
  },
  {
    q: "What ML models have you built?",
    a: "My highlight is the Agricultural Market Price Prediction model achieving 96.7% R² accuracy. I used ensemble methods on historical data to help farmers make informed selling decisions. I've also worked on NLP models for text classification and sentiment analysis.",
  },
  {
    q: "What tools do you use?",
    a: "My core toolkit includes Python (pandas, scikit-learn, matplotlib), SQL for data querying, Power BI for interactive dashboards, and Excel for business analytics. I'm also experienced with Flask, Seaborn, and various ML frameworks.",
  },
  {
    q: "What are your achievements?",
    a: "I secured 2nd Place at the Startup Pitch Arena and ranked in the Top 40% at my university. I hold certifications from NPTEL (Privacy & Security), FreeCodeCamp (Web Design), and courses in Python ML and AI from Udemy.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach me at reddycharan3133@gmail.com or call +91-6300771139. I'm also available on GitHub and LinkedIn. I'm always open to discussing data projects and collaboration opportunities!",
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm Charan's AI assistant. Ask me about his projects, skills, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Find best match
    const lower = text.toLowerCase();
    
    setTimeout(() => {
      let response = "I'm not exactly sure how to answer that! 😅 Ask me about Charan's projects (like NyayaSetu), his machine learning models, tech stack, or how to contact him!";

      // Extract clean words for exact matching
      const hasGreeting = lower.match(/\b(hi+|hello+|hey+|heya|greetings|morning|afternoon|sup|howdy)\b/i);
      const isBasicQ = lower.includes("how are you") || lower.includes("what's up") || lower.includes("whats up") || lower.includes("how do you do") || lower.includes("how are things");

      // Pattern matching
      if (isBasicQ) {
        response = "I'm doing great, thanks for asking! 🤖 I'm here to answer any questions you have about Charan's data projects, skills, or experience. What would you like to know?";
      } else if (hasGreeting) {
        response = "Hello there! 👋 I'm Charan's AI. Want to hear about his ML projects, skills, or get his contact info?";
      } else if (lower.includes("project") || lower.includes("portfolio") || lower.includes("work")) {
        response = "Charan has built several impressive data projects! His highlights include NyayaSetu (an AI Grievance Redressal System), an Agricultural Market Price Prediction model (96.7% accuracy), a Telangana Horticulture Power BI Dashboard, and a Rainfall Analysis EDA. Which one would you like to know more about?";
      } else if (lower.includes("skill") || lower.includes("tech") || lower.includes("tool") || lower.includes("language") || lower.includes("framework")) {
        response = "Charan's technical arsenal includes programming (Python, SQL, C, C++, Java), Data & ML (Pandas, Scikit-learn, TensorFlow, PyTorch), and BI Tools (Power BI, Excel, Tableau). He's also experienced with web frameworks like Flask and React!";
      } else if (lower.includes("education") || lower.includes("degree") || lower.includes("university") || lower.includes("college") || lower.includes("study")) {
        response = "Charan holds a Bachelor of Technology in Computer Science and Engineering from Vardhaman College of Engineering, with a CGPA of 8.01. Prior to that, he completed his Intermediate at Narayana Junior College and SSC at St. Ann's High School.";
      } else if (lower.includes("about") || lower.includes("who is charan") || lower.includes("background")) {
        response = "Charan Reddy Ranabothu is a passionate Data Analyst and ML Enthusiast. He specializes in transforming complex data into actionable insights, building predictive models, and creating interactive dashboards. He loves solving real-world challenges!";
      } else if (lower.includes("experience") || lower.includes("intern") || lower.includes("work history")) {
        response = "Charan is actively seeking roles where he can apply his extensive skills in Data Analysis and Machine Learning. He's built multiple end-to-end projects demonstrating production-ready capabilities. Check out his dashboard and timeline sections below!";
      } else if (lower.includes("nyaya") || lower.includes("grievance")) {
        response = predefinedQA[0].a;
      } else if (lower.includes("ml") || lower.includes("model") || lower.includes("predict")) {
        response = predefinedQA[1].a;
      } else if (lower.includes("achiev") || lower.includes("certif") || lower.includes("award") || lower.includes("rank")) {
        response = predefinedQA[3].a;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("hire") || lower.includes("phone")) {
        response = predefinedQA[4].a;
      } else if (lower.includes("resume") || lower.includes("cv")) {
        response = "You can download Charan's full resume directly from the 'Download Resume' button at the top of the page in the Hero section!";
      } else if (lower.includes("dashboard") || lower.includes("excel") || lower.includes("power bi") || lower.includes("visual")) {
        response = "Charan builds amazing dashboards! Check out his Telangana Horticulture Power BI Dashboard and his Excel Business Analytics Dashboard in the Projects section.";
      } else if (lower.includes("who are you") || lower.includes("what are you") || lower.includes("name")) {
        response = "I am Charan's personal AI Assistant built right into this portfolio! I'm here to answer questions about his skills and projects.";
      } else if (lower.includes("thanks") || lower.includes("thank you")) {
        response = "You're very welcome! Let me know if you need anything else.";
      } else if (lower.includes("bye") || lower.includes("goodbye") || lower.includes("see ya")) {
        response = "Goodbye! Thanks for visiting Charan's portfolio. Don't hesitate to reach out to him directly!";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800); // 1-1.8 seconds typing delay for realism
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center glow-blue hover:scale-110 transition-transform"
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card rounded-2xl overflow-hidden border border-glass-border flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-card/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot size={16} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ask me anything</p>
                <p className="text-[10px] text-muted-foreground">About Charan's work & skills</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={12} className="text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 justify-start mt-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={12} className="text-primary" />
                  </div>
                  <div className="px-3 py-3 rounded-xl bg-muted text-foreground rounded-bl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {predefinedQA.slice(0, 3).map((qa) => (
                <button
                  key={qa.q}
                  onClick={() => handleSend(qa.q)}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {qa.q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask about projects, skills..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => handleSend(input)}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                aria-label="Send message"
                title="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
