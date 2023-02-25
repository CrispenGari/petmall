import React from "react";
import { TOKEN_KEY, url } from "../constants";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider,
  makeOperation,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { retrieve } from "../utils";

export const client = createClient({
  url,
  exchanges: [
    dedupExchange,
    authExchange({
      getAuth: async ({ authState }: any) => {
        const token = await retrieve(TOKEN_KEY);
        return {
          token,
        };
      },
      addAuthToOperation({ authState, operation }) {
        if (!authState || !!!authState.token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`,
            },
          },
        });
      },
    }),
    fetchExchange,
    multipartFetchExchange,
  ],
});

type Props = {
  children: React.ReactNode;
};
const UrqlProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
