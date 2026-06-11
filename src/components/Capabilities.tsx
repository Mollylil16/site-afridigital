"use client";

import { motion } from "framer-motion";
import { Layers, Smartphone, Hexagon, Cpu } from "lucide-react";

export default function Capabilities() {
  const services = [
    {
      icon: <Layers className="w-8 h-8 text-primary" />,
      title: "Développement Web",
      description: "Plateformes d'entreprise haute performance basées sur React, Node.js et des architectures cloud évolutives.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Applications Mobiles",
      description: "Applications natives iOS & Android adaptées aux exigences de connectivité et d'usage sur le continent.",
    },
    {
      icon: <Hexagon className="w-8 h-8 text-primary" />,
      title: "Solutions ERP",
      description: "Développement sur mesure et intégrations Odoo adaptées à la gestion industrielle et logistique.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Matériel & E-Commerce",
      description: "Fourniture de matériel informatique professionnel et conception de boutiques en ligne performantes.",
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-8 h-[1px] bg-primary" />
          <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
            Nos compétences
          </span>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col items-start text-left min-h-[320px] justify-between group cursor-pointer"
            >
              <div className="flex flex-col items-start w-full">
                {/* Icon wrapper with hover scaling */}
                <div className="mb-8 p-3 rounded-none bg-primary/5 border border-primary/10 group-hover:border-primary/30 transition-colors">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-4 uppercase">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-secondary text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative accent bottom bar */}
              <div className="w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 mt-6" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
