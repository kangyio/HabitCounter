import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";

import { BaseCard } from "@/components/BaseCard.tsx";
import { BottomDrawer } from "@/components/BottomDrawer";
import {
  electronAPI_dragAction,
  getCardInfoArrayFromDB,
  getCardLayoutArrayFromDB
} from "@/lib/utils";

export function CardGrid({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cardLayoutArray, setCardLayoutArray] = useState<CardLayout[]>([]);

  useEffect(() => {
    getCardInfoArrayFromDB(setCards);
    getCardLayoutArrayFromDB(setCardLayoutArray);
  }, []);

  const renderedBaseCards = cards.map(cardInfo => {
    return (
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
  });

  return (
    <section className="">
      <GridLayout
        className="layout"
        layout={cardLayoutArray}
        onLayoutChange={newLayout => electronAPI_dragAction(newLayout)}
        cols={3}
        width={900}
        rowHeight={134}
        isResizable={false}
        draggableHandle=".move_icon"
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
