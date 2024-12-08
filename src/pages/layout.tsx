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

import { Toaster } from "@/components/ui/toaster";


// Import contexts for client side data sharing
import LocalStorageProvider from "@/components/logical/localstorage";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState("Serial Grapher");

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      <LocalStorageProvider>
        <div className="w-screen overflow-x-hidden h-screen">{children}
          <ThemeToggle />
        </div>

      </LocalStorageProvider>
      <Toaster />
    </HeaderContext.Provider>
  );
}
