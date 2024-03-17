import Link from "next/link";
import InputForm from "~/components/InputForm";
import LoginWithGoogle from "~/components/LoginWithGoogle";
import Navbar from "~/components/Navbar";
import { getServerAuthSession } from "~/server/auth";


export default async function HomePage() {
  const session = await getServerAuthSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background p-10">
      <div className="w-full h-auto">
        <Navbar user={session?.user} />
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {
          !session?.user && (

            <div className="flex flex-col gap-3 text-center justify-center items-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Explain Like I am 5
        </h1>
        <p className="text-muted-foreground">
          A platform to explain complex topics in simple words. It&apos;s like you are explaining to a 5 year old.
        </p>
        </div>
          ) 
        }
        {
          session?.user ?(
            <InputForm />
          ) : (
            <LoginWithGoogle />
          )
        }
      </div>
      <div className="text-sm flex flex-col justify-center items-center text-center">
        <p>
          Made with ❤️ by {' '}
          <Link href="https://twitter.com/MaiOmmHoon" className="hover:underline text-primary">
            Om Shah
          </Link>
        </p>
      </div>
    </main>
  );
}
