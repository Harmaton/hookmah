
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Footer() {
  return (
    <section className="w-full m-2 py-12 border-t">
      <div className="container grid grid-cols-2 sm:grid-cols-3 gap-8 px-4 md:px-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Síganos</h3>
          <div className="flex space-x-4 m-auto">
            <FacebookIcon className="w-6 h-6 hover:text-blue-600" />
            <TwitterIcon className="w-6 h-6 hover:text-blue-400" />
            <InstagramIcon className="w-6 h-6 hover:text-pink-500" />
            <LinkedinIcon className="w-6 h-6 hover:text-blue-700" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contacta con nosotras</h3>
          <p className="text-sm hover:text-gray-300 transition-colors">El teléfono es: +54 9 3516 19-7304</p>
          <p className="text-sm hover:text-gray-300 transition-colors">El mail es: hola@simplelifeofficial.com</p>
          <p className="text-sm hover:text-gray-300 transition-colors">La dirección es: Marcelo T. de Alvear 628. Córdoba - Argentina.</p>
        </div>
        {/* <div className="space-y-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <form action="#" method="POST">
            <input
              className="w-full px-3 py-2 rounded-md text-black"
              placeholder="Your email..."
              required
              type="email"
            />
            <Button className="mt-2 w-full">Subscribe</Button>
          </form>
        </div> */}
        <div className="space-y-4 flex flex-col">
          <h3 className=" text-lg font-semibold">Enlaces Rápidos</h3>
          <Link className="text-sm hover:underline" href="/new">
          Términos de servicio
          </Link>
          <Link className="text-sm hover:underline" href="/new">
          Política de Privacidad
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-400 text-sm">
        <p className="animate-pulse">© 2024 Hokmah. Reservados todos los derechos.</p>
      </div>
    </section>
  )
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
