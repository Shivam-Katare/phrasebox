import { FolderOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <FolderOpen className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No saved microcopies</h2>
      <p className="text-gray-500 mb-4">Start saving microcopies to see them here!</p>
      <Button asChild>
        <Link href="/">Create New Microcopy</Link>
      </Button>
    </div>
  )
}

