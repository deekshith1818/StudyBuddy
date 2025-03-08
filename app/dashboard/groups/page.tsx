"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Plus, Users, Calendar as CalendarIcon, Clock, Book, BookOpen, GraduationCap, Users2, Target } from "lucide-react";
import { useStudyGroup } from "@/app/context/StudyGroupContext";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function GroupsPage() {
  const { groups, setGroups, selectedGroup, setSelectedGroup } = useStudyGroup();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    subject: ""
  });
  const [newSession, setNewSession] = useState({
    title: "",
    date: new Date(),
    duration: 60,
    topic: ""
  });

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.subject) return;

    const group = {
      id: Math.random().toString(36).substring(7),
      name: newGroup.name,
      description: newGroup.description,
      subject: newGroup.subject,
      members: [{ id: "user1", name: "You", role: "admin" as const }],
      sessions: [],
      createdAt: new Date()
    };

    setGroups([...groups, group]);
    setIsCreateDialogOpen(false);
    setNewGroup({ name: "", description: "", subject: "" });
  };

  const handleCreateSession = (groupId: string) => {
    if (!newSession.title || !newSession.topic) return;

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          sessions: [...group.sessions, {
            id: Math.random().toString(36).substring(7),
            ...newSession,
            attendees: [group.members[0].id]
          }]
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setNewSession({
      title: "",
      date: new Date(),
      duration: 60,
      topic: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto p-6 relative">
        {/* Header Section with Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Study Groups
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Collaborate, learn, and grow together with your peers in focused study groups
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users2, label: "Active Members", value: "24" },
            { icon: BookOpen, label: "Study Groups", value: groups.length.toString() },
            { icon: Target, label: "Subjects", value: "6" },
            { icon: CalendarIcon, label: "Sessions", value: "12" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Users2 className="w-4 h-4" />
              My Groups
            </Button>
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              Browse All
            </Button>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Study Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Group Name</Label>
                  <Input
                    placeholder="Enter group name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your study group"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select
                    value={newGroup.subject}
                    onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Literature">Literature</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleCreateGroup}>
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-border/50 backdrop-blur-sm hover:shadow-lg transition-all group">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{group.name}</span>
                      <Badge 
                        variant="outline" 
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {group.subject}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {group.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="members" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="members" className="data-[state=active]:bg-primary/20">
                          Members
                        </TabsTrigger>
                        <TabsTrigger value="sessions" className="data-[state=active]:bg-primary/20">
                          Sessions
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="members" className="space-y-4">
                        <div className="space-y-2">
                          {group.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-2">
                              <Avatar>
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="sessions" className="space-y-4">
                        {group.sessions.map((session) => (
                          <Card key={session.id}>
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <h4 className="font-medium">{session.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  {format(session.date, "PPP")}
                                  <Clock className="h-4 w-4 ml-2" />
                                  {session.duration} mins
                                </div>
                                <p className="text-sm">{session.topic}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleCreateSession(group.id)}
                        >
                          Schedule Session
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 