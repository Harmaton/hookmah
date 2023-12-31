import About from "@/components/about-us";
import { CarouselFeatures } from "@/components/carousel-features";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import OurProjects from "@/components/our-projects";
import About2 from "@/components/about2";
import About3 from "@/components/about3";
import React from "react";
import Header from "@/components/header";
import Features from "@/components/features";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Navbar />
      <Hero />
      <Header />
      <About />
      <About2 />
      <About3 />
      <FAQ />
      <Features />
      {/* <ContactForm /> */}

      <Footer />
    </main>
  );
}
