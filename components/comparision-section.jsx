import { Check, X } from 'lucide-react'

const ComparisonItem = ({ best, worst }) => (
  <div className="flex flex-col sm:flex-row w-full mb-4">
    <div className="flex-1 flex items-center p-2 bg-blue-50 rounded-l-lg">
      <Check className="w-5 h-5 text-green-500 mr-2" />
      <span className="text-sm font-medium text-gray-800">{best}</span>
    </div>
    <div className="flex-1 flex items-center p-2 bg-red-50 rounded-r-lg">
      <X className="w-5 h-5 text-red-500 mr-2" />
      <span className="text-sm font-medium text-gray-800">{worst}</span>
    </div>
  </div>
)

export function ComparisonSection() {
  return (
    <section id="comparison" className="container px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Best UX vs Worst UX: Text on a Landing Page</h2>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row mb-4">
          <div className="flex-1 text-center font-bold text-blue-600 bg-blue-100 p-2 rounded-t-lg sm:rounded-tl-lg sm:rounded-tr-none">Best UX</div>
          <div className="flex-1 text-center font-bold text-red-600 bg-red-100 p-2 rounded-b-lg sm:rounded-tr-lg sm:rounded-bl-none">Worst UX</div>
        </div>
        <div className="border-l-4 border-r-4 border-gray-200 p-4 rounded-lg bg-white">
          <ComparisonItem 
            best="Clear, compelling headline: 'Boost Your Productivity 10x'" 
            worst="Vague, generic headline: 'Welcome to Our Website'"
          />
          <ComparisonItem 
            best="Concise subheadline: 'AI-powered task management for busy professionals'" 
            worst="Lengthy, unfocused subheadline: 'We offer various solutions for different needs'"
          />
          <ComparisonItem 
            best="Action-oriented CTA: 'Start Your Free Trial'" 
            worst="Passive CTA: 'Learn More'"
          />
          <ComparisonItem 
            best="Benefit-focused feature list: 'Save 5 hours/week with smart automation'" 
            worst="Feature-dump list: 'Multiple integrations available'"
          />
          <ComparisonItem 
            best="Social proof: '10,000+ happy users' with testimonials" 
            worst="No social proof or generic claims without backing"
          />
        </div>
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Why Best UX Works Better</h3>
          <p className="text-sm text-gray-700">
            The best UX practices focus on clarity, user benefits, and actionable information. They guide the user&apos;s attention, address pain points directly, and provide clear next steps. This approach builds trust, reduces friction, and ultimately leads to higher conversion rates.
          </p>
        </div>
      </div>
    </section>
  )
}

