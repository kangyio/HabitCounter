import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";

export function AddCardButton({
  cards,
  setCards
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const dialogTrigger = (
    <DialogTrigger asChild>
      <button className="bg-slate-100 p-3 rounded-xl text-2xl fixed top-4 right-4 cursor-pointer transition-transform duration-200 active:scale-95">
        ➕
      </button>
    </DialogTrigger>
  );

  return (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Add Counter"
      confirmButtonText="Add"
      cards={cards}
      setCards={setCards}
    />
  );
}
