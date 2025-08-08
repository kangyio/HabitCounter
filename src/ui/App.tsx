import { useState } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { ButtonControl } from "@/components/ButtonControl.tsx";
import { CardGrid } from "@/components/CardGrid";

function App() {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [searchTargetIds, setSearchTargetIds] = useState<Set<number>>(new Set());

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
          searchTargetIds={searchTargetIds}
          setSearchTargetIds={setSearchTargetIds}
        />
        <CardGrid
          cards={cards}
          setCards={setCards}
          searchTargetIds={searchTargetIds}
        />
      </ThemeProvider>
    </main>
  );
}

export default App;

//TODO
//✅ Drag cards to rearrange in grid
// Add search button
// Add go to top button
// Add config⚙️ button
