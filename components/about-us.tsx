import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AcercaDe3() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:order-1 mb-8 lg:mb-0">
          <Image
            className="m-auto hover:scale-150"
            src="/undraw2.svg"
            height={300}
            width={300}
            alt="bk"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-24 lg:order-2 m-auto">
          <h1 className="text-3xl font-bold leading-tight mb-4">
            Oferta Única para Educadores Peruanos
          </h1>
          <ul className="mb-8">
            <li>
              Revoluciona tu enseñanza con nuestro Creador de Historias con IA,
              que elabora narrativas creativas.
            </li>
            <li>
              Navega intuitivamente en el diseño educativo con programas
              vanguardistas.
            </li>
          </ul>
          <p className="mb-8">
            Únete a nosotros en una aventura educativa mientras Hookmah, nuestra
            IA visionaria, va más allá de los planes de lecciones, creando
            narrativas envolventes que inspiran y dan forma al panorama
            educativo. Empodérate para liderar la carga en la creación de
            programaciones anuales memorables.
          </p>

          <Button className="" variant="outline">
            Pruébalo Gratis
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
