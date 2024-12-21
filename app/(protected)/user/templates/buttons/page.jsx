"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Star } from 'lucide-react'
import { cn } from "@/lib/utils"
import useTemplateStore from "@/store/templates"
import { useSession } from '@clerk/nextjs'
import toast, { Toaster } from "react-hot-toast"

export default function Templates() {
  const { session } = useSession()
  const { fetchMicroCopy, buttonMicroCopy, saveMicroCopy, isButtonDisabled, savedTemplates, isSaving } = useTemplateStore()
  const [filter, setFilter] = useState("all")
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    session && fetchMicroCopy(session, 'button')
  }, [session, fetchMicroCopy])

  const tones = [...new Set(buttonMicroCopy?.map(button => button.tone))];

  const filteredTemplates =
  filter === "all"
    ? buttonMicroCopy
    : buttonMicroCopy?.filter((button) => button?.tone === filter);

  const copyToClipboard = (id, content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }).catch(err => {
      toast.error('Failed to copy. Please try again.')
    })
  }

  const toggleSave = async (button) => {
    await saveMicroCopy(session, button, 'button');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Buttons</h1>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          key="all"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-black text-white"
        >
          All Tones
        </Button>
        {tones.map((tone) => (
          <Button
            key={tone}
            variant={filter === tone ? "default" : "outline"}
            onClick={() => setFilter(tone)}
            className={cn(
              "border transition-all",
              filter === tone
                ? "bg-black text-white"
                : "hover:border-black/50"
            )}
          >
            {tone}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group relative bg-card hover:bg-accent transition-colors rounded-xl p-6 shadow-md hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {template.context.charAt(0).toUpperCase() +
                  template.context.slice(1)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleSave(template)}
                  className={cn(
                    "text-muted-foreground hover:text-primary transition-colors",
                    savedTemplates.includes(template?.id) && "text-black"
                  )}
                  disabled={isButtonDisabled}
                >
                  <Star
                    className={cn(
                      'h-5 w-5',
                      savedTemplates.includes(template?.id) &&
                      'fill-primary text-primary'
                    )} 
                  />
                </button>
                <button
                  onClick={() => copyToClipboard(template.id, template.content)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {copiedId === template.id ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-lg font-medium text-foreground">
              {template.content}
            </p>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  )
}
