import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <ModeToggle />
      </div>
      <Button>Click Me</Button>
    </main>
  );
}
