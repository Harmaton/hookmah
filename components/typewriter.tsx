"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./type-writer-effect";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";
import { useEffect, useState } from "react";
import checkIsTeacher from "@/lib/isTeacher";

export function TypewriterEffectSmoothDemo() {
  const router = useRouter()
  const user = useUser();
  
  const admin = isAdmin(user?.user?.id)

  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const fetchIsTeacherStatus = async () => {
      const email = user?.user?.emailAddresses[0].emailAddress;
      if (email) {
        const status = await checkIsTeacher(email);
        setIsTeacher(status);
        console.log("TEACHER", status);
      }
    };
    fetchIsTeacherStatus();

  }, [user]);


  console.log("admin:", admin )

  const words = [
    {
      text: "Crear",
    },
    {
      text: "Asombrosa",
    },
    {
      text: "Documentos",
    },
    {
      text: "con",
    },
    {
      text: "Hokmah.",
      className: "text-red-500 dark:text-red-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] p-4 ">
      <p className="text-neutral-600 dark:text-neutral-200  text-4xl p-4 text-center justify-center ">
      Abrace el futuro educativo con Hokmah ia, donde la inteligencia artificial lleva la creación de documentos para educadores de todos los niveles a la siguiente etapa.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">

       { isTeacher && <Link href='/annual'>
        <Button className="w-40 h-10 rounded-xl border-transparent text-sm">
        Panel de documentos
        </Button>
        </Link>
        }

        {
          !isTeacher &&
          <Link href='/contact'>
        <Button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
        Contacto Ventas
        </Button>
        </Link>}

        { isAdmin(user?.user?.id) && <Link href='/admin/analytics'>
        <Button className="w-40 h-10 rounded-xl bg-black border-transparent text-sm">
        Admin modo
        </Button>
        </Link>
}
      </div>
    </div>
  );
}
