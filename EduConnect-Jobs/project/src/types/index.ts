export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  yearsOfExperience: number;
  bio: string;
  imageUrl: string;
  matchScore?: number;
}

export interface MatchFilters {
  industry?: string;
  expertise?: string[];
  experienceLevel?: 'junior' | 'mid' | 'senior';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'mentor' | 'employer';
  imageUrl?: string;
  title?: string;
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  salary?: string;
  description: string;
  requirements: string[];
  employerId: string;
  createdAt: string;
  deadline: string;
  status: 'open' | 'closed';
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  resume: string;
  coverLetter?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}