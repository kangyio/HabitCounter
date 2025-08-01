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

  ipcMain.on("clickAction", async (_event, action) => {
    //Todo delete after testing
    const now = new Date();
    console.log("count received", `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    //todo delete after testing

    await writeCardInfoToDB(action.cardInfoArray);
  });

  async function writeCardInfoToDB(cardInfoArray: CardInfo[]) {
    const filePath = path.join(app.getAppPath(), "database", "cards.json");

    try {
      await fsPromises.writeFile(filePath, JSON.stringify(cardInfoArray));
      console.log("Cards saved to file");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      console.log(String(err));
    }
  }
});
