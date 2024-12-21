"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Lightbulb, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const uxTips = [
  {
    tip: "Keep your microcopy concise and to the point.",
    category: "Clarity",
    icon: "✍️"
  },
  {
    tip: "Use active voice for clearer communication.",
    category: "Writing",
    icon: "📝"
  },
  {
    tip: "Maintain consistency in tone across your application.",
    category: "Tone",
    icon: "🎯"
  },
  {
    tip: "Avoid jargon and use simple, everyday language.",
    category: "Simplicity",
    icon: "💡"
  },
  {
    tip: "Provide clear and actionable error messages.",
    category: "Errors",
    icon: "⚠️"
  },
  {
    tip: "Use humor sparingly and appropriately.",
    category: "Style",
    icon: "😊"
  },
  {
    tip: "Personalize microcopy when relevant.",
    category: "Engagement",
    icon: "🤝"
  },
  {
    tip: "Test your microcopy with real users.",
    category: "Testing",
    icon: "🔍"
  }
];

export function UXTips() {
  const [currentTip, setCurrentTip] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Function to get a random tip
    const getRandomTip = () => {
      return uxTips[Math.floor(Math.random() * uxTips.length)];
    };

    // Function to check and update tip
    const checkAndUpdateTip = () => {
      const now = new Date().getTime();
      const storedTip = localStorage.getItem('uxTip');
      const storedTimestamp = localStorage.getItem('uxTipTimestamp');

      if (!storedTip || !storedTimestamp || now - parseInt(storedTimestamp) > 2 * 60 * 60 * 1000) {
        // 2 hours have passed or no tip stored
        const newTip = getRandomTip();
        localStorage.setItem('uxTip', JSON.stringify(newTip));
        localStorage.setItem('uxTipTimestamp', now.toString());
        setCurrentTip(newTip);
      } else {
        // Use stored tip
        setCurrentTip(JSON.parse(storedTip));
      }
    };

    // Update time left
    const updateTimeLeft = () => {
      const storedTimestamp = localStorage.getItem('uxTipTimestamp');
      if (storedTimestamp) {
        const timePassed = new Date().getTime() - parseInt(storedTimestamp);
        const timeRemaining = 2 * 60 * 60 * 1000 - timePassed;
        
        if (timeRemaining > 0) {
          const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
          const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          checkAndUpdateTip();
        }
      }
    };

    checkAndUpdateTip();
    const timer = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!currentTip) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                UX Tip
              </h3>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updates in: {timeLeft}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{currentTip.icon}</div>
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {currentTip.category}
                </p>
                <p className="mt-1 text-gray-800 dark:text-gray-200">
                  {currentTip.tip}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  #UXWriting
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
