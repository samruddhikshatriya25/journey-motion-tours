
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/utils/motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import TourPackages from "@/components/TourPackages";
import AiRecommendation from "@/components/AiRecommendation";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scroll to elements when clicking on nav links
  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            event.preventDefault();
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for navbar
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    return () => document.removeEventListener('click', handleHashLinkClick);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen"
      >
        <Navbar />
        <main>
          <Hero />
          <Destinations />
          <TourPackages />
          <AiRecommendation />
          <ContactForm />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
