"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStudyGroup } from "@/app/context/StudyGroupContext";
import { useChat } from "@/app/context/ChatContext";
import {
  Users,
  Calendar,
  BookOpen,
  ArrowUpRight,
  Clock,
  Target,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Activity
} from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";

export default function DashboardPage() {
  const { groups } = useStudyGroup();
  const { messages, chats } = useChat();

  // Calculate real stats
  const totalMembers = groups.reduce((acc, group) => acc + group.members.length, 0);
  const totalSessions = groups.reduce((acc, group) => acc + group.sessions.length, 0);
  const upcomingSessions = groups.flatMap(group => 
    group.sessions.filter(session => new Date(session.date) > new Date())
  );

  // Get upcoming sessions for next 24 hours
  const next24HoursSessions = upcomingSessions
    .filter(session => {
      const sessionDate = new Date(session.date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return sessionDate <= tomorrow;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Generate recent activities based on real data
  const recentActivities = [
    // Add recent sessions
    ...groups.flatMap(group => 
      group.sessions
        .filter(session => new Date(session.date) <= new Date())
        .map(session => ({
          id: session.id,
          type: "session",
          title: session.title,
          time: format(new Date(session.date), "MMM d, h:mm a"),
          group: group.name,
          icon: BookOpen,
        }))
    ),
    // Add recent messages
    ...messages.map(msg => ({
      id: msg.id,
      type: "message",
      title: `Message in ${chats.find(c => c.id === msg.chatId)?.name || 'Study Group'}`,
      time: format(new Date(msg.timestamp), "MMM d, h:mm a"),
      from: msg.sender.name,
      icon: MessageSquare,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
   .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto p-6 relative">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's your study overview</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Study Groups",
              value: groups.length,
              icon: Users,
              trend: `${totalMembers} members`,
            },
            {
              title: "Total Sessions",
              value: totalSessions,
              icon: Clock,
              trend: `${upcomingSessions.length} upcoming`,
            },
            {
              title: "Active Chats",
              value: chats.length,
              icon: MessageSquare,
              trend: `${messages.length} messages`,
            },
            {
              title: "Next Session",
              value: next24HoursSessions.length > 0 ? 
                format(new Date(next24HoursSessions[0].date), "h:mm a") : 
                "None",
              icon: Calendar,
              trend: next24HoursSessions.length > 0 ? 
                (isToday(new Date(next24HoursSessions[0].date)) ? "Today" : "Tomorrow") : 
                "No upcoming",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-all">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-end gap-2">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-xs text-green-500 mb-1">{stat.trend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Study Groups Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Study Groups Overview</CardTitle>
              <CardDescription>Active groups and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.map(group => (
                  <div key={group.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.members.length} members · {group.sessions.length} sessions
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest study activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                        {activity.group && (
                          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                            {activity.group}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Next 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {next24HoursSessions.map(session => (
                  <div key={session.id} className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(session.date), "h:mm a")} · {session.duration}min
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
                {next24HoursSessions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming sessions in the next 24 hours
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}