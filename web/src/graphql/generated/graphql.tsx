import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterObjectType;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  isWeb: Scalars['Boolean'];
  password: Scalars['String'];
};

export type RegisterObjectType = {
  __typename?: 'RegisterObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null } };

export type HelloQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    

export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    error {
      field
      message
    }
    jwt
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const HelloDocument = gql`
    query Hello($name: String!) {
  hello(name: $name)
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};