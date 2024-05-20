"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
        (totalValueGold / totalPriceGold) * 100
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
    <Card>
      <CardHeader>
        <CardTitle>Let&apos;s do it</CardTitle>
        <CardDescription>Choose detail of the bundle.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <Input
            type="number"
            placeholder="Num of Golden Varients"
            onChange={(e) => setGVarient(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Num of Purple Varients"
            onChange={(e) => setPVarient(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Num of Gold"
            onChange={(e) => setGold(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Num of Credits"
            onChange={(e) => setCredit(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Num of Collector's tokens"
            onChange={(e) => setToken(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Price in USD"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
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
  );
}
