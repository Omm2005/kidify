'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import BuyMeACoffeeImage  from '~/../public/buy-me-a-coffee-seeklogo-2.svg'

interface BuyMeACoffeeProps {
  
}

const BuyMeACoffee = ({} : BuyMeACoffeeProps) => {
  return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 , delay: 1 }} 
        className="bottom-2 right-2 z-50 fixed"
        >
        <Link href='https://www.buymeacoffee.com/shahom0306f'  target="_blank" >
          <Button variant='outline' size='sm' className="rounded-full bg-white text-black hover:bg-gray-400 hover:text-background">
            <Image src={BuyMeACoffeeImage} alt="Buy me a Coffee" width={50} height={50} />
            <p className="md:flex hidden">
              Buy me a Coffee
            </p>
          </Button>
          </Link>
        </motion.div>
    )
}

export default BuyMeACoffee