
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/utils/motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
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

    const handleSearch = (event: Event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const searchInput = form.querySelector('input[name="destination"]') as HTMLInputElement;
      
      if (searchInput.value) {
        navigate(`/destination/${searchInput.value.toLowerCase()}`);
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    
    // Add event listener for search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', handleSearch);
    }
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
      const searchForm = document.getElementById('search-form');
      if (searchForm) {
        searchForm.removeEventListener('submit', handleSearch);
      }
    };
  }, [navigate]);

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
          <PopularDestinations />
          <WhyChooseUs />
          <SubscriptionPlans />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
