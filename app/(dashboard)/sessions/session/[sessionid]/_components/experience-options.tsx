"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ListPlus, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Session } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface ExperienceProps {
  initialData: Session;
  sessionid: string;
  options: { label: string; value: string; }[];
};

const formSchema = z.object({
    experienceid: z.string().min(1),
});



export const ExperienceForm = ({
  initialData,
  sessionid,
  options,
}: ExperienceProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        experienceid: initialData?.experienceid|| "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/session/${sessionid}`, values);
      toast.success("sesion actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const selectedOption = options ? options.find((option) => option.value === initialData.experienceid) : null;

  return (
    <div className="mt-6 bg-transparent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Elige una de tus experiencias de aprendizaje
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Minimize</>
          ) : (
            <>
              <ListPlus className="h-4 w-4 mr-2 text-red-500" />
              Editar 
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.experienceid && "text-slate-500 italic"
        )}>
          {selectedOption?.label || "sin experiencia de aprendizaje"}
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
              name="experienceid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options || []}
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
  );
};
