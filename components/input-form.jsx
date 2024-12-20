'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon } from 'lucide-react'

const purposes = [
  "Button Text",
  "Error Messages",
  "Success Messages",
  "Confirmation Prompts",
  "Placeholder Text",
  "Tooltip Text",
  "Onboarding Text",
  "Notification Text",
  "Empty State Messages",
  "Call-to-Action (CTA) Phrases",
  "Loading Messages",
  "System Warnings"
]

const tones = [
  "Friendly",
  "Formal",
  "Neutral",
  "Encouraging",
  "Urgent",
  "Humorous"
]

export function InputForm({ onSubmit, isLoading }) {
  const [purpose, setPurpose] = useState('')
  const [context, setContext] = useState('')
  const [tone, setTone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ purpose, context, tone })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="purpose">Purpose</Label>
        <Select onValueChange={setPurpose}>
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {purposes.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="context">Context</Label>
        <Textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Provide context for the microcopy"
        />
      </div>
      <div>
        <Label htmlFor="tone">Tone</Label>
        <Select onValueChange={setTone}>
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            {tones.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Microcopy'
        )}
      </Button>
    </motion.form>
  )
}

