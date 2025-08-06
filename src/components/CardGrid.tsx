import { useState } from "react";
import { BaseCard } from "@/components/BaseCard.tsx";
import { BaseCardBarChart } from "@/components/BaseCardBarChart";

export function CardGrid({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      cards={cards}
      setCards={setCards}
      currentCardInfo={cardInfo}
      setBarChartData={setBarChartData}
    />
  ));

  return (
    <div className="flex flex-col gap-1">
      {renderedBaseCards}
      <BaseCardBarChart barChartData={barChartData} />
    </div>
  );
}
