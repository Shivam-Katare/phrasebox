'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckIcon, CopyIcon, InfoIcon, Loader2Icon, StarIcon, TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'


export function MicrocopyDisplay({ purpose, texts, onRegenerate, errorMessage, onSave, onDelete, isSaving, isDeleting }) {
  const [savedStates, setSavedStates] = useState({});
  const [copiedStates, setCopiedStates] = useState({});

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [text]: true }));
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [text]: false })), 2000);
  };

  const handleSaveClick = async (text) => {
    setSavedStates(prev => ({ ...prev, [text]: true }));
    await onSave(text);
  };

  const handleDeleteClick = async (text) => {
    setSavedStates(prev => ({ ...prev, [text]: false }));
    await onDelete(text);
  };

  const renderContent = (text) => {
    switch (purpose) {
      case 'Button Text':
        return <Button onClick={() => copyToClipboard(text)}>{text}</Button>
      case 'Error Messages':
        return (
          <Alert variant="destructive">
            <AlertDescription>{text}</AlertDescription>
          </Alert>
        )
      case 'Success Messages':
        return (
          <Alert variant="default" className="border-green-500 bg-green-50 text-green-700">
            <AlertDescription>{text}</AlertDescription>
          </Alert>
        )
      case 'Confirmation Prompts':
        return (
          <Card>
            <CardContent className="pt-6">
              <p>{text}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </div>
            </CardContent>
          </Card>
        )
      case 'Placeholder Text':
        return <Input placeholder={text} />
      case 'Tooltip Text':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline"><InfoIcon className="mr-2 h-4 w-4" /> Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case 'Loading Messages':
        return (
          <div className="flex items-center space-x-2">
            <Loader2Icon className="h-4 w-4 animate-spin" />
            <span>{text}</span>
          </div>
        )
      default:
        return <p>{text}</p>
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{purpose}</h3>
            <div className="space-x-2">
              <Button variant="outline" size="icon" onClick={onRegenerate} disabled={isSaving || isDeleting}>
                ↻
              </Button>
            </div>
          </div>
          {errorMessage ? (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : (
            texts.map((text, index) => (
              <div key={index} className="mb-4 grid grid-cols-[0.9fr_0.1fr] gap-x-5 items-center">
                {renderContent(text)}
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(text)} disabled={isSaving || isDeleting}>
                    {copiedStates[text] ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => savedStates[text] ? handleDeleteClick(text) : handleSaveClick(text)}
                    disabled={isSaving || isDeleting}
                  >
                    {savedStates[text] ? <TrashIcon className="h-4 w-4" /> : <StarIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

