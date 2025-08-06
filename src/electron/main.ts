import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fsPromises from "node:fs/promises";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 850,
    webPreferences: {
      preload: getPreloadPath()
    }
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
  }

  // Renderer ↔️ Main (two way)

  ipcMain.handle(
    "cardInfoArray",
    async () =>
      await fsPromises.readFile(
        path.join(app.getAppPath(), "src", "electron", "cards.json"),
        "utf-8"
      )
  );

  // Renderer ➡️ Main

  ipcMain.on("clickAction", async (_event, action) => {
    await writeCardInfoToDB(action.cardInfoArray);

    //TODO For debugging only, delete later
    console.log("CardInfo Received:");
    for (const cardInfo of action.cardInfoArray) {
      console.log(`${cardInfo.title}, ${cardInfo.updatedAt.length}, ${cardInfo.color}`);
    }
    //TODO END
  });

  async function writeCardInfoToDB(cardInfoArray: CardInfo[]) {
    const filePath = path.join(app.getAppPath(), "src", "electron", "cards.json");

    try {
      await fsPromises.writeFile(filePath, JSON.stringify(cardInfoArray));
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      console.log(String(err));
    }
  }
});
