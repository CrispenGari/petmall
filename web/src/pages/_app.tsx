import Layout from "@/components/Layout/Layout";
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UrqlProvider>
  );
};

export default PetMall;
