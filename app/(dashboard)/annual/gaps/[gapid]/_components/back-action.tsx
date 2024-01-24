"use client";

import axios from "axios";
import { BookCheck, BookOpenCheckIcon, SkipBack, SprayCan, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti";

interface ActionsProps {
  disabled: boolean;
  gapid: string;
};

export const BackActions = ({
  disabled,
  gapid
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
        router.push(`/annual/gaps/${gapid}`)

    } catch {
      toast.error("Algo salió mal");
    } 
  }
  
  return (
    <div className="flex items-center gap-x-2 ">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="border-blue-500 space-x-2"
       >
      Volver al paso 1
       <SkipBack className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}