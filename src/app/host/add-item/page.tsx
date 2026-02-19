'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { IndianRupee, ShieldCheck, Clock, MapPin } from 'lucide-react';

const foodItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  foodType: z.enum(["Veg", "Non-Veg"]),
  quantityAvailable: z.coerce.number().min(1, "Quantity must be at least 1"),
  originalPrice: z.coerce.number().min(0),
  discountedPrice: z.coerce.number().min(0),
  preparedTime: z.string().min(1, "Manufacturing time is required"),
  expiryTime: z.string().min(1, "Expiry time is required"),
  foodCondition: z.enum(["Fresh", "Safe for Human Consumption", "Only for Animal Feed"]),
  area: z.string().min(2, "Please specify the area/location"),
  imageUrls: z.string().optional().describe("Comma separated URLs"),
  testingReportUrls: z.string().optional().describe("Comma separated URLs for test results"),
});

export default function AddFoodItemPage() {
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof foodItemSchema>>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: {
      name: '',
      description: '',
      foodType: 'Veg',
      quantityAvailable: 1,
      originalPrice: 0,
      discountedPrice: 0,
      preparedTime: '',
      expiryTime: '',
      foodCondition: 'Fresh',
      area: '',
      imageUrls: '',
      testingReportUrls: '',
    },
  });

  function onSubmit(values: z.infer<typeof foodItemSchema>) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to add items.",
      });
      return;
    }

    const foodItemsCol = collection(db, 'food_items');
    const data = {
      ...values,
      hostUserId: user.uid,
      hostProfileId: "PROTOTYPE_ID", // Simplified for prototype
      currency: "INR",
      isVerifiedByAdmin: false,
      availabilityStatus: "Available",
      uploadDate: new Date().toISOString(),
      createdAt: serverTimestamp(),
      imageUrls: values.imageUrls ? values.imageUrls.split(',').map(s => s.trim()) : [],
      testingReportUrls: values.testingReportUrls ? values.testingReportUrls.split(',').map(s => s.trim()) : [],
    };

    addDocumentNonBlocking(foodItemsCol, data);

    toast({
      title: "Item Listed Successfully!",
      description: "Your food item is now live and waiting for verification.",
    });

    router.push('/food');
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-xl">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-3xl font-headline flex items-center gap-2">
                <ShieldCheck className="text-primary w-8 h-8" /> List Your Surplus Food
              </CardTitle>
              <CardDescription>
                Provide accurate details to ensure food safety and customer trust.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Chicken Biryani" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="foodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Veg">Vegetarian</SelectItem>
                              <SelectItem value="Non-Veg">Non-Vegetarian</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the dish, ingredients, and storage instructions..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> Original Cost</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountedPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1 font-bold text-primary"><IndianRupee className="w-4 h-4" /> Selling Cost</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantityAvailable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity Units</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="preparedTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><Clock className="w-4 h-4" /> Manufacturing Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormDescription>When was this food prepared?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expiryTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><Clock className="w-4 h-4" /> Expiry Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormDescription>When does it expire?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="foodCondition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Quality Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Fresh">Freshly Prepared</SelectItem>
                              <SelectItem value="Safe for Human Consumption">Safe Leftovers</SelectItem>
                              <SelectItem value="Only for Animal Feed">Animal Feed Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Pickup Area</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. T. Nagar, Chennai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-dashed">
                    <h3 className="font-semibold text-sm">Media & Verification</h3>
                    <FormField
                      control={form.control}
                      name="imageUrls"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Image URLs</FormLabel>
                          <FormControl>
                            <Input placeholder="https://image1.com, https://image2.com" {...field} />
                          </FormControl>
                          <FormDescription>Link to photos of the food item.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="testingReportUrls"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Test Results / Lab Reports</FormLabel>
                          <FormControl>
                            <Input placeholder="https://report-pdf.com" {...field} />
                          </FormControl>
                          <FormDescription>Proof of hygiene or lab verification for safety.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
                    Post Surplus Listing
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}