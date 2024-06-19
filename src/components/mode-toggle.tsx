"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/dark-theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function ModeToggle({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex gap-2">
      <ThemeToggle t={t} />
      <LanguageToggle />
    </div>
  );
}
