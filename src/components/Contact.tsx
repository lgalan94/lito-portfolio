import React from "react";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Let’s Build Something Great
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
          Whether you’re looking to collaborate, hire, or just say hi — I’d love
          to hear from you. Let’s create something impactful together!
        </p>

        {/* Contact Form */}
        <form
          action="https://formspree.io/f/your-form-id" // replace with your Formspree endpoint or leave blank for now
          method="POST"
          className="bg-slate-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-2xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all"
              required
            />
          </div>
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg outline-none border border-slate-600 focus:border-cyan-500 transition-all mb-6"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-10 rounded-full transition-transform duration-300 hover:scale-105 shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Subtext */}
        <p className="mt-12 text-sm text-slate-500">
          Or email me directly at{" "}
          <a
            href="mailto:litogalanjr@example.com"
            className="text-cyan-400 hover:underline"
          >
            litojrgalan@gmail.com
          </a>
        </p>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
      </div>
    </section>
  );
};

export default Contact;
