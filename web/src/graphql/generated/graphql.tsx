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

export type CommentToPetInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
};

export type CommentType = {
  __typename?: 'CommentType';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reactions?: Maybe<Array<ReactionType>>;
  replies?: Maybe<Array<CommentType>>;
  updatedAt: Scalars['String'];
  user?: Maybe<UserType>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetCategoryPetsInput = {
  category: Scalars['String'];
};

export type GetPetByIdInput = {
  id: Scalars['String'];
};

export type GetUserByIdInput = {
  id: Scalars['String'];
};

export type LocationInput = {
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type LocationType = {
  __typename?: 'LocationType';
  createAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  pet?: Maybe<PetType>;
  updateAt?: Maybe<Scalars['String']>;
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

export type MarkAsSoldInput = {
  id: Scalars['String'];
};

export type MeObjectType = {
  __typename?: 'MeObjectType';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add: PetObjectType;
  commentToPet: PetObjectType;
  login: LoginObjectType;
  logout: Scalars['Boolean'];
  markAsSold: PetObjectType;
  reactToComment: PetObjectType;
  reactToPet: PetObjectType;
  register: RegisterObjectType;
  replyToComment: PetObjectType;
  sayHello: Scalars['String'];
  sayHi: Scalars['String'];
  update: PetObjectType;
  updateAvatar: Scalars['Boolean'];
  updateUserInfo: Scalars['Boolean'];
};


export type MutationAddArgs = {
  input: NewPetInputType;
};


export type MutationCommentToPetArgs = {
  input: CommentToPetInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsSoldArgs = {
  input: MarkAsSoldInput;
};


export type MutationReactToCommentArgs = {
  input: ReactToCommentInput;
};


export type MutationReactToPetArgs = {
  input: ReactToPetInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationReplyToCommentArgs = {
  input: ReplyToCommentInput;
};


export type MutationSayHelloArgs = {
  message: Scalars['String'];
};


export type MutationSayHiArgs = {
  message: Scalars['String'];
};


export type MutationUpdateArgs = {
  input: UpdatePetInputType;
};


export type MutationUpdateAvatarArgs = {
  input: UpdateAvatarInputType;
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

export type PetInteractionType = {
  __typename?: 'PetInteractionType';
  petId: Scalars['String'];
};

export type PetObjectType = {
  __typename?: 'PetObjectType';
  pet?: Maybe<PetType>;
  success: Scalars['Boolean'];
};

export type PetType = {
  __typename?: 'PetType';
  age: Scalars['Int'];
  category: Scalars['String'];
  comments?: Maybe<Array<CommentType>>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  location?: Maybe<LocationType>;
  name: Scalars['String'];
  price: Scalars['Float'];
  reactions?: Maybe<Array<ReactionType>>;
  seller?: Maybe<UserType>;
  sold: Scalars['Boolean'];
  updatedAt: Scalars['String'];
};

export type PetsObjectType = {
  __typename?: 'PetsObjectType';
  count: Scalars['Int'];
  pets?: Maybe<Array<PetType>>;
};

export type Query = {
  __typename?: 'Query';
  getCategoryPets: PetsObjectType;
  getPetById?: Maybe<PetObjectType>;
  hello: Scalars['String'];
  me?: Maybe<MeObjectType>;
  user: UserObjectType;
};


export type QueryGetCategoryPetsArgs = {
  input: GetCategoryPetsInput;
};


export type QueryGetPetByIdArgs = {
  input: GetPetByIdInput;
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  input: GetUserByIdInput;
};

export type ReactToCommentInput = {
  id: Scalars['String'];
  reaction: Scalars['String'];
};

export type ReactToPetInput = {
  id: Scalars['String'];
  reaction: Scalars['String'];
};

export type ReactionType = {
  __typename?: 'ReactionType';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  reaction: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<UserType>;
  userId: Scalars['String'];
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

export type ReplyToCommentInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  notify: Scalars['String'];
  onUserStateChange?: Maybe<Scalars['Boolean']>;
  petInteraction: PetInteractionType;
};


export type SubscriptionOnUserStateChangeArgs = {
  userId: Scalars['String'];
};

export type UpdateAvatarInputType = {
  avatar: Scalars['Upload'];
};

export type UpdatePetInputType = {
  age: Scalars['Int'];
  category: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  image?: InputMaybe<Scalars['Upload']>;
  location?: InputMaybe<LocationInput>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  pets: Array<PetType>;
  updatedAt: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  avatar?: Maybe<Scalars['String']>;
  createAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  pets?: Maybe<Array<PetType>>;
  updateAt?: Maybe<Scalars['String']>;
};

export type CommentFragmentFragment = { __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, id: string, avatar?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, avatar?: string | null, id: string } | null }> | null, user?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email?: string | null, avatar?: string | null } | null };

export type ErrorFragmentFragment = { __typename?: 'ErrorType', field: string, message: string };

export type LocationFragmentFragment = { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null };

export type MeFragmentFragment = { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string };

export type PetFragmentFragment = { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, id: string, avatar?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, avatar?: string | null, id: string } | null }> | null, user?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email?: string | null, avatar?: string | null } | null }> | null };

export type ReactionFragmentFragment = { __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email?: string | null } | null };

export type UserFragmentFragment = { __typename?: 'UserType', id: string, email?: string | null, createAt?: string | null, updateAt?: string | null };

export type CommentToPetMutationVariables = Exact<{
  input: CommentToPetInput;
}>;


export type CommentToPetMutation = { __typename?: 'Mutation', commentToPet: { __typename?: 'PetObjectType', success: boolean } };

export type SayHelloMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type SayHelloMutation = { __typename?: 'Mutation', sayHello: string };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type NewPetMutationVariables = Exact<{
  input: NewPetInputType;
}>;


export type NewPetMutation = { __typename?: 'Mutation', add: { __typename?: 'PetObjectType', success: boolean } };

export type ReactToCommentMutationVariables = Exact<{
  input: ReactToCommentInput;
}>;


export type ReactToCommentMutation = { __typename?: 'Mutation', reactToComment: { __typename?: 'PetObjectType', success: boolean } };

export type ReactToPetMutationVariables = Exact<{
  input: ReactToPetInput;
}>;


export type ReactToPetMutation = { __typename?: 'Mutation', reactToPet: { __typename?: 'PetObjectType', success: boolean } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null } };

export type ReplyCommentMutationVariables = Exact<{
  input: ReplyToCommentInput;
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyToComment: { __typename?: 'PetObjectType', success: boolean } };

export type UpdateProfileAvatarMutationVariables = Exact<{
  input: UpdateAvatarInputType;
}>;


export type UpdateProfileAvatarMutation = { __typename?: 'Mutation', updateAvatar: boolean };

export type UpdatePetMutationVariables = Exact<{
  input: UpdatePetInputType;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', update: { __typename?: 'PetObjectType', success: boolean } };

export type GetPetByIdQueryVariables = Exact<{
  input: GetPetByIdInput;
}>;


export type GetPetByIdQuery = { __typename?: 'Query', getPetById?: { __typename?: 'PetObjectType', success: boolean, pet?: { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, id: string, avatar?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, avatar?: string | null, id: string } | null }> | null, user?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email?: string | null, avatar?: string | null } | null }> | null } | null } | null };

export type GetPetsByCategoryQueryVariables = Exact<{
  input: GetCategoryPetsInput;
}>;


export type GetPetsByCategoryQuery = { __typename?: 'Query', getCategoryPets: { __typename?: 'PetsObjectType', count: number, pets?: Array<{ __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, id: string, avatar?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, avatar?: string | null, id: string } | null }> | null, user?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email?: string | null, avatar?: string | null } | null }> | null }> | null } };

export type HelloQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'MeObjectType', id: string, email: string, createdAt: string, updatedAt: string } | null };

export type GetUserQueryVariables = Exact<{
  input: GetUserByIdInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserObjectType', id: string, email: string, avatar?: string | null, createdAt: string, updatedAt: string, pets: Array<{ __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, id: string, avatar?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', email?: string | null, avatar?: string | null, id: string } | null }> | null, user?: { __typename?: 'UserType', id: string, avatar?: string | null, email?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email?: string | null, avatar?: string | null } | null }> | null }> } };

export type NotificationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsSubscription = { __typename?: 'Subscription', notify: string };

export type PetInteractionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PetInteractionSubscription = { __typename?: 'Subscription', petInteraction: { __typename?: 'PetInteractionType', petId: string } };

export type OnUserStateChangeSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type OnUserStateChangeSubscription = { __typename?: 'Subscription', onUserStateChange?: boolean | null };


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
export const MeFragmentFragmentDoc = gql`
    fragment MeFragment on MeObjectType {
  id
  email
  createdAt
  updatedAt
}
    `;
export const LocationFragmentFragmentDoc = gql`
    fragment LocationFragment on LocationType {
  id
  lat
  lon
  createAt
  updateAt
}
    `;
export const ReactionFragmentFragmentDoc = gql`
    fragment ReactionFragment on ReactionType {
  id
  reaction
  createdAt
  updatedAt
  userId
  user {
    id
    email
  }
}
    `;
export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on CommentType {
  id
  comment
  createdAt
  updatedAt
  reactions {
    id
    reaction
    userId
    user {
      email
      id
      avatar
    }
  }
  replies {
    reactions {
      id
      reaction
      userId
      user {
        email
        avatar
        id
      }
    }
    user {
      id
      avatar
      email
    }
    id
    comment
    createdAt
    updatedAt
  }
  user {
    id
    email
    avatar
  }
}
    `;
export const PetFragmentFragmentDoc = gql`
    fragment PetFragment on PetType {
  id
  name
  age
  description
  gender
  image
  category
  sold
  price
  seller {
    id
    avatar
    email
  }
  location {
    ...LocationFragment
  }
  reactions {
    ...ReactionFragment
  }
  createdAt
  updatedAt
  comments {
    ...CommentFragment
  }
}
    ${LocationFragmentFragmentDoc}
${ReactionFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on UserType {
  id
  email
  createAt
  updateAt
}
    `;
export const CommentToPetDocument = gql`
    mutation CommentToPet($input: CommentToPetInput!) {
  commentToPet(input: $input) {
    success
  }
}
    `;

export function useCommentToPetMutation() {
  return Urql.useMutation<CommentToPetMutation, CommentToPetMutationVariables>(CommentToPetDocument);
};
export const SayHelloDocument = gql`
    mutation SayHello($message: String!) {
  sayHello(message: $message)
}
    `;

export function useSayHelloMutation() {
  return Urql.useMutation<SayHelloMutation, SayHelloMutationVariables>(SayHelloDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    error {
      ...ErrorFragment
    }
    jwt
    me {
      ...MeFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${MeFragmentFragmentDoc}`;

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
    success
  }
}
    `;

export function useNewPetMutation() {
  return Urql.useMutation<NewPetMutation, NewPetMutationVariables>(NewPetDocument);
};
export const ReactToCommentDocument = gql`
    mutation ReactToComment($input: ReactToCommentInput!) {
  reactToComment(input: $input) {
    success
  }
}
    `;

export function useReactToCommentMutation() {
  return Urql.useMutation<ReactToCommentMutation, ReactToCommentMutationVariables>(ReactToCommentDocument);
};
export const ReactToPetDocument = gql`
    mutation ReactToPet($input: ReactToPetInput!) {
  reactToPet(input: $input) {
    success
  }
}
    `;

export function useReactToPetMutation() {
  return Urql.useMutation<ReactToPetMutation, ReactToPetMutationVariables>(ReactToPetDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    error {
      ...ErrorFragment
    }
    jwt
    me {
      ...MeFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${MeFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ReplyCommentDocument = gql`
    mutation ReplyComment($input: ReplyToCommentInput!) {
  replyToComment(input: $input) {
    success
  }
}
    `;

export function useReplyCommentMutation() {
  return Urql.useMutation<ReplyCommentMutation, ReplyCommentMutationVariables>(ReplyCommentDocument);
};
export const UpdateProfileAvatarDocument = gql`
    mutation UpdateProfileAvatar($input: UpdateAvatarInputType!) {
  updateAvatar(input: $input)
}
    `;

export function useUpdateProfileAvatarMutation() {
  return Urql.useMutation<UpdateProfileAvatarMutation, UpdateProfileAvatarMutationVariables>(UpdateProfileAvatarDocument);
};
export const UpdatePetDocument = gql`
    mutation UpdatePet($input: UpdatePetInputType!) {
  update(input: $input) {
    success
  }
}
    `;

export function useUpdatePetMutation() {
  return Urql.useMutation<UpdatePetMutation, UpdatePetMutationVariables>(UpdatePetDocument);
};
export const GetPetByIdDocument = gql`
    query GetPetById($input: GetPetByIdInput!) {
  getPetById(input: $input) {
    pet {
      ...PetFragment
    }
    success
  }
}
    ${PetFragmentFragmentDoc}`;

export function useGetPetByIdQuery(options: Omit<Urql.UseQueryArgs<GetPetByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPetByIdQuery, GetPetByIdQueryVariables>({ query: GetPetByIdDocument, ...options });
};
export const GetPetsByCategoryDocument = gql`
    query GetPetsByCategory($input: GetCategoryPetsInput!) {
  getCategoryPets(input: $input) {
    pets {
      ...PetFragment
    }
    count
  }
}
    ${PetFragmentFragmentDoc}`;

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
    ...MeFragment
  }
}
    ${MeFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($input: GetUserByIdInput!) {
  user(input: $input) {
    id
    email
    avatar
    createdAt
    updatedAt
    pets {
      ...PetFragment
    }
  }
}
    ${PetFragmentFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const NotificationsDocument = gql`
    subscription Notifications {
  notify
}
    `;

export function useNotificationsSubscription<TData = NotificationsSubscription>(options: Omit<Urql.UseSubscriptionArgs<NotificationsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NotificationsSubscription, TData>) {
  return Urql.useSubscription<NotificationsSubscription, TData, NotificationsSubscriptionVariables>({ query: NotificationsDocument, ...options }, handler);
};
export const PetInteractionDocument = gql`
    subscription PetInteraction {
  petInteraction {
    petId
  }
}
    `;

export function usePetInteractionSubscription<TData = PetInteractionSubscription>(options: Omit<Urql.UseSubscriptionArgs<PetInteractionSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<PetInteractionSubscription, TData>) {
  return Urql.useSubscription<PetInteractionSubscription, TData, PetInteractionSubscriptionVariables>({ query: PetInteractionDocument, ...options }, handler);
};
export const OnUserStateChangeDocument = gql`
    subscription OnUserStateChange($userId: String!) {
  onUserStateChange(userId: $userId)
}
    `;

export function useOnUserStateChangeSubscription<TData = OnUserStateChangeSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnUserStateChangeSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnUserStateChangeSubscription, TData>) {
  return Urql.useSubscription<OnUserStateChangeSubscription, TData, OnUserStateChangeSubscriptionVariables>({ query: OnUserStateChangeDocument, ...options }, handler);
};