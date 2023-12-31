import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function About3() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:order-1 mb-8 lg:mb-0">
            <Image
              className="m-auto"
              src="/undraw-book.svg"
              height={300}
              width={300}
              alt="bk"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-24 lg:order-2">
          <h1 className="text-3xl font-bold leading-tight mb-4">
        Your Maestro of Ever-evolving Learning Experiences
        </h1>
        <ul className="mb-8">
        <li>Transforming your classroom with AI-driven learning experiences</li>
        <li>Pioneering Predictive Learning for a Tapestry of Student Growth</li>
        </ul>
        <p className="mb-8">
        Elevate your educational journey with Hookmah, our visionary AI. It's not just about repeated learning experiences; it's about a dynamic, ever-changing landscape of growth. Each encounter leaves an indelible mark on the pursuit of knowledge, inspiring students to flourish.
        </p>

            <Button className="" variant="outline">
              Try For Free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
