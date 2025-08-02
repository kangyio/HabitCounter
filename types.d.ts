type Action = {
  type: "click:send_count";
  cardInfoArray: CardInfo[];
};

type CardInfo = {
  createdAt: number;
  updatedAt: number[];
  title: string;
  color: string;
};

interface Window {
  electronAPI: {
    clickAction: (action: Action) => void;
    getCardInfoArray: () => string;
  };
}
