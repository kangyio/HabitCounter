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
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);

  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      cards={cards}
      setCards={setCards}
      currentCardInfo={cardInfo}
      setCurrentCardInfo={setCurrentCardInfo}
    />
  ));

  return (
    <div className="flex flex-col gap-1">
      {renderedBaseCards}
      <BaseCardBarChart currentCardInfo={currentCardInfo} />
    </div>
  );
}
