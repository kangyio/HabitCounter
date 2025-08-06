import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BaseCardBarChart } from "./BaseCardBarChart";

export function BottomDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  currentCardInfo
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentCardInfo: CardInfo | undefined;
}) {
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerContent className="focus:outline-none focus:ring-0">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <BaseCardBarChart currentCardInfo={currentCardInfo} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
