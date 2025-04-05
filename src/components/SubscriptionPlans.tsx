
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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

const SubscriptionPlans = () => {
  return (
    <section id="subscription" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeUp} 
            custom={1}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Choose Your Adventure Pass
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            custom={2}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Select the plan that best fits your travel needs and goals
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                  <span className="bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <Card className={`overflow-hidden h-full ${plan.recommended ? 'border-secondary shadow-lg shadow-secondary/10' : 'border shadow'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={plan.recommended ? "w-full bg-secondary hover:bg-secondary/90" : "w-full"}
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
