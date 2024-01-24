"use client";

import axios from "axios";
import { BookA, BookCheckIcon, BookKeyIcon, BookOpenCheckIcon, BookText, SprayCan, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
}

export const WordAction = ({
  disabled,
  gapid,
  gapData,
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  const onClick = async () => {
    try {
      await generateWordDocument(gapData);
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } 
  };
  
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="border-blue-500"
       >
       Generar documento de Word
       <BookText className="h-4 w-4 ml-4" />
      </Button>
    </div>
  );
};