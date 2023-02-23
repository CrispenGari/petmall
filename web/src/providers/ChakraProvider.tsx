import { ChakraProvider as Provider } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const ChakraProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default ChakraProvider;
