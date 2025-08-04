import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BaseCard } from "@/components/BaseCard.tsx";
import { AddCardButton } from "@/components/AddCardButton.tsx";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";

import { electronAPI_clickAction } from "@/lib/utils";

function App() {
  const [cards, setCards] = useState<CardInfo[]>([]);

  useEffect(() => {
    getCardInfoArray();
  }, []);

  const addCard = (cardInfo: CardInfo) => {
    if (!cardInfo.title) return;

    const newCards = [...cards, cardInfo];
    setCards(newCards);
    electronAPI_clickAction(newCards);
  };

  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      {...cardInfo}
      cards={cards}
    />
  ));

  const getCardInfoArray = async () => {
    const cardInfoArray = await window.electronAPI.getCardInfoArray();
    setCards(JSON.parse(cardInfoArray));
  };

  return (
    <main className="flex flex-col min-h-svh items-center bg-stone-700 gap-0.5 relative">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <AddCardButton onAddCard={addCard} />
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex flex-col gap-1">{renderedBaseCards}</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Billing</ContextMenuItem>
            <ContextMenuItem>Team</ContextMenuItem>
            <ContextMenuItem>Subscription</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <Button onClick={() => electronAPI_clickAction(cards)}>Save Card</Button>
      </ThemeProvider>
    </main>
  );
}

export default App;
