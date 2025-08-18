import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertForNoTitle({ dialogTitle }: { dialogTitle: DialogTitle }) {
  function displayAlertTitle(dialogTitle: DialogTitle) {
    switch (dialogTitle) {
      case "Add Counter":
        return "Title is required";
      case "Edit":
        return "Title is required";
      case "Search Counter":
        return "No such counter found";
    }
  }

  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{displayAlertTitle(dialogTitle)}</AlertTitle>
        <AlertDescription>
          <p>Please enter a valid title for your counter.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
