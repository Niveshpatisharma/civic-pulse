
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { createIssue } from '@/services/issueService';
import { IssueCategory, IssueFormData, Location } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// Define the schema for the form validation
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  category: z.enum(['Roads & Infrastructure', 'Public Safety', 'Sanitation', 'Environmental', 'Public Services', 'Other'] as const),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().optional(),
  }),
  imageUrl: z.string().optional(),
});

const categories: IssueCategory[] = [
  "Roads & Infrastructure", 
  "Public Safety", 
  "Sanitation", 
  "Environmental", 
  "Public Services", 
  "Other"
];

const initialLocation: Location = {
  // Default to somewhere in India (New Delhi)
  latitude: 28.6139,
  longitude: 77.2090,
  address: ""
};

const NewIssuePage: React.FC = () => {
  const [location, setLocation] = useState<Location>(initialLocation);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Setup form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Roads & Infrastructure",
      location: initialLocation,
      imageUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Include all required fields for IssueFormData
      const issueData: IssueFormData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: location,
        imageUrl: data.imageUrl,
      };

      if (!user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to report an issue.",
          variant: "destructive",
        });
        return;
      }

      await createIssue(issueData, user);
      toast({
        title: "Issue reported successfully",
        description: "Your issue has been submitted for review.",
      });
      navigate("/issues");
    } catch (error) {
      toast({
        title: "Error reporting issue",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting issue:", error);
    }
  };

  const updateLocation = (newLocation: Partial<Location>) => {
    setLocation(prevLocation => ({
      ...prevLocation,
      ...newLocation,
    }));
    form.setValue('location', {
      ...location,
      ...newLocation,
    });
  };

  // Simple location selector (for demonstration)
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // This is a simplified example - in a real app, you would use a proper map component
    // that provides the actual geographic coordinates and potentially reverse geocoding
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const y = event.clientY - rect.top;  // y position within the element
    
    // Convert to latitude/longitude - this is just a demo approximation
    // For India: rough lat/long boundaries - not precise
    // Lat: ~8° to 37° N, Long: ~68° to 97° E
    const width = rect.width;
    const height = rect.height;
    
    const longitude = 68 + (x / width) * (97 - 68);
    const latitude = 37 - (y / height) * (37 - 8); // Y is inverted in screen coordinates
    
    updateLocation({ 
      latitude, 
      longitude,
      address: `Selected location at ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Report a New Issue</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Title</FormLabel>
                    <FormControl>
                      <Input placeholder="A brief title for the issue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a detailed description of the issue" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="URL to an image illustrating the issue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Location</FormLabel>
                <p className="text-sm text-gray-500 mb-2">Click on the map to select the issue location</p>
                
                <div 
                  className="w-full h-[300px] bg-gray-100 border rounded-md relative mb-4 overflow-hidden"
                  onClick={handleMapClick}
                >
                  {/* Simple India outline map for demonstration */}
                  <img
                    src="https://placehold.co/600x400?text=India+Map"
                    alt="India Map"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Location marker */}
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2" 
                    style={{
                      left: `${((location.longitude - 68) / (97 - 68)) * 100}%`,
                      top: `${((37 - location.latitude) / (37 - 8)) * 100}%`
                    }}
                  >
                    <MapPin className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                
                {location.address && (
                  <div className="mb-4 p-2 bg-gray-50 border rounded-md">
                    <p className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.address}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel className="text-sm">Latitude</FormLabel>
                    <Input 
                      type="number" 
                      value={location.latitude} 
                      onChange={(e) => updateLocation({ latitude: parseFloat(e.target.value) })}
                      step="0.0001"
                      min="8"
                      max="37"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel className="text-sm">Longitude</FormLabel>
                    <Input 
                      type="number" 
                      value={location.longitude} 
                      onChange={(e) => updateLocation({ longitude: parseFloat(e.target.value) })}
                      step="0.0001"
                      min="68"
                      max="97"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => navigate("/issues")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Issue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewIssuePage;
