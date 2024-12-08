"use client";

export const metadata = {
  title: "Graph View",
  description: "View graphs here",
};

import Head from "next/head";
import React from "react";
import { HeaderContext } from "./layout";

import GraphList from "@/components/graphs/graphlist";
import EgGraph from "@/components/graphs/eggraph";

type GraphViewPageProps = {
  visible?: boolean;
};

const GraphViewPage: React.FC<GraphViewPageProps> = ({ visible }) => {
  if (visible === undefined) {
    visible = true;
  }
  const { setHeader } = React.useContext(HeaderContext);
  setHeader(metadata.title);
  return (
    <div className={visible ? '' : 'hidden'}>
      {visible && (
        <Head>
          <title>{metadata.title}</title>
        </Head>
      )}
      <EgGraph />
      <GraphList />
    </div>
  );
};

export default GraphViewPage;
