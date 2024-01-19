import About from "@/components/about-us";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import About2 from "@/components/about2";
import About3 from "@/components/about3";
import React from "react";
import Features from "@/components/features";
import FAQ from "@/components/faq";
import { NewHero } from "@/components/new-hero";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden ">
      <Navbar />
      <div>
      <NewHero title="Reduce Educational Documents Creation with Hokmah AI assistance by 80%" pathLengths={[]} />
      </div>
      <div className="p-10">

      </div>
      <div className="m-6 p-4">
      <About />
      <About2 />
      
      </div>
      <FAQ />
      <div className="m-6 p-4">
      <About3 />
      </div>
     
      <Features />

      <Footer />
    </main>
  );
}
