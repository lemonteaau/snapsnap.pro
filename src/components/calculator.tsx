"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import goldImg from "../../public/image/gold.png";
import { Check, CircleDollarSign } from "lucide-react";
import { LuPlus, LuMinus, LuInfo } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Result } from "@/components/result";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

export function Calculator() {
  const { t } = useTranslation();
  useEffect(() => {
    const handleLanguageChange = () => {
      if (process.env.NODE_ENV === "development") {
        console.log("Language changed to:", i18n.language);
      }
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
  const [priceInCash, setPriceInCash] = useState(0);
  const [priceInGold, setPriceInGold] = useState(0);
  const [value, setValue] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [resultShow, setResultShow] = useState(false);
  const [mode, setMode] = useState("cash_mode");

  //Exchange rate for currency.
  const exchangeRates: { [key: string]: number } = {
    CNY: 6.8,
    AUD: 1.5,
    USD: 1,
  };

  const handleValueCalcu = function () {
    let priceInUSD: number;

    if (mode === "cash_mode") {
      priceInUSD = priceInCash / exchangeRates[currency];
    } else if (mode === "gold_mode") {
      priceInUSD = priceInGold / 100;
    } else {
      priceInUSD = 0;
    }
    // Calculate the value of the items based on gold.
    const gvarientValue = gvarient * 1200;
    const pvarientValue = pvarient * 700;
    const cacheKeyValue = cacheKey * 4000;
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
    setResultShow(true);
  };

  const resetValues = () => {
    setGVarient(0);
    setPVarient(0);
    setGold(0);
    setCredit(0);
    setToken(0);
    setCacheKey(0);
    setPriceInCash(0);
    setPriceInGold(0);
    setValue(0);
    setSuggestion("");
  };

  const currencyMap: { [key: string]: string } = {
    AUD: t("AUD"),
    CNY: t("CNY"),
    USD: t("USD"),
  };

  const itemInfo = [
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
      itemInfo: t("cache_key_info"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="mb-8 max-w-[380px] text-center lg:mb-0 lg:w-full lg:min-w-[900px] lg:px-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card>
        <CardHeader className="pb-2 pt-4 lg:py-7">
          <CardDescription className="lg:pb-2">
            {t("fill_form")}
          </CardDescription>
          <Tabs defaultValue="cash_mode">
            <TabsList>
              <TabsTrigger
                value="cash_mode"
                onClick={() => {
                  setMode("cash_mode");
                  resetValues();
                }}
              >
                {t("cash_mode")}
              </TabsTrigger>
              <TabsTrigger
                value="gold_mode"
                onClick={() => {
                  setMode("gold_mode");
                  resetValues();
                }}
              >
                {t("gold_mode")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Separator />
            <motion.div
              className="mb-3 grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-8"
              variants={containerVariants}
            >
              {itemInfo.map(
                (
                  { src, alt, value, setter, step = 1, itemInfo = null },
                  index,
                ) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col items-center justify-center gap-4"
                    variants={itemVariants}
                  >
                    {alt === "cache key" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="link"
                            className="b-0 absolute right-3 top-10 m-0 h-5 w-5 rounded-full p-0 lg:right-7"
                          >
                            <LuInfo className="b-0 m-0 h-8 w-8 p-0" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                          <div className="p-1 text-sm">{itemInfo}</div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      ""
                    )}
                    <Image src={src} width={60} height={60} alt={alt} />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setter(Math.max(value - step, 0))}
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
                        onChange={(e) =>
                          setter(Math.max(Number(e.target.value), 0))
                        }
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
                  </motion.div>
                ),
              )}
            </motion.div>
            <Separator />
            <div className="flex items-center justify-center gap-4">
              {mode === "cash_mode" && (
                <>
                  <CircleDollarSign className="h-8 w-8" />
                  <Input
                    type="number"
                    placeholder={t("price")}
                    value={priceInCash === 0 ? "" : priceInCash}
                    className="max-w-[120px] text-center"
                    onChange={(e) => setPriceInCash(Number(e.target.value))}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="max-w-[60px]">
                        {currencyMap[currency]}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-md p-2 shadow-md">
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
                </>
              )}
              {mode === "gold_mode" && (
                <>
                  <Image src={goldImg} alt="gold" className="h-10 w-10" />
                  <Input
                    type="number"
                    placeholder={t("price")}
                    value={priceInGold === 0 ? "" : priceInGold}
                    className="max-w-[120px] text-center"
                    onChange={(e) => setPriceInGold(Number(e.target.value))}
                  />
                </>
              )}
            </div>
          </div>
          {/* Props drilling, I know it's not elegant but please don't mind it */}
          <div className="hidden">
            <Result
              open={resultShow}
              setOpen={setResultShow}
              value={value}
              suggestion={suggestion}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 lg:flex-row">
          <Button
            className="w-full"
            onClick={handleValueCalcu}
            disabled={!priceInCash && !priceInGold}
          >
            <Check className="mr-2 h-4 w-4" />
            {t("value_it")}
          </Button>
          <Button
            className="w-full"
            variant={!priceInCash && !priceInGold ? "secondary" : "destructive"}
            onClick={resetValues}
            disabled={!priceInCash && !priceInGold}
          >
            <GrPowerReset className="mr-2 h-4 w-4" />
            {t("reset")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
