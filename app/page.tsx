import Navbar from '@/components/navbar'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
     
    </main>
   
  )
}
