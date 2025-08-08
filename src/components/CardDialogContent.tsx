import { useRef, useState, useEffect, type JSX } from "react";
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
import { AlertForNoTitle } from "@/components/AlertForNoTitle";

export function CardDialogContent({
  dialogTrigger,
  dialogTitle,
  originalCardInfo,
  confirmButtonText,
  confirmButtonFunction
}: {
  dialogTrigger: JSX.Element;
  dialogTitle: DialogTitle;
  originalCardInfo: CardInfo | undefined;
  confirmButtonText: string;
  confirmButtonFunction: DialogConfirmButtonFunction;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState("#8BC34A");
  const [isTitleValid, setIsTitleValid] = useState(true);

  useEffect(() => {
    if (originalCardInfo) setHex(originalCardInfo.color);
    else setHex("#8BC34A");
  }, [originalCardInfo]);

  function getCardInfo(): CardInfo {
    return {
      createdAt: Date.now(),
      updatedAt: [],
      title: nameInputRef.current?.value || "",
      color: hex
    };
  }

  function handleConfirmButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!nameInputRef.current?.value) {
      e.preventDefault();
      setIsTitleValid(false);
      return;
    }

    setIsTitleValid(true);
    if (dialogTitle === "Add Counter") {
      return (confirmButtonFunction as (cardInfo: CardInfo) => void)(getCardInfo());
    } else if (dialogTitle === "Edit") {
      return (confirmButtonFunction as (inputValue: string | undefined, inputHex: string) => void)(
        nameInputRef.current?.value,
        hex
      );
    } else if (dialogTitle === "Search Counter") {
      return (confirmButtonFunction as (cardInfo: CardInfo) => void)(getCardInfo());
    }
  }

  function shouldDisplayColorPicker() {
    return dialogTitle === "Add Counter" || dialogTitle === "Edit";
  }

  return (
    <Dialog>
      {dialogTrigger}
      <DialogContent
        className="w-[334px] min-w-[334px]"
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
              defaultValue={originalCardInfo?.title}
              ref={nameInputRef}
            />
          </div>
          {!isTitleValid && <AlertForNoTitle />}
          {shouldDisplayColorPicker() && (
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
          )}
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
