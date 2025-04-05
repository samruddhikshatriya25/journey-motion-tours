
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { destinations } from "@/utils/api";

const formSchema = z.object({
  destinationId: z.string(),
  adults: z.string(),
  children: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  roomType: z.string(),
  specialRequests: z.string().optional(),
});

const Booking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationId: "",
      adults: "2",
      children: "0",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      roomType: "standard",
      specialRequests: "",
    },
  });

  const watchDestinationId = form.watch("destinationId");
  
  // Update selected destination when destination ID changes
  React.useEffect(() => {
    if (watchDestinationId) {
      const selected = destinations.find(d => d.id.toString() === watchDestinationId);
      setSelectedDestination(selected);
    } else {
      setSelectedDestination(null);
    }
  }, [watchDestinationId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an actual booking API call
      console.log("Booking details:", values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Booking confirmed! Proceeding to payment.");
      navigate("/payment", { 
        state: { 
          bookingDetails: values,
          destinationName: selectedDestination?.name
        } 
      });
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total price
  const calculatePrice = () => {
    if (!selectedDestination) return 0;
    const basePrice = selectedDestination.price || 1000;
    const adults = parseInt(form.getValues("adults") || "1");
    const children = parseInt(form.getValues("children") || "0");
    const startDate = form.getValues("startDate");
    const endDate = form.getValues("endDate");
    
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomFactor = form.getValues("roomType") === "deluxe" ? 1.5 : 
                       form.getValues("roomType") === "suite" ? 2 : 1;
    
    return basePrice * (adults + (children * 0.5)) * days * roomFactor;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-teal/10 via-white to-travel-coral/10 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-travel-teal/20 overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-travel-teal to-travel-navy relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-white">Book Your Adventure</h1>
                </div>
              </div>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="destinationId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Destination</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white border-travel-teal/20 focus:ring-travel-teal">
                                  <SelectValue placeholder="Select a destination" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {destinations.map((destination) => (
                                  <SelectItem 
                                    key={destination.id} 
                                    value={destination.id.toString()}
                                  >
                                    {destination.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Check-in Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal bg-white border-travel-teal/20",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Check-out Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal bg-white border-travel-teal/20",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date <= form.getValues("startDate") || 
                                      date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adults</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white border-travel-teal/20">
                                    <SelectValue placeholder="Number of adults" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? 'Adult' : 'Adults'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Children</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white border-travel-teal/20">
                                    <SelectValue placeholder="Number of children" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[0, 1, 2, 3, 4].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? 'Child' : 'Children'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="roomType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white border-travel-teal/20">
                                  <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard Room</SelectItem>
                                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                                <SelectItem value="suite">Luxury Suite</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Any special requests or requirements?" 
                                {...field} 
                                className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {selectedDestination && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">Price Summary</h3>
                          <div className="flex justify-between text-sm">
                            <span>Base price</span>
                            <span>₹{selectedDestination.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Taxes & fees (18%)</span>
                            <span>₹{Math.round(selectedDestination.price * 0.18)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-travel-teal text-lg">
                              ₹{calculatePrice()}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-travel-teal hover:bg-travel-teal/90 text-white"
                      disabled={isLoading || !selectedDestination}
                    >
                      {isLoading ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
