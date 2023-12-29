
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardContent, Card } from "@/components/ui/card"
import { Group } from "lucide-react"
import AnimatedLetters from "./animated-letters"
import TextAnimation from "./textAnimation"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-3">
       
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">Empowering Teachers with AI</h1>
        <p className="text-lg ">
          Our AI app is specifically designed to assist teachers in managing their workload more effectively and
          efficiently. From grading assignments to providing personalized feedback, this AI is your ultimate teaching
          assistant.
        </p>
        <Card className="flex flex-col items-center justify-center w-full p-6  rounded-lg shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-gray-500">Click the button below to go to your dashboard.</p>
            <Link href="#">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-[#1D4ED8]">
                <Group className="w-4 h-4" />
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


