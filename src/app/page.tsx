import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import { Calculator } from "@/components/calculator";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="flex flex-col items-center gap-6 p-20">
        <Header />
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="z-10 w-full max-w-5xl font-mono text-sm">
      <div className="fixed left-0 top-0 flex w-full items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <p className="flex-grow text-center text-xl font-bold">
          Snap Bundle Calculator
        </p>
        <div className="ml-auto mr-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-4 left-0 flex h-10 w-full items-end justify-center gap-3 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
      <p>
        By {"  "}
        <Link href="https://github.com/lemonteaau">lemontea</Link>
      </p>
      <Link href="https://github.com/lemonteaau">
        <FaGithub size={24} />
      </Link>
    </footer>
  );
}
