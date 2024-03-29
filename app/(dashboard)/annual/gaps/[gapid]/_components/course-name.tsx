"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ListPlus, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
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
import { Combobox } from "@/components/ui/combobox";

interface DepartmentFormProps {
  initialData: GAP;
  gapid: string;
  options: { label: string; value: string; }[];
};

const formSchema = z.object({
  courseid: z.string().min(1),
});



export const CourseForm = ({
  initialData,
  gapid,
  options,
}: DepartmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        courseid: initialData?.courseid|| "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/gaps/${gapid}`, values);
      toast.success("Course actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const selectedOption = options ? options.find((option) => option.value === initialData.courseid) : null;

  return (
    <div className="mt-6 bg-transparent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Minimize</>
          ) : (
            <>
              <ListPlus className="h-4 w-4 mr-2 text-red-500" />
              Editar Curso
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.departmentId && "text-slate-500 italic"
        )}>
          {selectedOption?.label || "sin curso"}
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
              name="courseid"
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
