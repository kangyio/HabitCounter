import { BaseCard } from "@/components/BaseCard.tsx";

export function CardGrid({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      cards={cards}
      setCards={setCards}
      currentCardInfo={cardInfo}
    />
  ));

  return <div className="flex flex-col gap-1">{renderedBaseCards}</div>;
}
