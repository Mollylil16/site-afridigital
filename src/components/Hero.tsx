"use client";

import { motion } from "framer-motion";
import AfricaFingerprint from "./AfricaFingerprint";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 flex items-center overflow-hidden">
      {/* Background radial gradient for subtle lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,166,35,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Top Label with golden accent line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
              Identité & Innovation
            </span>
          </motion.div>

          {/* High-impact Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-8 uppercase"
          >
            Nous bâtissons <br />
            <span className="text-primary">des solutions pour</span> <br />
            l&apos;avenir de <br />
            l&apos;afrique.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-secondary-light font-sans text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            Une agence de développement premium basée en Côte d&apos;Ivoire, spécialisée dans les systèmes mobiles et web haute performance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 md:gap-8"
          >
            {/* CTA button */}
            <button
              onClick={() => handleScrollTo("#work")}
              className="px-8 py-3.5 bg-primary text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary-light active:bg-primary-dark transition-all duration-200 uppercase border border-primary"
            >
              Découvrir nos projets
            </button>

            {/* Systems Online status */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs md:text-sm font-display tracking-widest text-white uppercase font-medium">
                Systèmes en ligne
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Interactive SVG Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <AfricaFingerprint />
        </motion.div>

      </div>
    </section>
  );
}
