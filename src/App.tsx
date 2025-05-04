
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import IssuesPage from "@/pages/IssuesPage";
import MyIssuesPage from "@/pages/MyIssuesPage";
import NewIssuePage from "@/pages/NewIssuePage";
import MapPage from "@/pages/MapPage";
import StatisticsPage from "@/pages/StatisticsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="auth" element={<AuthPage />} />
            </Route>
            <Route path="/" element={<Layout requireAuth />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="issues" element={<IssuesPage />} />
              <Route path="issues/new" element={<NewIssuePage />} />
              <Route path="my-issues" element={<MyIssuesPage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              {/* Add other protected routes here */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
