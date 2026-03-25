import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Github, Linkedin, Send, Instagram, MessageCircle } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="container max-w-2xl text-center">
        <SectionLabel label="contact" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Let's <span className="gradient-text">connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-10"
        >
          I'm always open to discussing data projects, ML ideas, or collaboration opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:reddycharan3133@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
            >
              <Mail size={18} className="text-primary" />
              reddycharan3133@gmail.com
            </a>
            <a
              href="tel:+916300771139"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
            >
              <Phone size={18} className="text-primary" />
              +91-6300771139
            </a>
          </div>

          <div className="flex gap-4 justify-center md:pb-4">
            <a
              href="https://github.com/charanreddy2205"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:-translate-y-1"
              title="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com/in/charanreddy2205"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-[#0A66C2] transition-all duration-300 hover:-translate-y-1"
              title="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-[#E4405F] transition-all duration-300 hover:-translate-y-1"
              title="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://wa.me/916300771139"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-[#25D366] transition-all duration-300 hover:-translate-y-1"
              title="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
          </div>

          <form 
            onSubmit={async (e: any) => {
              e.preventDefault();
              const form = e.target;
              const formData = new FormData(form);
              
              // You need a Web3Forms Access Key for this to send an actual email!
              // You can get one for free at https://web3forms.com/
              // Replace 'YOUR_ACCESS_KEY_HERE' with your actual key
              formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
              
              const promise = fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
              }).then(res => res.json());

              toast.promise(promise, {
                loading: 'Sending message...',
                success: (data) => {
                  if (data.success) {
                    form.reset();
                    return 'Message sent successfully!';
                  } else {
                    throw new Error(data.message || 'Failed to send');
                  }
                },
                error: 'Failed to send message. Have you added your Web3Forms Access Key?',
              });
            }}
            className="flex flex-col gap-4 mt-8 border border-white/5 bg-black/10 p-6 sm:p-8 rounded-2xl shadow-inner text-left"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground/90 mb-1">Send a Direct Message</h3>
              <p className="text-xs text-muted-foreground mb-4">Fill out the form below to send an email directly to my inbox.</p>
            </div>

            <input 
              name="name"
              type="text" 
              placeholder="Your Name" 
              className="bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm w-full"
              required
            />
            
            <input 
              name="email"
              type="email" 
              placeholder="Your Email Address" 
              className="bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm w-full"
              required
            />
            
            <input 
              name="subject"
              type="text" 
              placeholder="Title / Subject" 
              className="bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm w-full"
              required
            />
            
            <textarea 
              name="message"
              placeholder="Description / Message" 
              rows={4}
              className="bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm resize-none w-full"
              required
            ></textarea>
            
            <button 
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
            >
              <Send size={18} /> Send Email
            </button>
          </form>
        </motion.div>

        <p className="text-xs text-muted-foreground mt-12">
          © 2024 Charan Reddy Ranabothu. Built with passion and data.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
