
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, cardHover } from "@/utils/motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app, this would come from an API
const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    description: "Tropical paradise with beaches and temples",
    budget: "$800 - $1,500"
  },
  {
    id: 2,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    description: "City of lights, romance and culture",
    budget: "$1,200 - $2,000"
  },
  {
    id: 3,
    name: "London, England",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    description: "Historic landmarks and modern attractions",
    budget: "$1,500 - $2,500"
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    description: "Traditional temples and beautiful gardens",
    budget: "$1,800 - $3,000"
  },
  {
    id: 5,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d747b8a7",
    description: "White-washed buildings with blue domes",
    budget: "$1,300 - $2,200"
  },
  {
    id: 6,
    name: "New York City, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    description: "The city that never sleeps",
    budget: "$1,500 - $3,000"
  },
];

const PopularDestinations = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const navigateToDestination = (name: string) => {
    navigate(`/destination/${name.split(',')[0].toLowerCase()}`);
  };

  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeUp} 
            custom={1}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            custom={2}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover some of the most visited and loved destinations by our community of travelers
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.slice(0, visibleCount).map((destination, index) => (
            <motion.div 
              key={destination.id}
              variants={fadeUp}
              custom={index + 3}
              whileHover="hover"
              className="cursor-pointer"
              onClick={() => navigateToDestination(destination.name)}
            >
              <motion.div variants={cardHover}>
                <Card className="overflow-hidden h-full border-0 shadow-lg">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                    <p className="text-muted-foreground mb-3">{destination.description}</p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Budget</p>
                      <p className="font-medium text-secondary">{destination.budget}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < destinations.length && (
          <div className="text-center mt-12">
            <Button 
              onClick={handleShowMore}
              variant="outline"
              className="font-medium"
            >
              Discover More Destinations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;
