
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, cardHover } from "@/utils/motion";
import { destinations, categories } from "@/utils/api";

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Filter destinations based on active category
  const filteredDestinations = activeCategory === "all"
    ? destinations
    : destinations.filter((dest) => dest.category === activeCategory);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.span 
            variants={fadeUp} 
            custom={1}
            className="text-travel-teal uppercase tracking-wider font-medium"
          >
            Explore the World
          </motion.span>
          <motion.h2 
            variants={fadeUp} 
            custom={2}
            className="text-3xl md:text-4xl font-bold mt-2 text-travel-navy"
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            custom={3}
            className="mt-4 text-gray-600 max-w-xl mx-auto"
          >
            Discover breathtaking locations handpicked by our travel experts, from serene
            beaches to historic landmarks and natural wonders.
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              className={cn(
                "rounded-full px-6",
                activeCategory === category.value
                  ? "bg-travel-teal hover:bg-travel-teal/80"
                  : "text-gray-700 hover:text-travel-teal"
              )}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Destinations grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              variants={fadeUp}
              custom={index}
              whileHover="hover"
              initial="rest"
              animate={hoveredCard === destination.id ? "hover" : "rest"}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="destination-card group"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {destination.popular && (
                  <div className="absolute top-4 left-4 bg-travel-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-travel-navy">{destination.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-travel-orange fill-current" />
                    <span className="text-sm font-medium ml-1">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">Starting from</span>
                    <p className="text-travel-teal font-bold">${destination.price}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-travel-teal hover:bg-travel-teal/80"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div 
          variants={fadeUp}
          custom={8}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-travel-teal text-travel-teal hover:bg-travel-teal/10">
            View All Destinations
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;
