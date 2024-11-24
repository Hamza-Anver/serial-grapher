import React from "react";

export const metadata = {
  title: "Serial Grapher",
  description: "Graph your serial data.",
};


import GraphViewPage from "./graphview";

export default function IndexPage() {
  return (
    <GraphViewPage />
  );
}
