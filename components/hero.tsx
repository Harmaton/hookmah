"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { ArrowBigRight, Group } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import AnimatedLetters from "./animated-letters";
import TextAnimation from "./textAnimation";

const Hero: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-3  bg-gradient-to-r from-orange-700 via-blue-500 to-green-400">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight ">
          {/* <Typewriter text="Empowering Teachers with AI" speed={100} />*/}
          Ignite <span className="text-red-300 m-2">AI-Powered</span>Evolution in <span className="text-red-300 m-2">Education</span>with Smart Empowerment
        </h1>
        <p className="text-lg ">
        Step into a world where brilliance meets simplicity. Our cutting-edge AI is not just a tool;  the catalyst for a
        revolution in teaching. Dive into the future as we redefine education, from crafting annual programming marvels to
        leading enlightening learning sessions. Our AI is the guide in this transformative journey.
        </p>
        <Card className="flex flex-col items-center justify-center w-full p-6  rounded-lg shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-gray-500">
              Click the button below to go to your dashboard.
            </p>
            <Link href="#">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-green-500">
                Get Started for Free
                <ArrowBigRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
