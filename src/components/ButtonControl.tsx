import { SearchCardButton } from "./SearchCardButton";
import { AddCardButton } from "./AddCardButton";
// import { BigControlButton } from "./BigControlButton";
// import { FilePlusIcon, SearchIcon } from "lucide-react";

export function ButtonControl({
  cards,
  setCards,
  searchTargetIds,
  setSearchTargetIds
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
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
        searchTargetIds={searchTargetIds}
        setSearchTargetIds={setSearchTargetIds}
      />
      {/* <BigControlButton
        type="add"
        cards={cards}
        setCards={setCards}
        icon={<FilePlusIcon />}
      />
      <BigControlButton
        type="search"
        cards={cards}
        setCards={setCards}
        icon={<SearchIcon />}
      /> */}
    </div>
  );
}
