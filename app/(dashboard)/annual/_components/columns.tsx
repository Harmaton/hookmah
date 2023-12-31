"use client"

import {  GAP } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, BadgeCheck, Check, Download, MoreHorizontal, Pencil, UploadCloud } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<GAP>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "isDownloaded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Downloads
          <Download className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isDownloaded = row.getValue("isDownloaded") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isDownloaded && "bg-pink-700"
        )}>
          {isDownloaded ? "Downloaded" : "Not Downloaded"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "isSigned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Signed
          <BadgeCheck className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isSigned = row.getValue("isSigned") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isSigned && "bg-pink-700"
        )}>
          {isSigned ? "Signed" : "Not Signed"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publicada
          <UploadCloud className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Publicada" : "Borrador"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Menú abierto</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/annual/gaps/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Editar General Annual Programming
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
