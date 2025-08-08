import { SearchCardButton } from "./SearchCardButton";
import { AddCardButton } from "./AddCardButton";
// import { BigControlButton } from "./BigControlButton";
// import { FilePlusIcon, SearchIcon } from "lucide-react";

export function ButtonControl({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  return (
    <div className="fixed top-4 right-4 grid columns-1 items-start gap-4 z-50">
      <AddCardButton
        cards={cards}
        setCards={setCards}
      />
      <SearchCardButton cards={cards} />
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
