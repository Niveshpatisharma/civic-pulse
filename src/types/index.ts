
export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type IssueCategory = 
  | "Roads & Infrastructure" 
  | "Public Safety" 
  | "Sanitation" 
  | "Environmental" 
  | "Public Services" 
  | "Other";

export type IssueStatus = "Pending" | "In Progress" | "Completed" | "Rejected";

export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: Location;
  imageUrl?: string;
  votes: number;
  hasUserVoted?: boolean;
  reporterId: string;
  reporterName: string;
  createdAt: string;
  updatedAt: string;
};

export type IssueFormData = {
  title: string;
  description: string;
  category: IssueCategory;
  location: Location;
  imageUrl?: string;
};
