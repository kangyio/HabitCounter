import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  clickAction: (action: Action) => { ipcRenderer.send("clickAction", action); }
});