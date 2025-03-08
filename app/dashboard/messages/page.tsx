"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { useChat } from "@/app/context/ChatContext";

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

export default function MessagesPage() {
  const { messages, setMessages, selectedChat, setSelectedChat, chats } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const currentUser = {
    id: "user1",
    name: "You",
    avatar: "/avatars/user1.png"
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      content: newMessage,
      sender: currentUser,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        {/* Chat List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Messages</CardTitle>
              <Button size="icon" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-2">
                <AnimatePresence>
                  {filteredChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Button
                        variant={selectedChat === chat.id ? "secondary" : "ghost"}
                        className="w-full justify-start px-2 py-6"
                        onClick={() => setSelectedChat(chat.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{chat.name}</p>
                              {chat.unread > 0 && (
                                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                                  {chat.unread}
                                </span>
                              )}
                            </div>
                            {chat.lastMessage && (
                              <p className="text-sm text-muted-foreground truncate">
                                {chat.lastMessage}
                              </p>
                            )}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="md:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} />
                    <AvatarFallback>
                      {chats.find(c => c.id === selectedChat)?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{chats.find(c => c.id === selectedChat)?.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-22rem)] mb-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.sender.id === currentUser.id ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              message.sender.id === currentUser.id ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.sender.avatar} />
                              <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender.id === currentUser.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {format(message.timestamp, "HH:mm")}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">Select a chat to start messaging</p>
                <p className="text-sm text-muted-foreground">
                  Choose from your conversations on the left
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
} 