"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactInquiry } from "@/lib/emailService";

const schema = z.object({
  fullName: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  projectScope: z.enum(["Web", "Mobile", "ERP", "E-commerce", "Other"], {
    message: "Veuillez choisir un domaine de projet.",
  }),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères."),
  websiteUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Connect() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Honeypot spam verification
      if (data.websiteUrl) {
        setTimeout(() => {
          setSubmitSuccess(true);
          reset();
          setIsSubmitting(false);
        }, 1000);
        return;
      }

      const result = await sendContactInquiry({
        fullName: data.fullName,
        projectScope: data.projectScope,
        message: data.message,
      });

      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(result.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      setSubmitError("Impossible d'envoyer votre message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom SVG WhatsApp Icon
  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className="inline-block flex-shrink-0"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.002 5.291 5.3 0 11.799 0c3.148.001 6.107 1.227 8.331 3.455 2.222 2.229 3.443 5.19 3.44 8.34-.004 6.505-5.302 11.796-11.8 11.796-1.995-.001-3.956-.5-5.69-1.448L0 24zm6.59-20.315c-.249-.55-.51-.56-.747-.57-.193-.008-.415-.011-.637-.011-.223 0-.585.083-.892.417-.306.333-1.17 1.142-1.17 2.783 0 1.64 1.196 3.22 1.364 3.447.167.227 2.308 3.67 5.688 4.994 2.809 1.102 3.379.883 3.993.827.613-.056 1.979-.809 2.257-1.59.278-.781.278-1.449.195-1.59-.083-.141-.306-.227-.64-.394-.333-.167-1.979-.974-2.285-1.085-.306-.111-.53-.167-.75.167-.223.333-.863 1.086-1.058 1.309-.195.223-.39.249-.724.083-.334-.167-1.409-.519-2.685-1.655-1.002-.892-1.677-1.994-1.874-2.328-.195-.333-.02-.513.147-.679.15-.15.333-.389.5-.583.167-.195.223-.333.334-.556.111-.222.056-.417-.028-.583-.083-.167-.747-1.797-1.028-2.476z" />
    </svg>
  );

  return (
    <section id="connect" className="relative py-24 md:py-32 border-t border-white/5 bg-[#0D0D0D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,166,35,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left text column */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
              Contactez-nous
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-8"
          >
            Bâtissons <br />
            l&apos;avenir.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary font-sans text-base md:text-lg leading-relaxed mb-12 max-w-md"
          >
            Prêt à digitaliser vos opérations ? Basé à Abidjan, actif à l&apos;international. Contactez-nous dès aujourd&apos;hui pour une consultation gratuite.
          </motion.p>

          {/* WhatsApp CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full sm:w-auto"
          >
            <a
              href="https://wa.me/2250789886013"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white font-display font-bold text-xs tracking-wider rounded-none hover:bg-emerald-500 active:bg-emerald-700 transition-all uppercase border border-emerald-600"
            >
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Right Contact Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7 w-full glass-card p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <CheckCircle size={56} className="text-emerald-500 mb-6 animate-pulse" />
                <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">
                  Message envoyé !
                </h3>
                <p className="text-secondary max-w-sm text-sm md:text-base leading-relaxed">
                  Votre message a bien été envoyé. L&apos;équipe d&apos;AfriDigital vous contactera très rapidement.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* Form submit error notice */}
                {submitError && (
                  <div className="bg-rose-950/40 border border-rose-500/30 p-4 flex items-center gap-3 text-rose-200 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0 text-rose-400" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Honeypot field for spam prevention */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("websiteUrl")}
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                    Nom complet
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    className="bg-white/5 border border-white/10 px-4 py-3.5 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                    placeholder="ex: Omepieu Brunell"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-rose-500 font-medium">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Project Scope Selection */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectScope" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                    Type de Projet
                  </label>
                  <div className="relative w-full">
                    <select
                      id="projectScope"
                      {...register("projectScope")}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3.5 pr-10 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#121212] text-white">Sélectionnez un domaine...</option>
                      <option value="Web" className="bg-[#121212] text-white">Développement Web</option>
                      <option value="Mobile" className="bg-[#121212] text-white">Développement Mobile</option>
                      <option value="ERP" className="bg-[#121212] text-white">ERP / Logiciel sur mesure</option>
                      <option value="E-commerce" className="bg-[#121212] text-white">E-commerce</option>
                      <option value="Other" className="bg-[#121212] text-white">Autre projet</option>
                    </select>
                    {/* Gold Chevron Down Arrow */}
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.projectScope && (
                    <span className="text-xs text-rose-500 font-medium">{errors.projectScope.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="bg-white/5 border border-white/10 px-4 py-3.5 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors resize-none"
                    placeholder="Décrivez-nous les objectifs et exigences de votre projet..."
                  />
                  {errors.message && (
                    <span className="text-xs text-rose-500 font-medium">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 py-4 bg-primary text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary-light active:bg-primary-dark transition-all duration-200 uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer le message <Send size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
