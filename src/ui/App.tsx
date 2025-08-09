import { useState, useEffect } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { ButtonControl } from "@/components/ButtonControl.tsx";
import { CardGrid } from "@/components/CardGrid";
import { getCardInfoArrayFromDB, getCardLayoutArrayFromDB } from "@/lib/utils";

function App() {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [cardLayoutArray, setCardLayoutArray] = useState<CardLayout[]>([]);
  const [searchTarget, setSearchTarget] = useState<SearchTarget>({
    idSet: new Set(),
    isSearching: false
  });

  useEffect(() => {
    getCardInfoArrayFromDB(setCards);
    getCardLayoutArrayFromDB(setCardLayoutArray);
  }, []);

  return (
    <main
      className="min-h-svh bg-stone-700 relative"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
        backgroundSize: "25px 25px"
      }}
    >
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <ButtonControl
          cards={cards}
          setCards={setCards}
          cardLayoutArray={cardLayoutArray}
          setCardLayoutArray={setCardLayoutArray}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
        />
        <CardGrid
          cards={cards}
          setCards={setCards}
          cardLayoutArray={cardLayoutArray}
          setCardLayoutArray={setCardLayoutArray}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
        />
      </ThemeProvider>
    </main>
  );
}

export default App;

//TODO
//✅ Drag cards to rearrange in grid
//✅ Add search button
//✅ Add go to top button
// Add exit button
// Add config⚙️ button
