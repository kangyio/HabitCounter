import { SearchCardButton } from "./SearchCardButton";
import { AddCardButton } from "./AddCardButton";
import { BackToTopButton } from "./BackToTopButton";
import { QuitAppButton } from "./QuitAppButton";
// import { DebugButton } from "./DebugButton";

export function ButtonControl({
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
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50 ">
      <AddCardButton
        cards={cards}
        setCards={setCards}
        searchTarget={searchTarget}
      />
      <SearchCardButton
        cards={cards}
        setCards={setCards}
        cardLayoutArray={cardLayoutArray}
        setCardLayoutArray={setCardLayoutArray}
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
      />
      <QuitAppButton />
      <BackToTopButton />
      {/* <DebugButton
        cards={cards}
        setCards={setCards}
        cardLayoutArray={cardLayoutArray}
        setCardLayoutArray={setCardLayoutArray}
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
      /> */}
    </div>
  );
}
