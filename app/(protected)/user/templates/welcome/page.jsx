"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  Star,
  Smile,
  Heart,
  Sparkles,
  Award,
  Sun,
  Rocket,
  PartyPopper,
  Hand,
  HandMetal
} from "lucide-react";
import { cn } from "@/lib/utils";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';
import { Toaster } from "react-hot-toast";

const welcomeIcons = {
  Friendly: <Hand className="h-6 w-6 text-amber-500" />,
  Professional: <Award className="h-6 w-6 text-blue-500" />,
  Encouraging: <Rocket className="h-6 w-6 text-purple-500" />,
  Reassuring: <Heart className="h-6 w-6 text-pink-500" />,
  Concise: <Sun className="h-6 w-6 text-yellow-500" />,
  Festival: <HandMetal className="h-6 w-6 text-fuchsia-500" />,
  Natural: <Sparkles className="h-6 w-6 text-emerald-500" />,
  Humorous: <Smile className="h-6 w-6 text-orange-500" />,
  Technical: <Rocket className="h-6 w-6 text-slate-500" />,
  Urgent: <PartyPopper className="h-6 w-6 text-rose-500" />,
  Neutral: <Sun className="h-6 w-6 text-gray-500" />
};

const toneColors = {
  Friendly: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
  Professional: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
  Encouraging: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
  Reassuring: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200",
  Concise: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200",
  Festival: "bg-gradient-to-br from-fuchsia-50 to-purple-50 border-fuchsia-200",
  Natural: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
  Humorous: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200",
  Technical: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
  Urgent: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200",
  Neutral: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
};

export default function WelcomeTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const {
    fetchMicroCopy,
    welcomeMicroCopy,
    saveMicroCopy,
    savedTemplates,
    isLoading,
    isSaving
  } = useTemplateStore();

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

  const toggleSave = async (welcome) => {
    await saveMicroCopy(session, welcome, 'welcome');
  };

  const filteredWelcomes =
    filter === "all"
      ? welcomeMicroCopy
      : welcomeMicroCopy?.filter((welcome) => welcome?.tone === filter);

  useEffect(() => {
    if (session) {
      fetchMicroCopy(session, 'welcome');
    }
  }, [session, fetchMicroCopy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Messages
        </h1>
        <p className="text-gray-600 mt-2">Craft the perfect welcome for your users</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          key="all"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        >
          All Tones
        </Button>
        {Object.keys(toneColors).map((tone) => (
          <Button
            key={tone}
            variant={filter === tone ? "default" : "outline"}
            onClick={() => setFilter(tone)}
            className={cn(
              "border transition-all",
              filter === tone
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "hover:border-purple-300"
            )}
          >
            {tone}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-purple-600 mt-4">Loading welcome messages...</p>
        </div>
      )}

      {/* Welcome Messages Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWelcomes?.map((welcome) => (
          <div
            key={welcome?.id}
            className={cn(
              "relative p-6 rounded-xl border shadow-sm hover:shadow-md transition-all",
              toneColors[welcome?.tone] || "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
            )}
          >
            <div className="flex items-center justify-between flex-col">
              <div className="flex items-center space-x-2">
                {welcomeIcons[welcome?.tone]}
                <span className="font-medium text-gray-700">{welcome?.tone}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(welcome)}
                  className={cn(
                    "p-2 rounded-full hover:bg-white/50 transition-colors",
                    savedTemplates.includes(welcome?.id) && "text-yellow-500"
                  )}
                >
                  <Star
                    className={cn(
                      "h-5 w-5",
                      savedTemplates.includes(welcome?.id) && "fill-yellow-500"
                    )}
                  />
                </button>

                <button
                  onClick={() => copyToClipboard(welcome?.id, welcome?.content)}
                  className="p-2 rounded-full hover:bg-white/50 transition-colors"
                  disabled={isSaving}
                >
                  {copiedId === welcome?.id ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {welcome?.context}
              </div>

              <p className="text-gray-800 font-medium leading-relaxed text-center">
                {welcome?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
