"use client";

import axios from "axios";
import {
  ArrowDown,
  BookA,
  BookCheckIcon,
  BookKeyIcon,
  BookOpenCheckIcon,
  BookText,
  SprayCan,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti";
import { Experience } from "@prisma/client";
import { generateWordDocument } from "@/utils/document-genarator";
import { generateExperienceWordDocument } from "@/utils/experience-generator";

interface ActionsProps {
  disabled: boolean;
  experienceid: string;
  expData: Experience;
  academyLevel: { name: string; } | null;
  averageAge: { name: string; } | null;
  educationLevel: { name: string; } | null;
}

export const EXPWordAction = ({
  disabled,
  expData,
  academyLevel,
  averageAge,
  educationLevel
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      await generateExperienceWordDocument(
        expData,
        academyLevel,
        averageAge,
        educationLevel,
      );
      toast.success("Descargado exitosamente")
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  
  return (
    <div className="flex flex-col space-y-2">
      
    <p className="">Deberá realizar algunas ediciones simples en el contenido producido por hokmahai.</p>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="bg-blue-500 "
      >
        Generar documento de Word
        <ArrowDown className="h-4 w-4 ml-4 " />
      </Button>
      </div>
  );
};
