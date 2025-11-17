import { useState } from "react";
import { motion, type Variants } from "framer-motion";

type CaseStudyData = {
  title: string;
  tagline: string;
  overview: string;
  tech: string[];
  images: string[];
  demoVideo?: string;
  apiSample?: object;
  liveLink?: string;
  githubLink?: string;
  challenges: string[];
  learnings: string[];
};

const DEFAULT_DATA: CaseStudyData = {
  title: "Portfolio Content Management System (CMS)",
  tagline: "A custom MERN CMS that powers litoportfolio.space — edit content without redeploys.",
  overview: "A secure, scalable admin dashboard that allows instant updates for projects, skills, hero section, and contact data. Built for non-technical content updates and iterative portfolio improvements.",
  tech: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express", "MongoDB", "Mongoose", "Cloudinary", "JWT", "Vercel / Render"],
  images: [
    "https://via.placeholder.com/600x400?text=CMS+Dashboard",
    "https://via.placeholder.com/600x400?text=Project+Editor",
    "https://via.placeholder.com/600x400?text=Skills+Manager"
  ],
  demoVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
  apiSample: {
    hero: { fullName: "Your Name", jobTitle: "Full Stack Developer" },
    projects: [
      { id: "1", title: "E-Commerce", slug: "ecommerce", published: true },
      { id: "2", title: "Portfolio CMS", slug: "portfolio-cms", published: true }
    ],
    skills: {
      Frontend: [{ name: "React", icon: "https://via.placeholder.com/32?text=React" }],
      Backend: [{ name: "Node.js", icon: "https://via.placeholder.com/32?text=Node" }]
    }
  },
  liveLink: "https://www.litoportfolio.space",
  githubLink: "https://github.com/yourusername/portfolio-cms",
  challenges: [
    "CORS configuration between CMS and frontend hosts",
    "Secure authentication and token handling",
    "Image upload pipeline with validation and resizing",
    "Designing flexible content models for varied project types"
  ],
  learnings: [
    "Designing scalable REST APIs and data models",
    "Implementing secure JWT authentication flows",
    "Integrating Cloudinary with a Node.js backend",
    "Building a production-ready admin UX for non-technical users"
  ]
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } }
};

export default function ModernCaseStudy({ data = DEFAULT_DATA }: { data?: CaseStudyData }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"challenges" | "learnings" | "api">("challenges");
  const [currentImage, setCurrentImage] = useState(0);

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data.apiSample, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-cyan-900 via-slate-950 to-slate-900">
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-center mb-16 px-4">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-white mb-4">{data.title}</motion.h2>
        <motion.p variants={itemVariants} className="text-cyan-300 max-w-2xl mx-auto">{data.tagline}</motion.p>
        <motion.div variants={itemVariants} className="mt-6 flex justify-center gap-4">
          {data.liveLink && <a href={data.liveLink} target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-semibold transition">View Live</a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-semibold transition">View Code</a>}
        </motion.div>
      </motion.div>

      {/* Content Grid */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Overview */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Overview</h3>
            <p className="text-slate-300">{data.overview}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-cyan-900/40 text-cyan-200 rounded-full text-xs">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Quick Facts</h3>
            <ul className="text-slate-300 space-y-1">
              <li><strong>Type:</strong> Admin Dashboard / CMS</li>
              <li><strong>Stack:</strong> MERN + Cloudinary + JWT</li>
              <li><strong>Role:</strong> Full Stack Developer (Solo)</li>
              <li><strong>Deployment:</strong> Render / Vercel</li>
            </ul>
          </div>
        </motion.div>

        {/* Right: Carousel */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            {data.images.map((img, i) => (
              <img key={i} src={img} alt={`Screenshot ${i}`} className={`w-full h-64 object-cover transition-all duration-500 ${i === currentImage ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`} />
            ))}
            {data.demoVideo && (
              <video
                src={data.demoVideo}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-64 object-cover rounded-3xl transition-all duration-500 ${currentImage === data.images.length ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}
              />
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {data.images.map((_, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} className={`w-3 h-3 rounded-full ${currentImage === i ? "bg-cyan-500" : "bg-slate-500"}`}></button>
              ))}
              {data.demoVideo && <button onClick={() => setCurrentImage(data.images.length)} className={`w-3 h-3 rounded-full ${currentImage === data.images.length ? "bg-cyan-500" : "bg-slate-500"}`}></button>}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs: Challenges / Learnings / API */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto mt-16">
        <div className="flex justify-center gap-4 mb-6">
          {["challenges", "learnings", "api"].map((tab) => (
            <button key={tab} className={`px-4 py-2 font-semibold rounded-full transition ${activeTab === tab ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300"}`} onClick={() => setActiveTab(tab as any)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
          {activeTab === "challenges" && (
            <ul className="list-disc list-inside text-slate-300 space-y-2">{data.challenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
          )}
          {activeTab === "learnings" && (
            <ul className="list-disc list-inside text-slate-300 space-y-2">{data.learnings.map((l, i) => <li key={i}>{l}</li>)}</ul>
          )}
          {activeTab === "api" && (
            <>
              <button onClick={copyJSON} className="mb-4 px-3 py-1 rounded-full bg-cyan-500 text-white">{copied ? "Copied" : "Copy JSON"}</button>
              <pre className="overflow-auto max-h-64 text-xs text-slate-300 bg-slate-900 p-4 rounded">{JSON.stringify(data.apiSample, null, 2)}</pre>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
