
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { getMyIssues } from '@/services/issueService';
import { Link } from 'react-router-dom';
import { IssueCategory, IssueStatus } from '@/types';
import { MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const MyIssuesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-issues', user?.id, page],
    queryFn: () => getMyIssues(user?.id || '', page, limit),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Issues</h1>
          <Link to="/issues/new">
            <Button>Report New Issue</Button>
          </Link>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error loading issues",
      description: "Failed to load your issues. Please try again.",
      variant: "destructive",
    });
    
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Issues</h1>
          <Link to="/issues/new">
            <Button>Report New Issue</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">Failed to load issues. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: IssueStatus) => {
    const colors = {
      "Pending": "bg-civic-pending text-white",
      "In Progress": "bg-civic-inprogress text-white",
      "Completed": "bg-civic-completed text-white",
      "Rejected": "bg-civic-rejected text-white",
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  const getCategoryIcon = (category: IssueCategory) => {
    return <MapPin className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Reported Issues</h1>
        <Link to="/issues/new">
          <Button>Report New Issue</Button>
        </Link>
      </div>

      {data && data.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">You haven't reported any issues yet.</p>
            <Link to="/issues/new" className="mt-4 inline-block">
              <Button>Report Your First Issue</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data && data.map((issue) => (
            <Card key={issue.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold">{issue.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(issue.category)}
                        <span>{issue.category}</span>
                      </div>
                      <span>•</span>
                      <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="font-medium">{issue.votes}</span>
                      <span className="ml-1">votes</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-gray-700 dark:text-gray-300">{issue.description}</p>
                {issue.location?.address && (
                  <div className="mt-2 text-sm text-gray-500">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {issue.location.address}
                  </div>
                )}
                {issue.imageUrl && (
                  <img 
                    src={issue.imageUrl} 
                    alt={issue.title} 
                    className="mt-4 rounded-md w-full max-h-64 object-cover"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Basic pagination */}
      {data && data.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <Button 
              variant="outline" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="mx-4 flex items-center">
              Page {page}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setPage(p => p + 1)}
              disabled={data && data.length < limit}
            >
              Next
            </Button>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MyIssuesPage;
