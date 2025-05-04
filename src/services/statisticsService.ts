
import { getMockIssues } from "@/data/mockIssues";

/**
 * Get statistics about issues
 */
export const getIssueStatistics = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const issues = getMockIssues();
  
  // Count issues by status
  const statusStats = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count issues by category
  const categoryStats = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get top voted issues
  const topVotedIssues = [...issues]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);
  
  return {
    statusStats,
    categoryStats,
    topVotedIssues,
    totalIssues: issues.length,
  };
};
