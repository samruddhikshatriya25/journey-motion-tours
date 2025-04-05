
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Check, CreditCard, Wallet } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  paymentMethod: z.enum(["card", "upi"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  upiId: z.string().optional(),
  address: z.string().min(5, { message: "Address is required" }),
});

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  const planName = location.state?.planName || "Explorer Plan";
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      upiId: "",
      address: "",
    },
  });

  const watchPaymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an actual payment call
      console.log("Payment details:", values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      toast.success("Payment successful! Your subscription is now active.");
      navigate("/");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-teal/10 to-travel-coral/10 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-travel-teal/20">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold text-travel-teal">Complete Your Payment</CardTitle>
                <CardDescription>
                  You are subscribing to the <span className="font-semibold">{planName}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="card"
                                    id="card"
                                    className="peer sr-only"
                                  />
                                  <label
                                    htmlFor="card"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-travel-teal [&:has([data-state=checked])]:border-travel-teal"
                                  >
                                    <CreditCard className="mb-3 h-6 w-6" />
                                    <span className="text-sm font-medium">Credit Card</span>
                                  </label>
                                </div>
                                
                                <div>
                                  <RadioGroupItem
                                    value="upi"
                                    id="upi"
                                    className="peer sr-only"
                                  />
                                  <label
                                    htmlFor="upi"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-travel-teal [&:has([data-state=checked])]:border-travel-teal"
                                  >
                                    <Wallet className="mb-3 h-6 w-6" />
                                    <span className="text-sm font-medium">UPI Payment</span>
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchPaymentMethod === "card" && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="1234 5678 9012 3456" 
                                    {...field} 
                                    className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="MM/YY" 
                                      {...field} 
                                      className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardCvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="123" 
                                      {...field} 
                                      className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {watchPaymentMethod === "upi" && (
                        <FormField
                          control={form.control}
                          name="upiId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UPI ID</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="yourname@upi" 
                                  {...field} 
                                  className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123 Main St, City, Country" 
                                {...field} 
                                className="bg-white border-travel-teal/20 focus-visible:ring-travel-teal"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-travel-teal hover:bg-travel-teal/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          Processing...
                        </span>
                      ) : (
                        "Pay & Subscribe"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Secure payment processing
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
