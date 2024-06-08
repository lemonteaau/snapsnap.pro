"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, CircleDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function Calculator() {
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
        setSuggestion("STFU and buy it!");
      } else if (valuePercentage >= 240) {
        setSuggestion("Buy it!");
      } else if (valuePercentage >= 200) {
        setSuggestion("Good deal");
      } else if (valuePercentage >= 160) {
        setSuggestion("Normal deal");
      } else {
        setSuggestion("Bad deal");
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
    <div className="mb-16 grid text-center lg:mb-0 lg:w-full lg:max-w-full lg:px-32">
      <Card>
        <CardHeader>
          <CardDescription>Fill the form to calculate.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/gvarient.webp" width={40} height={40} alt="golden varient" className="object-contain" />
              <Input type="number" placeholder="Num of Golden Varients" value={gvarient === 0 ? '' : gvarient} onChange={(e) => setGVarient(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/pvarient.webp" width={40} height={40} alt="purple varient" className="object-contain" />
              <Input type="number" placeholder="Num of Purple Varients" value={pvarient  === 0 ? '' : pvarient} onChange={(e) => setPVarient(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/gold.webp" width={40} height={40} alt="gold" className="object-contain" />
              <Input type="number" placeholder="Num of Gold" value={gold  === 0 ? '' : gold} onChange={(e) => setGold(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/credits.webp" width={40} height={40} alt="credit" className="object-contain" />
              <Input type="number" placeholder="Num of Credits" value={credit  === 0 ? '' : credit}  onChange={(e) => setCredit(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/tokens.webp" width={40} height={40} alt="token" className="object-contain" />
              <Input type="number" placeholder="Num of Collector's Tokens" value={token  === 0 ? '' : token} onChange={(e) => setToken(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image src="/image/cachekey.webp" width={40} height={40} alt="cache key" className="object-contain" />
              <Input type="number" placeholder="Num of Cache Keys" value={cacheKey  === 0 ? '' : cacheKey} onChange={(e) => setCacheKey(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-center gap-4">
              <CircleDollarSign size={40} className="object-contain" />
              <Input type="number" placeholder="Price in USD" value={price === 0 ? '' : price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
          </div>
          {value !== null && (
            <div className="mt-5 text-lg font-bold">
              Value: {value}% {suggestion}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={calculateValue} disabled={!price}>
            <Check className="mr-2 h-4 w-4" /> Value it!
          </Button>
        </CardFooter>
        <CardFooter>
          <Button className="w-full" onClick={resetValues} disabled={!price}>Reset</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
