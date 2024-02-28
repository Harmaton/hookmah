"use client";

import axios from "axios";
import {
  BookA,
  BookCheckIcon,
  BookKeyIcon,
  BookOpenCheckIcon,
  BookText,
  SprayCan,
  Trash,
} from "lucide-react";
import {  useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Session } from "@prisma/client";
import { generateSessionWordDocument } from "@/utils/session-generator";

interface ActionsProps {
  disabled: boolean;
  expData: Session;
  academyLevel: { name: string; } | null;
  averageAge: { name: string; } | null;
  educationLevel: { name: string; } | null;
  time: { name: string; } | null;
  course: { name: string; } | null;

}

export const SessionWordAction = ({
  disabled,
  expData,
  academyLevel,
  averageAge,
  educationLevel,
  time,
  course
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      await generateSessionWordDocument(
        expData,
        academyLevel,
        averageAge,
        educationLevel,
        time,
        course
      );
      toast.success("Descargado exitosamente")
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  return (
    <div className="flex items-center experience-x-2 ">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="bg-blue-500 text-white"
      >
       Generar sesión en formato Word
        <BookText className="h-4 w-4 ml-4 text-white" />
      </Button>
    </div>
  );
};
