'use client'


export const metadata = {
  title: "Data Source",
  description: "Set up your data sources here.",
};

import Head from "next/head";
import React from "react";
import { HeaderContext } from "./layout";

import InputSourceList from "@/components/datasource/sourcelist";

export default function DataSourcePage() {
  const { setHeader } = React.useContext(HeaderContext);
  setHeader(metadata.title);
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
      </Head>
        <InputSourceList />
    </div>
  );
}
