"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 py-16 text-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: Brand Info */}
        <div className="md:col-span-2 flex flex-col items-start text-left">
          <a href="#" className="flex items-center gap-3 mb-6 group">
            <div className="relative w-8 h-8">
              <Image
                src="/images/afridigital logo3.1 (5).png"
                alt="AfriDigital Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-white group-hover:text-primary transition-colors">
              AFRIDIGITAL
            </span>
          </a>
          <p className="text-sm leading-relaxed max-w-sm">
            Une agence technologique premium basée en Côte d&apos;Ivoire, spécialisée dans la conception d&apos;applications web, mobiles et de systèmes de gestion fiables et sécurisés.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col items-start text-left">
          <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest mb-6">
            Plan du site
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, "#services")}
                className="hover:text-primary transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="hover:text-primary transition-colors"
              >
                Réalisations
              </a>
            </li>
            <li>
              <a
                href="#agency"
                onClick={(e) => handleScrollTo(e, "#agency")}
                className="hover:text-primary transition-colors"
              >
                L&apos;Agence
              </a>
            </li>
            <li>
              <a
                href="#connect"
                onClick={(e) => handleScrollTo(e, "#connect")}
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col items-start text-left">
          <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest mb-6">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="text-secondary-light">
              Abidjan, Côte d&apos;Ivoire
            </li>
            <li>
              <a href="mailto:afridigital01@gmail.com" className="hover:text-primary transition-colors">
                afridigital01@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/2250789886013" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                +225 07 89 88 60 13
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider uppercase font-display">
        <span>
          &copy; {currentYear} AfriDigital. Tous droits réservés.
        </span>
        <span className="text-white/30">
          Conçu & Développé à Abidjan
        </span>
      </div>
    </footer>
  );
}
