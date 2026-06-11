"use client";

import { useEffect, useState } from "react";
import { motion as m, AnimatePresence as AP } from "framer-motion";
import { Star, Quote, X, MessageSquare, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { fetchApprovedTestimonials, submitTestimonial, Testimonial } from "@/lib/testimonialsService";

const schema = z.object({
  clientName: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  company: z.string().min(2, "L'entreprise doit comporter au moins 2 caractères."),
  project: z.string().min(2, "Veuillez préciser le projet réalisé."),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères."),
});

type FormData = z.infer<typeof schema>;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const loadTestimonials = async () => {
    const data = await fetchApprovedTestimonials();
    setTestimonials(data);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await submitTestimonial({
        client_name: data.clientName,
        company: data.company,
        project: data.project,
        message: data.message,
        rating: rating,
      });

      if (res.success) {
        setSubmitSuccess(true);
        // Reload testimonials in case of local fallback (so they can see it instantly)
        setTimeout(() => {
          loadTestimonials();
          reset();
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setRating(5);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(245,166,35,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs md:text-sm font-display tracking-[0.25em] font-semibold text-primary uppercase">
                Avis Clients
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight uppercase">
              Ce que disent nos clients
            </h2>
          </m.div>

          <m.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-6 py-3 border border-primary text-primary font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary hover:text-black transition-all duration-300 uppercase self-start md:self-end"
          >
            Laisser un avis
          </m.button>
        </div>

        {/* Horizontal Scrollable Row */}
        <m.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-thin snap-x snap-mandatory mask-image-horizontal"
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="glass-card p-8 md:p-10 flex flex-col justify-between min-w-[300px] sm:min-w-[400px] max-w-[500px] snap-start flex-shrink-0 relative group"
            >
              {/* Quote Mark in Amber */}
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/25 transition-colors duration-300">
                <Quote size={48} className="rotate-180" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < t.rating
                          ? "fill-primary text-primary"
                          : "text-white/10 fill-white/5"
                      }
                    />
                  ))}
                </div>

                {/* Review Message */}
                <p className="text-secondary-light text-base md:text-lg italic leading-relaxed mb-8 relative z-10">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-white/5 pt-6 flex flex-col">
                <span className="font-display font-bold text-white text-base">
                  {t.client_name}
                </span>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">
                  {t.company} — {t.project}
                </span>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="w-full text-center py-12 text-secondary">
              Aucun avis disponible pour le moment. Laissez le premier !
            </div>
          )}
        </m.div>

      </div>

      {/* Review Submission Modal overlay */}
      <AP>
        {isModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-card w-full max-w-lg p-8 md:p-10 relative overflow-hidden bg-[#121212]/95 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-secondary hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-primary w-6 h-6" />
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                  Laisser un Avis
                </h3>
              </div>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-emerald-500 mb-4 animate-bounce" />
                  <h4 className="font-display font-bold text-xl text-white uppercase mb-2">
                    Avis Envoyé !
                  </h4>
                  <p className="text-secondary text-sm">
                    Merci ! Votre témoignage a été enregistré et apparaîtra dès qu&apos;il sera approuvé par l&apos;équipe d&apos;AfriDigital.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  
                  {/* Rating Stars Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Votre Note
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform active:scale-95"
                        >
                          <Star
                            size={24}
                            className={`${
                              starValue <= (hoverRating || rating)
                                ? "fill-primary text-primary"
                                : "text-white/20 fill-white/5"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="clientName" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Nom complet
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      {...register("clientName")}
                      className="bg-white/5 border border-white/10 px-4 py-3 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                      placeholder="Ex. Jean-Marc Yao"
                    />
                    {errors.clientName && (
                      <span className="text-xs text-rose-500 font-medium">{errors.clientName.message}</span>
                    )}
                  </div>

                  {/* Company field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Entreprise / Organisation
                    </label>
                    <input
                      id="company"
                      type="text"
                      {...register("company")}
                      className="bg-white/5 border border-white/10 px-4 py-3 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                      placeholder="Ex. SFEC Group"
                    />
                    {errors.company && (
                      <span className="text-xs text-rose-500 font-medium">{errors.company.message}</span>
                    )}
                  </div>

                  {/* Project Concluded field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="project" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Projet Réalisé avec AfriDigital
                    </label>
                    <input
                      id="project"
                      type="text"
                      {...register("project")}
                      className="bg-white/5 border border-white/10 px-4 py-3 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors"
                      placeholder="Ex. Intégration ERP Odoo"
                    />
                    {errors.project && (
                      <span className="text-xs text-rose-500 font-medium">{errors.project.message}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase font-display tracking-widest text-secondary font-semibold">
                      Votre Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className="bg-white/5 border border-white/10 px-4 py-3 rounded-none focus:outline-none focus:border-primary text-white text-sm transition-colors resize-none"
                      placeholder="Partagez votre expérience de travail avec nous..."
                    />
                    {errors.message && (
                      <span className="text-xs text-rose-500 font-medium">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-4 bg-primary text-black font-display font-bold text-xs tracking-wider rounded-none hover:bg-primary-light transition-all uppercase disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi de l'avis..." : "Envoyer l'avis"}
                  </button>

                </form>
              )}
            </m.div>
          </m.div>
        )}
      </AP>
    </section>
  );
}
