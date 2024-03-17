'use client'

import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import DeleteQuery from "~/components/DeleteQuery"
import Markdown from "~/components/Markdown"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { motion } from "framer-motion"
import Image from "next/image"
import SadKidify from "~/../public/Kidify-sad.jpg"

interface HeroProps {
  queries: {
    id: string,
    question: string,
    answer: string
  }[]
}

const Hero = ({queries} : HeroProps) => {

  const reversedQueries = queries.reverse()

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 , delay: 0.5 }} 
    className="flex flex-col w-full h-full border border-muted-foreground p-5 rounded-3xl gap-4"
    >

    <div className="flex gap-5">
    <h1 className="md:text-4xl underline text-2xl font-bold cursor-default">
        Your Questions
    </h1>
    </div>
      {
        reversedQueries.length === 0 && (
          <div className="flex flex-col gap-3 text-center justify-center items-center">
            <Image src={SadKidify} width={200} height={200} alt="Sad Kidify" className="rounded-3xl"  />
            <h1 className="text-3xl font-bold text-muted-foreground">
              No Questions Asked
            </h1>
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
                <ChevronLeftIcon size={20} />
                Ask a Question
            </Link>
          </div>
        )
      }
            <Accordion type="single" collapsible className="w-full">
        {
            reversedQueries.map((query , index) => {
                return (
                  <div className="flex gap-2 w-full justify-start items-center min-h-full" key={index}>
                      <DeleteQuery id={query.id} />
                    <AccordionItem value={`${index}`} key={index} className="w-full">
                    <AccordionTrigger className="text-lg font-bold group">
                      <div className="text-start">
                        <p className="group-hover:underline">
                      {query.question.split('---')[0]}
                        </p>
                        <p className="md:text-sm text-xs text-muted-foreground">
                          {'Years: ' + query.question.split('---')[1]}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Markdown text={query.answer} />
                    </AccordionContent>
                  </AccordionItem>
                  </div>
                )
            } )
        }
</Accordion>
        </motion.div>
    )
}

export default Hero