
import { Issue } from "@/types";
import { getMockIssues } from "@/data/mockIssues";

/**
 * Fetches issues created by the specified user
 */
export const getMyIssues = async (userId: string, page = 1, limit = 10): Promise<Issue[]> => {
  // In a real app, this would filter issues from the database by userId
  // For the mock version, we'll filter the issues from the mock data
  
  const userIssues = getMockIssues()
    .filter(issue => issue.reporterId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
  const paginatedIssues = userIssues.slice((page - 1) * limit, page * limit);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return paginatedIssues;
};

/**
 * Alias for getMyIssues to fix the DashboardPage error
 */
export const getUserIssues = async (userId: string): Promise<Issue[]> => {
  return getMyIssues(userId);
};
