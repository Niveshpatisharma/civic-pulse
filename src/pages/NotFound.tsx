
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <p className="text-gray-500 dark:text-gray-500 max-w-md text-center mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
