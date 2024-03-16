'use client'

import { User } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import Link from "next/link"

interface UserAcountNavProps {
  user : User,
}

const UserAcountNav = ({
    user
} : UserAcountNavProps) => {

  return (  
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='flex overflow-visible'>
            <div className="relative cursor-pointer gap-1 justify-center items-center">
                <Image
                src={user.image!}
                width={40}
                alt="Image"
                height={40}
                className="rounded-full" 
                />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background border-2 border-muted-foreground w-60" align='end'>
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
                    <p>
                        {user.name}
                    </p>
                    <p className="font-medium text-sm text-muted-foreground">
                        { user.email }
                    </p>
                </div>
                </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                    <Link href='/questions'>
                        Questions
                    </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <div className="w-full flex items-center justify-between hover:bg-red-700" onClick={() => signOut()}>
                    <p>
                        Log Out
                    </p>
                    <LogOut className="h-4 w-4" />
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default UserAcountNav