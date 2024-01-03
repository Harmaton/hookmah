import { Lightbulb } from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge"
import Link from "next/link";


const Header = () => {
  return (
    <header className="p-6 flex items-center">
      <div className="flex ml-4 space-x-10">
      <Badge variant="outline">Enseñanza por competencia <Lightbulb className="w-3 h-3 ml-2 text-red-500" /> </Badge>
       <Badge variant="outline">Rápido y confiable<Lightbulb className="w-3 h-3 ml-2 " /> </Badge>
       <Badge variant="outline">Últimos datos de Pervian <Lightbulb className="w-3 h-3 ml-2 text-green-500" /> </Badge>
      </div>
    </header>
  );
};


export default Header;
