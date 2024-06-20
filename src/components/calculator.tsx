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
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/gvarient.webp"
                width={40}
                height={40}
                alt="golden varient"
                className="max-w-10 object-none"
              />
              <Input
                type="number"
                placeholder={t("num_of_golden_varients")}
                value={gvarient === 0 ? "" : gvarient}
                onChange={(e) => setGVarient(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/pvarient.webp"
                width={40}
                height={40}
                alt="purple varient"
                className="max-w-10 object-contain"
              />
              <Input
                type="number"
                placeholder={t("num_of_purple_varients")}
                value={pvarient === 0 ? "" : pvarient}
                onChange={(e) => setPVarient(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/gold.webp"
                width={40}
                height={40}
                alt="gold"
                className="max-w-10 object-contain"
              />
              <Input
                type="number"
                placeholder={t("num_of_gold")}
                value={gold === 0 ? "" : gold}
                onChange={(e) => setGold(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/credits.webp"
                width={40}
                height={40}
                alt="credit"
                className="max-w-10 object-contain"
              />
              <Input
                type="number"
                placeholder={t("num_of_credits")}
                value={credit === 0 ? "" : credit}
                onChange={(e) => setCredit(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/tokens.webp"
                width={40}
                height={40}
                alt="token"
                className="max-w-10 object-contain"
              />
              <Input
                type="number"
                placeholder={t("num_of_tokens")}
                value={token === 0 ? "" : token}
                onChange={(e) => setToken(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/cachekey.webp"
                width={40}
                height={40}
                alt="cache key"
                className="max-w-10 object-scale-down"
              />
              <Input
                type="number"
                placeholder={t("num_of_cache_keys")}
                value={cacheKey === 0 ? "" : cacheKey}
                onChange={(e) => setCacheKey(Number(e.target.value))}
              />
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
