import { User } from "next-auth"
import { ModeToggle } from "./ModeToggle"
import UserAcountNav from "./userAuthNav"
import Link from "next/link"
import LoginWithGoogle from "./LoginWithGoogle"
import { Button } from "./ui/button"

interface NavbarProps {
  user: User | undefined
}

const Navbar = ({user} : NavbarProps) => {

  return (
        <div className="flex justify-between items-center">
            <div>
                <Link href='/'>
                <h1 className="text-2xl font-bold">
                    Kidify it
                </h1>
                </Link>
            </div>
            <div className="flex gap-2">
                {
                    user && (
                        
                        <Link href='/questions'>
                <Button variant='link' className="text-foreground">
                Your Questions
                </Button>
                </Link>
                    )
                }
                <ModeToggle />
                <div>
                    {
                        user ? (
                            <UserAcountNav user={user} />
                        ) : (
                            <LoginWithGoogle />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar