'use client'
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EyeClosedIcon } from "@radix-ui/react-icons";

interface regProps {
  initialData: GAP;
  gapid: string;
}

const formSchema = z.object({
  graduateProfile: z.string().min(1, {
    message: "Se requiere profile",
  }),
});


export const ProfileForm = ({ initialData, gapid }: regProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [predefinedData, setPredefinedData] = useState("Your profile basis here");
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        graduateProfile: initialData?.graduateProfile || "",
      },
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const onSubmit = async () => {
      try {
        const formData = {
          graduateProfile: form.getValues("graduateProfile") || predefinedData,
        };
  
        await axios.patch(`/api/gaps/${gapid}`, formData);
        toast.success("Ano actualizado");
        toggleEdit();
        router.refresh();
      } catch {
        toast.error("Algo salió mal");
      }
    };
  
    useEffect(() => {
      // Set predefined data when the component mounts
      form.setValue("graduateProfile", predefinedData);
    }, [predefinedData]);
  
    return (
      <div className="mt-6 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
        Perfil de egresado
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>
              <EyeOff className="h-4 w-4 mr-2" />
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2 text-green-500" />
                ver perfil de egresado
              </>
            )}
          </Button>
        </div>
        {isEditing && (
          <Form {...form}>
            <form className="space-y-4 mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Graduate Profile
                </label>
                <p className="text-sm mt-1">{predefinedData}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <Button onClick={onSubmit} disabled={isSubmitting} type="button">
                  Ahorrar
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    );
  };
  