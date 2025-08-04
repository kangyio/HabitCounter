import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { BaseCard } from "@/components/BaseCard.tsx";

export function CardGrid({ cards }: { cards: CardInfo[] }) {
  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      {...cardInfo}
      cards={cards}
    />
  ));

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col gap-1">{renderedBaseCards}</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <button onClick={() => console.log("context menu click")}>Edit Name</button>
        </ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
