import "@/styles/globals.css";
import { UrqlProvider } from "@petmall/providers";
import type { AppProps } from "next/app";

const PetMall = ({ Component, pageProps }: AppProps) => {
  return (
    <UrqlProvider>
      <Component {...pageProps} />
    </UrqlProvider>
  );
};
export default PetMall;
