import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container px-4 py-16 md:py-24 bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How 
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mr-2 ml-2">
             PhraseBox
          </span> 
        Works
       </h2>
        <p className="text-xl text-muted-foreground">
          Create perfect microcopy in three simple steps
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <div className="text-4xl font-bold text-blue-500 mb-4">01</div>
            <CardTitle>Input Purpose & Context</CardTitle>
            <CardContent className="px-0">
              Specify what you need microcopy for, select the tone, and define your target audience.
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-4xl font-bold text-blue-500 mb-4">02</div>
            <CardTitle>Get AI Suggestions</CardTitle>
            <CardContent className="px-0">
              Receive multiple options for microcopy that match your requirements and context.
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-4xl font-bold text-blue-500 mb-4">03</div>
            <CardTitle>Save or Use</CardTitle>
            <CardContent className="px-0">
              Save your favorite microcopy templates for quick access or use them directly in your project.
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}

