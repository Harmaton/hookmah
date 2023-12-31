"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lightbulb, MoonStar, SunDimIcon, WorkflowIcon } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoonStar className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-2">
        <DropdownMenuItem className="justify-center items-center" onClick={() => setTheme("light")}>
          <Lightbulb className="h-4 w-4 justify-center items-center" />
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center items-center" onClick={() => setTheme("dark")}>
          <SunDimIcon className="h-4 w-4 items-center" />
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center items-center" onClick={() => setTheme("system")}>
          <WorkflowIcon className="h-4 w-4 items-center" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
