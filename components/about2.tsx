import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function About2() {
  return (
    <div className="m-auto">
      <div className="container mx-auto px-6 py-12 m-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-24 lg:order-1">
            {" "}
            {/* Changed lg:w-1/2 to lg:pr-24 and added lg:order-1 */}
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Your Infinite Learning Companion for Teachers
            </h1>
            <ul className="mb-8">
              <li>
                Enabling educators with limitless AI-guided teaching sessions
              </li>
              <li>Fostering a Culture of Continuous Learning and Growth</li>
            </ul>
            <p className="mb-8">
              Experience the educational revolution with Hookmah, our dynamic AI
              companion. Teachers embark on an endless journey of exploration,
              where learning sessions evolve and adapt, fostering a perpetual
              quest for knowledge and creating an engaging environment for
              students.
            </p>
            <Button className="mb-2" variant="outline">
              Try For Free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="lg:w-1/2 lg:order-2 m-auto ">
            {" "}
            {/* Changed lg:w-1/2 to lg:order-2 */}
            <Image
              className="m-auto"
              src="/undraw-book.svg"
              height={300}
              width={300}
              alt="bk"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
