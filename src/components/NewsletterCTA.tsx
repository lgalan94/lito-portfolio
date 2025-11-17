import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "../services/api";

const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      toast.success("Subscribed successfully!", { duration: 3000 });
      setEmail("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section
      id="contact"
      className="relative py-24 bg-slate-900 text-white overflow-hidden"
    >
      {/* Gradient Glow Background */}
      <motion.div
        className="absolute -inset-16 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-3xl"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Stay Updated 📩
        </motion.h2>

        <motion.p
          className="text-slate-300 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Subscribe to my newsletter and get the latest updates about my projects,
          articles, and web development tips.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="relative flex flex-col sm:flex-row justify-center gap-4 bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 shadow-lg z-10"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 text-white outline-none transition-all"
            required
          />
          <motion.button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] ${
              loading ? "opacity-80 cursor-not-allowed" : "hover:shadow-cyan-500/30"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
