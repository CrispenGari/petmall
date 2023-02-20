import React from "react";
import { createClient, Provider } from "urql";
export const url = "https://8bfb-197-98-127-119.ngrok.io/graphql";
export const client = createClient({
  url,
  fetchOptions: () => {
    const token = undefined;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

type Props = {
  children: React.ReactNode;
};
const UrqlProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
