"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendCollaborationProposal } from "@/lib/emailService";

const schema = z.object({
  fullName: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Veuillez saisir une adresse email valide."),
  collabTypes: z.array(z.string()).min(1, "Veuillez choisir au moins un type de collaboration."),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères."),
  websiteUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const COLLAB_OPTIONS = [
  { value: "technical", label: "Partenariat technique" },
  { value: "business", label: "Apport d'affaires" },
  { value: "subcontracting", label: "Sous-traitance" },
  { value: "other", label: "Autre" },
];

export default function Collaboration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      collabTypes: [],
    },
  });

  const handleCheckboxChange = (value: string) => {
    let updatedTypes = [...selectedTypes];
    if (updatedTypes.includes(value)) {
      updatedTypes = updatedTypes.filter((t) => t !== value);
    } else {
      updatedTypes.push(value);
    }
    setSelectedTypes(updatedTypes);
    setValue("collabTypes", updatedTypes);
    if (updatedTypes.length > 0) {
      clearErrors("collabTypes");
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Honeypot spam verification
      if (data.websiteUrl) {
        setTimeout(() => {
          setSubmitSuccess(true);
          setSelectedTypes([]);
          reset();
          setIsSubmitting(false);
        }, 1000);
        return;
      }

      const typeLabels = data.collabTypes
        .map((val) => COLLAB_OPTIONS.find((opt) => opt.value === val)?.label)
        .join(", ");

      const result = await sendCollaborationProposal({
        fullName: data.fullName,
        email: data.email,
        collabType: typeLabels,
        message: data.message,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setSelectedTypes([]);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(result.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      setSubmitError("Impossible d'envoyer la proposition de collaboration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="collaboration" className="relative py-24 md:py-32 border-t border-white/5 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
              Partenariat
            </span>
            <div className="w-8 h-[1px] bg-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            Collaborer avec nous
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base"
          >
            Saisissez l&apos;opportunité de collaborer avec AfriDigital. Complétez notre formulaire de proposition technique ou d&apos;affaires.
          </motion.p>
        </div>

        {/* Glassmorphic Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <CheckCircle size={56} className="text-emerald-500 mb-6 animate-pulse" />
                <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">
                  Proposition reçue !
                </h3>
                <p className="text-secondary max-w-md text-sm md:text-base leading-relaxed">
                  Merci pour votre proposition. Notre équipe l&apos;étudiera dans les plus brefs délais et reviendra vers vous par email.
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

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Nom & Prénom
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName")}
                      className="bg-white/5 border border-white/10 px-4 py-3.5 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                      placeholder="e.g. Zouegna Blaise"
                    />
                    {errors.fullName && (
                      <span className="text-xs text-rose-500 font-medium">{errors.fullName.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Adresse Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="bg-white/5 border border-white/10 px-4 py-3.5 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                      placeholder="e.g. blaise@example.com"
                    />
                    {errors.email && (
                      <span className="text-xs text-rose-500 font-medium">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Collaboration Type Checkboxes */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                    Type de Collaboration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    {COLLAB_OPTIONS.map((option) => (
                      <div
                        key={option.value}
                        role="checkbox"
                        aria-checked={selectedTypes.includes(option.value)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            handleCheckboxChange(option.value);
                          }
                        }}
                        onClick={() => handleCheckboxChange(option.value)}
                        className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
                          selectedTypes.includes(option.value)
                            ? "bg-primary/5 border-primary text-primary"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border flex items-center justify-center text-[10px] font-bold ${
                            selectedTypes.includes(option.value)
                              ? "border-primary bg-primary text-black"
                              : "border-white/30"
                          }`}
                        >
                          {selectedTypes.includes(option.value) && "✓"}
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    ))}
                  </div>
                  {errors.collabTypes && (
                    <span className="text-xs text-rose-500 font-medium mt-1">{errors.collabTypes.message}</span>
                  )}
                </div>

                {/* Message description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                    Message / Description de la Proposition
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="bg-white/5 border border-white/10 px-4 py-3.5 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors resize-none"
                    placeholder="Décrivez votre projet, vos idées de collaboration ou votre modèle d'apport d'affaires..."
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
                      Envoyer la proposition <Send size={14} />
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
