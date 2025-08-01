import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTime } from "@/lib/utils";

export function BaseCard({ createdAt, title }: CardInfo) {
  const [countNumber, setCountNumber] = useState(0);

  return (
    <CountContext.Provider value={{ countNumber, setCountNumber }}>
      <Card className="w-full max-w-2xs bg-cyan-800 text-slate-50">
        <CardContent className="flex flex-col justify-center">
          <section className="flex justify-center text-center">
            <ProcessCountButton text="-" />
            <div className="px-4 py-1 flex-1/2">
              <p>{title}</p>
              <p className="text-3xl">{countNumber}</p>
              <p>{displayTime(createdAt)}</p>
            </div>
            <ProcessCountButton text="+" />
          </section>
        </CardContent>
      </Card>
    </CountContext.Provider>
  );
}
