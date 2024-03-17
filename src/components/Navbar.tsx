"use client";

import { User } from "next-auth";
import { ModeToggle } from "./ModeToggle";
import UserAcountNav from "./userAuthNav";
import Link from "next/link";
import LoginWithGoogle from "./LoginWithGoogle";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user: User | undefined;
}

const Navbar = ({ user }: NavbarProps) => {
  const path = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between"
    >
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold md:text-2xl">Kidify it</h1>
        </Link>
      </div>
      <div className="flex gap-2">
        {user &&
          (path === "/questions" ? (
            <Link href="/" className="hidden md:flex">
              <Button variant="link" className="text-foreground">
                Ask a Question
              </Button>
            </Link>
          ) : (
            <Link href="/questions" className="hidden md:flex">
              <Button variant="link" className="text-foreground">
                Your Questions
              </Button>
            </Link>
          ))}
        <ModeToggle />
        <div>{user ? <UserAcountNav user={user} /> : <LoginWithGoogle />}</div>
      </div>
    </motion.div>
  );
};

export default Navbar;
