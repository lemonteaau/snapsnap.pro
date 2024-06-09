"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/dark-theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function ModeToggle() {
  return (
    <div className="flex gap-2">
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
}
