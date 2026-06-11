"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

// Inline LinkedIn SVG Icon for bulletproof SSR/CSR rendering
const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className="inline-block flex-shrink-0"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function TheCollective() {
  const team = [
    {
      name: "Omepieu Brunell",
      role: "Fondateur & CEO",
      linkedin: "https://www.linkedin.com/in/brunell-christ-axel",
    },
    {
      name: "Zouegna Blaise",
      role: "Dév Principal & Apporteur d'affaires",
    },
    {
      name: "Ohoucou K. Jean Noel",
      role: "Marketing & Designer UI/UX",
    },
    {
      name: "Koné Aboubakar Sidiq",
      role: "Stratège Marketing",
    },
    {
      name: "Djabia K. Vincent",
      role: "Développeur Full Stack",
    },
    {
      name: "Melvyn Tondoh",
      role: "Marketeur de profession",
    },
  ];

  return (
    <section id="agency" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-[1px] bg-primary" />
          <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
            Le Collectif
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight uppercase mb-16"
        >
          Architectes du Code & Partenaires
        </motion.h2>

        {/* 6-Member Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col group"
            >
              {/* Photo Box with solid borders and User placeholder icon */}
              <div className="relative aspect-square w-full mb-6 overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                <User className="w-16 h-16 text-white/30 group-hover:text-primary transition-colors duration-500" />
                
                {/* Micro amber overlay on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* LinkedIn Link overlay button */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-10 p-2 bg-black/60 border border-white/10 hover:border-primary hover:text-primary text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-none"
                  >
                     <LinkedInIcon />
                  </a>
                )}
              </div>

              {/* Name */}
              <h3 className="font-display font-bold text-lg text-white tracking-tight leading-snug mb-1.5 group-hover:text-primary transition-colors">
                {member.name}
              </h3>

              {/* Role in uppercase gold */}
              <span className="font-display text-xs tracking-widest text-primary font-semibold uppercase">
                {member.role}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
