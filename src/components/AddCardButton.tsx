import { useRef } from "react";
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
import { TwitterPicker } from "react-color";

export function AddCardButton({
  onAddCard
}: {
  onAddCard: (inputTitle: string | undefined) => void;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-slate-100 p-3 rounded-xl text-2xl fixed top-4 right-4 cursor-pointer transition-transform duration-200 active:scale-95">
          ➕
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
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
              defaultValue="Your New Counter"
              ref={nameInputRef}
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="color">Color</Label>
            <TwitterPicker />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onAddCard(nameInputRef.current?.value)}>Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
