"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export function Result({
  open,
  setOpen,
  value,
  suggestion,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: number;
  suggestion: string;
}) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const getImageSrc = () => {
    if (value >= 280) {
      return "/image/stfu_buy.png";
    } else if (value >= 240) {
      return "/image/buy_it.png";
    } else if (value >= 200) {
      return "/image/good_deal.png";
    } else if (value >= 160) {
      return "/image/normal_deal.png";
    } else {
      return "/image/bad_deal.png";
    }
  };

  const imageSrc = getImageSrc();

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <div className="grid grid-cols-4">
              <div className="col-span-3 flex flex-col gap-6 p-4">
                <DialogTitle>{suggestion}</DialogTitle>
                <DialogDescription className="text-md">
                  {t("value_info")} {value}%
                </DialogDescription>
              </div>
              <Image
                src={imageSrc}
                alt={suggestion}
                width={100}
                height={100}
                priority={true}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <div className="grid grid-cols-4">
                <div className="col-span-3 flex flex-col gap-6 p-4 text-start">
                  <DrawerTitle>{suggestion}</DrawerTitle>
                  <DrawerDescription className="text-md">
                    {t("value_info")} {value}%
                  </DrawerDescription>
                </div>
                <Image
                  src={imageSrc}
                  alt={suggestion}
                  width={100}
                  height={100}
                  priority={true}
                />
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">{t("okay")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
