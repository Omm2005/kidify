'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface LoginWithGoogleProps {}

const LoginWithGoogle = ({}: LoginWithGoogleProps) => {
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
  return <Button onClick={LoginWithGoogle}>Get Started</Button>;
};

export default LoginWithGoogle;
