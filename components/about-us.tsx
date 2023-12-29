
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 ">
            <Image
            className="ml-5"
            src='/undraw-book.svg'
            height={500}
            width={500}
            alt='bk'
            />
          </div>
          <div className="lg:w-1/2 lg:pl-24">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Smartrak is a AI Technology Solutions company focused on
            </h1>
            <ul className="mb-8">
              <li>Revolutionizing your business with our Advanced AI</li>
              <li>Intelligent and Predictive Assets Monitoring</li>
            </ul>
            <p className="mb-8">
              We help businesses to lead the charge to digital innovation and tap into the power of the AI, by
              transforming and creating a competitive advantage that will scale.
            </p>
            <Button className= "" variant="outline">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

