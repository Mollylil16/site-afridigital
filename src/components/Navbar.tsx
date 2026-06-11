"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["services", "work", "agency", "connect"];
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy Logic
      const scrollPosition = window.scrollY + 200; // 200px offset for early highlight
      let currentSection = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Réalisations", href: "#work" },
    { name: "L'Agence", href: "#agency" },
    { name: "Contact", href: "#connect" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md py-4 border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/images/afridigital logo3.1 (5).png"
                alt="AfriDigital Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-widest text-white group-hover:text-primary transition-colors">
              AFRIDIGITAL
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = link.href === `#${activeSection}`;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-sm tracking-wide transition-colors font-medium ${
                    isActive ? "text-primary font-bold" : "text-secondary-light hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* START PROJECT CTA */}
          <div className="hidden md:block">
            <a
              href="#connect"
              onClick={(e) => handleScrollTo(e, "#connect")}
              className="px-6 py-2.5 bg-primary text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary-light active:bg-primary-dark transition-all duration-200 uppercase inline-block border border-primary"
            >
              Lancer un projet
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] md:hidden left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-white/5 py-8 px-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => {
              const isActive = link.href === `#${activeSection}`;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-base font-medium tracking-wide transition-colors py-1 ${
                    isActive ? "text-primary font-bold" : "text-secondary-light hover:text-primary"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#connect"
              onClick={(e) => handleScrollTo(e, "#connect")}
              className="w-full text-center px-6 py-3 bg-primary text-black font-display font-bold text-sm tracking-wider rounded-none hover:bg-primary-light transition-all uppercase block border border-primary"
            >
              Lancer un projet
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
