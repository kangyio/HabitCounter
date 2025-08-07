import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  clickAction: (action: Action) => {
    ipcRenderer.send("clickAction", action);
  },
  dragAction: (action: Action) => {
    ipcRenderer.send("dragAction", action);
  },
  getCardInfoArray: () => ipcRenderer.invoke("cardInfoArray"),
  getCardLayoutArray: () => ipcRenderer.invoke("cardLayoutArray")
});
