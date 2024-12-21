"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { 
  Sparkles, 
  Layout, 
  Bell, 
  Hand, 
  MessageCircle, 
  Loader, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion } from "framer-motion";
import { useMemo } from 'react';

const navigationItems = [
  {
    title: "Generate",
    href: "/user/generator",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-violet-500 to-purple-500",
    description: "Create new microcopy"
  },
  {
    title: "Button",
    href: "/user/buttons",
    icon: <Layout className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    description: "Button templates"
  },
  {
    title: "Alerts",
    href: "/user/alerts",
    icon: <Bell className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
    description: "Alert messages"
  },
  {
    title: "Welcome",
    href: "/user/welcome",
    icon: <Hand className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    description: "Welcome messages"
  },
  {
    title: "Tooltips",
    href: "/user/tooltips",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
    description: "Tooltip content"
  },
  {
    title: "Loading",
    href: "/user/loading",
    icon: <Loader className="w-5 h-5" />,
    color: "from-teal-500 to-cyan-500",
    description: "Loading states"
  },
  {
    title: "Error Pages",
    href: "/user/error-pages",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "from-red-500 to-rose-500",
    description: "Error messages"
  }
];

// Function to get random items
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function QuickActions() {
  // Get 3 random items using useMemo to maintain consistency during re-renders
  const randomItems = useMemo(() => getRandomItems(navigationItems, 3), []);

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Featured Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {randomItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <Button
                variant="ghost"
                className={`w-full group relative overflow-hidden rounded-xl h-16 border border-gray-100 hover:bg-white/90 hover:text-black transition-all duration-300`}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-base">{item.title}</h3>
                      <p className="text-sm text-gray-500 group-hover:text-black">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                </div>
              </Button>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
