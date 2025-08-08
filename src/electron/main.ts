import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { isDev, readFromDB, writeToDB } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1200,
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

  ipcMain.handle("cardInfoArray", async () => await readFromDB("cards.json"));
  ipcMain.handle("cardLayoutArray", async () => await readFromDB("cardLayout.json"));

  // Renderer ➡️ Main

  ipcMain.on("clickAction", async (_event, action) => {
    await writeToDB(action.cardInfoArray, "cards.json");

    //TODO For debugging only, delete later
    console.log("CardInfo Received: ", Date.now());
    for (const cardInfo of action.cardInfoArray) {
      console.log(`${cardInfo.title}, ${cardInfo.updatedAt.length}, ${cardInfo.color}`);
    }
    //TODO END
  });

  ipcMain.on("dragAction", async (_event, action) => {
    await writeToDB(action.cardLayoutArray, "cardLayout.json");
    console.log("CardLayout Received: ", Date.now());
    for (const cardLayout of action.cardLayoutArray) {
      console.log(
        `${cardLayout.i}, ${cardLayout.x}, ${cardLayout.y}, ${cardLayout.w}, ${cardLayout.h}`
      );
    }
  });
});
