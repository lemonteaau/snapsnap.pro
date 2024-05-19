import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import { Calculator } from "@/components/calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-bold text-lg">
          Marvel Snap Bundle Calculator
        </p>
        <ModeToggle />
      </div>

      <div className="mb-24 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Calculator />
      </div>

      <div className="fixed bottom-4 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none gap-3">
        <p>
          By {"  "}
          <Link href="https://github.com/lemonteaau">lemontea</Link>
        </p>
        <Link href="https://github.com/lemonteaau">
          <FaGithub size={24} />
        </Link>
      </div>
    </main>
  );
}
