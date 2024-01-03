import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AcercaDe3() {
  return (
    <div className="">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:order-1 mb-8 lg:mb-0">
            <Image
              className="m-auto hover:scale-150"
              src="/undraw3.svg"
              height={300}
              width={300}
              alt="bk"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-24 lg:order-2">
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Tu Maestro de Experiencias de Aprendizaje Siempre Evolutivas
            </h1>
            <ul className="mb-8">
              <li>
                Transformando tu aula con experiencias de aprendizaje impulsadas por la IA
              </li>
              <li>
                Pionero en el Aprendizaje Predictivo para un Tapiz de Crecimiento Estudiantil
              </li>
            </ul>
            <p className="mb-8">
              Eleva tu viaje educativo con Hookmah, nuestra IA visionaria. No se trata solo de experiencias de aprendizaje repetidas; se trata de un paisaje dinámico y siempre cambiante de crecimiento. Con la memoria de construcción de nuestra IA, recuerda y rastrea las creaciones únicas de cada maestro. Construye sin esfuerzo sobre tu trabajo anterior, ahorrando tiempo y energía en la planificación de cada nueva lección. Cada encuentro deja una marca indeleble en la búsqueda del conocimiento, inspirando a los estudiantes a florecer.
            </p>

            <Button className="" variant="outline">
              Pruébalo Gratis
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
