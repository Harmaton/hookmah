"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { ArrowBigRight, Fingerprint, Group, TrendingUp } from "lucide-react";
import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <section className="container relative mt-4 p-3  bg-gradient-to-r from-orange-700 via-blue-500 to-green-400">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight relative">
          {/* <Typewriter text="Empowering Teachers with AI" speed={100} />*/}
          Ignite <span className="text-red-300 m-2">AI-Powered</span>Evolution in <span className="text-red-300 m-2">Education</span>with Smart Empowerment
        </h1>
        <p className="text-lg ">
        Step into a world where cutting-edge AI revolutionizes education. From annual programming marvels to enlightening learning sessions, our AI is the catalyst for a transformative journey, redefining teaching and simplicity.
        </p>
        <Card className="flex flex-col items-center justify-center w-full p-6  rounded-lg shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-gray-500">
              Click the button below to go to your dashboard.
            </p>
            <Link href="/annual">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-green-500">
                Get Started for Free
                <TrendingUp className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/analytics">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-green-500">
                Admin Dashboard
                <Fingerprint className="w-4 h-4" />
              </Button>
            </Link>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
