"use client";

import {
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

interface ActionsProps {
  disabled: boolean;
  id: string;
  first: string
  second: string
}

export const BackActions = ({id, first, second}: ActionsProps) => {
  return (
    <div className="flex items-center gap-x-2 ">
      <Link href={`/${first}/${second}/${id}`}>
        <ChevronLeft className="h-8 w-8 " />
      </Link>
    </div>
  );
};
