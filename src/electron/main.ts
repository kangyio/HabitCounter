import { app, BrowserWindow } from "electron";
import path from "node:path";
import { isDev } from "./util.js";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    /*Window config here*/
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));
  }
});
