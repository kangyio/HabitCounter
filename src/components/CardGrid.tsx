import { useState, type JSX } from "react";
import { BaseCard } from "@/components/BaseCard.tsx";
import { BottomDrawer } from "@/components/BottomDrawer";
import GridLayout from "react-grid-layout";

export function CardGrid({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { cardsLayoutArray, renderedBaseCards } = generateLayoutAndCards();

  function generateLayoutAndCards() {
    const cardsLayoutArray: CardLayout[] = [];
    const renderedBaseCards: JSX.Element[] = [];

    for (let i = 0; i < cards.length; i++) {
      const cardInfo = cards[i];

      // Build layout
      cardsLayoutArray.push({
        i: String(cardInfo.createdAt),
        x: 0,
        y: i,
        w: 1,
        h: 1
      });

      // Build rendered card
      renderedBaseCards.push(
        <div key={cardInfo.createdAt}>
          <BaseCard
            key={cardInfo.createdAt}
            cards={cards}
            setCards={setCards}
            currentCardInfo={cardInfo}
            setCurrentCardInfo={setCurrentCardInfo}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
      );
    }

    return { cardsLayoutArray, renderedBaseCards };
  }

  return (
    <section className="">
      <GridLayout
        className="layout"
        layout={cardsLayoutArray}
        cols={3}
        rowHeight={134}
        width={860}
        isResizable={false}
        draggableCancel=".process_count_button"
      >
        {renderedBaseCards}
      </GridLayout>
      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        currentCardInfo={currentCardInfo}
      />
    </section>
  );
}
