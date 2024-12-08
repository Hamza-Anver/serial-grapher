'use client'

export const metadata = {
  title: "Data Source",
  description: "Set up your data sources here.",
};

import Head from "next/head";
import React from "react";
import { HeaderContext } from "./layout";

import InputSourceList from "@/components/datasource/sourcelist";

type DataSourcesPageProps = {
  visible?: boolean;
};

const DataSourcesPage: React.FC<DataSourcesPageProps> = ({ visible }) =>{
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
        <InputSourceList />
    </div>
  );
}

export default DataSourcesPage;
