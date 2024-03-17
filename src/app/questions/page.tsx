import { redirect } from "next/navigation";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import Hero from "./Hero";
import { getQueries } from "~/lib/actions";

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  const queries = await getQueries()

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
