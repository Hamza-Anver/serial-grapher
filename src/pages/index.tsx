import CardDemo from "@/components/graphs/graph";

import Head from "next/head";

export const metadata = {
  title: "Serial Grapher",
  description: "Graph your serial data.",
};

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <CardDemo></CardDemo>
    </div>
  );
}
