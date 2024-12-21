"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  Star,
  Loader2,
  RefreshCw,
  Clock,
  Timer,
  Hourglass,
  Circle,
  RotateCw,
  Orbit,
  CircleDashedIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import useTemplateStore from "@/store/templates";
import { useSession } from '@clerk/nextjs';
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import useDashboardStore from "@/store/dashboard";

const loadingIcons = {
  Friendly: <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />,
  Professional: <RefreshCw className="h-6 w-6 animate-spin text-indigo-400" />,
  Encouraging: <RotateCw className="h-6 w-6 animate-spin text-violet-400" />,
  Reassuring: <Circle className="h-6 w-6 animate-spin text-emerald-400" />,
  Concise: <CircleDashedIcon className="h-6 w-6 animate-spin text-blue-400" />,
  Festival: <Orbit className="h-6 w-6 animate-spin text-pink-400" />,
  Natural: <Hourglass className="h-6 w-6 animate-spin text-teal-400" />,
  Humorous: <Timer className="h-6 w-6 animate-spin text-amber-400" />,
  Technical: <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />,
  Urgent: <Clock className="h-6 w-6 animate-spin text-red-400" />,
  Neutral: <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
};

const toneColors = {
  Friendly: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200",
  Professional: "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200",
  Encouraging: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200",
  Reassuring: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
  Concise: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
  Festival: "bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200",
  Natural: "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200",
  Humorous: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
  Technical: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
  Urgent: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200",
  Neutral: "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
};

const pulseAnimation = {
  initial: { opacity: 0.5, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export default function LoadingTemplates() {
  const { session } = useSession();
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);
  const {
    fetchMicroCopy,
    loadingMicroCopy,
    saveMicroCopy,
    savedTemplates,
    isLoading,
    isSaving
  } = useTemplateStore();
  const { incrementTotalCopies } = useDashboardStore();


  const copyToClipboard = (id, content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopiedId(id);
        if(session) {
          incrementTotalCopies(session);
        }
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const toggleSave = async (loading) => {
    await saveMicroCopy(session, loading, 'loading');
  };

  const filteredLoadings =
    filter === "all"
      ? loadingMicroCopy
      : loadingMicroCopy?.filter((loading) => loading?.tone === filter);

  useEffect(() => {
    if (session) {
      fetchMicroCopy(session, 'loading');
    }
  }, [session, fetchMicroCopy]);

  return (
    <div className="min-h-screen p-6 space-y-6">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-black mb-2">
          Loading States
        </h1>
        <p className="text-black">Design engaging loading experiences</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          key="all"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-black text-white border-none"
        >
          All States
        </Button>
        {Object.keys(toneColors).map((tone) => (
          <Button
            key={tone}
            variant={filter === tone ? "default" : "outline"}
            onClick={() => setFilter(tone)}
            className={cn(
              "border-black text-black transition-all",
              filter === tone
                ? "bg-black text-white"
                : "hover:border-black/40"
            )}
          >
            {tone}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 animate-ping rounded-full bg-black opacity-25"></div>
              <div className="relative animate-spin rounded-full border-4 border-black border-t-transparent w-full h-full"></div>
            </div>
            <p className="text-black mt-4">Loading templates...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLoadings?.map((loading) => (
          <motion.div
            className="group relative"
            onMouseEnter={() => setHoveredId(loading.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={loading.id}
          >
            <div
              className={cn(
                "relative p-6 rounded-xl border border-white/10 shadow-lg transition-all duration-300",
                toneColors[loading?.tone],
                hoveredId === loading.id ? "scale-105" : "hover:scale-102"
              )}
            >
              {/* Loading Animation Preview */}
              <motion.div 
                className="absolute top-2 right-2 w-8 h-8"
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
              >
                {loadingIcons[loading?.tone]}
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-black font-medium">{loading?.tone}</span>
                </div>

                <div className="bg-black/5 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-black text-lg">
                    {loading?.content}
                  </p>
                </div>

                <div className="text-sm text-black opacity-80">
                  {loading?.context}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => toggleSave(loading)}
                    variant="ghost"
                    className="text-black hover:text-black/80 hover:bg-white/10"
                    disabled={isSaving}
                  >
                    <Star className={cn(
                      "h-5 w-5 mr-2",
                      savedTemplates.includes(loading?.id) && "fill-yellow-500 text-yellow-500"
                    )} />
                    Save
                  </Button>

                  <Button
                    onClick={() => copyToClipboard(loading?.id, loading?.content)}
                    variant="ghost"
                    className="text-black hover:text-black/80 hover:bg-white/10"
                    disabled={isSaving}
                  >
                    {copiedId === loading?.id ? (
                      <Check className="h-5 w-5 mr-2 text-green-400" />
                    ) : (
                      <Copy className="h-5 w-5 mr-2" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </div>
      <Toaster />
    </div>
  );
}
