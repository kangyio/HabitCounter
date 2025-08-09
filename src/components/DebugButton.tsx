import { BugIcon } from "lucide-react";
import { getCardInfoArrayFromDB } from "@/lib/utils";

export function DebugButton({
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
  function handleClick() {
    console.log("cardLayoutArray: ", cardLayoutArray);
    setCardLayoutArray(cardLayoutArray);
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
