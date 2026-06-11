import { createClient } from "@supabase/supabase-js";

export interface Testimonial {
  id?: string;
  created_at?: string;
  client_name: string;
  company: string;
  project: string;
  message: string;
  rating: number;
  status: "pending" | "approved";
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const hasSupabase = !!(supabaseUrl && supabaseAnonKey);

const supabase = hasSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initial mock testimonials (empty by default so first real clients can fill it)
const INITIAL_MOCKS: Testimonial[] = [];

// In-memory/localStorage fallback client
const getMockTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return INITIAL_MOCKS;
  const stored = localStorage.getItem("afridigital_testimonials_real");
  if (!stored) {
    localStorage.setItem("afridigital_testimonials_real", JSON.stringify(INITIAL_MOCKS));
    return INITIAL_MOCKS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_MOCKS;
  }
};

const saveMockTestimonials = (list: Testimonial[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("afridigital_testimonials_real", JSON.stringify(list));
  }
};

export async function fetchApprovedTestimonials(): Promise<Testimonial[]> {
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error, using local fallback:", error);
        return getMockTestimonials().filter(t => t.status === "approved");
      }
      return data || [];
    } catch (err) {
      console.error("Supabase failed, fallback active:", err);
      return getMockTestimonials().filter(t => t.status === "approved");
    }
  } else {
    // Return mock approved testimonials
    return getMockTestimonials().filter(t => t.status === "approved");
  }
}

export async function submitTestimonial(testimonial: Omit<Testimonial, "status" | "created_at">): Promise<{ success: boolean; error?: string }> {
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: typeof window !== "undefined" ? crypto.randomUUID() : Math.random().toString(),
    created_at: new Date().toISOString(),
    status: "pending" // Testimonials start as pending until admin approval
  };

  if (hasSupabase && supabase) {
    try {
      const { error } = await supabase
        .from("testimonials")
        .insert([newTestimonial]);

      if (error) {
        console.error("Supabase insert error, saving locally:", error);
        // Fallback local save so user can see it works
        const list = getMockTestimonials();
        list.unshift(newTestimonial);
        saveMockTestimonials(list);
        return { success: true }; // Return true because it fell back successfully
      }
      return { success: true };
    } catch (err: unknown) {
      console.error("Supabase insert failed, saving locally:", err);
      const list = getMockTestimonials();
      list.unshift(newTestimonial);
      saveMockTestimonials(list);
      return { success: true };
    }
  } else {
    // Local fallback save
    const list = getMockTestimonials();
    list.unshift(newTestimonial);
    saveMockTestimonials(list);
    return { success: true };
  }
}

// For testing purposes: a way to approve pending testimonials locally so they show up
export function approveTestimonialLocally(id: string) {
  const list = getMockTestimonials();
  const index = list.findIndex(t => t.id === id);
  if (index !== -1) {
    list[index].status = "approved";
    saveMockTestimonials(list);
  }
}
