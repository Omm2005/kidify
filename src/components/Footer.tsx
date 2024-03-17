'use client'

import Link from "next/link"
import { motion } from "framer-motion"

interface FooterProps {
  
}

const Footer = ({} : FooterProps) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
    className="text-sm flex flex-col justify-center items-center text-center"
    >
    <p className="py-2 px-5 rounded-full border border-muted-foreground bg-secondary cursor-pointer">
      <Link href="https://twitter.com/MaiOmmHoon">
      Made with ❤️ by {' '}
      <span className="hover:underline text-primary inline-block">Om Shah</span>
      </Link>
    </p>
  </motion.div>
    )
}

export default Footer