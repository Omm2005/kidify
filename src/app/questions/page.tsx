import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteQuery from "~/components/DeleteQuery";
import Footer from "~/components/Footer";
import Markdown from "~/components/Markdown";
import Navbar from "~/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { getServerAuthSession } from "~/server/auth";
import db from "~/server/db";
import Hero from "./Hero";

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  const queries = await db.query.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      question: true,
      answer: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-5 bg-background px-10 py-5">
      <div className="h-auto w-full">
        <Navbar user={session?.user} />
      </div>
      <Hero queries={queries} />
      <Footer />
    </main>
  );
};

export default page;
