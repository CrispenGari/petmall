import React from "react";
import { createClient, Provider } from "urql";
export const url = "http://127.0.0.1:3001/graphql";
export const client = createClient({
  url,
  fetchOptions: () => {
    const token = undefined;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
      credentials: "include",

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
