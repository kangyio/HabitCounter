import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTimePast } from "@/lib/utils";

export function BaseCard({ cards, ...otherProps }: CardInfo & { cards: CardInfo[] }) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0);

  const { createdAt, updatedAt, title, color } = otherProps;

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  function displayTitle() {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    }
    return title;
  }

  return (
    <CountContext.Provider value={{ countNumber, setCountNumber, updatedAt }}>
      <Card
        className="w-[276px]"
        style={{ backgroundColor: color }}
      >
        <CardContent>
          <section className="flex justify-center text-center">
            <ProcessCountButton
              text="-"
              cards={cards}
            />
            <div className="flex-1/2 font-bold">
              <p className="text-nowrap">{displayTitle()}</p>
              <p className="text-3xl">{updatedAt.length}</p>
              <p>{displayTimePast(updatedAt.at(-1) || createdAt, updatedAt.length)}</p>
            </div>
            <ProcessCountButton
              text="+"
              cards={cards}
            />
          </section>
        </CardContent>
      </Card>
    </CountContext.Provider>
  );
}
