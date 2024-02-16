
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MousePointerClick } from "lucide-react"
import { JSX, SVGProps } from "react"

export default function FAQ() {
  return (
    <div className=" w-full"
    data-aos="fade-up"
    >
    <ScrollArea className="w-full max-w-6xl mx-auto space-y-8 p-4 md:p-8 ">
      <h2 className="text-2xl mb-3 font-semibold text-center md:text-3xl lg:text-4xl">Preguntas frecuentes</h2>
      <Collapsible className="rounded-md shadow-sm divide-y divide-gray-200 dark:divide-gray-800">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <MailQuestionIcon className="w-5 h-5" />
              <span className="text-lg font-medium">
              ¿Cómo me convierto en profesor?
              </span>
            </div>
            <Button size="sm" variant="ghost">
              <MousePointerClick className="h-4 w-4 " />
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="">
          Contáctenos usando los enlaces a continuación para ser agregado a todas las funciones de la plataforma.
          </p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="rounded-md shadow-sm divide-y divide-gray-200 dark:divide-gray-800">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <MailQuestionIcon className="w-5 h-5 " />
              <span className="text-lg font-medium ">¿Cuál es el precio de la IA?</span>
            </div>
            <Button size="sm" variant="ghost">
            <MousePointerClick className="h-4 w-4 " />
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="">
          Actualmente estamos otorgando acceso gratuito para probar las capacidades como versión beta privada.
          </p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="rounded-md shadow-sm divide-y divide-gray-200 dark:divide-gray-800">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <MailQuestionIcon className="w-5 h-5" />
              <span className="text-lg font-medium ">
              ¿Puedo descargar mi programación y sesiones generadas?
              </span>
            </div>
            <Button size="sm" variant="ghost">
            <MousePointerClick className="h-4 w-4 " />
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="">
          Luego de una exitosa generación y firmas, tendrás la opción de descargar en pdf.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </ScrollArea>
    </div>
  )
}

function MailQuestionIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
      <path d="M20 22v.01" />
    </svg>
  )
}
