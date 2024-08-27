"use client";

import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("hasSeenServerAlert");
    if (!hasSeenAlert) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenServerAlert", "true");
  };

  return (
    <Alert
      className={cn(
        "fixed top-4 z-50 max-w-md sm:max-w-md lg:top-8 lg:max-w-lg lg:self-center",
      )}
    >
      <AlertCircle className="size-5" />
      <AlertTitle>国服用户请注意</AlertTitle>
      <AlertDescription>
        由于国服开启时间较短，礼包样本量有限，需要时间进行重新计算比例，敬请期待。
      </AlertDescription>
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 p-1"
        aria-label="关闭通知"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
