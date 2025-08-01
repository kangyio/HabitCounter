import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTimePast } from "@/lib/utils";

export function BaseCard({ createdAt, updatedAt, title, color }: CardInfo) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
      //!! Change back to 60000 after testing
    }, 1000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <CountContext.Provider value={{ countNumber, setCountNumber, updatedAt }}>
      <Card
        className="w-full max-w-2xs"
        style={{ backgroundColor: color }}
      >
        <CardContent>
          <section className="flex justify-center text-center">
            <ProcessCountButton text="-" />
            <div className="flex-1/2 font-bold">
              <p>{title}</p>
              <p className="text-3xl">{countNumber}</p>
              <p>{displayTimePast(updatedAt.at(-1) || createdAt, countNumber)}</p>
            </div>
            <ProcessCountButton text="+" />
          </section>
        </CardContent>
      </Card>
    </CountContext.Provider>
  );
}
