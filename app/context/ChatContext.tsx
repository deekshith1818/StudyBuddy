"use client";

import React, { createContext, useContext, useState } from 'react';

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
};

type Chat = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  unread: number;
};

type ChatContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedChat: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat1",
      name: "Study Group - Math",
      avatar: "/groups/math.png",
      lastMessage: "When is the next meeting?",
      unread: 2
    },
    {
      id: "chat2",
      name: "Physics Project Team",
      avatar: "/groups/physics.png",
      lastMessage: "I've uploaded the report",
      unread: 0
    },
    {
      id: "chat3",
      name: "Literature Club",
      avatar: "/groups/literature.png",
      lastMessage: "Great discussion today!",
      unread: 1
    }
  ]);

  return (
    <ChatContext.Provider value={{ 
      messages, 
      setMessages, 
      selectedChat, 
      setSelectedChat,
      chats,
      setChats
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 