"use client"

import React, {useContext} from "react";

import {DataStreamContext} from "../logical/datastream"

import { Button } from "../ui/button";
import { clear } from "console";

export default function InputSourceList() {
  const {datastream, setDataStream, addToStream, clearDataStream} = useContext(DataStreamContext);
  return (
    <>
      <Button onClick={() => addToStream("Test")}>Set Data Stream</Button>
        <Button onClick={() => clearDataStream()}>Clear Data Stream</Button>
      <p>Data Stream: {datastream ? datastream.join(", ") : "No data"}</p>
    </>
  );
}