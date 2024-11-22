import { createContext, useState, Dispatch, SetStateAction } from "react";

interface HeaderContextType {
  header: string;
  setHeader: Dispatch<SetStateAction<string>>;
}

const HeaderContext = createContext<HeaderContextType>({
  header: "Serial Grapher",
  setHeader: () => {},
});

export { HeaderContext };

import { ReactNode } from "react";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function HeaderProvider({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState("Serial Grapher");

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">{header}</h1>
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </HeaderContext.Provider>
  );
}
