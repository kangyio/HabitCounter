import { useRef, useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ColorPicker";
import { electronAPI_clickAction } from "@/lib/utils";

export function CardDialogContent({
  dialogTrigger,
  dialogTitle,
  confirmButtonText,
  cards,
  setCards
}: {
  dialogTrigger: JSX.Element;
  dialogTitle: string;
  confirmButtonText: string;
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState("#F44E3B");

  const addCard = (cardInfo: CardInfo) => {
    if (!cardInfo.title) return;

    const newCards = [...cards, cardInfo];
    setCards(newCards);
    electronAPI_clickAction(newCards);
  };

  function getCardInfo() {
    return {
      createdAt: Date.now(),
      updatedAt: [],
      title: nameInputRef.current?.value || "",
      color: hex
    };
  }

  return (
    <Dialog>
      {dialogTrigger}
      <DialogContent
        className="max-w-[334px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter a title"
              ref={nameInputRef}
            />
          </div>
          <div className="grid gap-4">
            <Label
              htmlFor="color"
              className="p-3 rounded-xl"
              style={{ backgroundColor: hex }}
            >
              Color
            </Label>
            <ColorPicker
              hex={hex}
              setHex={setHex}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => addCard(getCardInfo())}>{confirmButtonText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
