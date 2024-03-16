
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import Markdown from "~/components/Markdown"
import Navbar from "~/components/Navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { getServerAuthSession } from "~/server/auth"
import db from "~/server/db"

interface pageProps {
  
}

const page = async({} : pageProps) => {

    const session = await getServerAuthSession()
    if(!session) {
        redirect("/")
    }

    const queries = await db.query.findMany({
        where: {
            userId: session.user.id
        },
        select: {
            question: true,
            answer: true
        }
    })

  return (
    <main className="flex min-h-screen flex-col items-start justify-between bg-background p-10 gap-5">
    <div className="w-full h-auto">
      <Navbar user={session?.user} />
    </div>
    <div className="flex flex-col w-full h-full border border-muted-foreground p-5 rounded-3xl gap-4">

            <div className="flex gap-5">
            <h1 className="md:text-4xl underline text-2xl font-bold cursor-default">
                Your Questions
            </h1>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {
                    queries.reverse().map((query , index) => {
                        return (
                            <AccordionItem value={`${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-bold">{query.question}</AccordionTrigger>
                            <AccordionContent>
                                <Markdown text={query.answer} />
                            </AccordionContent>
                          </AccordionItem>
                        )
                    } )
                }
        </Accordion>
                </div>
             <div className="text-sm flex flex-col justify-center items-center mx-auto text-center">
             <p>
               Made with ❤️ by {' '}
               <Link href="https://twitter.com/MaiOmmHoon" className="hover:underline text-primary">
                 Om Shah
               </Link>
             </p>
           </div>
         </main>
    )
}

export default page