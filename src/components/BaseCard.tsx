import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTimePast, electronAPI_clickAction } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { DialogTrigger } from "@/components/ui/dialog";
import { CardDialogContent } from "./CardDialogContent";
import { TimerIcon, MoveIcon } from "lucide-react";

export function BaseCard({
  cards,
  setCards,
  currentCardInfo,
  setCurrentCardInfo,
  searchTarget,
  setIsDrawerOpen
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  currentCardInfo: CardInfo;
  setCurrentCardInfo: React.Dispatch<React.SetStateAction<CardInfo | undefined>>;
  searchTarget: SearchTarget;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0);

  const { createdAt, updatedAt, title, color } = currentCardInfo;

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  const dialogTrigger = (
    <ContextMenu>
      <ContextMenuTrigger>
        <CountContext.Provider
          value={{ countNumber, setCountNumber, currentCardInfo, setCurrentCardInfo }}
        >
          <Card
            className="w-[276px] cursor-pointer"
            style={{ backgroundColor: color }}
            onMouseDown={handleCardMouseDown}
          >
            <CardContent>
              <section className="flex justify-center text-center gap-1">
                <ProcessCountButton
                  text="-"
                  cards={cards}
                />
                <div className="flex-1/2 font-bold">
                  <div className="text-nowrap">{displayTitle()}</div>
                  <div className="text-3xl">{updatedAt.length}</div>
                  <div className="text-nowrap flex place-content-center items-center gap-0.5">
                    <TimerIcon size={18} />
                    {displayTimePast(updatedAt.at(-1) || createdAt, updatedAt.length)}
                  </div>
                </div>
                <ProcessCountButton
                  text="+"
                  cards={cards}
                />
                <div className="fixed">
                  {!searchTarget.isSearching && (
                    <MoveIcon
                      className="move_icon absolute cursor-move right-28 top-[-18px]"
                      size={20}
                    />
                  )}
                </div>
              </section>
            </CardContent>
          </Card>
        </CountContext.Provider>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <DialogTrigger asChild>
          <ContextMenuItem>Edit</ContextMenuItem>
        </DialogTrigger>
        <ContextMenuItem
          variant="destructive"
          onClick={() => deleteCard()}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  function displayTitle() {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    }
    return title;
  }

  function deleteCard() {
    const cardsAfterDelete = cards.filter(cardInfo => cardInfo.createdAt !== createdAt);

    setCards(cardsAfterDelete);
    electronAPI_clickAction(cardsAfterDelete);
  }

  function editCard(inputValue: string | undefined, inputHex: string) {
    const targetCardIndex = cards.findIndex(cardInfo => cardInfo.createdAt === createdAt);

    if (targetCardIndex === -1) return;
    if (!inputValue) return;

    const newCards = cards.map(cardInfo =>
      cardInfo.createdAt === createdAt
        ? { ...cardInfo, title: inputValue, color: inputHex }
        : cardInfo
    );

    setCards(newCards);
    setCurrentCardInfo(newCards[targetCardIndex]);
    electronAPI_clickAction(newCards);
  }

  function handleCardMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (e.target instanceof HTMLButtonElement) return;
    e.preventDefault();
    let isHoldingMouse = false;

    e.target.addEventListener("mousemove", handleCardMouseMove);
    e.target.addEventListener("mouseup", handleCardMouseUp);
    e.target.addEventListener("mouseleave", clearEventListenersAndTimer);

    const timer = setTimeout(() => {
      isHoldingMouse = true;
    }, 500);

    function handleCardMouseUp() {
      clearEventListenersAndTimer();

      if (!isHoldingMouse) {
        setCurrentCardInfo(currentCardInfo);
        setIsDrawerOpen(true);
      }
    }

    function handleCardMouseMove() {
      isHoldingMouse = true;
    }

    function clearEventListenersAndTimer() {
      e.target.removeEventListener("mouseup", handleCardMouseUp);
      e.target.removeEventListener("mouseleave", handleCardMouseUp);
      e.target.removeEventListener("mousemove", handleCardMouseMove);
      clearTimeout(timer);
    }
  }

  return (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Edit"
      originalCardInfo={currentCardInfo}
      confirmButtonText="Save changes"
      confirmButtonFunction={editCard}
    />
  );
}
