'use client'

import { Container } from "@/components/ui/generic-card";

export const metadata = {
  title: "Data Source",
  description: "Set up your data sources here.",
};

import Head from "next/head";
import React from "react";
import { HeaderContext } from "./layout";

export default function DataSourcePage() {
  const { setHeader } = React.useContext(HeaderContext);
  setHeader(metadata.title);
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <Container title="test">
        <p>DATA MODE</p>
      </Container>
    </div>
  );
}
