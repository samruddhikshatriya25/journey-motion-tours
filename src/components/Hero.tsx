
import { motion } from "framer-motion";
import { fadeUp, fadeDown } from "@/utils/motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-traveling-through-the-city-in-an-underground-train-54600-large.mp4" 
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 mx-auto px-4">
        <motion.h1 
          custom={1} 
          variants={fadeDown} 
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
        >
          Discover Extraordinary <br />
          <span className="text-primary">Travel Stories</span>
        </motion.h1>
        
        <motion.p 
          custom={2} 
          variants={fadeUp} 
          className="text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          Explore destinations, create blogs, find inspiration, and plan your next adventure
          powered by AI recommendations
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          custom={3} 
          variants={fadeUp} 
          className="max-w-2xl mx-auto"
        >
          <form 
            id="search-form" 
            className="flex flex-col md:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                name="destination"
                type="text"
                placeholder="Where would you like to explore?"
                className="w-full pl-10 pr-4 py-3 rounded-md shadow-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-medium"
            >
              Start Exploring
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
