"use client";
import React from "react";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>Serial Grapher</title>
      </Head>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Serial Grapher</h1>
          </header>
          <main>
            <Component {...pageProps} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
