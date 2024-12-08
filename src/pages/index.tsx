import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const metadata = {
  title: "Serial Grapher",
  description: "Graph your serial data.",
};

import GraphViewPage from "./graphview";
import DataSourcesPage from "./datasource";

export default function IndexPage() {
  const [currentPage, setPage] = useState<string>("Graph View");

  const pageViews = ["Graph View", "Data Sources"];

  const handlePageSelection = (value: string) => {
    // TODO: check if its a valid page
    setPage(value);
    // Code to run on value change
    console.log(`Selected value: ${value}`);
    // Add any additional logic here
  };
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <h1 className="text-xl font-bold">Serial Grapher</h1>
        <Select value={currentPage} onValueChange={handlePageSelection}>
          <SelectTrigger className="w-30">
            <span>{currentPage}</span>
          </SelectTrigger>
          <SelectContent>
            {pageViews.map((page) => (
              <SelectItem key={page} value={page}>
                {page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      <main>
        <GraphViewPage visible={currentPage === pageViews[0]}/>
        <DataSourcesPage visible={currentPage === pageViews[1]} />
      </main>
    </>
  );
}
