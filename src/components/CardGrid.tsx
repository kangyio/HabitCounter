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
  searchTarget,
  setSearchTarget
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  cardLayoutArray: CardLayout[];
  setCardLayoutArray: React.Dispatch<React.SetStateAction<CardLayout[]>>;
  searchTarget: SearchTarget;
  setSearchTarget: React.Dispatch<React.SetStateAction<SearchTarget>>;
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
          searchTarget={searchTarget}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    );
  });

  function handleLayoutChange(cardLayoutArray: CardLayout[]) {
    if (searchTarget.idSet.size) return;
    if (searchTarget.isSearching) {
      setSearchTarget({ ...searchTarget, isSearching: false });
      return;
    }

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
