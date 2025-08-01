import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BaseCard } from "@/components/BaseCard.tsx";
import { AddCardButton } from "@/components/AddCardButton.tsx";

function App() {
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState<CardInfo[]>([]);

  const addCard = (inputTitle: string | undefined) => {
    if (!inputTitle) return;
    setCards([...cards, { createdAt: Date.now(), title: inputTitle }]);
  };

  const renderedBaseCards = cards.map(cardInfo => (
    <BaseCard
      key={cardInfo.createdAt}
      {...cardInfo}
    />
  ));

  return (
    <main className="flex flex-col min-h-svh items-center bg-stone-700 gap-0.5 relative">
      <AddCardButton onAddCard={addCard} />
      {renderedBaseCards}
      <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
      <Button
        onClick={() =>
          window.electronAPI.clickAction({
            type: "click:send_count",
            message: "The count is ",
            countNumber: count
          })
        }
      >
        Send Count
      </Button>
    </main>
  );
}

export default App;
