import { useContext } from "react";
import { CountContext } from "./CountContext";
import { electronAPI_clickAction } from "@/lib/utils";

export function ProcessCountButton(props: { text: "-" | "+" } & { cards: CardInfo[] }) {
  const context = useContext(CountContext);
  if (!context) throw new Error("CountContext not found");
  const { countNumber, setCountNumber, currentCardInfo, setCurrentCardInfo } = context;

  function processCountNumber(e: React.MouseEvent<HTMLButtonElement>) {
    if ((e.target as HTMLButtonElement).textContent === "-") {
      if (countNumber <= 0) return;
      setCountNumber(prev => prev - 1);
      currentCardInfo.updatedAt.pop();
      setCurrentCardInfo({ ...currentCardInfo, updatedAt: currentCardInfo.updatedAt });
    }
    if ((e.target as HTMLButtonElement).textContent === "+") {
      setCountNumber(prev => prev + 1);
      currentCardInfo.updatedAt.push(Date.now());
      setCurrentCardInfo({ ...currentCardInfo, updatedAt: currentCardInfo.updatedAt });
    }
  }

  return (
    <button
      className="process_count_button flex flex-col justify-center align-middle p-2 text-6xl cursor-pointer transition-transform duration-200 active:scale-95"
      onClick={e => {
        processCountNumber(e);
        electronAPI_clickAction(props.cards);
      }}
    >
      {props.text}
    </button>
  );
}
