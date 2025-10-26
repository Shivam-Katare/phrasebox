"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { GitBranch, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Phrase Box</span>
        </Link>
        <div className="flex items-center">
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-16 right-0 flex-col items-end gap-4 bg-background p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:p-0`}>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>

            <Link href="https://github.com/Shivam-Katare/phrasebox" target="_blank" className="text-sm font-medium hover:text-primary">
              <GitBranch className="h-6 w-6" />
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default">
                  Get started free
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </header>
  )
}