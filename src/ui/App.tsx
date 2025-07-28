import { useState } from 'react';
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="flex min-h-svh items-center justify-center">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button onClick={() => window.electronAPI.clickAction({
          type: "click:send_count",
          message: "The count is ",
          countNumber: count
        })}>
          Send Count
        </Button>
      </div>
    </>
  );
}

export default App;
