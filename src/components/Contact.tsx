import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { Mail, Send, Github, Linkedin, Facebook, Gitlab } from "lucide-react";
import api from "../services/api";
import { getHeroData } from "../services/heroApi";
import type { HeroData } from "../types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70 } },
};

// 🧩 Map social link keys to Lucide icons
const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <Github size={22} />,
  linkedin: <Linkedin size={22} />,
  facebook: <Facebook size={22} />,
  gitlab: <Gitlab size={22} />,
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    messageBody: "",
  });
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoadingHero, setIsLoadingHero] = useState(true);

  // 🧠 Fetch hero data for social links
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err: any) {
        console.error("Failed to load hero data:", err);
        toast.error(err.message || "Failed to load contact info.");
      } finally {
        setIsLoadingHero(false);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/messages/send", formData);
      setTimeout(() => {
        toast.success("Message sent successfully!", { duration: 3000 });
        setFormData({ senderName: "", senderEmail: "", subject: "", messageBody: "" });
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      toast.error(err.response?.data?.message || "Failed to send message.");
    }
  };

  const socialLinks = Object.entries(heroData?.socialLinks || {}).filter(([_, url]) => url);

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* ✉️ Left Side: Intro + Dynamic Social Links */}
          <motion.div variants={itemVariants} className="text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let’s Connect ✨
            </h2>
            <p className="text-slate-400 max-w-md mx-auto md:mx-0">
              Whether you’re looking to collaborate, hire, or just say hi — I’d love to hear from you.
              Drop me a message, and I’ll get back to you as soon as possible.
            </p>

            <div className="flex justify-center md:justify-start gap-5 pt-4 flex-wrap">
              {!isLoadingHero && socialLinks.length > 0 ? (
                socialLinks.map(([key, url]) => (
                  <motion.a
                    key={key}
                    href={key === "email" ? `mailto:${url}` : url!}
                    target={key === "email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-400 transition-all"
                    whileHover={{ scale: 1.2 }}
                  >
                    {SOCIAL_ICON_MAP[key] || <Mail size={22} />}
                  </motion.a>
                ))
              ) : (
                <p className="text-slate-500 text-sm">Loading social links...</p>
              )}
            </div>
          </motion.div>

          {/* 🧾 Right Side: Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/70 rounded-2xl p-8 shadow-xl relative"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 outline-none text-white transition-all"
                required
              />
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 outline-none text-white transition-all"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 outline-none text-white transition-all"
              required
            />

            <textarea
              name="messageBody"
              value={formData.messageBody}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 outline-none text-white transition-all resize-none"
              required
            />

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.03] ${
                loading ? "opacity-80 cursor-not-allowed" : "hover:shadow-cyan-500/30"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
