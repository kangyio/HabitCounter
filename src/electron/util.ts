import { app } from "electron";
import fsPromises from "node:fs/promises";
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
  const filePath = path.join(app.getAppPath(), "src", "electron", fileName);

  try {
    return await fsPromises.readFile(filePath, "utf-8");
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    console.log(String(err));
  }
}
