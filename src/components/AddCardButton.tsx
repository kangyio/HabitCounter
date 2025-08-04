import { useRef, useState } from "react";
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
import { ColorPicker } from "@/components/ColorPicker";

export function AddCardButton({ onAddCard }: { onAddCard: (cardInfo: CardInfo) => void }) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState("#F44E3B");

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
      <DialogTrigger asChild>
        <button className="bg-slate-100 p-3 rounded-xl text-2xl fixed top-4 right-4 cursor-pointer transition-transform duration-200 active:scale-95">
          ➕
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[334px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Add Counter</DialogTitle>
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
            <Button onClick={() => onAddCard(getCardInfo())}>Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
