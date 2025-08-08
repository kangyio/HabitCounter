import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";

export function SearchCardButton({ cards }: { cards: CardInfo[] }) {
  const dialogTrigger = (
    <DialogTrigger asChild>
      <button className="bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95 z-50">
        <SearchIcon
          color={"#0c0a09"}
          size={40}
        />
      </button>
    </DialogTrigger>
  );

  function searchCard(cardInfo: CardInfo) {
    const targetCards = cards.filter(card =>
      sanitizeTitle(card.title).includes(sanitizeTitle(cardInfo.title))
    );
    console.log("targetCard: ", targetCards);

    function sanitizeTitle(title: string) {
      return title.toLowerCase().replaceAll(" ", "");
    }
  }

  return (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Search Counter"
      originalCardInfo={undefined}
      confirmButtonText="Search"
      confirmButtonFunction={searchCard}
    />
  );
}
