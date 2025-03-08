import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, LayoutDashboard, MessageSquare, Users, Calendar } from "lucide-react";
import { ChatProvider } from "@/app/context/ChatContext";
import { StudyGroupProvider } from "@/app/context/StudyGroupContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <StudyGroupProvider>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <div className="w-64 bg-card border-r">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">StudyBuddy</h2>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard/groups">
                    <Users className="mr-2 h-4 w-4" />
                    Study Groups
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard/tasks">
                    <Calendar className="mr-2 h-4 w-4" />
                    Tasks
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard/ai-assistant">
                    <Brain className="mr-2 h-4 w-4" />
                    AI Assistant
                  </Link>
                </Button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </StudyGroupProvider>
    </ChatProvider>
  );
}