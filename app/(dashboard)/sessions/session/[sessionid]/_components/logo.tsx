"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, ImageDown, FolderPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, GAP, Session } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Session
  sessionid: string;
};

const formSchema = z.object({
  logo: z.string().min(1, {
    message: "Se requiere imagen",
  }),
});

export const ImageForm = ({
  initialData,
  sessionid
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/session/${sessionid}`, values);
      toast.success("Actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Logotipo de su empresa
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !initialData.logo && (
            <>
              <FolderPlus className="h-4 w-4 mr-2 text-blue-500" />
              Añadir una imagen
            </>
          )}
          {!isEditing && initialData.logo && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.logo ? (
          <div className="flex items-center justify-center h-40 bg-transparent border rounded-md">
            <ImageDown className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.logo}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="imageUploader"
            onChange={(url) => {
              if (url) {
                onSubmit({ logo: url });
              }
            }}
          />
        </div>
      )}
    </div>
  )
}