'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardContent, Card } from "@/components/ui/card"
import { Group } from "lucide-react"
import React, { FC, useEffect, useState } from 'react';
import AnimatedLetters from "./animated-letters"
import TextAnimation from "./textAnimation"

// interface TypewriterProps {
//   text: string;
//   speed: number; // Typing speed in milliseconds per character
// }

// const Typewriter: FC<TypewriterProps> = ({ text, speed }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [typingComplete, setTypingComplete] = useState(false);

//   useEffect(() => {
//     let currentIndex = 0;

//     const typingInterval = setInterval(() => {
//       setDisplayText((prevText) => prevText + text[currentIndex]);
//       currentIndex += 1;

//       if (currentIndex === text.length) {
//         clearInterval(typingInterval);
//         setTypingComplete(true);
//       }
//     }, speed);

//     return () => clearInterval(typingInterval);
//   }, [text, speed]);

//   return <span>{typingComplete ? text : displayText}</span>;
// };


const Hero: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-3">
       
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
        {/* <Typewriter text="Empowering Teachers with AI" speed={100} />*/}
        Empowering Teachers with AI
        </h1> 
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
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-green-500">
                <Group className="w-4 h-4" />
                Get Started for Free
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


export default Hero;