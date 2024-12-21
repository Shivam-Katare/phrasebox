"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Star } from 'lucide-react'
import { cn } from "@/lib/utils"
import useTemplateStore from "@/store/templates"
import { useSession } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast"

export default function Templates() {
  const { session } = useSession()
  const { fetchMicroCopy, buttonMicroCopy, saveMicroCopy, isButtonDisabled, savedTemplates, isSaving } = useTemplateStore()
  const [filter, setFilter] = useState("all")
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    session && fetchMicroCopy(session, 'button')
  }, [session, fetchMicroCopy])

  const filteredTemplates = filter === "all" ? buttonMicroCopy : buttonMicroCopy.filter(t => t.context === filter)

  const copyToClipboard = (id, content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const toggleSave = async (button) => {
    await saveMicroCopy(session, button, 'button');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Buttons</h1>
      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "action" ? "default" : "outline"}
          onClick={() => setFilter("action")}
        >
          Action
        </Button>
        <Button
          variant={filter === "submission" ? "default" : "outline"}
          onClick={() => setFilter("submission")}
        >
          Submission
        </Button>
        <Button
          variant={filter === "confirmation" ? "default" : "outline"}
          onClick={() => setFilter("confirmation")}
        >
          Confirmation
        </Button>
        <Button
          variant={filter === "navigation" ? "default" : "outline"}
          onClick={() => setFilter("navigation")}
        >
          Navigation
        </Button>
        <Button
          variant={filter === "exit" ? "default" : "outline"}
          onClick={() => setFilter("exit")}
        >
          Exit
        </Button>
        <Button
          variant={filter === "retry" ? "default" : "outline"}
          onClick={() => setFilter("retry")}
        >
          Retry
        </Button>
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
