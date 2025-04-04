
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, cardHover } from "@/utils/motion";
import { packages } from "@/utils/api";

const TourPackages = () => {
  return (
    <section id="packages" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeUp} 
            custom={1}
            className="text-travel-teal uppercase tracking-wider font-medium"
          >
            Curated Experiences
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            custom={2}
            className="text-3xl md:text-4xl font-bold mt-2 text-travel-navy"
          >
            Popular Tour Packages
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            custom={3}
            className="mt-4 text-gray-600 max-w-xl mx-auto"
          >
            All-inclusive vacation packages designed by our expert travel planners.
            Experience the best of each destination with carefully crafted itineraries.
          </motion.p>
        </motion.div>

        {/* Packages grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={fadeUp}
              custom={index}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative md:w-2/5 h-60 md:h-auto">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  {pkg.popular && (
                    <div className="absolute top-4 left-4 bg-travel-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-travel-navy mb-2">
                      {pkg.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 text-travel-teal mr-2" />
                      <span className="text-sm">{pkg.destinations.join(", ")}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 text-travel-teal mr-2" />
                      <span className="text-sm mr-4">{pkg.days} Days</span>
                      <Clock className="h-4 w-4 text-travel-teal mr-2" />
                      <span className="text-sm">{pkg.days - 1} Nights</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-xs text-gray-500">Price per person</span>
                      <p className="text-travel-teal font-bold text-xl">${pkg.price}</p>
                    </div>
                    <Button className="bg-travel-teal hover:bg-travel-teal/80">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all packages button */}
        <motion.div 
          variants={fadeUp}
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-travel-teal hover:bg-travel-teal/80">
            View All Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TourPackages;
