"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to StudyBuddy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for collaborative learning, task management, and study group coordination.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardHeader>
              <BookOpen className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>
                Create or join study groups for collaborative learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Create private or public groups</li>
                <li>Share resources and notes</li>
                <li>Schedule group study sessions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Real-time Chat</CardTitle>
              <CardDescription>
                Communicate with your study partners instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Group and private messaging</li>
                <li>Share files and links</li>
                <li>Stay connected with peers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Keep track of assignments and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Create and assign tasks</li>
                <li>Set due dates and reminders</li>
                <li>Track progress</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Work together effectively with your peers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Share study materials</li>
                <li>Collaborative note-taking</li>
                <li>Peer support system</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}