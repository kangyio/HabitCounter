import { createContext } from "react";

export const CountContext = createContext<
  | {
      countNumber: number;
      setCountNumber: React.Dispatch<React.SetStateAction<number>>;
      currentCardInfo: CardInfo;
      setCurrentCardInfo: React.Dispatch<React.SetStateAction<CardInfo | undefined>>;
    }
  | undefined
>(undefined);
