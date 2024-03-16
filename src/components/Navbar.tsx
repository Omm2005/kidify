'use client'

import { User } from "next-auth"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import UserAcountNav from "./userAuthNav"
import Link from "next/link"

interface NavbarProps {
  user: User | undefined
}

const Navbar = ({user} : NavbarProps) => {
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const LoginWithGoogle = async () => {
      setIsLoading(true)
      try {
          await signIn('google')
      } catch (error) {
          toast.error(
              'Kuch toh gadbaad hai!',{
              description: "There was a Error logging in with Google"
          })
      } finally {
          setIsLoading(false)
      }
  }
  return (
        <div className="flex justify-between items-center">
            <div>
                <Link href='/'>
                <h1 className="text-2xl font-bold">
                    Kidify
                </h1>
                </Link>
            </div>
            <div className="flex gap-2">
                <ModeToggle />
                <div>
                    {
                        user ? (
                            <UserAcountNav user={user} />
                        ) : (
                            <Button onClick={LoginWithGoogle}>
                                Get Started
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar