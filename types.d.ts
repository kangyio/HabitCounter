type Action = {
  type: "click:send_count";
  message: "The count is ";
  countNumber: number;
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
  };
}
