import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import SelectedWorks from "@/components/SelectedWorks";
import TheCollective from "@/components/TheCollective";
import Testimonials from "@/components/Testimonials";
import Collaboration from "@/components/Collaboration";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global Background Glow Lines/Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[30%] rounded-full bg-primary/2 filter blur-[150px]" />
        <div className="absolute top-[60%] right-[-10%] w-[40%] h-[35%] rounded-full bg-primary/2 filter blur-[150px]" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Capabilities />
        <SelectedWorks />
        <TheCollective />
        <Testimonials />
        <Collaboration />
        <Connect />
      </main>

      <Footer />
    </div>
  );
}
