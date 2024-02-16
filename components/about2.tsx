import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AcercaDe2() {
  return (
    <div className="m-auto" 
    data-aos="fade-up"
    >
      <div className="container mx-auto px-6 py-12 m-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-24 lg:order-1">
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Desbloquea Possibilidades Infinitas en la Enseñanza
            </h1>
            <ul className="mb-8">
              <li>
                Explora tres formatos poderosos para la innovación en la enseñanza
              </li>
              <li>Personaliza las lecciones sin esfuerzo con la guía de la IA</li>
            </ul>
            <p className="mb-8">
              Libera todo el potencial de tu enseñanza con los tres formatos
              distintos de nuestra plataforma. Desde la Programación Anual General que detalla todo el año escolar hasta la Programación Modular y las guías de clases diarias, ofrecemos herramientas integrales para elevar tu enseñanza. Aprovecha la eficiencia de la IA de aprendizaje más actual, permitiéndote personalizar y crear lecciones impactantes para tus estudiantes sin esfuerzo.
            </p>
            <Button className="mb-2" variant="outline">
              Pruébalo Gratis
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="lg:w-1/2 lg:order-2 m-auto">
            <Image
              className="m-auto hover:scale-150"
              src="/undraw-book.svg"
              height={300}
              width={300}
              alt="bk"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
