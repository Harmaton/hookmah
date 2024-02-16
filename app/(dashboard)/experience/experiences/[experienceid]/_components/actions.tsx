"use client";

import axios from "axios";
import {  Trash, TrendingUp } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
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
        router.push(`/annual/experiences/${experienceid}/generate`)
    } catch {
      toast.error("Algo salió mal");
    } 
  }
  
  const onDelete = async () => {
    try {
    await axios.delete(`/api/experience/${experienceid}`)
      router.push(`/annual`);
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
       Usa Hokmah ai para el resto
       <TrendingUp className="h-4 w-4 ml-2" />
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className=" ">
          <Trash className="h-4 w-4 " />
        </Button>
      </ConfirmModal>
    </div>
  )
}