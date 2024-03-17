'use client';

import { User } from "next-auth";
import InputForm from "./InputForm";
import LoginWithGoogle from "./LoginWithGoogle";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import ProductHunt from "./ProductHunt";

interface HeroProps {
  user: User | undefined;
}

const Hero = ({user} : HeroProps) => {

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 , delay: 0.5 }} 
    className="container flex flex-col items-center justify-center gap-12 px-4 py-10 "
    >
    {
      !user && (

        <div className="flex flex-col gap-3 text-center justify-center items-center">
          <ProductHunt />
    <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
      Explain Like I am 5
    </h1>
    <p className="text-muted-foreground md:w-2/3 md:text-base text-xs">
      A platform to explain complex topics in simple words. It&apos;s like you are explaining to a 5 year old. You can ask questions and get answers in simple words. Change the Years to get the feel of the platform.
    </p>
    </div>
      ) 
    }
    {
      user ?(
        <InputForm />
      ) : (
        <LoginWithGoogle size="lg" wide />
      )
    }
  </motion.div>
    )
}

export default Hero