import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fsPromises from "node:fs/promises";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1200,
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

  ipcMain.on("clickAction", (_event, action) => {
    switch (action.type) {
      case "click:send_count":
        console.log("count received");
        writeCardInfoToDB(action.cardInfoArray);
        break;
    }
  });

  // async function writeCardInfoToDB(cardInfoArray: CardInfo[]) {
  //   const dirPath = path.join(app.getAppPath(), "src", "electron", "database");
  //   const filePath = path.join(dirPath, "cards.json");
  //   console.log(filePath);
  //   await fsPromises.mkdir(dirPath, { recursive: true }); // Ensure directory exists
  //   await fsPromises.writeFile(filePath, JSON.stringify(cardInfoArray));
  // }

  async function writeCardInfoToDB(cardInfoArray: CardInfo[]) {
    const filePath = path.join(app.getAppPath(), "src", "electron", "database", "cards.json");
    await fsPromises.writeFile(filePath, JSON.stringify(cardInfoArray));
  }
});
