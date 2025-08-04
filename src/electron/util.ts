export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function electronAPI_clickAction(cards: CardInfo[]) {
  return () =>
    window.electronAPI.clickAction({
      type: "click:send_cardInfo",
      cardInfoArray: cards
    });
}
