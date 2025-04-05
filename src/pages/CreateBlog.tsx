
import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/utils/motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Save, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const travellerTypes = [
  { id: "solo", label: "Solo Traveller" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family with Kids" },
  { id: "friends", label: "Friends Group" },
  { id: "backpacker", label: "Backpacker" },
  { id: "luxury", label: "Luxury Traveller" },
  { id: "adventure", label: "Adventure Seeker" },
  { id: "cultural", label: "Cultural Explorer" },
  { id: "foodie", label: "Foodie" },
  { id: "photographer", label: "Photography Enthusiast" },
];

const CreateBlog = () => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [attractions, setAttractions] = useState([{ name: "", description: "" }]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTravellerTypes, setSelectedTravellerTypes] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result.toString());
            if (newImages.length === files.length) {
              setSelectedImages(prev => [...prev, ...newImages]);
            }
          }
        };
        
        reader.readAsDataURL(file);
      }
    }
  };
  
  const addAttraction = () => {
    setAttractions([...attractions, { name: "", description: "" }]);
  };
  
  const updateAttraction = (index: number, field: 'name' | 'description', value: string) => {
    const updatedAttractions = [...attractions];
    updatedAttractions[index][field] = value;
    setAttractions(updatedAttractions);
  };

  const handleTravellerTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTravellerTypes(prev => [...prev, id]);
    } else {
      setSelectedTravellerTypes(prev => prev.filter(type => type !== id));
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="create-blog"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen"
      >
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Create a Travel Blog</h1>
              <p className="text-muted-foreground mb-10">
                Share your travel experiences and help others discover amazing destinations
              </p>
              
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-6 mb-8">
                  <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="food-dining">Food & Dining</TabsTrigger>
                  <TabsTrigger value="travel-tips">Travel Tips</TabsTrigger>
                  <TabsTrigger value="traveller-types">Traveller Types</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                
                {/* Basic Info Tab */}
                <TabsContent value="basic-info">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="destination">Destination Name</Label>
                      <Input id="destination" placeholder="e.g., Paris, France" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="story">Write Your Story</Label>
                      <Textarea 
                        id="story" 
                        placeholder="Share your travel experience..." 
                        className="mt-1 min-h-[200px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="duration">Trip Duration</Label>
                        <Input id="duration" placeholder="e.g., 7 days" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cost">Approximate Cost</Label>
                        <Input id="cost" placeholder="e.g., ₹50,000" className="mt-1" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accommodation">Accommodation Info</Label>
                      <Textarea 
                        id="accommodation" 
                        placeholder="Where did you stay? Any recommendations?" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="transport">Transport Type</Label>
                      <Input id="transport" placeholder="e.g., Flight, Train, Car rental" className="mt-1" />
                    </div>
                    
                    <Button className="w-full sm:w-auto">
                      Save & Continue
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Attractions Tab */}
                <TabsContent value="attractions">
                  <div className="space-y-8">
                    <h3 className="text-xl font-semibold">Must Visit Attractions</h3>
                    
                    {attractions.map((attraction, index) => (
                      <Card key={index} className="p-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`attraction-name-${index}`}>Attraction Name</Label>
                            <Input 
                              id={`attraction-name-${index}`} 
                              value={attraction.name}
                              onChange={(e) => updateAttraction(index, 'name', e.target.value)}
                              placeholder="e.g., Eiffel Tower" 
                              className="mt-1" 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`attraction-desc-${index}`}>Description</Label>
                            <Textarea 
                              id={`attraction-desc-${index}`} 
                              value={attraction.description}
                              onChange={(e) => updateAttraction(index, 'description', e.target.value)}
                              placeholder="What makes this attraction special?" 
                              className="mt-1" 
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={addAttraction}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Attraction
                    </Button>
                    
                    <div className="pt-4">
                      <Button className="w-full sm:w-auto">
                        Save & Continue
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Food & Dining Tab */}
                <TabsContent value="food-dining">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="restaurants">Recommended Restaurants and Dishes</Label>
                      <Textarea 
                        id="restaurants" 
                        placeholder="Share your favorite restaurants and dishes..." 
                        className="mt-1 min-h-[150px]" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Vegetarian and Dietary Options</Label>
                      <RadioGroup defaultValue="mixed">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegetarian" id="vegetarian" />
                          <Label htmlFor="vegetarian">Excellent vegetarian options</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegan" id="vegan" />
                          <Label htmlFor="vegan">Vegan-friendly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gluten-free" id="gluten-free" />
                          <Label htmlFor="gluten-free">Gluten-free options available</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mixed" id="mixed" />
                          <Label htmlFor="mixed">Limited dietary options</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button className="w-full sm:w-auto">
                      Save & Continue
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Travel Tips Tab */}
                <TabsContent value="travel-tips">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="tips">Your Tips</Label>
                      <Textarea 
                        id="tips" 
                        placeholder="Share your advice for fellow travelers..." 
                        className="mt-1 min-h-[250px]" 
                      />
                    </div>
                    
                    <Button className="w-full sm:w-auto">
                      Save & Continue
                    </Button>
                  </div>
                </TabsContent>

                {/* Traveller Types Tab */}
                <TabsContent value="traveller-types">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Who is this destination best for?</h3>
                    <p className="text-muted-foreground mb-4">Select all traveller types that would enjoy this destination:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {travellerTypes.map((type) => (
                        <div key={type.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={`type-${type.id}`} 
                            checked={selectedTravellerTypes.includes(type.id)}
                            onCheckedChange={(checked) => 
                              handleTravellerTypeChange(type.id, checked === true)
                            }
                          />
                          <Label 
                            htmlFor={`type-${type.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full sm:w-auto mt-6">
                      Save & Continue
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Photos Tab */}
                <TabsContent value="photos">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="photos">Upload Travel Images</Label>
                      <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Drag and drop photos here, or click to browse
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            JPG, PNG or WEBP up to 10MB
                          </p>
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    
                    {selectedImages.length > 0 && (
                      <div>
                        <Label className="block mb-3">Selected Photos</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Selected ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <Button className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Submit Blog
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateBlog;
