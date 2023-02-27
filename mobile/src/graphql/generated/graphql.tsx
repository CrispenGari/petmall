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
  Upload: any;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetCategoryPetsInput = {
  category: Scalars['String'];
};

export type LocationInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  isoCountryCode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  subregion?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginObjectType = {
  __typename?: 'LoginObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<MeObjectType>;
};

export type MeObjectType = {
  __typename?: 'MeObjectType';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add?: Maybe<PetObjectType>;
  login: LoginObjectType;
  logout: Scalars['Boolean'];
  register: RegisterObjectType;
};


export type MutationAddArgs = {
  input: NewPetInputType;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type NewPetInputType = {
  age: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  image: Scalars['Upload'];
  location?: InputMaybe<LocationInput>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type PetObjectType = {
  __typename?: 'PetObjectType';
  age: Scalars['Int'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sold: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getCategoryPets: Array<PetObjectType>;
  hello: Scalars['String'];
  me?: Maybe<MeObjectType>;
};


export type QueryGetCategoryPetsArgs = {
  input: GetCategoryPetsInput;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterObjectType = {
  __typename?: 'RegisterObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<MeObjectType>;
};

export type ErrorFragmentFragment = { __typename?: 'ErrorType', field: string, message: string };

export type UserFragmentFragment = { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type NewPetMutationVariables = Exact<{
  input: NewPetInputType;
}>;


export type NewPetMutation = { __typename?: 'Mutation', add?: { __typename?: 'PetObjectType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null } };

export type GetPetsByCategoryQueryVariables = Exact<{
  input: GetCategoryPetsInput;
}>;


export type GetPetsByCategoryQuery = { __typename?: 'Query', getCategoryPets: Array<{ __typename?: 'PetObjectType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string }> };

export type HelloQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorType {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on MeObjectType {
  id
  email
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    error {
      ...ErrorFragment
    }
    jwt
    me {
      ...UserFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const NewPetDocument = gql`
    mutation NewPet($input: NewPetInputType!) {
  add(input: $input) {
    id
    name
    age
    description
    gender
    image
    category
    sold
    price
    createdAt
  }
}
    `;

export function useNewPetMutation() {
  return Urql.useMutation<NewPetMutation, NewPetMutationVariables>(NewPetDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    error {
      ...ErrorFragment
    }
    jwt
    me {
      ...UserFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetPetsByCategoryDocument = gql`
    query GetPetsByCategory($input: GetCategoryPetsInput!) {
  getCategoryPets(input: $input) {
    id
    name
    age
    description
    gender
    image
    category
    sold
    price
    createdAt
  }
}
    `;

export function useGetPetsByCategoryQuery(options: Omit<Urql.UseQueryArgs<GetPetsByCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPetsByCategoryQuery, GetPetsByCategoryQueryVariables>({ query: GetPetsByCategoryDocument, ...options });
};
export const HelloDocument = gql`
    query Hello($name: String!) {
  hello(name: $name)
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};