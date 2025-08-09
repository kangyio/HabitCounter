import { SearchCardButton } from "./SearchCardButton";
import { AddCardButton } from "./AddCardButton";
import { DebugButton } from "./DebugButton";

export function ButtonControl({
  cards,
  setCards,
  cardLayoutArray,
  setCardLayoutArray,
  searchTargetIds,
  setSearchTargetIds
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  cardLayoutArray: CardLayout[];
  setCardLayoutArray: React.Dispatch<React.SetStateAction<CardLayout[]>>;
  searchTargetIds: Set<number>;
  setSearchTargetIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  return (
    <div className="fixed top-4 right-4 grid columns-1 items-start gap-4 z-50">
      <AddCardButton
        cards={cards}
        setCards={setCards}
      />
      <SearchCardButton
        cards={cards}
        setCards={setCards}
        cardLayoutArray={cardLayoutArray}
        setCardLayoutArray={setCardLayoutArray}
        searchTargetIds={searchTargetIds}
        setSearchTargetIds={setSearchTargetIds}
      />
      <DebugButton
        cards={cards}
        setCards={setCards}
        cardLayoutArray={cardLayoutArray}
        setCardLayoutArray={setCardLayoutArray}
        searchTargetIds={searchTargetIds}
        setSearchTargetIds={setSearchTargetIds}
      />
    </div>
  );
}
