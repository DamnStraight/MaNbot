import { AppShell, Header, MantineProvider, Text } from "@mantine/core";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import "../styles/globals.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

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
            <AppShell
              padding="md"
              header={
                <Header height={{ base: 50, md: 70 }} p="lg">
                  <Text>{router.pathname}</Text>
                </Header>
              }
            >
              <Component {...pageProps} />
            </AppShell>
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
