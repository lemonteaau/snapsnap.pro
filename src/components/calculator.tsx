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
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  const calculateValue = () => {
    const gvarientValue = gvarient * 1200;
    const pvarientValue = pvarient * 700;
    const totalGold = gold + (credit / 5) * 4 + (token / 3) * 4;
    const totalValueGold = gvarientValue + pvarientValue + totalGold;
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

  return (
    <div className="mb-16 grid text-center lg:mb-0 lg:w-full lg:max-w-full lg:px-32">
      <Card>
        <CardHeader>
          <CardDescription>Fill the form to calculate.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/gvarient.webp"
                width={40}
                height={40}
                alt="golden varient"
                className="object-contain"
              />
              <Input
                type="number"
                placeholder="Num of Golden Varients"
                onChange={(e) => setGVarient(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/pvarient.webp"
                width={40}
                height={40}
                alt="purple varient"
                className="object-contain"
              />
              <Input
                type="number"
                placeholder="Num of Purple Varients"
                onChange={(e) => setPVarient(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/gold.webp"
                width={40}
                height={40}
                alt="gold"
                className="object-contain"
              />
              <Input
                type="number"
                placeholder="Num of Gold"
                onChange={(e) => setGold(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/credits.webp"
                width={40}
                height={40}
                alt="credit"
                className="object-contain"
              />
              <Input
                type="number"
                placeholder="Num of Credits"
                onChange={(e) => setCredit(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/image/tokens.webp"
                width={40}
                height={40}
                alt="token"
                className="object-contain"
              />
              <Input
                type="number"
                placeholder="Num of Collector's tokens"
                onChange={(e) => setToken(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <CircleDollarSign size={40} className="object-contain" />
              <Input
                type="number"
                placeholder="Price in USD"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
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
      </Card>
    </div>
  );
}
