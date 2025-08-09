import { useState } from "react";
import GridLayout from "react-grid-layout";

import { BaseCard } from "@/components/BaseCard.tsx";
import { BottomDrawer } from "@/components/BottomDrawer";
import { electronAPI_dragAction } from "@/lib/utils";

export function CardGrid({
  cards,
  setCards,
  cardLayoutArray,
  setCardLayoutArray,
  searchTargetIds
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  cardLayoutArray: CardLayout[];
  setCardLayoutArray: React.Dispatch<React.SetStateAction<CardLayout[]>>;
  searchTargetIds: Set<number>;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentCardInfo, setCurrentCardInfo] = useState<CardInfo | undefined>(undefined);

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

  function handleLayoutChange(cardLayoutArray: CardLayout[]) {
    console.log("handleLayoutChange-searchTargetIds.size: ", searchTargetIds.size);
    if (searchTargetIds.size) return;
    console.log("write to DB");
    setCardLayoutArray(cardLayoutArray);
    electronAPI_dragAction(cardLayoutArray);
  }

  return (
    <section className="">
      <GridLayout
        className="layout"
        layout={cardLayoutArray}
        onLayoutChange={handleLayoutChange}
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
