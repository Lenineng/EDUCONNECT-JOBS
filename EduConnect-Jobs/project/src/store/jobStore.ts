import { create } from 'zustand';
import type { Job, JobApplication } from '../types';

interface JobState {
  jobs: Job[];
  applications: JobApplication[];
  addJob: (job: Job) => void;
  applyToJob: (application: JobApplication) => void;
  updateApplicationStatus: (applicationId: string, status: JobApplication['status']) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'Remote',
      type: 'internship',
      salary: '$20-25/hour',
      description: 'Looking for a passionate frontend developer intern...',
      requirements: ['React', 'TypeScript', 'HTML/CSS'],
      employerId: '1',
      createdAt: '2024-03-15',
      deadline: '2024-04-15',
      status: 'open',
    },
    // Add more mock jobs here
  ],
  applications: [],
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  applyToJob: (application) =>
    set((state) => ({ applications: [...state.applications, application] })),
  updateApplicationStatus: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === applicationId ? { ...app, status } : app
      ),
    })),
}));