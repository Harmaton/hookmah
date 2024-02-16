"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PenBox, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, Experience, GAP } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface CharacterizationFormProps {
  initialData: Experience;
  experienceid: string;
};

const formSchema = z.object({
  characterization: z.string().min(1, {
    message: "Se requiere descripción",
  }),
});

export const CharacterizationForm = ({
  initialData,
  experienceid
}: CharacterizationFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      characterization: initialData?.characterization || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/experience/${experienceid}`, values);
      toast.success("Characterization actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Caracterización
        <Button onClick={toggleEdit} variant="ghost">
        {isEditing ? (
            <>Minimizar</>
          ) : (
            <>
              <PenBox className="h-4 w-4 mr-2 text-blue-500" />
              Editar Caracterización
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.characterization && "text-slate-500 italic"
        )}>
          {initialData.characterization || "Sin Caracterización"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="characterization"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Anota la caracterización"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Ahorrar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}