"use client";

import axios from "axios";
import { BookCheck, BookOpenCheckIcon, SprayCan, Trash, TrendingUp } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti";

interface ActionsProps {
  disabled: boolean;
  experienceid: string;
};

export const Actions = ({
  disabled,
  experienceid,
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
        router.push(`/experience/experiences/${experienceid}/word`)

    } catch {
      toast.error("Algo salió mal");
    } 
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/experience/${experienceid}`);
      toast.success("Document Deleted");
      router.refresh();
      router.push(`/experirience`);
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="border-blue-500"
       >
       Finalizar el documento
       <TrendingUp className="h-4 w-4 ml-2" />
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className=" ">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}