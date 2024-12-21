'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckIcon, CopyIcon, InfoIcon, Loader2Icon, RefreshCwIcon, StarIcon, TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import useDashboardStore from '@/store/dashboard'
import { useSession } from '@clerk/nextjs'


export function MicrocopyDisplay({ purpose, texts, onRegenerate, errorMessage, onSave, onDelete, isSaving, isDeleting }) {
  const [savedStates, setSavedStates] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  const { incrementTotalCopies } = useDashboardStore();
  const session = useSession();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [text]: true }));
    if(session) {
      incrementTotalCopies(session);
    }
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
      className="space-y-6"
    >
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {purpose}
            </h3>
            <Button
              variant="outline"
              size="icon"
              onClick={onRegenerate}
              disabled={isSaving || isDeleting}
              className="rounded-full h-10 w-10 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
          </div>
          {errorMessage ? (
            <Alert variant="destructive" className="rounded-lg">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
            {texts.map((text, index) => (
              <div key={index} className="group relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    {renderContent(text)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(text)}
                      disabled={isSaving || isDeleting}
                      className="rounded-full h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {copiedStates[text] ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => savedStates[text] ? handleDeleteClick(text) : handleSaveClick(text)}
                      disabled={isSaving || isDeleting}
                      className="rounded-full h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                {savedStates[text] ? (
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        ) : (
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                        )}
                    </Button>
                  </div>
                </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

