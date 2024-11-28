import { create } from 'zustand';
import type { Mentor } from '../types';

interface MentorState {
  mentors: Mentor[];
  connections: string[];
  addConnection: (mentorId: string) => void;
  removeConnection: (mentorId: string) => void;
}

export const useMentorStore = create<MentorState>((set) => ({
  mentors: [],
  connections: [],
  addConnection: (mentorId) =>
    set((state) => ({
      connections: [...state.connections, mentorId],
    })),
  removeConnection: (mentorId) =>
    set((state) => ({
      connections: state.connections.filter((id) => id !== mentorId),
    })),
}));