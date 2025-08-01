import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTimePast } from "@/lib/utils";

export function BaseCard({ createdAt, title, color }: CardInfo) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0); // dummy state to trigger re-render

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1); // update state every minute
    }, 1000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <CountContext.Provider value={{ countNumber, setCountNumber }}>
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
              <p>{displayTimePast(createdAt)}</p>
            </div>
            <ProcessCountButton text="+" />
          </section>
        </CardContent>
      </Card>
    </CountContext.Provider>
  );
}
