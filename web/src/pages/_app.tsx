import "semantic-ui-css/semantic.min.css";
import Layout from "@/components/Layout/Layout";
import ReduxProvider from "@/providers/ReduxProvider";
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
      <ReduxProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </UrqlProvider>
  );
};

export default PetMall;
