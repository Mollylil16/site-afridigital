"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Lock, X } from "lucide-react";

interface Project {
  num: string;
  category: string;
  title: string;
  image: string;
  link: string;
  span: string;
  isPrivate: boolean;
}

export default function SelectedWorks() {
  const [activePrivateProject, setActivePrivateProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      num: "001/ABIDJAN",
      category: "ERP ODOO",
      title: "SFEC GROUP INDUSTRIE",
      image: "/images/sfec_mockup.webp",
      link: "https://sfec.ci",
      span: "md:col-span-2",
      isPrivate: false,
    },
    {
      num: "002/SANTE",
      category: "PLATEFORME",
      title: "MEDISTAND AFRICA",
      image: "/images/medistand_mockup.webp",
      link: "https://medistandafrica.com",
      span: "md:col-span-1",
      isPrivate: false,
    },
    {
      num: "003/API",
      category: "INFRASTRUCTURE",
      title: "W_API LRA SYSTEM",
      image: "/images/w_api_mockup.webp",
      link: "#",
      span: "md:col-span-1",
      isPrivate: true,
    },
    {
      num: "004/LOGISTIQUE",
      category: "DISPATCH STATION",
      title: "CORLAY DISPATCH HUB",
      image: "/images/corlay_mockup.webp",
      link: "#",
      span: "md:col-span-2",
      isPrivate: true,
    },
    {
      num: "005/E-COMMERCE",
      category: "VÊTEMENTS",
      title: "WARIGNAN STORE",
      image: "/images/warignan_mockup.webp",
      link: "https://warignan.com",
      span: "md:col-span-2",
      isPrivate: false,
    },
    {
      num: "006/LOGISTIQUE",
      category: "GESTION",
      title: "LBP LOGISTICS SYSTEM",
      image: "/images/lbp_mockup.webp",
      link: "#",
      span: "md:col-span-1",
      isPrivate: true,
    },
    {
      num: "007/AGRO",
      category: "GESTION DE FERME",
      title: "FARMTRACK PRO",
      image: "/images/farmtrack_mockup.webp",
      link: "#",
      span: "md:col-span-3",
      isPrivate: true,
    },
  ];

  return (
    <section id="work" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Small top label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
                Nos Réalisations
              </span>
            </div>
            {/* Big section title */}
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight uppercase">
              Projets Sélectionnés
            </h2>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="self-start md:self-end"
          >
            <span className="px-4 py-2 border border-white/10 text-secondary-light font-display text-xs tracking-widest uppercase rounded-full">
              Collection 2023 – 2025
            </span>
          </motion.div>
        </div>

        {/* Masonry / Alternating Zig-zag Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative overflow-hidden aspect-video md:aspect-auto md:h-[420px] group cursor-pointer ${project.span}`}
            >
              <a
                href={project.link}
                onClick={(e) => {
                  if (project.isPrivate) {
                    e.preventDefault();
                    setActivePrivateProject(project);
                  }
                }}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                {/* Grayscale Project Image */}
                <div className="absolute inset-0 bg-[#000000] z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out opacity-65 group-hover:opacity-90"
                  />
                </div>

                {/* Dark Vignette / Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 z-10 opacity-80 transition-opacity duration-300" />

                {/* Golden Overlay Hover State */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                {/* Card Info Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-30">
                  {/* Top: Serial Number / Category */}
                  <div className="flex justify-between items-start">
                    <span className="font-display text-xs md:text-sm tracking-widest text-primary font-bold">
                      {project.num} — {project.category}
                    </span>
                    {/* Hover Link / Lock Icon */}
                    {project.isPrivate ? (
                      <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-black flex items-center justify-center text-white transition-all duration-300">
                        <Lock size={14} />
                      </div>
                    ) : (
                      project.link !== "#" && (
                        <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-black flex items-center justify-center text-white transition-all duration-300">
                          <ArrowUpRight size={16} />
                        </div>
                      )
                    )}
                  </div>

                  {/* Bottom: Bold Title */}
                  <div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight uppercase group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.isPrivate ? (
                      <span className="inline-block text-xs font-display tracking-widest text-primary/70 group-hover:text-primary mt-2 transition-colors duration-300">
                        SYSTÈME PRIVÉ & SÉCURISÉ
                      </span>
                    ) : (
                      project.link !== "#" && (
                        <span className="inline-block text-xs font-display tracking-widest text-secondary group-hover:text-primary mt-2 transition-colors duration-300">
                          VISITER LE SITE
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Glowing border outline on hover */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-primary/30 transition-all duration-300 pointer-events-none z-40" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Animated Modal for Private Projects */}
      <AnimatePresence>
        {activePrivateProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            {/* Backdrop close area */}
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setActivePrivateProject(null)} 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-card w-full max-w-lg p-8 md:p-10 relative overflow-hidden bg-[#121212]/95 border border-white/10 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePrivateProject(null)}
                className="absolute top-6 right-6 text-secondary hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 animate-pulse">
                  <Lock size={28} />
                </div>

                <span className="font-display text-xs md:text-sm tracking-[0.2em] font-semibold text-primary uppercase mb-2">
                  {activePrivateProject.num} — {activePrivateProject.category}
                </span>

                <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight uppercase mb-6">
                  {activePrivateProject.title}
                </h3>

                <div className="w-full border-t border-white/5 pt-6 pb-2 text-left">
                  <h4 className="font-display font-bold text-xs uppercase text-white tracking-wider mb-3">
                    Confidentialité & Propriété Privée
                  </h4>
                  <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
                    Ce système (ERP Odoo, portail logistique interne ou API d&apos;infrastructure sécurisée) est la propriété exclusive de l&apos;entreprise cliente et n&apos;est pas accessible publiquement sur internet. AfriDigital s&apos;engage à respecter scrupuleusement le secret industriel et la sécurité des données de ses partenaires.
                  </p>
                </div>

                <button
                  onClick={() => setActivePrivateProject(null)}
                  className="w-full py-4 bg-primary text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary-light transition-all uppercase"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
