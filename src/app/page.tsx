import Link from "next/link";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";


export default async function HomePage() {
  const session = await getServerAuthSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background py-5 px-10">
      <div className="w-full h-auto">
        <Navbar user={session?.user} />
      </div>
      <Hero user={session?.user} />
      <Footer />
    </main>
  );
}
