'use client'

import { React, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SavedMicrocopies } from '@/components/dashboard/saved-microcopies'
import { TrendingTemplates } from '@/components/dashboard/trending-templates'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { OnboardingSection } from '@/components/dashboard/onboarding-section'
import useDashboardStore from '@/store/dashboard'
import { useSession } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UXTips } from '@/components/dashboard/ux-tips'

// Mock data
const mockData = {
  totalSaved: 75,
  savedMicrocopies: [
    { id: 1, text: "Welcome aboard! Let's get started.", purpose: "Onboarding" },
    { id: 2, text: "Oops! Something went wrong. Please try again.", purpose: "Error Message" },
    { id: 3, text: "Your payment was successful!", purpose: "Success Message" },
  ],
  trendingTemplates: [
    { id: 1, name: "Friendly Error Messages", popularity: 95 },
    { id: 2, name: "Engaging CTAs", popularity: 88 },
    { id: 3, name: "Concise Tooltips", popularity: 82 },
  ],
};


export default function Dashboard() {
  const { totalSaved, fetchTotalSaved, fetchTotalCopies, incrementTotalCopies, totalCopies } = useDashboardStore();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      fetchTotalSaved(session);
      fetchTotalCopies(session);
    }
  }, [session, fetchTotalSaved, fetchTotalCopies]);

  const handleIncrementCopies = () => {
    if (session) {
      incrementTotalCopies(session);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {totalSaved > 0 ? totalSaved : 'No saved microcopies'}
            </div>
            <div className="text-sm text-muted-foreground">Total Saved Microcopies</div>
          </CardContent>
        </Card>

        <UXTips />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TrendingTemplates templates={mockData.trendingTemplates} />
        <QuickActions />
      </div>

      <SavedMicrocopies onCopy={handleIncrementCopies} />

      <OnboardingSection />

      <motion.div
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.span
          key={totalCopies}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Total Copies: {totalCopies}
        </motion.span>
      </motion.div>
    </div>
  )
}



