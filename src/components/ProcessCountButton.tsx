import { useContext } from "react";
import { CountContext } from "./CountContext";

export function ProcessCountButton(props: { text: "-" | "+" }) {
  const context = useContext(CountContext);
  if (!context) throw new Error("CountContext not found");
  const { countNumber, setCountNumber, updatedAt } = context;

  function processCountNumber(e: React.MouseEvent<HTMLButtonElement>) {
    if ((e.target as HTMLButtonElement).textContent === "-") {
      if (countNumber <= 0) return;
      setCountNumber(prev => prev - 1);
      updatedAt.pop();
    }
    if ((e.target as HTMLButtonElement).textContent === "+") {
      setCountNumber(prev => prev + 1);
      updatedAt.push(Date.now());
    }
  }

  return (
    <button
      className="flex flex-col justify-center align-middle p-2 rounded-xs text-6xl cursor-pointer transition-transform duration-200 active:scale-95"
      onClick={e => {
        processCountNumber(e);
      }}
    >
      {props.text}
    </button>
  );
}
