import { BugIcon } from "lucide-react";

export function DebugButton({
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
  function handleClick() {
    console.log("cardLayoutArray: ", cardLayoutArray);
  }

  return (
    <button className="bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95 z-50">
      <BugIcon
        color={"#0c0a09"}
        size={40}
        onClick={handleClick}
      />
    </button>
  );
}
