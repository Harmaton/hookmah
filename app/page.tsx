import About from '@/components/about-us'
import { CarouselFeatures } from '@/components/carousel-features'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import { ThemeProvider } from 'next-themes'
import OurProjects from '@/components/our-projects'

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <OurProjects />
      <About />
      {/* <ContactForm /> */}

      <Footer />
    </main>
   
  )
}
