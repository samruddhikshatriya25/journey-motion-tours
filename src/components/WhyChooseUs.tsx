
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/utils/motion";
import { Globe, Target, Compass } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Perspective",
    description: "Access travel insights and stories from all around the world, helping you discover hidden gems and popular destinations."
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "AI-Powered Personalized Filters",
    description: "Our advanced AI algorithms tailor travel recommendations based on your preferences, budget, and interests."
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Compare Experiences",
    description: "Read authentic blogs and user feedback to compare different travel experiences before making your decisions."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
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
            Why Choose Wonderlust Canvas?
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            custom={2}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We're more than just a travel website. We're a community of adventurers and storytellers.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index + 3}
              className="bg-muted rounded-xl p-8 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
