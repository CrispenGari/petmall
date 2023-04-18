import React from "react";
import { TOKEN_KEY, ngrokDomain } from "../constants";
import {
  createClient,
  Provider,
  makeOperation,
  subscriptionExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { retrieve } from "../utils";

import { createClient as createWSClient } from "graphql-ws";

const wsClient = createWSClient({
  url: `wss://${ngrokDomain}/graphql`,
});

export const client = createClient({
  url: `https://${ngrokDomain}/graphql`,
  exchanges: [
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
    multipartFetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(
            { query: operation.query, variables: operation.variables },
            sink
          ),
        }),
      }),
    }),
  ],
});

type Props = {
  children: React.ReactNode;
};
const UrqlProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
