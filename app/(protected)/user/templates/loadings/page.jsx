"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';

const loadingTemplates = [
  // Friendly Tone
  { id: 1, type: "loading", context: "general", tone: "friendly", content: "Hang tight, we’re getting everything ready for you!" },
  { id: 2, type: "loading", context: "upload", tone: "friendly", content: "Your files are being uploaded. Almost there!" },
  { id: 3, type: "loading", context: "download", tone: "friendly", content: "Just a moment, your download is starting!" },

  // Formal Tone
  { id: 4, type: "loading", context: "general", tone: "formal", content: "Please wait while the system processes your request." },
  { id: 5, type: "loading", context: "upload", tone: "formal", content: "Uploading in progress. This may take a few moments." },
  { id: 6, type: "loading", context: "search", tone: "formal", content: "Searching for results. Please remain patient." },

  // Neutral Tone
  { id: 7, type: "loading", context: "general", tone: "neutral", content: "Loading..." },
  { id: 8, type: "loading", context: "search", tone: "neutral", content: "Finding the best match for your query." },
  { id: 9, type: "loading", context: "data", tone: "neutral", content: "Processing data. Please hold on." },

  // Encouraging Tone
  { id: 10, type: "loading", context: "general", tone: "encouraging", content: "You’re doing great! Just a few more seconds." },
  { id: 11, type: "loading", context: "progress", tone: "encouraging", content: "Keep up the pace! We’re almost there." },
  { id: 12, type: "loading", context: "installation", tone: "encouraging", content: "Hang in there, we’re setting things up for you!" },

  // Urgent Tone
  { id: 13, type: "loading", context: "critical", tone: "urgent", content: "Action required: Please wait while we resolve this quickly." },
  { id: 14, type: "loading", context: "update", tone: "urgent", content: "Updating critical files. Do not close the application." },
  { id: 15, type: "loading", context: "network", tone: "urgent", content: "Reconnecting... Please do not close the window." },

  // Humorous Tone
  { id: 16, type: "loading", context: "general", tone: "humorous", content: "If this takes too long, feel free to grab a snack!" },
  { id: 17, type: "loading", context: "upload", tone: "humorous", content: "Uploading... Now’s a good time to stretch!" },
  { id: 18, type: "loading", context: "download", tone: "humorous", content: "Starting your download... Trust us, it’s worth the wait." },

  // Additional Use Cases
  { id: 19, type: "loading", context: "login", tone: "friendly", content: "Logging you in. Welcome back!" },
  { id: 20, type: "loading", context: "logout", tone: "neutral", content: "Logging out. See you soon!" },
  { id: 21, type: "loading", context: "payment", tone: "formal", content: "Processing your payment. Please do not refresh." },
  { id: 22, type: "loading", context: "search", tone: "encouraging", content: "We’re finding the best results for you. Hang tight!" },
  { id: 23, type: "loading", context: "update", tone: "friendly", content: "Updating your application. This won’t take long!" },
  { id: 24, type: "loading", context: "profile", tone: "neutral", content: "Saving your profile settings..." },
  { id: 25, type: "loading", context: "sync", tone: "neutral", content: "Syncing your data. Please hold on." },

  { id: 26, type: "loading", context: "general", tone: "humorous", content: "Loading... Go ahead, make a coffee." },
  { id: 27, type: "loading", context: "upload", tone: "friendly", content: "Uploading your memories..." },
  { id: 28, type: "loading", context: "general", tone: "formal", content: "Please wait while we optimize your experience." },
  { id: 29, type: "loading", context: "search", tone: "humorous", content: "Searching... Good things come to those who wait." },
  { id: 30, type: "loading", context: "download", tone: "friendly", content: "Downloading... Almost there!" },

  { id: 31, type: "loading", context: "critical", tone: "urgent", content: "Restoring your data. Do not interrupt the process." },
  { id: 32, type: "loading", context: "search", tone: "humorous", content: "Results are brewing... Hope you like what we find!" },
  { id: 33, type: "loading", context: "data", tone: "formal", content: "Analyzing data. Please wait." },
  { id: 34, type: "loading", context: "payment", tone: "friendly", content: "Processing your payment... Thank you for your patience." },
  { id: 35, type: "loading", context: "progress", tone: "encouraging", content: "Almost there! Your progress is looking great." },
  { id: 36, type: "loading", context: "update", tone: "neutral", content: "Installing updates..." },
  { id: 37, type: "loading", context: "sync", tone: "encouraging", content: "Synchronizing data. Everything is coming together!" },
  { id: 38, type: "loading", context: "general", tone: "humorous", content: "We’re working hard... You can relax for a bit." },

  { id: 39, type: "loading", context: "general", tone: "formal", content: "Setting up your workspace. Please wait." },
  { id: 40, type: "loading", context: "sync", tone: "neutral", content: "Your data is being synchronized." },
  { id: 41, type: "loading", context: "general", tone: "friendly", content: "Preparing your dashboard..." },
  { id: 42, type: "loading", context: "upload", tone: "encouraging", content: "Uploading... Your files are in good hands!" },
  { id: 43, type: "loading", context: "payment", tone: "humorous", content: "Counting your pennies... This won’t take long!" },
  { id: 44, type: "loading", context: "general", tone: "neutral", content: "Loading your preferences..." },
  { id: 45, type: "loading", context: "progress", tone: "encouraging", content: "Keep going! You’re almost done." },
  { id: 46, type: "loading", context: "installation", tone: "neutral", content: "Configuring installation files..." },
  { id: 47, type: "loading", context: "sync", tone: "neutral", content: "Syncing with the server..." },
  { id: 48, type: "loading", context: "search", tone: "neutral", content: "Scanning the database..." },
  { id: 49, type: "loading", context: "download", tone: "friendly", content: "Downloading your content..." },
  { id: 50, type: "loading", context: "update", tone: "neutral", content: "Updating files..." },
  { id: 51, type: "loading", context: "progress", tone: "encouraging", content: "You're doing great! Let’s finish this up." },
  { id: 52, type: "loading", context: "data", tone: "formal", content: "Loading analytics. This may take a moment." },
  { id: 53, type: "loading", context: "login", tone: "friendly", content: "Getting everything ready for you..." },
  { id: 54, type: "loading", context: "logout", tone: "neutral", content: "Logging out... See you soon!" },
  { id: 55, type: "loading", context: "payment", tone: "urgent", content: "Processing payment. Do not refresh or close this window." },
  { id: 56, type: "loading", context: "general", tone: "humorous", content: "Hold tight, the magic is happening behind the scenes!" },
  { id: 57, type: "loading", context: "critical", tone: "urgent", content: "Recovering your data. Do not interrupt the process." },
  { id: 58, type: "loading", context: "progress", tone: "encouraging", content: "Stay with us! Your progress is on track." },
  { id: 59, type: "loading", context: "installation", tone: "formal", content: "Installing components. This may take a few minutes." },
  { id: 60, type: "loading", context: "update", tone: "humorous", content: "Applying updates... You’re going to love the results!" }
];

export default function LoadingTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { savedTemplates, saveLoadingTemplate } = useTemplateStore();

  const copyToClipboard = (id, content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const toggleSave = async (template) => {
    const success = await saveLoadingTemplate(session, template);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Loading Messages</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loadingTemplates.map((template) => (
          <div
            key={template.id}
            className={cn(
              'relative flex flex-col items-center p-4 rounded-md shadow-sm bg-gray-100 text-gray-800 hover:shadow-lg transition-all duration-300',
              hoveredCard === String(template.id) && 'scale-[1.02]'
            )}
            onMouseEnter={() => setHoveredCard(String(template.id))}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute -top-3 -right-3 z-10">
              {savedTemplates.includes(template.id) && (
                <Badge className="bg-yellow-500">Saved</Badge>
              )}
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-medium leading-relaxed">
                {template.content}
              </p>
              <p className="text-sm text-muted-foreground">
                {template.context || 'Perfect for general loading states'}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => toggleSave(template)}
                className={cn(
                  "hover:text-primary transition-colors",
                  savedTemplates.includes(template.id) && "text-yellow-500"
                )}
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    savedTemplates.includes(template.id) && "fill-yellow-500"
                  )}
                />
              </button>
              <button
                onClick={() => copyToClipboard(template.id, template.content)}
                className="hover:text-primary transition-colors"
              >
                {copiedId === template.id ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
