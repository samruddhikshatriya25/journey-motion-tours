
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

const subscriptionPlans = [
  {
    name: "Free Plan",
    price: "₹0",
    period: "forever",
    description: "Start your journey with our basic features",
    features: [
      "Explore destinations",
      "Read blogs",
      "Basic filters",
    ],
    recommended: false,
    buttonText: "Get Started"
  },
  {
    name: "Explorer Plan",
    price: "₹199",
    period: "month",
    description: "Enhance your travel planning experience",
    features: [
      "Access to Smart AI Filters",
      "Personalized Recommendations",
      "Save Unlimited Destinations",
      "Everything in Free Plan"
    ],
    recommended: true,
    buttonText: "Subscribe Now"
  },
  {
    name: "Creator Pro",
    price: "₹299",
    period: "month",
    description: "Share your adventures with the world",
    features: [
      "Create unlimited travel blogs",
      "Access analytics (views, likes)",
      "Feature on homepage",
      "Everything in Explorer Plan"
    ],
    recommended: false,
    buttonText: "Subscribe Now"
  }
];

const SubscriptionPlansPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    if (planName === "Free Plan") {
      toast.success("You've selected the Free Plan!");
      navigate("/");
    } else {
      navigate("/payment", { state: { planName } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-teal/10 via-white to-travel-coral/10 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeUp} 
            custom={1}
            className="text-4xl md:text-5xl font-bold mb-4 text-travel-navy bg-clip-text text-transparent bg-gradient-to-r from-travel-teal to-travel-navy"
          >
            Choose Your Adventure Pass
          </motion.h1>
          <motion.p 
            variants={fadeUp} 
            custom={2}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Select the plan that best fits your travel needs and goals
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index + 3}
              className={`relative ${plan.recommended ? 'transform md:-translate-y-4' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-0 right-0 transform -translate-y-6 text-center">
                  <span className="bg-travel-orange text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <Card className={`overflow-hidden h-full ${
                plan.recommended 
                  ? 'border-travel-orange shadow-lg shadow-travel-orange/10' 
                  : 'border shadow hover:shadow-md transition-all'
              }`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-end">
                    <span className="text-4xl font-bold text-travel-teal">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.recommended 
                      ? 'bg-travel-orange hover:bg-travel-orange/90 text-white' 
                      : 'bg-travel-teal hover:bg-travel-teal/90 text-white'
                    }`}
                    onClick={() => handleSelectPlan(plan.name)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
