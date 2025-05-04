import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIssueStatistics } from '@/services/issueService';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Define the type for the statistics data
interface IssueStatistics {
  statusStats: Record<string, number>;
  categoryStats: Record<string, number>;
  topVotedIssues: Array<{
    id: string;
    title: string;
    category: string;
    status: string;
    votes: number;
  }>;
  totalIssues: number;
}

const StatisticsPage: React.FC = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<IssueStatistics>({
    queryKey: ['issue-stats'],
    queryFn: getIssueStatistics,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Issue Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle className="h-6 bg-gray-200 rounded w-1/2"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle className="h-6 bg-gray-200 rounded w-1/2"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error loading statistics",
      description: "Failed to load issue statistics. Please try again.",
      variant: "destructive",
    });
    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Issue Statistics</h1>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500">Failed to load statistics. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts - now with proper type checking
  const statusData = data ? Object.entries(data.statusStats).map(([name, value]) => ({ name, value })) : [];
  const categoryData = data ? Object.entries(data.categoryStats).map(([name, value]) => ({ name, value })) : [];

  // Colors for status chart
  const statusColors = {
    "Pending": "#F59E0B",
    "In Progress": "#3B82F6",
    "Completed": "#10B981",
    "Rejected": "#EF4444"
  };

  // Colors for category chart
  const categoryColors = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BDA", "#FF6B6B"
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Issue Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[entry.name as keyof typeof statusColors] || "#8884d8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Voted Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {data && data.topVotedIssues && data.topVotedIssues.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Title</th>
                    <th className="text-left py-2 px-4">Category</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topVotedIssues.map((issue) => (
                    <tr key={issue.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{issue.title}</td>
                      <td className="py-2 px-4">{issue.category}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          issue.status === 'Pending' ? 'bg-civic-pending text-white' :
                          issue.status === 'In Progress' ? 'bg-civic-inprogress text-white' :
                          issue.status === 'Completed' ? 'bg-civic-completed text-white' :
                          'bg-civic-rejected text-white'
                        }`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 font-bold">{issue.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No issues found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPage;
