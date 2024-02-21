"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {  Session } from "@prisma/client";

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
import { GoogleGenerativeAI } from "@google/generative-ai";

interface profnameFormProps {
  initialData: Session;
  sessionid: string;
  instrument: string | null;
}

const formSchema = z.object({
    instrument: z.string().min(1, {
    message: "Se requiere descripción",
  }),
});

export const InstrumentForm = ({
  initialData,
  sessionid,
    instrument
}: profnameFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
    const [list, setList] = useState('')
  
const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");


const model = genAI.getGenerativeModel({ model: "gemini-pro" });


  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  useEffect(()=> {
  async function aiRun() {
    
    const prompt =   `Shorten the following to just a list of evaluation instruments. Just summarise to a list of 1 -10 learning instruments in spanish according to this genarated instruments,  ${instrument}, it should be conveted to a list like e.g 1. skill one, 2.skill 2 ...etc according to the number of the items in the learning instruments in provided above.  Generate everything in Spanish. Make it very brief and just a list.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const listtext = response.text();
      console.log(listtext)
      setList(listtext)
    } catch(error){
      console.log(error)
    }
 
  }
  aiRun()
 
},[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        instrument: initialData?.instrument || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/session/${sessionid}`, values);
      toast.success("competencia actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  return (
    <div className="mt-6 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Seleccione 1 instrumento de aprendizaje para desarrollar y anótelo
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Minimizar</>
          ) : (
            <>
              <PenBox className="h-4 w-4 mr-2 text-blue-500" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.instrument && "text-slate-500 italic"
          )}
        >
          {initialData.instrument || "Sin instrumento"}
        </p>
      )}
      {isEditing && (
        <>
        <div>
          {list}                  
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="instrument"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Escribe instrumento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Ahorrar
              </Button>
            </div>
          </form>
        </Form>
        </>
      )}
    </div>
  );
};


