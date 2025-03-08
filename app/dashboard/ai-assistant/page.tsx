"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Brain, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Brain className="w-10 h-10 text-primary animate-pulse" />
        <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
         CodeGenie
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div 
          className="hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border border-gray-700">
            <CardHeader>
              <CardTitle>📌 Ask Your Question</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
  placeholder="Create a simple Task Manager App in React that allows users to add, mark as completed, and delete tasks.With complete React code"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  className="min-h-[200px] text-lg p-3 bg-white border border-gray-700 focus:ring-2 focus:ring-blue-500 transition text-black"
/>

                <Button 
                  type="submit" 
                  disabled={loading || !prompt.trim()} 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Get Answer
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Section */}
        <motion.div 
          className="hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border border-gray-700 bg-gray-900">
            <CardHeader>
              <CardTitle>💡 AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none text-white">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-700 rounded w-5/6"></div>
                  </div>
                ) : response ? (
                  <ReactMarkdown>{response}</ReactMarkdown>
                ) : (
                  <p className="text-gray-400">Your AI-powered response will appear here...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}