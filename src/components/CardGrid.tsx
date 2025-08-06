import { useState } from "react";
import { BaseCard } from "@/components/BaseCard.tsx";
import { BottomDrawer } from "@/components/BottomDrawer";

export function CardGrid({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      cards={cards}
      setCards={setCards}
      currentCardInfo={cardInfo}
      setCurrentCardInfo={setCurrentCardInfo}
      setIsDrawerOpen={setIsDrawerOpen}
    />
  ));

  return (
    <div className="flex flex-col gap-1">
      {renderedBaseCards}
      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        currentCardInfo={currentCardInfo}
      />
    </div>
  );
}
