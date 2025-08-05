import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
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

export function BaseCard({
  cards,
  setCards,
  currentCardInfo
}: {
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  currentCardInfo: CardInfo;
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
        <CountContext.Provider value={{ countNumber, setCountNumber, updatedAt }}>
          <Card
            className="w-[276px]"
            style={{ backgroundColor: color }}
          >
            <CardContent>
              <section className="flex justify-center text-center">
                <ProcessCountButton
                  text="-"
                  cards={cards}
                />
                <div className="flex-1/2 font-bold">
                  <p className="text-nowrap">{displayTitle()}</p>
                  <p className="text-3xl">{updatedAt.length}</p>
                  <p className="text-nowrap">
                    {displayTimePast(updatedAt.at(-1) || createdAt, updatedAt.length)}
                  </p>
                </div>
                <ProcessCountButton
                  text="+"
                  cards={cards}
                />
              </section>
            </CardContent>
          </Card>
        </CountContext.Provider>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <DialogTrigger asChild>
          <ContextMenuItem>Edit</ContextMenuItem>
        </DialogTrigger>
        <ContextMenuItem onClick={() => deleteCard()}>Delete</ContextMenuItem>
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

  function editCard(inputValue: string | undefined) {
    const targetCard = cards.find(cardInfo => cardInfo.createdAt === createdAt);
    if (!targetCard) return;
    if (!inputValue) return;
    setCards(
      cards.map(cardInfo =>
        cardInfo.createdAt === createdAt ? { ...cardInfo, title: inputValue } : cardInfo
      )
    );
    electronAPI_clickAction(cards);
  }

  return (
    <CardDialogContent
      dialogTrigger={dialogTrigger}
      dialogTitle="Edit"
      originalCardTitle={title}
      confirmButtonText="Save changes"
      confirmButtonFunction={editCard}
    />
  );
}
