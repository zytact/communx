import { FloatingNav } from "@/components/ui/floating-navbar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Home as HomeIcon, CircleHelp } from "lucide-react";

export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      name: "About",
      link: "/about",
      icon: <CircleHelp />,
    },
  ];
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <ModeToggle />
      </div>
      <FloatingNav navItems={navItems} />
    </main>
  );
}
