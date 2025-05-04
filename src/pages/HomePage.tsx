
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flag, MapPin, CheckCircle, Vote } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-civic-primary mb-4">
          Welcome to CivicSync
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A community-powered platform for reporting, tracking, and resolving local civic issues.
        </p>
        {!isAuthenticated && (
          <div className="mt-8">
            <Link to="/auth">
              <Button className="text-lg px-8 py-6">Get Started</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Flag className="h-12 w-12 text-civic-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Report Issues</h3>
            <p className="text-gray-600">
              Easily document and report civic issues in your community, from potholes to broken streetlights.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <MapPin className="h-12 w-12 text-civic-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Map View</h3>
            <p className="text-gray-600">
              Visualize issues geographically to better understand problem areas in your community.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Vote className="h-12 w-12 text-civic-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">Vote on Priority</h3>
            <p className="text-gray-600">
              Cast your vote on issues that matter most to help authorities prioritize their resolution.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-civic-completed mb-4" />
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Follow the progress of reported issues from initial submission to final resolution.
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">How It Works</h3>
            <ol className="list-decimal ml-5 space-y-3">
              <li>Create an account or log in to get started</li>
              <li>Report issues with detailed descriptions and optional photos</li>
              <li>Vote on existing issues to prioritize community concerns</li>
              <li>Track the status of reported issues from pending to completion</li>
              <li>View statistics and trends to understand community improvement</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {isAuthenticated && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to make a difference?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/issues/new">
              <Button className="text-lg">Report an Issue</Button>
            </Link>
            <Link to="/issues">
              <Button variant="outline" className="text-lg">Browse Issues</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
