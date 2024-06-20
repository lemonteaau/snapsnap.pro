"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, CircleDollarSign } from "lucide-react";
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

  const calculateValue = () => {
    // Calculate the value of the items based on gold.
    const gvarientValue = gvarient * 1200;
    const pvarientValue = pvarient * 700;
    const cacheKeyValue = cacheKey * 5000;
    const totalGold = gold + (credit / 5) * 4 + (token / 3) * 4;
    const totalValueGold =
      gvarientValue + pvarientValue + cacheKeyValue + totalGold;
    const totalPriceGold = price * 100;

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

  return (
    <div className="mb-8 max-w-[300px] text-center lg:mb-0 lg:w-full lg:max-w-full lg:px-32">
      <Card>
        <CardHeader>
          <CardDescription>{t("fill_form")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5">
              {[
                {
                  src: "/image/gvarient.webp",
                  alt: "golden variant",
                  value: gvarient,
                  setter: setGVarient,
                },
                {
                  src: "/image/pvarient.webp",
                  alt: "purple variant",
                  value: pvarient,
                  setter: setPVarient,
                },
                {
                  src: "/image/gold.webp",
                  alt: "gold",
                  value: gold,
                  setter: setGold,
                  step: 100,
                },
                {
                  src: "/image/credits.webp",
                  alt: "credit",
                  value: credit,
                  setter: setCredit,
                  step: 100,
                },
                {
                  src: "/image/tokens.webp",
                  alt: "token",
                  value: token,
                  setter: setToken,
                  step: 100,
                },
                {
                  src: "/image/cachekey.webp",
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
                    width={80}
                    height={80}
                    alt={alt}
                    className="max-h-24 object-fill"
                  />
                  <Input
                    type="number"
                    placeholder="0"
                    value={value === 0 ? "" : value}
                    min={0}
                    step={step}
                    onChange={(e) => setter(Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <CircleDollarSign size={40} className="max-w-10" />
              <Input
                type="number"
                placeholder={t("price_in_usd")}
                value={price === 0 ? "" : price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          {value !== null && (
            <div className="mt-5 text-lg font-bold">
              {t("value")}: {value}% {suggestion}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={calculateValue} disabled={!price}>
            <Check className="mr-2 h-4 w-4" />
            {t("value_it")}
          </Button>
        </CardFooter>
        <CardFooter>
          <Button
            className="w-full"
            variant="secondary"
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
