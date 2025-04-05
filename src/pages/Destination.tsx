
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/utils/motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, MapPin, Utensils, Info, Star } from "lucide-react";

// Mock data - would come from an API in a real app
const destinationData: Record<string, any> = {
  "london": {
    name: "London",
    country: "England",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey, site of British monarch coronations.",
    attractions: [
      { 
        name: "Tower of London", 
        description: "Historic castle on the north bank of the River Thames, a UNESCO World Heritage Site with a rich and fascinating history."
      },
      { 
        name: "British Museum", 
        description: "World-famous museum of art and antiquities from ancient and living cultures, spanning two million years of human history."
      },
      { 
        name: "Buckingham Palace", 
        description: "The London residence and administrative headquarters of the monarch of the United Kingdom."
      }
    ],
    food: [
      {
        name: "Fish and Chips",
        description: "Traditional British dish consisting of battered fish and hot potato chips."
      },
      {
        name: "Afternoon Tea",
        description: "An English tradition of tea with various sandwiches, scones, and pastries."
      }
    ],
    tips: [
      "The London Underground ('The Tube') is the easiest way to get around the city.",
      "Many of London's museums are free to enter.",
      "Always carry an umbrella as the weather can be unpredictable."
    ],
    photos: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
      "https://images.unsplash.com/photo-1520986606214-8b456906c813"
    ],
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    }
  }
};

const Destination = () => {
  const { destination } = useParams<{ destination: string }>();
  const [activeTab, setActiveTab] = useState("basic-info");
  
  // If we don't have data for the requested destination, use London as default
  const destData = destinationData[destination?.toLowerCase() || ''] || destinationData.london;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`destination-${destination}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen"
      >
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Image */}
          <div className="relative h-[50vh]">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={destData.image} 
              alt={destData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
              <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {destData.name}
                </h1>
                <p className="text-white/80 text-xl">{destData.country}</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {/* About the Destination */}
              <h2 className="text-3xl font-bold mb-6">About the Destination</h2>
              <p className="text-muted-foreground mb-10">{destData.description}</p>
              
              {/* Tabs */}
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="attractions">
                    <Map className="mr-2 h-4 w-4" />
                    Attractions
                  </TabsTrigger>
                  <TabsTrigger value="food-dining">
                    <Utensils className="mr-2 h-4 w-4" />
                    Food & Dining
                  </TabsTrigger>
                  <TabsTrigger value="practical-info">
                    <Info className="mr-2 h-4 w-4" />
                    Practical Information
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="attractions" className="space-y-8">
                  <h3 className="text-2xl font-semibold mb-4">Must-Visit Attractions</h3>
                  
                  {destData.attractions.map((attraction: any, index: number) => (
                    <div key={index} className="border-b pb-6 mb-6 last:border-b-0">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mt-1 mr-2" />
                        <div>
                          <h4 className="text-xl font-medium">{attraction.name}</h4>
                          <p className="text-muted-foreground mt-2">{attraction.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="food-dining">
                  <h3 className="text-2xl font-semibold mb-6">Recommended Restaurants and Dishes</h3>
                  
                  {destData.food.map((item: any, index: number) => (
                    <div key={index} className="border-b pb-6 mb-6 last:border-b-0">
                      <div className="flex items-start">
                        <Utensils className="h-5 w-5 text-primary mt-1 mr-2" />
                        <div>
                          <h4 className="text-xl font-medium">{item.name}</h4>
                          <p className="text-muted-foreground mt-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <h4 className="text-xl font-medium mt-8 mb-4">Dietary Options Available</h4>
                  <div className="flex flex-wrap gap-3">
                    {destData.dietaryOptions.vegetarian && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Vegetarian
                      </span>
                    )}
                    {destData.dietaryOptions.vegan && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Vegan
                      </span>
                    )}
                    {destData.dietaryOptions.glutenFree && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        Gluten Free
                      </span>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="practical-info">
                  <h3 className="text-2xl font-semibold mb-6">Travel Tips</h3>
                  
                  <ul className="space-y-4">
                    {destData.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
              
              {/* Photos Gallery */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destData.photos.map((photo: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden h-64">
                      <img 
                        src={photo} 
                        alt={`${destData.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Destination;
