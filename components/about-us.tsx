import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function About3() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:order-1 mb-8 lg:mb-0 ">
            <Image
              className="m-auto"
              src="/undraw-book.svg"
              height={300}
              width={300}
              alt="bk"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-24 lg:order-2 m-auto">
          <h1 className="text-3xl font-bold leading-tight mb-4">
            Your AI Partner in Crafting Annual Educational Journeys
            </h1>
            <ul className="mb-8">
            <li>Redefining your teaching odyssey with our Creative AI Storyweaver</li>
            <li>Guiding Intuitive and Forward-thinking Educational Program Design</li>
            </ul>
            <p className="mb-8">
            Join us on an educational adventure as Hookmah, our visionary AI, crafts not just lesson plans, but immersive narratives that inspire and shape the educational landscape. We empower teachers to lead the charge in creating memorable annual programming.
            </p>

            <Button className="" variant="outline">
              Try for Free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
