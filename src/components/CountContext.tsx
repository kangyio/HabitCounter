import { createContext } from "react";

export const CountContext = createContext<
  | {
      countNumber: number;
      setCountNumber: React.Dispatch<React.SetStateAction<number>>;
      updatedAt: number[];
    }
  | undefined
>(undefined);
