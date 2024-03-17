"use client";

import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface UserAcountNavProps {
  user: User;
  path: string;
}

const UserAcountNav = ({ user , path }: UserAcountNavProps) => {
  return (
    <>
      <div className="md:flex hidden gap-2 rounded-full bg-destructive text-destructive-foreground pl-3">
      <div
              className="flex w-full items-center justify-between cursor-pointer"
              onClick={() => signOut()}
            >
              <p>Log Out</p>
            </div>
        <Image
          src={user.image!}
          width={40}
          height={40}
          className="rounded-full"
          alt="User Image"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex overflow-visible md:hidden"
        >
          <div className="relative cursor-pointer items-center justify-center gap-1">
            <Image
              src={user.image!}
              width={40}
              alt="Image"
              height={40}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60 border-2 border-muted-foreground bg-background"
          align="end"
        >
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex items-center gap-3 space-y-0.5 leading-none">
              <Image
                src={user.image!}
                width={40}
                alt="Image"
                height={40}
                className="rounded-full"
              />
              <div>
                <p>{user.name}</p>
                <p className="text-sm font-medium text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="flex md:hidden" />

          <DropdownMenuItem asChild className="flex md:hidden">
          {path === '/questions' ? (
            <Link href="/">Ask a Question</Link>
          ) : (
            <Link href="/questions">Questions</Link>
            ) }
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <div
              className="flex w-full items-center justify-between hover:bg-red-700"
              onClick={() => signOut()}
            >
              <p>Log Out</p>
              <LogOut className="h-4 w-4" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAcountNav;
