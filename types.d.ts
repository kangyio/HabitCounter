type Action =
  | {
      type: "click:send_cardInfo";
      cardInfoArray: CardInfo[];
    }
  | {
      type: "drag:send_cardLayout";
      cardLayoutArray: CardLayout[];
    };

type CardInfo = {
  createdAt: number;
  updatedAt: number[];
  title: string;
  color: string;
};

type DialogConfirmButtonFunction =
  | ((cardInfo: CardInfo) => void)
  | ((inputValue: string | undefined, inputHex: string) => void);

type DialogTitle = "Add Counter" | "Edit" | "Search Counter";

type BarChartData = {
  month: Month;
  count: number;
};

type CardLayout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type ControlButtonType = "add" | "search";

type BigControlButtonProps = {
  type: ControlButtonType;
  cards: CardInfo[];
  setCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  icon: ReactElement<React.ComponentProps<LucideIcon>>;
};

interface Window {
  electronAPI: {
    dragAction: (action: Action) => void;
    clickAction: (action: Action) => void;
    getCardInfoArray: () => string;
    getCardLayoutArray: () => string;
  };
}
