import { useEffect, useState } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { AddCardButton } from "@/components/AddCardButton.tsx";
import { CardGrid } from "@/components/CardGrid";

import { getCardInfoArrayFromDB } from "@/lib/utils";

function App() {
  const [cards, setCards] = useState<CardInfo[]>([]);

  useEffect(() => {
    getCardInfoArrayFromDB(setCards);
  }, []);

  return (
    <main className="flex flex-col min-h-svh items-center bg-stone-700 gap-0.5 relative">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <AddCardButton
          cards={cards}
          setCards={setCards}
        />
        <CardGrid
          cards={cards}
          setCards={setCards}
        />
      </ThemeProvider>
    </main>
  );
}

export default App;
