"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { LogOut, PlusIcon, SkipBack, Undo2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

import checkIsTeacher from "@/lib/isTeacher";

export const NavbarRoutes = () => {

  const [isTeacher, setIsTeacher ] = useState(false)
  const user = useUser()

  console.log(isTeacher)

    useEffect(() => {
        const fetchIsTeacherStatus = async () => {
            const email = user?.user?.emailAddresses[0].emailAddress
            if (email) {
              const status = await checkIsTeacher(email);
              setIsTeacher(status);
              console.log(status)
            }
          };
          fetchIsTeacherStatus();
    }, [user])


  return (
    <>
      <div className="flex gap-x-2 ml-auto">
       
          <Link href="/">
            <Button size="sm" variant="ghost">
              <Undo2 className="h-4 w-4 mr-2" />
              Atrás
            </Button>
          </Link>
          
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}