import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { isDev, readFromDB, writeToDB } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

let mainWindow: BrowserWindow | null = null;

app.on("second-instance", () => {
  // Focus the existing window if a second instance is launched
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 975,
    height: 850,
    autoHideMenuBar: true,
    resizable: false,
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
