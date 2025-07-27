import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
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
        console.log(`${action.message}${action.countNumber}`);
        break;
    }
  });

});
