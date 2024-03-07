"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ListPlus, Pencil } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Course, GAP } from "@prisma/client";
 
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
import { Combobox } from "@/components/ui/combobox";
import { NumCombobox } from "@/components/ui/num-combobox";

interface AgeFormProps {
  initialData: GAP;
  gapid: string;
  options: { label: number; value: string; }[];
};


const formSchema = z.object({
  ageid: z.string().min(1),
});



export const AgeForm = ({
  initialData,
  gapid,
  options,
}: AgeFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageid: initialData?.ageid || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/gaps/${gapid}`, values);
      toast.success("Edad actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const selectedOption = options ? options.find((option) => option.value === initialData.ageid) : null;

  return (
    <div className="mt-6 bg-transparent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Edad promedio
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Minimizar</>
          ) : (
            <>
              <ListPlus className="h-4 w-4 mr-2 text-red-500" />
              Editar promedio
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.ageid && "text-slate-500 italic"
        )}>
          {selectedOption?.label || "Ninguna promedio"}
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
              name="ageid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <NumCombobox
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
