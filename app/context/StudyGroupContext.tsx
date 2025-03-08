"use client";

import React, { createContext, useContext, useState } from 'react';

type Member = {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member';
};

type StudySession = {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  topic: string;
  attendees: string[]; // member ids
};

type StudyGroup = {
  id: string;
  name: string;
  description: string;
  subject: string;
  avatar?: string;
  members: Member[];
  sessions: StudySession[];
  createdAt: Date;
};

type StudyGroupContextType = {
  groups: StudyGroup[];
  setGroups: React.Dispatch<React.SetStateAction<StudyGroup[]>>;
  selectedGroup: string | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string | null>>;
};

const StudyGroupContext = createContext<StudyGroupContextType | undefined>(undefined);

export function StudyGroupProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<StudyGroup[]>([
    {
      id: "group1",
      name: "Advanced Calculus Study Group",
      description: "Group for studying calculus topics including derivatives, integrals, and series.",
      subject: "Mathematics",
      members: [
        { id: "user1", name: "John Doe", role: "admin" },
        { id: "user2", name: "Jane Smith", role: "member" },
      ],
      sessions: [
        {
          id: "session1",
          title: "Limits and Continuity",
          date: new Date(Date.now() + 86400000), // tomorrow
          duration: 120,
          topic: "Understanding limits and continuous functions",
          attendees: ["user1", "user2"]
        }
      ],
      createdAt: new Date()
    }
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <StudyGroupContext.Provider value={{
      groups,
      setGroups,
      selectedGroup,
      setSelectedGroup
    }}>
      {children}
    </StudyGroupContext.Provider>
  );
}

export function useStudyGroup() {
  const context = useContext(StudyGroupContext);
  if (context === undefined) {
    throw new Error('useStudyGroup must be used within a StudyGroupProvider');
  }
  return context;
} 