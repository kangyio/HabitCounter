import { electronAPI_clickAction } from "@/lib/utils";
import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";
import { FilePlusIcon } from "lucide-react";

export function AddCardButton({
  cards,
  setCards,
  searchTarget
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  searchTarget: SearchTarget;
}) {
  const dialogTrigger = (
    <DialogTrigger asChild>
      {!searchTarget.isSearching && (
        <button className="bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95">
          <FilePlusIcon
            color={"#0c0a09"}
            size={40}
          />
        </button>
      )}
    </DialogTrigger>
  );

  function addCard(cardInfo: CardInfo) {
    if (!cardInfo.title) return;

    const newCards = [...cards, cardInfo];
    setCards(newCards);
    electronAPI_clickAction(newCards);
  }

  return (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Add Counter"
      originalCardInfo={undefined}
      confirmButtonText="Add"
      confirmButtonFunction={addCard}
    />
  );
}
