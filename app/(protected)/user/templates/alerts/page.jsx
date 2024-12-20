"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Star, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';
import { Toaster } from "react-hot-toast";

const alertIcons = {
  info: <Info className="text-blue-500" />,
  success: <CheckCircle className="text-green-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  error: <AlertTriangle className="text-red-500" />,
};

export default function AlertTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const { fetchMicroCopy, alertMicroCopy, saveMicroCopy, savedTemplates, isSaving } = useTemplateStore();

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

  const toggleSave = async (alert) => {
    const success = await saveMicroCopy(session, alert, 'alert');
  };

  const filteredAlerts =
    filter === "all"
      ? alertMicroCopy
      : alertMicroCopy?.filter((alert) => alert?.context === filter);

      useEffect(() => {
        if (session) {
          fetchMicroCopy(session, 'alert');
        }
      }, [session, fetchMicroCopy]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Alerts</h1>

      {/* Filters */}
      <div className="flex gap-4">
        {["all", "success", "caution", "danger", "neutral"].map((context) => (
          <Button
            key={context}
            variant={filter === context ? "default" : "outline"}
            onClick={() => setFilter(context)}
          >
            {context?.charAt(0)?.toUpperCase() + context?.slice(1)}
          </Button>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={cn(
              "relative flex items-center p-4 rounded-md shadow-sm",
              alert?.context === "success" && "bg-green-100 text-green-800",
              alert?.context === "caution" && "bg-yellow-100 text-yellow-800",
              alert?.context === "danger" && "bg-red-100 text-red-800",
              alert?.context === "neutral" && "bg-gray-100 text-gray-800"
            )}
          >
            {/* Icon */}
            <div className="mr-4">{alertIcons[alert?.type]}</div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-medium">{alert?.content}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleSave(alert)}
                className={cn(
                  "hover:text-primary transition-colors",
                  savedTemplates.includes(alert?.id) && "text-yellow-500"
                )}
                disabled={isSaving}
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    savedTemplates.includes(alert?.id) && "fill-yellow-500"
                  )}
                />
              </button>
              <button
                onClick={() => copyToClipboard(alert?.id, alert?.content)}
                className="hover:text-primary transition-colors"
                disabled={isSaving}
              >
                {copiedId === alert?.id ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
