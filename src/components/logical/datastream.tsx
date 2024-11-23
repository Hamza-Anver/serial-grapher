import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ReactNode } from "react";


interface DataStreamContextType {
  datastream: string[];
  setDataStream: Dispatch<SetStateAction<string[]>>;
  addToStream: (data: string) => void;
  clearDataStream: () => void;
}

const DataStreamContext = createContext<DataStreamContextType>({
  datastream: ["Serial Grapher"],
  setDataStream: () => {},
  addToStream: () => {},
  clearDataStream: () => {},
});

export default function DataStreamProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [datastream, setDataStream] = useState([""]);

  
  const addToStream = (data: string) => {
    const newDataStream = [...datastream, data];
    setDataStream(newDataStream);
    localStorage.setItem("datastream", JSON.stringify(newDataStream));
  };

  const clearDataStream = () => {
    setDataStream([]);
    localStorage.removeItem("datastream");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem("datastream");
      if (data) {
        setDataStream(JSON.parse(data));
      }
    }
  }, []);

  return (
    <DataStreamContext.Provider
      value={{ datastream, setDataStream, addToStream, clearDataStream }}
    >
      {children}
    </DataStreamContext.Provider>
  );
}

export { DataStreamContext };
