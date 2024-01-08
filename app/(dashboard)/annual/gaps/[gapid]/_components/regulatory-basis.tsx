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

interface regProps {
  initialData: GAP;
  gapid: string;
}

const formSchema = z.object({
  regulatoryBasis: z.string().min(1, {
    message: "Se requiere basis",
  }),
});

// ... (imports remain the same)

// ... (imports remain the same)

export const RegForm = ({ initialData, gapid }: regProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [predefinedData, setPredefinedData] = useState("Your predefined basis here");
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        regulatoryBasis: initialData?.regulatoryBasis || "",
      },
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const onSubmit = async () => {
      try {
        // If the button is disabled, the form is not considered valid.
        // Bypass the form validation and submit the data.
        const formData = {
          regulatoryBasis: form.getValues("regulatoryBasis") || predefinedData,
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
      form.setValue("regulatoryBasis", predefinedData);
    }, [predefinedData]);
  
    return (
      <div className="mt-6 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Regulatory Basis
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <><EyeOff className="h-4 w-4 mr-2 " /></>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2 text-green-500" />
                See Regulatory basis
              </>
            )}
          </Button>
        </div>
        {isEditing && (
          <Form {...form}>
            <form className="space-y-4 mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Regulatory basis
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
  