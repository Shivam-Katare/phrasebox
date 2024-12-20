"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Star, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';
import { Toaster } from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const { 
    fetchMicroCopy, 
    tooltipMicroCopy, 
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

  const toggleSave = async (tooltip) => {
    await saveMicroCopy(session, tooltip, 'tooltip');
  };

  const filteredTooltips =
    filter === "all"
      ? tooltipMicroCopy
      : tooltipMicroCopy?.filter((tooltip) => tooltip?.tone === filter);

  useEffect(() => {
    if (session) {
      fetchMicroCopy(session, 'tooltip');
    }
  }, [session, fetchMicroCopy]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tooltips</h1>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "Professional", "Friendly", "Casual", "Technical", "Helpful"].map((tone) => (
          <Button
            key={tone}
            variant={filter === tone ? "default" : "outline"}
            onClick={() => setFilter(tone)}
            disabled={isLoading}
            size="sm"
          >
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-4">
          Loading tooltips...
        </div>
      )}

      {/* Tooltips Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTooltips?.map((tooltip) => (
          <div
            key={tooltip?.id}
            className="relative p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
          >
            {/* Context & Preview */}
            <div className="mb-3">
              <div className="text-sm text-muted-foreground mb-2">
                {tooltip?.context}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Hover to see tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip?.content}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Metadata */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Tone: {tooltip?.tone}
              </span>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(tooltip)}
                  className={cn(
                    "hover:text-primary transition-colors",
                    savedTemplates.includes(tooltip?.id) && "text-yellow-500"
                  )}
                  disabled={isSaving}
                >
                  <Star
                    className={cn(
                      "h-5 w-5",
                      savedTemplates.includes(tooltip?.id) && "fill-yellow-500"
                    )}
                  />
                </button>
                <button
                  onClick={() => copyToClipboard(tooltip?.id, tooltip?.content)}
                  className="hover:text-primary transition-colors"
                  disabled={isSaving}
                >
                  {copiedId === tooltip?.id ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
