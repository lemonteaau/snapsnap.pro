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
import stfuBuy from "../../public/image/stfu_buy.png";
import buyIt from "../../public/image/buy_it.png";
import goodDeal from "../../public/image/good_deal.png";
import normalDeal from "../../public/image/normal_deal.png";
import badDeal from "../../public/image/bad_deal.png";
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
      return stfuBuy;
    } else if (value >= 240) {
      return buyIt;
    } else if (value >= 200) {
      return goodDeal;
    } else if (value >= 160) {
      return normalDeal;
    } else {
      return badDeal;
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
                priority={true}
                quality={20}
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
