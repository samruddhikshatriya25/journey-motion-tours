
import { motion } from "framer-motion";
import { fadeUp, imageParallax } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.div
        variants={imageParallax}
        initial="initial"
        animate="animate"
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-black/40 z-10"
          style={{ mixBlendMode: "multiply" }}
        />
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000"
          alt="Travel destination background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            variants={fadeUp}
            custom={2}
          >
            Discover Your Perfect <br />
            <span className="text-travel-teal">Travel Experience</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            variants={fadeUp}
            custom={3}
          >
            Explore breathtaking destinations worldwide with our AI-powered
            travel recommendations and personalized travel experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-col sm:flex-row justify-center items-center gap-3"
          >
            <Button className="bg-travel-teal hover:bg-travel-teal/80 text-white px-6 py-6 text-lg">
              Explore Destinations
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 text-lg">
              AI Trip Planner
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Search Box */}
        <motion.div 
          variants={fadeUp} 
          custom={5}
          className="mt-12 bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
              <MapPin className="text-travel-teal h-5 w-5" />
              <div className="flex-1">
                <label className="text-sm text-gray-500 block">Where to</label>
                <input 
                  type="text" 
                  placeholder="Destination" 
                  className="w-full border-none p-0 focus:ring-0 text-gray-800"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
              <Calendar className="text-travel-teal h-5 w-5" />
              <div className="flex-1">
                <label className="text-sm text-gray-500 block">When</label>
                <input 
                  type="text" 
                  placeholder="Date" 
                  className="w-full border-none p-0 focus:ring-0 text-gray-800"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <Button className="w-full bg-travel-teal hover:bg-travel-teal/80 flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
