type Action = {
  type: "click:send_cardInfo";
  cardInfoArray: CardInfo[];
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

type DialogTitle = "Add Counter" | "Edit";

type BarChartData = {
  month: Month;
  count: number;
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

interface Window {
  electronAPI: {
    clickAction: (action: Action) => void;
    getCardInfoArray: () => string;
  };
}
