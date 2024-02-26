"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Se requiere título",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/experience", values);
      router.push(`/experience/experiences/${response.data.id}`);
      toast.success("experiencia de aprendizaje creadado");
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return ( 
    <div className=" mx-auto m-4 my-auto flex md:items-end h-full p-6 border rounded-md">
      <div>
        <h1 className="text-3xl mb-6">
        Experiencia de aprendizaje
        </h1>
       <Separator /> 
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                  Para comenzar, cree el tema para esta experiencia de aprendizaje
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ingrese el tema de su creatividad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/experience">
                <Button
                  type="button"
                  variant="ghost"
                >
                 Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;