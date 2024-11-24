"use client";

import React, { useContext } from "react";

import { LocalStorageContext } from "../logical/localstorage";

import { Button } from "../ui/button";

import InputSource from "./inputsource";

import { ListPlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function InputSourceList() {
  const { setKeyValue, getKeyValue } = useContext(LocalStorageContext);
  const { toast } = useToast();

  const addNewSource = (): void => {
    const newSource = prompt("Enter the new data source name");
    if (newSource) {
      let sourceArray = JSON.parse(
        getKeyValue("sourcearray") as string
      ) as string[];
      if (!sourceArray) {
        sourceArray = [];
      }
      const newSourceArray = [...sourceArray, newSource];
      setKeyValue("sourcearray", newSourceArray);
    }
  };

  const sourceArray = (): React.ReactNode => {
    if (!getKeyValue("sourcearray")) {
      return <></>;
    }

    const sources = JSON.parse(
      getKeyValue("sourcearray") as string
    ) as string[];
    const returnArray: React.ReactNode[] = [];
    console.log(getKeyValue("sourcearray"));
    for (let i = 0; i < sources.length; i++) {
      returnArray.push(<InputSource key={sources[i] + i} name={sources[i]} />);
    }

    return returnArray;
  };

  const clearSources = (): void => {
    
    toast({
      title: "All sources have been cleared",
    });
    setKeyValue("sourcearray", []);
  };

  return (
    <>
      <Button className="absolute m-3 top-0 right-0" onClick={() => clearSources()} variant="destructive"><Trash2 /> Clear Sources</Button>
      {sourceArray()}
      <div className="w-full p-3">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => addNewSource()}
        >
          <ListPlus />
          Add New Source
        </Button>
      </div>
    </>
  );
}
