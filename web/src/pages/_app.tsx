import Layout from "@/components/Layout/Layout";
import ChakraProvider from "@/providers/ChakraProvider";
import UrqlProvider from "@/providers/UrqlProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

const PetMall: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <UrqlProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UrqlProvider>
  );
};

export default PetMall;
