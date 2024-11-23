"use client";

import React, { useContext } from "react";

import { LocalStorageContext } from "../logical/localstorage";

import { Button } from "../ui/button";

import InputSource from "./inputsource";

export default function InputSourceList() {
  const { setKeyValue, getKeyValue } = useContext(LocalStorageContext);

  const addNewSource = (): void => {
    const newSource = prompt("Enter the new data source name");
    if (newSource) {
      let sourceArray = JSON.parse(getKeyValue("sourcearray") as string) as string[];
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

    const sources = JSON.parse(getKeyValue("sourcearray") as string) as string[];
    const returnArray: React.ReactNode[] = [];
    console.log(getKeyValue("sourcearray"));
    for (let i = 0; i < sources.length; i++) {
      returnArray.push(<InputSource key={sources[i] + i} name={sources[i]} />);
    }

    return returnArray;
  }

  const clearSources = (): void => {
    setKeyValue("sourcearray", []);
  }

  return (
    <>
      <Button onClick={() => addNewSource()}>Add New Source</Button>
      <Button onClick={() => clearSources()}>Clear Sources</Button>
      {sourceArray()}
    </>
  );
}
