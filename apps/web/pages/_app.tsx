import { MantineProvider } from "@mantine/core";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}