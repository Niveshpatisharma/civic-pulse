
import { Issue, IssueFormData } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import mockIssues, { getMockIssues } from "@/data/mockIssues";

/**
 * Fetches all issues with pagination
 */
export const getIssues = async (page = 1, limit = 10): Promise<Issue[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedIssues = mockIssues.slice(startIndex, endIndex);

  return paginatedIssues;
};

/**
 * Creates a new issue
 */
export const createIssue = async (
  issueData: IssueFormData, 
  user: { id: string; name: string; email: string }
): Promise<Issue> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newIssue: Issue = {
    id: uuidv4(),
    ...issueData,
    status: "Pending",
    votes: 0,
    hasUserVoted: false,
    reporterId: user.id,
    reporterName: user.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockIssues.push(newIssue);
  return newIssue;
};
