import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon, SearchXIcon } from "lucide-react";
import { useRef } from "react";

export function SearchCardButton({
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
  // Store original state before search
  const originalCardsRef = useRef<CardInfo[]>([]);
  const originalLayoutRef = useRef<CardLayout[]>([]);

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
    // Store original state before filtering
    originalCardsRef.current = [...cards];
    originalLayoutRef.current = [...cardLayoutArray];

    const targetCards = cards.filter(card =>
      sanitizeTitle(card.title).includes(sanitizeTitle(cardInfo.title))
    );

    // Filter the layout to only include layouts for the target cards
    const targetCardIds = new Set(targetCards.map(card => card.createdAt.toString()));
    const filteredLayout = cardLayoutArray.filter(layout => targetCardIds.has(layout.i));

    targetCards.forEach(cardInfo => handleToggleSearchTarget(cardInfo));
    setCards(targetCards);
    setCardLayoutArray(filteredLayout);

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

  function clearSearch() {
    // Restore original state
    setCards(originalCardsRef.current);
    setCardLayoutArray(originalLayoutRef.current);
    setSearchTargetIds(new Set());
  }

  return searchTargetIds.size === 0 ? (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Search Counter"
      originalCardInfo={undefined}
      confirmButtonText="Search"
      confirmButtonFunction={searchCard}
    />
  ) : (
    <button
      className="bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95 z-50"
      onClick={clearSearch}
    >
      <SearchXIcon
        color={"#0c0a09"}
        size={40}
      />
    </button>
  );
}
