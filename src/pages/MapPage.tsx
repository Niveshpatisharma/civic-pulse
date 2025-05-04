
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getIssues } from '@/services/issueService';
import { Issue, IssueStatus } from '@/types';
import { MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MapPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const { toast } = useToast();
  
  const { data: issues, isLoading, error } = useQuery({
    queryKey: ['issues-all'],
    queryFn: () => getIssues(1, 100), // Fetch a larger number of issues for the map
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading issues",
        description: "Failed to load issues for the map. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Calculate map dimensions based on India's geographic boundaries
  const mapWidth = 800;
  const mapHeight = 600;
  
  // India's approximate bounds
  const minLat = 8; // Southern tip
  const maxLat = 37; // Northern tip
  const minLng = 68; // Western edge
  const maxLng = 97; // Eastern edge

  // Convert geographic coordinates to pixel coordinates
  const geoToPixel = (lat: number, lng: number) => {
    // Convert lng/lat to pixel positions
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight; // Y is inverted
    return { x, y };
  };

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const getStatusColor = (status: IssueStatus) => {
    const colors = {
      "Pending": "bg-civic-pending text-white",
      "In Progress": "bg-civic-inprogress text-white",
      "Completed": "bg-civic-completed text-white",
      "Rejected": "bg-civic-rejected text-white",
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Issue Map</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="relative w-full h-[600px] bg-gray-100 border rounded-lg overflow-hidden">
                {/* Simple India map placeholder - in production, use a proper map component */}
                <img 
                  src="https://placehold.co/800x600?text=India+Map" 
                  alt="India Map" 
                  className="w-full h-full object-cover"
                />
                
                {/* Issue markers */}
                {!isLoading && issues && issues.map(issue => {
                  const { x, y } = geoToPixel(issue.location.latitude, issue.location.longitude);
                  
                  // Skip markers outside the map bounds
                  if (x < 0 || x > mapWidth || y < 0 || y > mapHeight) return null;
                  
                  let markerColor;
                  switch(issue.status) {
                    case "Pending": markerColor = "text-civic-pending"; break;
                    case "In Progress": markerColor = "text-civic-inprogress"; break;
                    case "Completed": markerColor = "text-civic-completed"; break;
                    case "Rejected": markerColor = "text-civic-rejected"; break;
                    default: markerColor = "text-gray-500";
                  }
                  
                  return (
                    <div 
                      key={issue.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform ${
                        selectedIssue?.id === issue.id ? 'scale-125' : ''
                      }`}
                      style={{ left: `${(x / mapWidth) * 100}%`, top: `${(y / mapHeight) * 100}%` }}
                      onClick={() => handleMarkerClick(issue)}
                    >
                      <MapPin className={`h-6 w-6 ${markerColor}`} />
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-civic-pending" />
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-civic-inprogress" />
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-civic-completed" />
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-civic-rejected" />
                  <span className="text-sm">Rejected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{selectedIssue ? "Issue Details" : "Select an Issue"}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedIssue ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{selectedIssue.title}</h3>
                    <Badge className={getStatusColor(selectedIssue.status)}>
                      {selectedIssue.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">
                      Category: {selectedIssue.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Reported by: {selectedIssue.reporterName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(selectedIssue.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedIssue.description}
                  </p>
                  
                  {selectedIssue.location.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedIssue.location.address}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedIssue.votes}</span>
                    <span className="text-gray-500">votes</span>
                  </div>
                  
                  {selectedIssue.imageUrl && (
                    <img 
                      src={selectedIssue.imageUrl} 
                      alt={selectedIssue.title} 
                      className="w-full h-auto rounded-md mt-4"
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                  <MapPin className="h-16 w-16 mb-4" />
                  <p>Select an issue marker on the map to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
