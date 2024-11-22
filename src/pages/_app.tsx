"use client";
import React from "react";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { ThemeProvider } from "@/components/theme-provider";

import HeaderProvider from "./layout";

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeaderProvider>
        <Head>
          <title>Serial Grapher</title>
        </Head>
        <Component {...pageProps} />
      </HeaderProvider>
    </ThemeProvider>
  );
}
