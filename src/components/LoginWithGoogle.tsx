'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface LoginWithGoogleProps {
  size?: "sm" | "lg" | "default" | "icon";
  wide?: boolean;
}

const LoginWithGoogle = ({size , wide}: LoginWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error("Kuch toh gadbaad hai!", {
        description: "There was a Error logging in with Google",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <Button size={size ? size : 'default'} onClick={LoginWithGoogle} className={`${wide && 'md:w-1/3 w-full'} md:text-base text-sm`}>Get Started</Button>;
};

export default LoginWithGoogle;
