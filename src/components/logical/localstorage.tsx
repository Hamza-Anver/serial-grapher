"use client"

import {
  createContext,
  useState,
  useEffect,
} from "react";
import { ReactNode } from "react";

interface LocalStorageContextType {
  data: { [key: string]: unknown};
  setKeyValue: (key: string, value: unknown) => void;
  getKeyValue: (key: string) => unknown;
}

const LocalStorageContext = createContext<LocalStorageContextType>({
  data: JSON.parse("{}"),
  setKeyValue: () => {},
  getKeyValue: () => null,
});

export default function LocalStorageProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [data, setData] = useState<{
    [key: string]: unknown;
  }>(JSON.parse("{}"));

  const [onClient, setOnClient] = useState(false);

  const setKeyValue = (
    key: string,
    value: unknown
  ) => {
    const newdata = { ...data };
    newdata[key] = value;
    setData(newdata);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getKeyValue = (key: string) => {
    let value = null;
    if(data[key]) {
        value = data[key];
    }
    if (onClient) {
        value = localStorage.getItem(key);
    }
    if (value) {
      return value;
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem("datastream");
      if (data) {
        setData(JSON.parse(data));
      }
      setOnClient(true);
    }
  }, []);

  return (
    <LocalStorageContext.Provider value={{ data, setKeyValue, getKeyValue }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export { LocalStorageContext };
