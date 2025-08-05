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

export function CardDialogContent({
  dialogTrigger,
  dialogTitle,
  originalCardTitle,
  confirmButtonText,
  confirmButtonFunction
}: {
  dialogTrigger: JSX.Element;
  dialogTitle: DialogTitle;
  originalCardTitle: string;
  confirmButtonText: string;
  confirmButtonFunction: DialogConfirmButtonFunction;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState("#F44E3B");

  function getCardInfo(): CardInfo {
    return {
      createdAt: Date.now(),
      updatedAt: [],
      title: nameInputRef.current?.value || "",
      color: hex
    };
  }

  function handleConfirmButtonClick() {
    if (dialogTitle === "Add Counter") {
      return (confirmButtonFunction as (cardInfo: CardInfo) => void)(getCardInfo());
    } else if (dialogTitle === "Edit") {
      return (confirmButtonFunction as (inputValue: string | undefined) => void)(
        nameInputRef.current?.value
      );
    }
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
              defaultValue={originalCardTitle}
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
            <Button
              name="cancel"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              name="confirm"
              onClick={handleConfirmButtonClick}
            >
              {confirmButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
