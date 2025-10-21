import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import api from "../services/api";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  },
};
const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70 } },
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    messageBody: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/messages/send", formData);

      // Add a small smooth delay before showing toast
      setTimeout(() => {
        toast.success("Message sent successfully!", {
          duration: 3000,
        });
        setFormData({ senderName: "", senderEmail: "", subject: "", messageBody: "" });
        setLoading(false);
      }, 1200); // 1.2s delay for smooth feedback
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      toast.error(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-4">
            Let’s Build Something Great 🚀
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Whether you’re looking to collaborate, hire, or just say hi — I’d love to hear from you.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-slate-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-2xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all"
                required
              />
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all mb-6"
              required
            />
            <textarea
              name="messageBody"
              value={formData.messageBody}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all mb-6"
              required
            />

            <motion.button
              type="submit"
              disabled={loading}
              className={`relative overflow-hidden bg-cyan-500 text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md
                ${loading ? "cursor-not-allowed opacity-80" : "hover:bg-cyan-600"}
              `}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                key={loading ? "sending" : "send"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.span>
            </motion.button>
          </motion.form>

          <motion.p variants={itemVariants} className="mt-12 text-sm text-slate-500">
            Or email me directly at{" "}
            <a href="mailto:litojrgalan@gmail.com" className="text-cyan-400 hover:underline">
              litojrgalan@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
