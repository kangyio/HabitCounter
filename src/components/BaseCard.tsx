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

export function BaseCard({
  cards,
  setCards,
  ...otherProps
}: CardInfo & { cards: CardInfo[]; setCards: React.Dispatch<React.SetStateAction<CardInfo[]>> }) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0);

  const { createdAt, updatedAt, title, color } = otherProps;

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

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

  function editCardTitle() {
    const targetCard = cards.find(cardInfo => cardInfo.createdAt === createdAt);
    if (!targetCard) return;
    setCards(
      cards.map(cardInfo =>
        cardInfo.createdAt === createdAt ? { ...cardInfo, title: targetCard.title } : cardInfo
      )
    );
    electronAPI_clickAction(cards);
  }

  return (
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
                  <p>{displayTimePast(updatedAt.at(-1) || createdAt, updatedAt.length)}</p>
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
        <ContextMenuItem onClick={() => editCardTitle()}>Edit Title</ContextMenuItem>
        <ContextMenuItem onClick={() => deleteCard()}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
