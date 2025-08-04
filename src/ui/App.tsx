import { useEffect, useState } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { AddCardButton } from "@/components/AddCardButton.tsx";
import { CardGrid } from "@/components/CardGrid";

import { electronAPI_clickAction, getCardInfoArray } from "@/lib/utils";

function App() {
  const [cards, setCards] = useState<CardInfo[]>([]);

  useEffect(() => {
    getCardInfoArray(setCards);
  }, []);

  const addCard = (cardInfo: CardInfo) => {
    if (!cardInfo.title) return;

    const newCards = [...cards, cardInfo];
    setCards(newCards);
    electronAPI_clickAction(newCards);
  };

  return (
    <main className="flex flex-col min-h-svh items-center bg-stone-700 gap-0.5 relative">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <AddCardButton onAddCard={addCard} />
        <CardGrid cards={cards} />
      </ThemeProvider>
    </main>
  );
}

export default App;
