import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { ProcessCountButton } from "./ProcessCountButton";
import { CountContext } from "./CountContext";
import { displayTimePast, electronAPI_clickAction } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BaseCard({
  cards,
  setCards,
  ...otherProps
}: CardInfo & { cards: CardInfo[]; setCards: React.Dispatch<React.SetStateAction<CardInfo[]>> }) {
  const [countNumber, setCountNumber] = useState(0);
  const [, setTick] = useState(0);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

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

  function editCardTitle(inputValue: string | undefined) {
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
    <Dialog>
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
            <ContextMenuItem>Edit Title</ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem onClick={() => deleteCard()}>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Edit Title</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              ref={editTitleInputRef}
              defaultValue={title}
              placeholder="Enter a title"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => editCardTitle(editTitleInputRef.current?.value)}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
