"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Calculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Let's do it</CardTitle>
        <CardDescription>Select to value the bundle.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="items-top flex space-x-2">
            <Checkbox id="varient" />
            <div className="grid gap-1.5 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                It contains varient.
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="golds" />
            <div className="grid gap-1.5 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                It contains golds.
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="credits" />
            <div className="grid gap-1.5 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                It contains credits.
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Value it!
        </Button>
      </CardFooter>
    </Card>
  );
}
