import { LogOutIcon } from "lucide-react";
import { electronAPI_quitApp } from "@/lib/utils";

export function QuitAppButton() {
  return (
    <button className="bg-slate-100 p-2 rounded-xl cursor-pointer transition-transform duration-200 active:scale-95">
      <LogOutIcon
        color={"#0c0a09"}
        size={40}
        onClick={electronAPI_quitApp}
      />
    </button>
  );
}
