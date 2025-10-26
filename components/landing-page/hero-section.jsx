import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function HeroSection() {
  return (
    <section className="px-4 pt-24 md:pt-32 pb-12 md:pb-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="rounded-full bg-muted px-4 py-1.5">
          <span className="text-sm font-medium">Seamless UX, starts here.</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl">
          Precision Writing for{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Seamless UX
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[42rem]">
          Transform your user experience with AI-powered microcopy. Create clear, consistent, and engaging interface text that guides and delights your users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default" size="lg" className="text-base rounded-[6px]">
                Start writing better UX
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </section>
  )
}

