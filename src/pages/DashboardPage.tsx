
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, MapPin, Edit, Trash, Calendar } from 'lucide-react';
import { getUserIssues, getIssueStatistics } from '@/services/issueService';
import { Issue } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [userIssues, setUserIssues] = useState<Issue[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        if (user) {
          const issues = await getUserIssues(user.id);
          setUserIssues(issues);
        }
        const stats = await getIssueStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  // Prepare data for the status chart
  const statusChartData = statistics ? Object.entries(statistics.statusStats).map(([name, value]) => ({
    name,
    value,
  })) : [];

  // Colors for the status chart
  const STATUS_COLORS = {
    Pending: "#F59E0B",
    "In Progress": "#3B82F6",
    Completed: "#10B981",
    Rejected: "#EF4444",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>My Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userIssues.length}</div>
            <p className="text-gray-600">Issues reported</p>
            <Link to="/my-issues">
              <Button variant="link" className="p-0 mt-2">View all</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Report Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Report a new civic issue in your community</p>
            <Link to="/issues/new">
              <Button>
                <Flag className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Browse Map</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">View issues on an interactive map</p>
            <Link to="/map">
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                Open Map
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-civic-primary"></div>
              </div>
            ) : userIssues.length > 0 ? (
              <div className="space-y-4">
                {userIssues.slice(0, 3).map((issue) => (
                  <div key={issue.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <Link to={`/issues/${issue.id}`} className="font-medium hover:underline">
                        {issue.title}
                      </Link>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {issue.status === "Pending" && (
                        <>
                          <Link to={`/issues/${issue.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">You haven't reported any issues yet.</p>
                <Link to="/issues/new">
                  <Button variant="link" className="mt-2">Report your first issue</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
