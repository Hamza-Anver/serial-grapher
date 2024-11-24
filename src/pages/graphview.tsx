'use client'

export const metadata = {
  title: "Graph View",
  description: "View graphs here",
};

import Head from "next/head";
import React from "react";
import { HeaderContext } from "./layout";

import GraphList from "@/components/graphs/graphlist";

export default function GraphViewPage() {
  const { setHeader } = React.useContext(HeaderContext);
  setHeader(metadata.title);
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
      </Head>
        <GraphList />
    </div>
  );
}
