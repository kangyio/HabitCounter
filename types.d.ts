type Action = {
  type: "click:send_count";
  message: "The count is ";
  countNumber: number;
};



interface Window {
  electronAPI: {
    clickAction: (action: Action) => void;
  };
}