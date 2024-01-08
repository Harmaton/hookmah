"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, ImageDown, FolderPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, GAP } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: GAP
  gapid: string;
};

const formSchema = z.object({
  companyLogo: z.string().min(1, {
    message: "Se requiere imagen",
  }),
});

export const ImageForm = ({
  initialData,
  gapid
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/gaps/${gapid}`, values);
      toast.success("Your Logo actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Your Company Logo
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !initialData.companyLogo && (
            <>
              <FolderPlus className="h-4 w-4 mr-2 text-blue-500" />
              Añadir una imagen
            </>
          )}
          {!isEditing && initialData.companyLogo && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.companyLogo ? (
          <div className="flex items-center justify-center h-40 bg-transparent border rounded-md">
            <ImageDown className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.companyLogo}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="companyLogo"
            onChange={(url) => {
              if (url) {
                onSubmit({ companyLogo: url });
              }
            }}
          />
          <div className="text-xs foreground mt-4">
          Se recomienda una relación de aspecto de 16:9
          </div>
        </div>
      )}
    </div>
  )
}