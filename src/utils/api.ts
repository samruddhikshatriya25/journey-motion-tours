
import { toast } from "sonner";

// Firebase configuration will go here when integrated
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Mock destinations data for initial development
export const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200",
    description: "Iconic white-washed buildings with blue domes overlooking the Aegean Sea.",
    rating: 4.9,
    price: 1299,
    popular: true,
    category: "beach"
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1200",
    description: "Ancient temples, traditional gardens, and geisha districts.",
    rating: 4.7,
    price: 1499,
    popular: true,
    category: "cultural"
  },
  {
    id: 3,
    name: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    description: "Majestic mountains with world-class skiing and hiking opportunities.",
    rating: 4.8,
    price: 1899,
    popular: true,
    category: "mountain"
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200",
    description: "Tropical paradise with beautiful beaches, lush rice terraces, and vibrant culture.",
    rating: 4.6,
    price: 999,
    popular: true,
    category: "beach"
  },
  {
    id: 5,
    name: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1200",
    description: "Expansive savanna known for its wildlife and annual migration.",
    rating: 4.9,
    price: 2499,
    popular: false,
    category: "wildlife"
  },
  {
    id: 6,
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200",
    description: "Ancient Incan citadel set against a dramatic mountain backdrop.",
    rating: 4.8,
    price: 1799,
    popular: true,
    category: "cultural"
  }
];

// Categories for filtering
export const categories = [
  { value: "all", label: "All Destinations" },
  { value: "beach", label: "Beach Getaways" },
  { value: "mountain", label: "Mountain Escapes" },
  { value: "cultural", label: "Cultural Experiences" },
  { value: "wildlife", label: "Wildlife Adventures" }
];

// Mock packages data
export const packages = [
  {
    id: 1,
    name: "Greek Island Hopper",
    destinations: ["Athens", "Mykonos", "Santorini"],
    days: 10,
    price: 2499,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200",
    popular: true
  },
  {
    id: 2,
    name: "Japanese Cultural Tour",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    days: 12,
    price: 3299,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1200",
    popular: true
  },
  {
    id: 3,
    name: "Alpine Adventure",
    destinations: ["Zurich", "Lucerne", "Zermatt"],
    days: 8,
    price: 2899,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    popular: false
  },
  {
    id: 4,
    name: "Bali Bliss",
    destinations: ["Ubud", "Seminyak", "Nusa Dua"],
    days: 7,
    price: 1699,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200",
    popular: true
  }
];

// Function to get AI trip recommendations
export const getAIRecommendation = async (
  preferences: string
): Promise<{ recommendation: string }> => {
  try {
    // For now, we'll use mock data until Gemini API is integrated
    // This would be replaced with actual API call
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on preferences
    const recommendations = {
      "beach": "Based on your preferences, I recommend visiting the beautiful islands of Greece, particularly Santorini and Mykonos. These destinations offer stunning beaches, incredible sunsets, and charming villages. The best time to visit is May through September for warm weather and clear skies.",
      "mountain": "I recommend exploring the Swiss Alps, particularly the regions around Interlaken and Zermatt. You'll find breathtaking mountain views, excellent hiking trails, and charming alpine villages. Summer offers great hiking weather, while winter is perfect for skiing and other snow activities.",
      "cultural": "Consider Japan for your next cultural adventure. Kyoto offers ancient temples and traditional gardens, while Tokyo blends the ultra-modern with traditional Japanese culture. Visit during spring for cherry blossoms or fall for colorful autumn leaves.",
      "wildlife": "The Serengeti in Tanzania would be perfect for your wildlife interests. Experience the annual migration, see the Big Five, and enjoy spectacular savanna landscapes. The best time for wildlife viewing is during the dry season from June to October.",
      "default": "Based on your preferences, I would recommend exploring the cultural richness of Japan combined with some relaxation time in Bali. This combination offers both cultural experiences and beautiful beaches for a well-rounded travel experience."
    };

    // Extract the main category from preferences or use default
    const preference = preferences.toLowerCase();
    let recommendation = recommendations.default;
    
    // Check for keywords in the preferences
    if (preference.includes("beach") || preference.includes("ocean") || preference.includes("sea")) {
      recommendation = recommendations.beach;
    } else if (preference.includes("mountain") || preference.includes("hiking") || preference.includes("alps")) {
      recommendation = recommendations.mountain;
    } else if (preference.includes("culture") || preference.includes("history") || preference.includes("temple")) {
      recommendation = recommendations.cultural;
    } else if (preference.includes("wildlife") || preference.includes("safari") || preference.includes("animals")) {
      recommendation = recommendations.wildlife;
    }
    
    return { recommendation };
  } catch (error) {
    console.error("Error getting AI recommendation:", error);
    toast.error("Failed to get recommendation. Please try again.");
    return { recommendation: "Unable to generate recommendation at this time. Please try again later." };
  }
};

// Function to submit booking/contact form
export const submitBooking = async (formData: any): Promise<{ success: boolean; message: string }> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the form data (would be sent to backend in real implementation)
    console.log("Form submitted:", formData);
    
    // Return success
    return {
      success: true,
      message: "Thank you! Your booking request has been received. Our team will contact you shortly."
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message: "There was an error processing your request. Please try again."
    };
  }
};
