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
import { GAP } from "@prisma/client";
import { generateWordDocument } from "@/utils/document-genarator";

interface ActionsProps {
  disabled: boolean;
  gapid: string;
  gapData: GAP;
  academyLevel: { name: string; } | null;
  averageAge: { name: string; } | null;
  educationLevel: { name: string; } | null;
  department: { name: string; } | null;
  course: { name: string; } | null
}

export const WordAction = ({
  disabled,
  gapid,
  gapData,
  academyLevel,
  averageAge,
  educationLevel,
  department,
  course
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      await generateWordDocument(
        gapData,
        academyLevel,
        averageAge,
        educationLevel,
        department,
        course
      );
      toast.success("Descargado exitosamente")
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  return (
    
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
  
  );
};
