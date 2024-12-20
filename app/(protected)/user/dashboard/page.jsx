'use client'

import { React, useState } from 'react'
import { motion } from 'framer-motion'
import { OverviewSection } from '@/components/dashboard/overview-section'
import { SavedMicrocopies } from '@/components/dashboard/saved-microcopies'
import { TrendingTemplates } from '@/components/dashboard/trending-templates'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { OnboardingSection } from '@/components/dashboard/onboarding-section'

// Mock data
const mockData = {
  totalCreated: 150,
  totalSaved: 75,
  totalShared: 30,
  recentActivity: [
    { id: 1, action: 'Copied a microcopy', time: '2 minutes ago' },
    { id: 2, action: 'Saved a template', time: '1 hour ago' },
    { id: 3, action: 'Created a new microcopy', time: '3 hours ago' },
  ],
  savedMicrocopies: [
    { id: 1, text: 'Welcome aboard! Let\'s get you started.', purpose: 'Onboarding' },
    { id: 2, text: 'Oops! Something went wrong. Please try again.', purpose: 'Error Message' },
    { id: 3, text: 'Your payment was successful!', purpose: 'Success Message' },
  ],
  trendingTemplates: [
    { id: 1, name: 'Friendly Error Messages', popularity: 95 },
    { id: 2, name: 'Engaging CTAs', popularity: 88 },
    { id: 3, name: 'Concise Tooltips', popularity: 82 },
  ],
  usageData: [
    { name: 'Week 1', copies: 65 },
    { name: 'Week 2', copies: 80 },
    { name: 'Week 3', copies: 95 },
    { name: 'Week 4', copies: 110 },
  ],
}

export default function Dashboard() {
  const [totalCopies, setTotalCopies] = useState(1000)

  const incrementCopies = () => {
    setTotalCopies(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <OverviewSection 
          totalCreated={mockData.totalCreated}
          totalSaved={mockData.totalSaved}
          totalShared={mockData.totalShared}
          recentActivity={mockData.recentActivity}
        />
        <SavedMicrocopies microcopies={mockData.savedMicrocopies} onCopy={incrementCopies} />
        <TrendingTemplates templates={mockData.trendingTemplates} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuickActions />
      </div>

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

