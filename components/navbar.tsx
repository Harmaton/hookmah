"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "@/components/ui/avatar";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { GraduationCap, HopOff, Terminal, UserCircle } from "lucide-react";
import checkIsTeacher from "@/lib/isTeacher";
import { LogIn } from "lucide-react";
import { NavigationMenuDemo } from "./navigation-menu";

const Navbar = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchIsTeacherStatus = async () => {
      const email = user?.user?.emailAddresses[0].emailAddress;
      if (email) {
        const status = await checkIsTeacher(email);
        setIsTeacher(status);
      }
    };

    fetchIsTeacherStatus();
  }, [user]);

  return (
    <nav className="p-4 top-0 z-40 w-full m-0 md:pr-10 bg-transparent sticky ">
      <div className="px-4 sm:px-10 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="font-3xl font-bold">
              <Image src="/logo/logo-hokmah.png" height={50} width={100} alt="logo" />
             
            </div>
          </Link>
        </div>

        {/* <div className="flex-grow md:flex md:items-center md:justify-center hidden  space-x-4">
          <NavigationMenuDemo />
        </div> */}

        <div className="flex items-center space-x-4">
          <ModeToggle />
          { isTeacher &&
            <>
             <div className="flex mr-2 ">
              <Link href='/annual'>
              <Button>
              Panel
              </Button>
              </Link>
              </div>
            <UserButton afterSignOutUrl="/" />
            </>
         }
          {!user?.isSignedIn && (
             <div className="flex mr-2 ">
             <div className="mr-2">
               <Link href="/new">
                 <div
                   className={buttonVariants({
                     size: "sm",
                   })}
                 >
                   Sign up
                 </div>
               </Link>
             </div>

             <div>
               <Link href="/new">
                 <div
                   className={buttonVariants({
                     size: "sm",
                   })}
                 >
                   Sign In
                 </div>
               </Link>
             </div>
           </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
