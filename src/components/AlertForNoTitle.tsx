import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertForNoTitle() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Title is required</AlertTitle>
        <AlertDescription>
          <p>Please enter a title for your counter.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
