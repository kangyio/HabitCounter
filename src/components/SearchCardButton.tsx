import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";
import { getCardInfoArrayFromDB } from "@/lib/utils";
import { SearchIcon, SearchXIcon } from "lucide-react";

export function SearchCardButton({
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
    setSearchTargetIds(new Set());

    const targetCards = cards.filter(card =>
      sanitizeTitle(card.title).includes(sanitizeTitle(cardInfo.title))
    );

    targetCards.forEach(cardInfo => handleToggleSearchTarget(cardInfo));
    setCards(targetCards);

    function sanitizeTitle(title: string) {
      return title.toLowerCase().replaceAll(" ", "");
    }

    function handleToggleSearchTarget(cardInfo: CardInfo) {
      setSearchTargetIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cardInfo.createdAt)) {
          newSet.delete(cardInfo.createdAt);
        } else {
          newSet.add(cardInfo.createdAt);
        }
        return newSet;
      });
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
