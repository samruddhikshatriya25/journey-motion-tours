
import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getAIRecommendation } from "@/utils/api";
import { fadeUp } from "@/utils/motion";
import { toast } from "sonner";

const AiRecommendation = () => {
  const [preferences, setPreferences] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preferences.trim()) {
      toast.error("Please enter your travel preferences");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await getAIRecommendation(preferences);
      setRecommendation(response.recommendation);
      toast.success("AI recommendation generated!");
    } catch (error) {
      console.error("Failed to get AI recommendation:", error);
      toast.error("Failed to generate recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-20 bg-gradient-to-br from-travel-navy to-travel-navy/90 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            custom={1}
            className="inline-flex items-center justify-center space-x-2 bg-white/10 text-travel-teal px-4 py-1 rounded-full mb-4"
          >
            <Bot size={16} />
            <span className="uppercase tracking-wider text-sm font-medium">AI Powered</span>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp} 
            custom={2}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Get Personalized Travel Recommendations
          </motion.h2>
          
          <motion.p 
            variants={fadeUp} 
            custom={3}
            className="mt-4 text-white/80 max-w-2xl mx-auto"
          >
            Our AI travel assistant analyzes your preferences and suggests the perfect
            destinations and experiences tailored just for you.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-white/90">
                  Describe your ideal vacation:
                </label>
                <Textarea
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-travel-teal text-white"
                  rows={4}
                  placeholder="E.g., I'm looking for a beach destination with cultural experiences, good food, and moderate budget for a 7-day trip in June..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-travel-teal hover:bg-travel-teal/80 text-white flex items-center space-x-2"
                  disabled={isLoading || !preferences.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Get Recommendations</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-white/5 border border-white/20 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Bot className="mr-2 text-travel-teal" />
                  AI Recommendation
                </h3>
                <p className="text-white/90 leading-relaxed">{recommendation}</p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="bg-travel-teal hover:bg-travel-teal/80">
                    Book This Trip
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Refine Preferences
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiRecommendation;
