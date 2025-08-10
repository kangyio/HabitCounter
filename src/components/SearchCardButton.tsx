import { CardDialogContent } from "./CardDialogContent";
import { DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon, SearchXIcon } from "lucide-react";
import { useRef } from "react";

export function SearchCardButton({
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
  // Store original state before search
  const originalCardsRef = useRef<CardInfo[]>([]);
  const originalLayoutRef = useRef<CardLayout[]>([]);

  const dialogTrigger = (
    <DialogTrigger asChild>
      <button className="bg-slate-100 p-2 rounded-xl cursor-pointer transition-transform duration-200 active:scale-95">
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
      setSearchTarget(prev => {
        const newSet = new Set(prev.idSet);
        if (newSet.has(cardInfo.createdAt)) {
          newSet.delete(cardInfo.createdAt);
        } else {
          newSet.add(cardInfo.createdAt);
        }
        return { idSet: newSet, isSearching: true };
      });
    }
  }

  function clearSearch() {
    // Set searching flag before restoring
    setSearchTarget({ ...searchTarget, isSearching: true });

    // Restore original state
    setCards(originalCardsRef.current);
    setCardLayoutArray(originalLayoutRef.current);
    setSearchTarget({ ...searchTarget, idSet: new Set() });
  }

  return searchTarget.idSet.size === 0 ? (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Search Counter"
      originalCardInfo={undefined}
      confirmButtonText="Search"
      confirmButtonFunction={searchCard}
    />
  ) : (
    <button
      className="bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95"
      onClick={clearSearch}
    >
      <SearchXIcon
        color={"#0c0a09"}
        size={40}
      />
    </button>
  );
}
