
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/utils/motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { destinations } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { 
  Search as SearchIcon, 
  Filter, 
  Map, 
  ChevronDown, 
  Star, 
  Sparkles 
} from "lucide-react";
import { toast } from "sonner";

// Define traveler types
const travelerTypes = [
  { id: "solo", label: "Solo Traveller" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family with Kids" },
  { id: "friends", label: "Friends Group" },
  { id: "backpacker", label: "Backpacker" },
  { id: "luxury", label: "Luxury Traveller" },
  { id: "adventure", label: "Adventure Seeker" },
  { id: "cultural", label: "Cultural Explorer" },
];

// Define seasons
const seasons = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
  { id: "all-year", label: "All Year" },
];

// Define regions
const regions = [
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north-america", label: "North America" },
  { id: "south-america", label: "South America" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },
];

// Define activities
const activities = [
  { id: "beach", label: "Beach & Relaxation" },
  { id: "hiking", label: "Hiking & Trekking" },
  { id: "city-tour", label: "City Tours" },
  { id: "food-tour", label: "Food Tours" },
  { id: "wildlife", label: "Wildlife Viewing" },
  { id: "historical", label: "Historical Sites" },
  { id: "adventure", label: "Adventure Sports" },
];

// Define stay types
const stayTypes = [
  { id: "hotel", label: "Hotels" },
  { id: "resort", label: "Resorts" },
  { id: "hostel", label: "Hostels" },
  { id: "apartment", label: "Apartments" },
  { id: "villa", label: "Villas" },
  { id: "camping", label: "Camping" },
];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  
  // Filter states
  const [budget, setBudget] = useState<number[]>([1000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedStayTypes, setSelectedStayTypes] = useState<string[]>([]);
  const [selectedTravelerTypes, setSelectedTravelerTypes] = useState<string[]>([]);
  
  // Search results (initialized with all destinations)
  const [searchResults, setSearchResults] = useState(destinations);

  // Handle checkbox change for any filter type
  const handleCheckboxChange = (
    id: string, 
    checked: boolean, 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (checked) {
      setter(prev => [...prev, id]);
    } else {
      setter(prev => prev.filter(item => item !== id));
    }
  };

  // Handle AI-powered search
  const handleAiSearch = () => {
    setIsAiProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an AI endpoint
      // For demo purposes, we'll filter based on selected criteria

      let filteredResults = [...destinations];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.description.toLowerCase().includes(query)
        );
      }
      
      // Filter by budget (for demonstration)
      if (budget[0] > 0) {
        filteredResults = filteredResults.filter(dest => dest.price <= budget[0]);
      }

      setSearchResults(filteredResults);
      setIsAiProcessing(false);
      
      toast.success(`Found ${filteredResults.length} destinations based on your preferences`);
    }, 1500);
  };

  const handleDestinationClick = (destName: string) => {
    navigate(`/destination/${destName.toLowerCase().split(',')[0]}`);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="search-page"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen"
      >
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Your Next Adventure</h1>
              <p className="text-muted-foreground mb-8">
                Find the perfect destination with our AI-powered search
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Input
                    placeholder="Where would you like to explore?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Button 
                  onClick={handleAiSearch} 
                  className="flex items-center gap-2"
                  disabled={isAiProcessing}
                >
                  {isAiProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <SearchIcon className="h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {/* Filters Collapsible */}
              <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mb-8">
                <CollapsibleContent>
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Sparkles className="h-5 w-5 text-primary mr-2" />
                      AI-Powered Filters
                    </h2>
                    
                    <div className="space-y-8">
                      {/* Budget Slider */}
                      <div>
                        <Label className="mb-2 block">Budget (₹)</Label>
                        <div className="space-y-2">
                          <Slider
                            defaultValue={[1000]}
                            max={5000}
                            step={500}
                            value={budget}
                            onValueChange={setBudget}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>₹0</span>
                            <span>₹{budget[0]} (selected)</span>
                            <span>₹5,000+</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Region Selection */}
                      <div>
                        <Label className="mb-2 block">Region</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {regions.map((region) => (
                            <div key={region.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={`region-${region.id}`}
                                checked={selectedRegions.includes(region.id)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(region.id, checked === true, setSelectedRegions)
                                }
                              />
                              <Label htmlFor={`region-${region.id}`} className="text-sm">
                                {region.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Season Selection */}
                      <div>
                        <Label className="mb-2 block">Best Season to Visit</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {seasons.map((season) => (
                            <div key={season.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={`season-${season.id}`}
                                checked={selectedSeasons.includes(season.id)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(season.id, checked === true, setSelectedSeasons)
                                }
                              />
                              <Label htmlFor={`season-${season.id}`} className="text-sm">
                                {season.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Activities */}
                      <div>
                        <Label className="mb-2 block">Activities</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={`activity-${activity.id}`}
                                checked={selectedActivities.includes(activity.id)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(activity.id, checked === true, setSelectedActivities)
                                }
                              />
                              <Label htmlFor={`activity-${activity.id}`} className="text-sm">
                                {activity.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Stay Types */}
                      <div>
                        <Label className="mb-2 block">Accommodation Type</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {stayTypes.map((stay) => (
                            <div key={stay.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={`stay-${stay.id}`}
                                checked={selectedStayTypes.includes(stay.id)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(stay.id, checked === true, setSelectedStayTypes)
                                }
                              />
                              <Label htmlFor={`stay-${stay.id}`} className="text-sm">
                                {stay.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Traveler Types */}
                      <div>
                        <Label className="mb-2 block">Traveler Type</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {travelerTypes.map((type) => (
                            <div key={type.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={`traveler-${type.id}`}
                                checked={selectedTravelerTypes.includes(type.id)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(type.id, checked === true, setSelectedTravelerTypes)
                                }
                              />
                              <Label htmlFor={`traveler-${type.id}`} className="text-sm">
                                {type.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button onClick={handleAiSearch} className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Apply AI Filters
                        </Button>
                      </div>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Results Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {searchResults.length} Destinations Found
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((destination) => (
                    <Card 
                      key={destination.id} 
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleDestinationClick(destination.name)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        {destination.popular && (
                          <div className="absolute top-3 left-3 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{destination.name}</CardTitle>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">{destination.rating}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {destination.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div>
                          <span className="text-xs text-muted-foreground">Starting from</span>
                          <p className="text-primary font-bold">₹{destination.price}</p>
                        </div>
                        <Button size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {searchResults.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No destinations found matching your criteria. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Search;
