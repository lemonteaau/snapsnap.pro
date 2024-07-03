"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Settings } from "@/components/settings";
import { Calculator } from "@/components/calculator";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow flex-col items-center gap-4">
        <Header t={t} />
        <Calculator />
      </main>
      <Footer t={t} />
    </div>
  );
}

function Header({ t }: { t: (key: string) => string }) {
  return (
    <header className="w-full max-w-4xl lg:mt-6">
      <div className="flex w-full items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-5 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="flex w-full items-center justify-center">
          <Image
            src="/image/logo.svg"
            width={80}
            height={49}
            alt="logo of the website"
          />
        </div>
        <div className="absolute ml-4">
          <Settings t={t} />
        </div>
      </div>
    </header>
  );
}

function Footer({ t }: { t: (key: string) => string }) {
  return (
    <footer className="flex h-16 w-full flex-col items-center justify-center gap-1 bg-gradient-to-t from-white via-white text-center dark:from-black dark:via-black lg:bg-none">
      <p className="text-center text-sm">{t("special_thanks")}</p>
      <p className="text-center text-sm">
        <Link href="https://www.bilibili.com/video/BV1K1421d7WB/">
          终极逆转-校草
        </Link>
        , token, Rainbow {t("for_calculation_logic")}
      </p>
      <Link
        href="https://github.com/lemonteaau/snap-bundle-calculator"
        className="flex flex-nowrap gap-2 text-sm"
      >
        By lemontea
        <FaGithub size={24} />
      </Link>
    </footer>
  );
}
