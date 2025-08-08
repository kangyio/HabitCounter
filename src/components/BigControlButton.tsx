import { cloneElement } from "react";
import { electronAPI_clickAction } from "@/lib/utils";
import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";

export function BigControlButton({ type, cards, setCards, icon }: BigControlButtonProps) {
  const iconWithProps = cloneElement(icon, {
    color: "#0c0a09",
    size: 40
  });

  const dialogTrigger = (
    <DialogTrigger asChild>
      <button
        className={`
          bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95`}
      >
        {iconWithProps}
      </button>
    </DialogTrigger>
  );

  function addCard(cardInfo: CardInfo) {
    if (!cardInfo.title) return;

    const newCards = [...cards, cardInfo];
    setCards(newCards);
    electronAPI_clickAction(newCards);
  }

  function searchCard() {
    console.log("searchCard");
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
