
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronRight, CloudMoonRain } from "lucide-react"
import { JSX, SVGProps } from "react"

export default function OurProjects() {
  return (
    <div className="ml-6 mr-4">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <h4 className="text-sm font-semibold uppercase tracking-wide">OUR AI PROJECTS</h4>
            <h2 className="text-3xl font-bold my-4">Redefine the way you do business with Smarttrak Solutions</h2>
            <p className="mb-6">Our purpose is to deliver excellence in service and execution</p>
            <Button
              className="bg-transparent border hover:bg-white"
              variant="outline"
            >
              Learn More
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="">
              <CardContent className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center rounded-full bg-red-100 w-8 h-8">
                <PieChartIcon className="text-red-500" />
                </div>
                <h5 className="text-lg font-semibold">Smart Solar Energy Management</h5>
              </CardContent>
            </Card>
            <Card className="">
              <CardContent className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center rounded-full bg-red-100 w-8 h-8">
                <CloudMoonRain className="text-red-500 " />
                </div>
                <h5 className="text-lg font-semibold">Advanced AI for Manufacturing</h5>
              </CardContent>
            </Card>
            <Card className="">
              <CardContent className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center rounded-full bg-red-100 w-8 h-8">
                <SettingsIcon className="text-red-500" />
                </div>
                <h5 className="text-lg font-semibold">Predictive Maintenance</h5>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function BotIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function PieChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}


function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
