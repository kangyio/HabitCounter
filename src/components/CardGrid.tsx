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
  setCards,
  searchTargetIds
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  searchTargetIds: Set<number>;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cardLayoutArray, setCardLayoutArray] = useState<CardLayout[]>([]);
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);

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
          searchTargetIds={searchTargetIds}
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
        onLayoutChange={electronAPI_dragAction}
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
