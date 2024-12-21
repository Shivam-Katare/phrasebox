"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Copy, 
  Star, 
  XCircle, 
  AlertTriangle, 
  Bug, 
  Wifi, 
  Lock,
  FileX,
  ShieldAlert,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';
import { Toaster } from "react-hot-toast";

const errorIcons = {
  "404": <FileX className="h-8 w-8" />,
  "security": <ShieldAlert className="h-8 w-8" />,
  "network": <Wifi className="h-8 w-8" />,
  "authentication": <Lock className="h-8 w-8" />,
  "system": <Bug className="h-8 w-8" />,
  "timeout": <Clock className="h-8 w-8" />,
  "default": <AlertTriangle className="h-8 w-8" />
};

const toneColors = {
  Professional: "bg-slate-800 text-slate-100",
  Friendly: "bg-sky-700 text-sky-50",
  Encouraging: "bg-emerald-700 text-emerald-50",
  Reassuring: "bg-indigo-700 text-indigo-50",
  Concise: "bg-zinc-700 text-zinc-50",
  Festival: "bg-fuchsia-700 text-fuchsia-50",
  Natural: "bg-teal-700 text-teal-50",
  Humorous: "bg-purple-700 text-purple-50",
  Technical: "bg-gray-800 text-gray-100",
  Urgent: "bg-rose-700 text-rose-50",
  Neutral: "bg-stone-700 text-stone-50"
};

export default function ErrorPageTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const { 
    fetchMicroCopy, 
    errorpageMicroCopy, 
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

  const toggleSave = async (errorpage) => {
    await saveMicroCopy(session, errorpage, 'errorpage');
  };

  const filteredErrors =
    filter === "all"
      ? errorpageMicroCopy
      : errorpageMicroCopy?.filter((error) => error?.tone === filter);

  useEffect(() => {
    if (session) {
      fetchMicroCopy(session, 'errorpage');
    }
  }, [session, fetchMicroCopy]);

  const getErrorIcon = (context) => {
    const lowercaseContext = context.toLowerCase();
    for (const [key, icon] of Object.entries(errorIcons)) {
      if (lowercaseContext.includes(key)) {
        return icon;
      }
    }
    return errorIcons.default;
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-black">Error Page Templates</h1>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          key="all"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="text-white bg-black"
        >
          All
        </Button>
        {Object.keys(toneColors).map((tone) => (
          <Button
            key={tone}
            variant={filter === tone ? "default" : "outline"}
            onClick={() => setFilter(tone)}
            className={cn(
              "border-black text-black hover:bg-[#e2e8f0]",
              filter === tone && "bg-black text-white"
            )}
          >
            {tone}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading error templates...</p>
        </div>
      )}

      {/* Error Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredErrors?.map((error) => (
          <div
            key={error?.id}
            className={cn(
              "relative rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-102",
              toneColors[error?.tone] || "bg-gray-700 text-gray-100"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-opacity-20 border-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getErrorIcon(error?.context)}
                <span className="font-semibold">{error?.tone}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(error)}
                  className={cn(
                    "p-2 rounded-full hover:bg-white/10 transition-colors",
                    savedTemplates.includes(error?.id) && "text-yellow-300"
                  )}
                  disabled={isSaving}
                >
                  <Star
                    className={cn(
                      "h-5 w-5",
                      savedTemplates.includes(error?.id) && "fill-yellow-300"
                    )}
                  />
                </button>
                <button
                  onClick={() => copyToClipboard(error?.id, error?.content)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  disabled={isSaving}
                >
                  {copiedId === error?.id ? (
                    <Check className="h-5 w-5 text-green-300" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="text-sm opacity-80">{error?.context}</div>
              <p className="text-lg font-medium">{error?.content}</p>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
