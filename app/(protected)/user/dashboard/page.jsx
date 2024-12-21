'use client'

import { React, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SavedMicrocopies } from '@/components/dashboard/saved-microcopies'
import { OnboardingSection } from '@/components/dashboard/onboarding-section'
import useDashboardStore from '@/store/dashboard'
import { useSession } from '@clerk/nextjs'
import { UXTips } from '@/components/dashboard/ux-tips'


export default function Dashboard() {
  const { fetchTotalCopies, incrementTotalCopies, totalCopies } = useDashboardStore();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      fetchTotalCopies(session);
    }
  }, [session, fetchTotalCopies]);

  const handleIncrementCopies = () => {
    if (session) {
      incrementTotalCopies(session);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <OnboardingSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {totalSaved > 0 ? totalSaved : 'No saved microcopies'}
            </div>
            <div className="text-sm text-muted-foreground">Total Saved Microcopies</div>
          </CardContent>
        </Card> */}
        <UXTips />
        <SavedMicrocopies onCopy={handleIncrementCopies} />
      </div>

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



