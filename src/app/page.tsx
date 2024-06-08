import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import { Calculator } from "@/components/calculator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="flex flex-col items-center gap-10 pb-5 pt-20">
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
        <p className="flex-grow text-center text-base font-bold lg:text-xl">
          Snap Bundle Calculator
        </p>
        <div className="absolute ml-4">
          <ModeToggle />
        </div>
        <Image
          src="/image/logo.svg"
          width={75}
          height={75}
          alt="logo of the website"
          className="absolute right-4"
        />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 flex h-16 w-full flex-col items-center justify-center gap-3 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:bg-none">
      <p className="text-sm">
        Special thanks to{" "}
        <Link href="https://www.bilibili.com/video/BV1K1421d7WB/">
          漫威Snap-校草
        </Link>{" "}
        for the calculation logic.
      </p>
      <p className="flex flex-row gap-1 text-sm">
        By
        <Link
          href="https://github.com/lemonteaau/snap-bundle-calculator"
          className="flex flex-nowrap gap-2"
        >
          lemontea
          <FaGithub size={24} />
        </Link>
      </p>
    </footer>
  );
}
