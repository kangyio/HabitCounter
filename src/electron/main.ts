import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { isDev, readFromDB, writeToDB } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    autoHideMenuBar: true,
    // resizable: false,
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
    switch (action.type) {
      case "click:send_cardInfo":
        await writeToDB(action.cardInfoArray, "cards.json");
        break;
      case "click:quitApp":
        app.quit();
        break;
    }
  });

  ipcMain.on("dragAction", async (_event, action) => {
    await writeToDB(action.cardLayoutArray, "cardLayout.json");
  });
});
