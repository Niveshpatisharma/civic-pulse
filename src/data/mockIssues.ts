
import { Issue } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock data for issues (replace with actual API calls in a real application)
const mockIssues: Issue[] = [
  {
    id: uuidv4(),
    title: "Pothole on Main Street",
    description: "A large and dangerous pothole has formed on Main Street, causing a hazard for drivers and cyclists.",
    category: "Roads & Infrastructure",
    status: "Pending",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Main Street, Los Angeles, CA"
    },
    imageUrl: "https://example.com/pothole.jpg",
    votes: 5,
    hasUserVoted: false,
    reporterId: "user-1",
    reporterName: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Streetlight Outage",
    description: "The streetlight at the corner of Elm and Oak is not working, creating a safety concern at night.",
    category: "Public Safety",
    status: "In Progress",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Elm and Oak, Los Angeles, CA"
    },
    imageUrl: "https://example.com/streetlight.jpg",
    votes: 10,
    hasUserVoted: false,
    reporterId: "user-2",
    reporterName: "Jane Smith",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Garbage Collection Issue",
    description: "Garbage has not been collected for two weeks, leading to unsanitary conditions.",
    category: "Sanitation",
    status: "Completed",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Residential Area, Los Angeles, CA"
    },
    imageUrl: "https://example.com/garbage.jpg",
    votes: 3,
    hasUserVoted: false,
    reporterId: "user-1",
    reporterName: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Illegal Dumping",
    description: "There has been illegal dumping in the park, creating an environmental hazard.",
    category: "Environmental",
    status: "Pending",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "City Park, Los Angeles, CA"
    },
    imageUrl: "https://example.com/dumping.jpg",
    votes: 7,
    hasUserVoted: false,
    reporterId: "user-3",
    reporterName: "Alice Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Water Leak",
    description: "There is a significant water leak on the corner of 4th and Main.",
    category: "Public Services",
    status: "In Progress",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "4th and Main, Los Angeles, CA"
    },
    imageUrl: "https://example.com/waterleak.jpg",
    votes: 12,
    hasUserVoted: false,
    reporterId: "user-2",
    reporterName: "Jane Smith",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Damaged Signage",
    description: "Road signage near the highway exit is damaged and difficult to read.",
    category: "Roads & Infrastructure",
    status: "Pending",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Highway Exit, Los Angeles, CA"
    },
    imageUrl: "https://example.com/signage.jpg",
    votes: 6,
    hasUserVoted: false,
    reporterId: "user-3",
    reporterName: "Alice Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Vandalism",
    description: "There has been an increase in vandalism in the downtown area.",
    category: "Public Safety",
    status: "In Progress",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Downtown, Los Angeles, CA"
    },
    imageUrl: "https://example.com/vandalism.jpg",
    votes: 9,
    hasUserVoted: false,
    reporterId: "user-1",
    reporterName: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Overflowing Bins",
    description: "Public bins in the market area are constantly overflowing.",
    category: "Sanitation",
    status: "Completed",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Market Area, Los Angeles, CA"
    },
    imageUrl: "https://example.com/bins.jpg",
    votes: 4,
    hasUserVoted: false,
    reporterId: "user-2",
    reporterName: "Jane Smith",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Air Pollution",
    description: "High levels of air pollution reported near the industrial zone.",
    category: "Environmental",
    status: "Pending",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Industrial Zone, Los Angeles, CA"
    },
    imageUrl: "https://example.com/pollution.jpg",
    votes: 8,
    hasUserVoted: false,
    reporterId: "user-3",
    reporterName: "Alice Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Broken Water Fountain",
    description: "The public water fountain in the park is broken.",
    category: "Public Services",
    status: "In Progress",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "City Park, Los Angeles, CA"
    },
    imageUrl: "https://example.com/fountain.jpg",
    votes: 11,
    hasUserVoted: false,
    reporterId: "user-1",
    reporterName: "John Doe",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const getMockIssues = (): Issue[] => {
  return mockIssues;
};

export default mockIssues;
