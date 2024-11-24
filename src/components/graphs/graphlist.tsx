"use client";

import React, { useContext } from "react";

import { LocalStorageContext } from "../logical/localstorage";

import { Button } from "../ui/button";

import GraphComponent from "./graph";

import { ListPlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const arraykey = "grapharray";

export default function GraphList() {
  const { setKeyValue, getKeyValue } = useContext(LocalStorageContext);
  const { toast } = useToast();

  const addNewGraph = (): void => {
    const newSource = prompt("Enter the new graph name");
    if (newSource) {
      let sourceArray = JSON.parse(getKeyValue(arraykey) as string) as string[];
      if (!sourceArray) {
        sourceArray = [];
      }
      const newSourceArray = [...sourceArray, newSource];
      setKeyValue(arraykey, newSourceArray);
    }
  };

  const getGraphArray = (): React.ReactNode => {
    if (!getKeyValue(arraykey)) {
      return <></>;
    }

    const sources = JSON.parse(getKeyValue(arraykey) as string) as string[];
    const returnArray: React.ReactNode[] = [];
    console.log(getKeyValue(arraykey));
    for (let i = 0; i < sources.length; i++) {
      returnArray.push(
        <GraphComponent key={sources[i] + i} graphName={sources[i]} />
      );
    }

    return returnArray;
  };

  const clearGraphs = (): void => {
    toast({
      title: "All graphs have been cleared",
    });
    setKeyValue(arraykey, []);
  };

  return (
    <>
      <Button
        className="absolute m-3 top-0 right-0"
        onClick={() => clearGraphs()}
        variant="destructive"
      >
        <Trash2 /> Clear Graphs
      </Button>
      {getGraphArray()}
      <div className="absolute bottom-0 right-0 p-3">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => addNewGraph()}
        >
          <ListPlus />
          Add Graph
        </Button>
        
      </div>
    </>
  );
}
