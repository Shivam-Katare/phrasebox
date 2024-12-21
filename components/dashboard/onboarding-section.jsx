import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HelpCircleIcon, 
  Sparkles, 
  BookOpen, 
  Star,
  ArrowRight 
} from 'lucide-react';
import { useSession } from '@clerk/nextjs'


export function OnboardingSection() {
  const { session } = useSession();
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-lg mb-8">
      <div className="absolute top-0 right-0 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 -mt-16" />
      
      <CardContent className="relative p-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome, {session?.user.fullName.split(' ')[0]}
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Create compelling microcopy in seconds. Lets get you started with these simple steps:
        </p>

        {/* Steps */}
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-300">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Create Your First Microcopy</h3>
              <p className="text-sm text-gray-600">Start creating engaging copy with our AI-powered tools</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-300">
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Explore Templates</h3>
              <p className="text-sm text-gray-600">Get inspired by our trending microcopy templates</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-300">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Save Favorites</h3>
              <p className="text-sm text-gray-600">Build your personal collection of go-to copies</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <HelpCircleIcon className="w-4 h-4 mr-2" />
            Watch Quick Tutorial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-purple-200 hover:border-purple-300 text-purple-600 hover:bg-purple-50/50"
          >
            Skip Tutorial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
