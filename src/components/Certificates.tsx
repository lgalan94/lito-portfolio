import React, { useState, useEffect, useMemo } from 'react';
import Card from './ui/Card';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { getAllCertificates } from '../services/certificateApi';
import type { Certificate } from '../types';
import { ExternalLink, Github } from 'lucide-react';

const Certificates: React.FC = () => {
  
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCertificateId, setExpandedCertificateId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getAllCertificates();
        setCertificates(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const certificateCardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
      },
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const toggleDescription = (id: string) => {
    setExpandedCertificateId((prev) =>
      prev === id ? null : id
    );
  };

  // -------------------------
  // ⭐ Skeleton Loader
  // -------------------------
  const SkeletonCard = () => (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* Image */}
      <div className="w-full h-52 sm:h-44 bg-slate-700/40"></div>

      {/* Issuer Badge */}
      <div className="absolute top-4 left-4 w-24 h-6 bg-slate-700/50 rounded-full"></div>

      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-5 w-2/3 bg-slate-700/40 rounded"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-700/40 rounded"></div>
          <div className="h-3 w-4/5 bg-slate-700/40 rounded"></div>
          <div className="h-3 w-3/5 bg-slate-700/40 rounded"></div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5">
          <div className="h-6 w-20 bg-slate-700/40 rounded-full"></div>
          <div className="h-10 w-32 bg-slate-700/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <section id="certificates" className="py-20 md:py-32">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Certificates
          </span>
        </motion.h2>

        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 mb-12 rounded-full" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  if (!certificates.length) {
    return (
      <p className="text-center text-white">
        No certificates found.
      </p>
    );
  }

  return (
   <section id="certificates" className="py-20 md:py-32">
     <div className="max-w-7xl mx-auto px-4 text-center">

       <motion.h2
         className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
         initial={{ opacity: 0, y: -20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
       >
         <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
           Certificates
         </span>
       </motion.h2>

       <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 mb-12 rounded-full" />

       <motion.div
         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-20 gap-8"
         variants={containerVariants}
         initial="hidden"
         animate="visible"
       >
         <AnimatePresence>
           {certificates.map((certificate) => {
             const isExpanded =
               expandedCertificateId === certificate._id;

             return (
               <motion.div
                 key={certificate._id}
                 variants={certificateCardVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 layout
               >
                 <Card className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 group">

                   {/* IMAGE */}
                   <div className="relative overflow-hidden rounded-t-2xl">
                     <img
                       src={certificate.imageUrl}
                       alt={certificate.title}
                       className="w-full h-52 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                     />

                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   </div>

                   {/* CONTENT */}
                   <div className="p-6 flex flex-col flex-grow text-left">

                     <h3 className="text-lg sm:text-xl font-bold text-white">
                       {certificate.title}
                     </h3>

                     <p className="text-cyan-400 text-sm font-medium mt-1">
                       {certificate.issuer}
                     </p>

                     <p className="text-slate-500 text-xs mb-3">
                       {new Date(
                         certificate.issueDate
                       ).toLocaleDateString()}
                     </p>

                     <motion.p
                       layout
                       className={`text-slate-300 text-sm sm:text-base mb-3 ${
                         isExpanded ? "" : "line-clamp-3"
                       }`}
                     >
                       {certificate.description}
                     </motion.p>

                     <button
                       onClick={() =>
                         toggleDescription(certificate._id)
                       }
                       className="text-cyan-400 text-xs sm:text-sm font-medium hover:underline self-start mb-5"
                     >
                       {isExpanded
                         ? "Show Less"
                         : "Show More"}
                     </button>

                     {certificate.credentialUrl && (
                       <a
                         href={certificate.credentialUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="mt-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all"
                       >
                         <ExternalLink size={16} />
                         View Credential
                       </a>
                     )}
                   </div>
                 </Card>
               </motion.div>
             );
           })}
         </AnimatePresence>
       </motion.div>
     </div>
   </section>
  );
};

export default Certificates;
