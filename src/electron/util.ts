import { app } from "electron";
import fsPromises from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export async function writeToDB(cardInfoArray: CardInfo[], fileName: string) {
  const filePath = path.join(app.getAppPath(), "src", "electron", fileName);

  try {
    await fsPromises.writeFile(filePath, JSON.stringify(cardInfoArray));
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    console.log(String(err));
  }
}

export async function readFromDB(fileName: string) {
  try {
    const filePath = path.join(app.getAppPath(), "src", "electron", fileName);
    if (!existsSync(filePath)) await initializeDB(filePath, fileName);

    return await fsPromises.readFile(filePath, "utf-8");
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    console.log(String(err));
  }
}

async function initializeDB(filePath: string, fileName: string) {
  const timeNow = Date.now();
  if (fileName === "cards.json") {
    const initContent = JSON.stringify([
      {
        createdAt: timeNow,
        updatedAt: [timeNow],
        title: "Welcome!",
        color: "#4caf50"
      }
    ]);
    await fsPromises.writeFile(filePath, initContent);
  } else if (fileName === "cardLayout.json") {
    const initContent = JSON.stringify([{ i: String(timeNow), x: 1, y: 0, w: 1, h: 1 }]);
    await fsPromises.writeFile(filePath, initContent);
  }
}
