import React from "react";

import CardDemo from "@/components/graphs/graph";

import Head from "next/head";

export const metadata = {
  title: "Serial Grapher",
  description: "Graph your serial data.",
};

import { HeaderContext } from "./layout";

export default function IndexPage() {
  const { setHeader } = React.useContext(HeaderContext);
  setHeader(metadata.title);
  
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <CardDemo></CardDemo>
    </div>
  );
}
