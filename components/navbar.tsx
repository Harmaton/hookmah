'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import { Avatar } from "@/components/ui/avatar";
import { UserButton, useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button, buttonVariants } from './ui/button';
import { GraduationCap, Terminal, UserCircle } from 'lucide-react';
import checkIsTeacher from '@/lib/isTeacher';
import { LogIn } from 'lucide-react';

const Navbar = () => {
  const user = useUser()
  const [isOpen, setIsOpen] = useState(false);
  const [isTeacher, setIsTeacher ] = useState(false)
  const [isStudent, setIsStudent] = useState(false)

  useEffect(() => {
    const fetchIsTeacherStatus = async () => {
      const email = user?.user?.emailAddresses[0].emailAddress
      if (email) {
        const status = await checkIsTeacher(email);
        setIsTeacher(status);
      }
    };

    fetchIsTeacherStatus();
  }, [user])

  return (
    <nav className="p-4 top-0 z-40 w-full border-b m-0 md:pr-10 ">
      <div className="px-4 sm:px-10 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            
              <div className="text-black font-3xl font-bold">
                {/* <Image src="/logo-gash-1.png" height={50} width={100} alt="logo" /> */}
                Hookmah
              </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
        <ModeToggle />
          { user?.isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  className='relative h-8 w-8 rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <UserButton afterSignOutUrl='/' />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {isTeacher && (
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard/teacher/courses'>
                        <Terminal
                          className='mr-2 h-4 w-4'
                          aria-hidden='true'
                        />
                        Hookmah
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/account'>
                      <UserCircle
                        className='mr-2 h-4 w-4'
                        aria-hidden='true'
                      />
                      Cuenta
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href='/new'>
              <div
                className={buttonVariants({
                  size: "sm",
                })}>
                <LogIn className='h-4 w-4' />
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
