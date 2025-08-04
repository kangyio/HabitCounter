import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayTimePast(originalTime: number, updatedAtLength: number): string {
  const timeDiffInMinute = Math.floor((Date.now() - originalTime) / 1000 / 60);

  if (updatedAtLength === 0) {
    return "⏱️Never";
  }

  // less than 1 minute ago
  if (timeDiffInMinute < 1) {
    return "⏱️Just now";
  }
  // 1 ~ 60 minutes ago
  else if (timeDiffInMinute < 60) {
    const minute = Math.floor(timeDiffInMinute);
    return minute === 1 ? "⏱️1 minute ago" : `⏱️${minute} minutes ago`;
  }
  // 1 ~ 24 hours ago
  else if (timeDiffInMinute < 1440) {
    const hour = Math.floor(timeDiffInMinute / 60);
    return hour === 1 ? "⏱️1 hour ago" : `⏱️${hour} hours ago`;
  }
  // 1 ~ 365 days ago
  else if (timeDiffInMinute < 525600) {
    const day = Math.floor(timeDiffInMinute / 1440);
    return day === 1 ? "⏱️1 day ago" : `⏱️${day} days ago`;
  }
  // more than one year ago
  else {
    const year = Math.floor(timeDiffInMinute / 525600);
    return year === 1 ? "⏱️1 year ago" : `⏱️${year} years ago`;
  }
}

export function electronAPI_clickAction(cards: CardInfo[]) {
  window.electronAPI.clickAction({
    type: "click:send_cardInfo",
    cardInfoArray: cards
  });
}
