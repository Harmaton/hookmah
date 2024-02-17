import About from "@/components/about-us";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import About2 from "@/components/about2";
import About3 from "@/components/about3";
import React from "react";
import Features from "@/components/features";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import { GridBackground } from "@/components/grid-background";
import { TypewriterEffectSmoothDemo } from "@/components/typewriter";
import { DocumentTypes } from "@/components/three-cards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <Navbar />
      <TypewriterEffectSmoothDemo />
      <div className="p-2" data-aos="fade-up">
        <h1 className="font-bold text-center text-3xl ">
          Los tres sencillos pasos{" "}
        </h1>
        <DocumentTypes />
      </div>
      <div className="m-6 p-4" data-aos="fade-up">
        <About />
        <About2 />
      </div>
      <FAQ />
      <div className="m-6 p-4" data-aos="fade-up">
        <About3 />
      </div>
      <Features />

      <Footer />
    </main>
  );
}
