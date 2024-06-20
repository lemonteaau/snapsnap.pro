"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, CircleDollarSign } from "lucide-react";
import { LuPlus, LuMinus } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

export function Calculator() {
  const { t } = useTranslation();
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language changed to:", i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);
  const [gvarient, setGVarient] = useState(0);
  const [pvarient, setPVarient] = useState(0);
  const [gold, setGold] = useState(0);
  const [credit, setCredit] = useState(0);
  const [token, setToken] = useState(0);
  const [cacheKey, setCacheKey] = useState(0);
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [currency, setCurrency] = useState("USD");

  //Exchange rate for currency.
  const exchangeRates: { [key: string]: number } = {
    CNY: 6.8,
    AUD: 1.5,
    USD: 1,
  };

  const calculateValue = () => {
    const priceInUSD = price / exchangeRates[currency];
    // Calculate the value of the items based on gold.
    const gvarientValue = gvarient * 1200;
    const pvarientValue = pvarient * 700;
    const cacheKeyValue = cacheKey * 5000;
    const totalGold = gold + (credit / 5) * 4 + (token / 3) * 4;
    const totalValueGold =
      gvarientValue + pvarientValue + cacheKeyValue + totalGold;
    const totalPriceGold = priceInUSD * 100;

    if (totalPriceGold === 0) {
      setValue(0);
      setSuggestion("Wrong value");
    } else {
      const valuePercentage = Math.round(
        (totalValueGold / totalPriceGold) * 100,
      );
      setValue(valuePercentage);

      if (valuePercentage >= 280) {
        setSuggestion(t("stfu_and_buy_it"));
      } else if (valuePercentage >= 240) {
        setSuggestion(t("buy_it"));
      } else if (valuePercentage >= 200) {
        setSuggestion(t("good_deal"));
      } else if (valuePercentage >= 160) {
        setSuggestion(t("normal_deal"));
      } else {
        setSuggestion(t("bad_deal"));
      }
    }
  };
  const resetValues = () => {
    setGVarient(0);
    setPVarient(0);
    setGold(0);
    setCredit(0);
    setToken(0);
    setCacheKey(0);
    setPrice(0);
    setValue(0);
    setSuggestion("");
  };

  const currencyMap: { [key: string]: string } = {
    AUD: t("AUD"),
    CNY: t("CNY"),
    USD: t("USD"),
  };

  return (
    <div className="mb-8 max-w-[380px] text-center lg:mb-0 lg:w-full lg:min-w-[900px] lg:px-32">
      <Card>
        <CardHeader>
          <CardDescription>{t("fill_form")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-7">
            <div className="mb-3 grid grid-cols-2 gap-6 lg:grid-cols-3">
              {[
                {
                  src: "/image/gvarient.png",
                  alt: "golden variant",
                  value: gvarient,
                  setter: setGVarient,
                },
                {
                  src: "/image/pvarient.png",
                  alt: "purple variant",
                  value: pvarient,
                  setter: setPVarient,
                },
                {
                  src: "/image/gold.png",
                  alt: "gold",
                  value: gold,
                  setter: setGold,
                  step: 100,
                },
                {
                  src: "/image/credits.png",
                  alt: "credit",
                  value: credit,
                  setter: setCredit,
                  step: 100,
                },
                {
                  src: "/image/tokens.png",
                  alt: "token",
                  value: token,
                  setter: setToken,
                  step: 100,
                },
                {
                  src: "/image/cachekey.png",
                  alt: "cache key",
                  value: cacheKey,
                  setter: setCacheKey,
                },
              ].map(({ src, alt, value, setter, step = 1 }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-4"
                >
                  <Image
                    src={src}
                    width={60}
                    height={60}
                    alt={alt}
                    // className="max-h-24"
                  />
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setter(value - step)}
                    >
                      <LuMinus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      placeholder="0"
                      value={value === 0 ? "" : value}
                      min={0}
                      step={step}
                      className="max-w-[60px] text-center"
                      onChange={(e) => setter(Number(e.target.value))}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setter(value + step)}
                    >
                      <LuPlus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <CircleDollarSign className="h-8 w-8" />
              <Input
                type="number"
                placeholder={t("price")}
                value={price === 0 ? "" : price}
                className="max-w-[120px]"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="max-w-[60px]">
                    {currencyMap[currency]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-8">
                  <DropdownMenuRadioGroup
                    value={currency}
                    onValueChange={setCurrency}
                  >
                    <DropdownMenuRadioItem value="AUD">
                      <Image
                        height={18}
                        width={18}
                        src={"/icon/aus.svg"}
                        alt="Flag of Australia"
                        className="mr-2"
                      />
                      {t("AUD")}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="CNY">
                      <Image
                        height={18}
                        width={18}
                        src={"/icon/chn.svg"}
                        alt="Flag of China"
                        className="mr-2"
                      />
                      {t("CNY")}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="USD">
                      <Image
                        height={18}
                        width={18}
                        src={"/icon/usa.svg"}
                        alt="Flag of USA"
                        className="mr-2"
                      />
                      {t("USD")}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {value !== null && (
            <div className="mt-5 text-lg font-bold">
              {t("value")}: {value}% {suggestion}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 lg:flex-row">
          <Button className="w-full" onClick={calculateValue} disabled={!price}>
            <Check className="mr-2 h-4 w-4" />
            {t("value_it")}
          </Button>
          <Button
            className="w-full"
            variant={!price ? "secondary" : "destructive"}
            onClick={resetValues}
            disabled={!price}
          >
            <GrPowerReset className="mr-2 h-4 w-4" />
            {t("reset")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
