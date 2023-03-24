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

export type ChangePasswordInputType = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};

export type ChangePasswordObjectType = {
  __typename?: 'ChangePasswordObjectType';
  error?: Maybe<ErrorType>;
  success: Scalars['Boolean'];
};

export type ChatMessagesInputType = {
  id: Scalars['String'];
};

export type ChatMessagesObjectType = {
  __typename?: 'ChatMessagesObjectType';
  chat?: Maybe<ChatType>;
};

export type ChatType = {
  __typename?: 'ChatType';
  chatId: Scalars['String'];
  chatTitle: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  messages?: Maybe<Array<MessageType>>;
  pet?: Maybe<PetType>;
  updatedAt: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type ChatsObjectType = {
  __typename?: 'ChatsObjectType';
  chats: Array<ChatType>;
  count: Scalars['Int'];
  unopened: Scalars['Int'];
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

export type DeletePetInputType = {
  id: Scalars['String'];
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
  me?: Maybe<UserType>;
};

export type MarkAsSoldInput = {
  id: Scalars['String'];
};

export type MarkNotificationAsReadInputType = {
  id: Scalars['String'];
};

export type MarkNotificationAsReadObjectType = {
  __typename?: 'MarkNotificationAsReadObjectType';
  success: Scalars['Boolean'];
};

export type MessageType = {
  __typename?: 'MessageType';
  chatId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
  opened: Scalars['Boolean'];
  sender?: Maybe<UserType>;
  senderId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add: PetObjectType;
  changePassword: ChangePasswordObjectType;
  commentToPet: PetObjectType;
  deletePet: PetObjectType;
  login: LoginObjectType;
  logout: Scalars['Boolean'];
  markAsSold: PetObjectType;
  markNotificationAsRead: MarkNotificationAsReadObjectType;
  newChat: NewChatObjectType;
  reactToComment: PetObjectType;
  reactToPet: PetObjectType;
  register: RegisterObjectType;
  replyToComment: PetObjectType;
  requestForgotPassword: RequestForgotPasswordEmailLinkObjectType;
  resendVerificationCode: ResendVerificationCodeObjectType;
  sayHello: Scalars['String'];
  sayHi: Scalars['String'];
  sendMessage: SendMessageObjectType;
  update: PetObjectType;
  updateAvatar: Scalars['Boolean'];
  updateUserInfo: UpdateUserInfoObjectType;
  verifyEmail: VerifyEmailObjectType;
};


export type MutationAddArgs = {
  input: NewPetInputType;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInputType;
};


export type MutationCommentToPetArgs = {
  input: CommentToPetInput;
};


export type MutationDeletePetArgs = {
  input: DeletePetInputType;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsSoldArgs = {
  input: MarkAsSoldInput;
};


export type MutationMarkNotificationAsReadArgs = {
  input: MarkNotificationAsReadInputType;
};


export type MutationNewChatArgs = {
  input: NewChatInputType;
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


export type MutationRequestForgotPasswordArgs = {
  input: RequestForgotPasswordEmailLinkInputType;
};


export type MutationSayHelloArgs = {
  message: Scalars['String'];
};


export type MutationSayHiArgs = {
  message: Scalars['String'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInputType;
};


export type MutationUpdateArgs = {
  input: UpdatePetInputType;
};


export type MutationUpdateAvatarArgs = {
  input: UpdateAvatarInputType;
};


export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInfoInputType;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInputType;
};

export type NewChatInputType = {
  message: Scalars['String'];
  petId: Scalars['String'];
  userId: Scalars['String'];
};

export type NewChatMessageSubscriptionInput = {
  userId: Scalars['String'];
};

export type NewChatMessageType = {
  __typename?: 'NewChatMessageType';
  userId: Scalars['String'];
};

export type NewChatObjectType = {
  __typename?: 'NewChatObjectType';
  chatId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type NewMessageSubscriptionInput = {
  userId: Scalars['String'];
};

export type NewMessageType = {
  __typename?: 'NewMessageType';
  message?: Maybe<MessageType>;
  userId: Scalars['String'];
};

export type NewNotificationSubscriptionInput = {
  userId: Scalars['String'];
};

export type NewNotificationType = {
  __typename?: 'NewNotificationType';
  notification?: Maybe<NotificationType>;
  userId: Scalars['String'];
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

export type NotificationObjectType = {
  __typename?: 'NotificationObjectType';
  notifications: Array<NotificationType>;
  total: Scalars['Int'];
  unread: Scalars['Int'];
};

export type NotificationType = {
  __typename?: 'NotificationType';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  notification: Scalars['String'];
  petId?: Maybe<Scalars['String']>;
  read: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user?: Maybe<UserType>;
  userId: Scalars['String'];
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
  chat: ChatMessagesObjectType;
  chats: ChatsObjectType;
  getCategoryPets: PetsObjectType;
  getPetById?: Maybe<PetObjectType>;
  hello: Scalars['String'];
  me?: Maybe<UserType>;
  notifications: NotificationObjectType;
  user: UserType;
};


export type QueryChatArgs = {
  input: ChatMessagesInputType;
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterObjectType = {
  __typename?: 'RegisterObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
};

export type ReplyToCommentInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type RequestForgotPasswordEmailLinkInputType = {
  email: Scalars['String'];
};

export type RequestForgotPasswordEmailLinkObjectType = {
  __typename?: 'RequestForgotPasswordEmailLinkObjectType';
  error?: Maybe<ErrorType>;
  success: Scalars['Boolean'];
};

export type ResendVerificationCodeObjectType = {
  __typename?: 'ResendVerificationCodeObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
};

export type SendMessageInputType = {
  chatId: Scalars['String'];
  message: Scalars['String'];
};

export type SendMessageObjectType = {
  __typename?: 'SendMessageObjectType';
  success: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newChatMessage: NewChatMessageType;
  newMessage: NewMessageType;
  newNotification: NewNotificationType;
  notify: Scalars['String'];
  onUserStateChange?: Maybe<Scalars['Boolean']>;
  petInteraction: PetInteractionType;
};


export type SubscriptionNewChatMessageArgs = {
  input: NewChatMessageSubscriptionInput;
};


export type SubscriptionNewMessageArgs = {
  input: NewMessageSubscriptionInput;
};


export type SubscriptionNewNotificationArgs = {
  input: NewNotificationSubscriptionInput;
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

export type UpdateUserInfoInputType = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UpdateUserInfoObjectType = {
  __typename?: 'UpdateUserInfoObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  avatar?: Maybe<Scalars['String']>;
  chats?: Maybe<Array<ChatType>>;
  createAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isLoggedIn: Scalars['Boolean'];
  lastName: Scalars['String'];
  notifications?: Maybe<Array<NotificationType>>;
  pets?: Maybe<Array<PetType>>;
  updateAt?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type VerifyEmailInputType = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type VerifyEmailObjectType = {
  __typename?: 'VerifyEmailObjectType';
  error?: Maybe<ErrorType>;
  jwt?: Maybe<Scalars['String']>;
  me?: Maybe<UserType>;
};

export type ChatFragmentFragment = { __typename?: 'ChatType', id: string, userIds: Array<string>, chatId: string, chatTitle: string, createdAt: string, updatedAt: string, pet?: { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null } | null, messages?: Array<{ __typename?: 'MessageType', id: string, message: string, chatId: string, senderId: string, opened: boolean, createdAt: string, updatedAt: string, sender?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null };

export type CommentFragmentFragment = { __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type ErrorFragmentFragment = { __typename?: 'ErrorType', field: string, message: string };

export type LocationFragmentFragment = { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null };

export type MessageFragmentFragment = { __typename?: 'MessageType', id: string, message: string, chatId: string, senderId: string, opened: boolean, createdAt: string, updatedAt: string, sender?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type NewNotificationFragmentFragment = { __typename?: 'NotificationType', id: string, notification: string, userId: string, read: boolean, createdAt: string, updatedAt: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type NotificationFragmentFragment = { __typename?: 'NotificationType', id: string, notification: string, title: string, userId: string, read: boolean, petId?: string | null, createdAt: string, updatedAt: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type PetFragmentFragment = { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null };

export type ReactionFragmentFragment = { __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type UserFragmentFragment = { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInputType;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordObjectType', success: boolean, error?: { __typename?: 'ErrorType', field: string, message: string } | null } };

export type CommentToPetMutationVariables = Exact<{
  input: CommentToPetInput;
}>;


export type CommentToPetMutation = { __typename?: 'Mutation', commentToPet: { __typename?: 'PetObjectType', success: boolean } };

export type DeletePetMutationVariables = Exact<{
  input: DeletePetInputType;
}>;


export type DeletePetMutation = { __typename?: 'Mutation', deletePet: { __typename?: 'PetObjectType', success: boolean } };

export type SayHelloMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type SayHelloMutation = { __typename?: 'Mutation', sayHello: string };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MarkAsSoldMutationVariables = Exact<{
  input: MarkAsSoldInput;
}>;


export type MarkAsSoldMutation = { __typename?: 'Mutation', markAsSold: { __typename?: 'PetObjectType', success: boolean } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  input: MarkNotificationAsReadInputType;
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'MarkNotificationAsReadObjectType', success: boolean } };

export type NewChatMutationVariables = Exact<{
  input: NewChatInputType;
}>;


export type NewChatMutation = { __typename?: 'Mutation', newChat: { __typename?: 'NewChatObjectType', success: boolean, chatId?: string | null } };

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


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } };

export type ReplyCommentMutationVariables = Exact<{
  input: ReplyToCommentInput;
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyToComment: { __typename?: 'PetObjectType', success: boolean } };

export type RequestForgotPasswordLinkMutationVariables = Exact<{
  input: RequestForgotPasswordEmailLinkInputType;
}>;


export type RequestForgotPasswordLinkMutation = { __typename?: 'Mutation', requestForgotPassword: { __typename?: 'RequestForgotPasswordEmailLinkObjectType', success: boolean, error?: { __typename?: 'ErrorType', field: string, message: string } | null } };

export type ResendVerificationCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendVerificationCodeMutation = { __typename?: 'Mutation', resendVerificationCode: { __typename?: 'ResendVerificationCodeObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInputType;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageObjectType', success: boolean } };

export type UpdateProfileAvatarMutationVariables = Exact<{
  input: UpdateAvatarInputType;
}>;


export type UpdateProfileAvatarMutation = { __typename?: 'Mutation', updateAvatar: boolean };

export type UpdatePetMutationVariables = Exact<{
  input: UpdatePetInputType;
}>;


export type UpdatePetMutation = { __typename?: 'Mutation', update: { __typename?: 'PetObjectType', success: boolean } };

export type UpdateUserInfoMutationVariables = Exact<{
  input: UpdateUserInfoInputType;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo: { __typename?: 'UpdateUserInfoObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInputType;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailObjectType', jwt?: string | null, error?: { __typename?: 'ErrorType', field: string, message: string } | null, me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } };

export type ChatMessagesQueryVariables = Exact<{
  input: ChatMessagesInputType;
}>;


export type ChatMessagesQuery = { __typename?: 'Query', chat: { __typename?: 'ChatMessagesObjectType', chat?: { __typename?: 'ChatType', id: string, userIds: Array<string>, chatId: string, chatTitle: string, createdAt: string, updatedAt: string, pet?: { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null } | null, messages?: Array<{ __typename?: 'MessageType', id: string, message: string, chatId: string, senderId: string, opened: boolean, createdAt: string, updatedAt: string, sender?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null } | null } };

export type MyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyChatsQuery = { __typename?: 'Query', chats: { __typename?: 'ChatsObjectType', count: number, unopened: number, chats: Array<{ __typename?: 'ChatType', id: string, userIds: Array<string>, chatId: string, chatTitle: string, createdAt: string, updatedAt: string, pet?: { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null } | null, messages?: Array<{ __typename?: 'MessageType', id: string, message: string, chatId: string, senderId: string, opened: boolean, createdAt: string, updatedAt: string, sender?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null }> } };

export type GetPetByIdQueryVariables = Exact<{
  input: GetPetByIdInput;
}>;


export type GetPetByIdQuery = { __typename?: 'Query', getPetById?: { __typename?: 'PetObjectType', success: boolean, pet?: { __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null } | null } | null };

export type GetPetsByCategoryQueryVariables = Exact<{
  input: GetCategoryPetsInput;
}>;


export type GetPetsByCategoryQuery = { __typename?: 'Query', getCategoryPets: { __typename?: 'PetsObjectType', count: number, pets?: Array<{ __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null }> | null } };

export type HelloQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationObjectType', total: number, unread: number, notifications: Array<{ __typename?: 'NotificationType', id: string, notification: string, title: string, userId: string, read: boolean, petId?: string | null, createdAt: string, updatedAt: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> } };

export type GetUserQueryVariables = Exact<{
  input: GetUserByIdInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null, pets?: Array<{ __typename?: 'PetType', id: string, name: string, age: number, description: string, gender: string, image: string, category: string, sold: boolean, price: number, createdAt: string, updatedAt: string, seller?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null, location?: { __typename?: 'LocationType', id: string, lat?: number | null, lon?: number | null, createAt?: string | null, updateAt?: string | null } | null, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, createdAt: string, updatedAt: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, comments?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, replies?: Array<{ __typename?: 'CommentType', id: string, comment: string, createdAt: string, updatedAt: string, reactions?: Array<{ __typename?: 'ReactionType', id: string, reaction: string, userId: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null }> | null }> | null } };

export type NewChatMessageSubscriptionVariables = Exact<{
  input: NewChatMessageSubscriptionInput;
}>;


export type NewChatMessageSubscription = { __typename?: 'Subscription', newChatMessage: { __typename?: 'NewChatMessageType', userId: string } };

export type NewNotificationSubscriptionVariables = Exact<{
  input: NewNotificationSubscriptionInput;
}>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'NewNotificationType', userId: string, notification?: { __typename?: 'NotificationType', id: string, notification: string, userId: string, read: boolean, createdAt: string, updatedAt: string, user?: { __typename?: 'UserType', id: string, email: string, avatar?: string | null, firstName: string, lastName: string, emailVerified: boolean, verified: boolean, isLoggedIn: boolean, createAt?: string | null, updateAt?: string | null } | null } | null } };

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
    avatar
    firstName
    lastName
    verified
    isLoggedIn
    createAt
    updateAt
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
      id
      email
      avatar
      firstName
      lastName
      verified
      isLoggedIn
      createAt
      updateAt
    }
  }
  replies {
    reactions {
      id
      reaction
      userId
      user {
        id
        email
        avatar
        firstName
        lastName
        verified
        isLoggedIn
        createAt
        updateAt
      }
    }
    user {
      id
      email
      avatar
      firstName
      lastName
      verified
      isLoggedIn
      createAt
      updateAt
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
    firstName
    lastName
    verified
    isLoggedIn
    createAt
    updateAt
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
    email
    avatar
    firstName
    lastName
    verified
    isLoggedIn
    createAt
    updateAt
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
  avatar
  firstName
  lastName
  emailVerified
  verified
  isLoggedIn
  createAt
  updateAt
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on MessageType {
  id
  message
  chatId
  senderId
  opened
  sender {
    ...UserFragment
  }
  createdAt
  updatedAt
}
    ${UserFragmentFragmentDoc}`;
export const ChatFragmentFragmentDoc = gql`
    fragment ChatFragment on ChatType {
  id
  userIds
  chatId
  chatTitle
  pet {
    ...PetFragment
  }
  messages {
    ...MessageFragment
  }
  createdAt
  updatedAt
}
    ${PetFragmentFragmentDoc}
${MessageFragmentFragmentDoc}`;
export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorType {
  field
  message
}
    `;
export const NewNotificationFragmentFragmentDoc = gql`
    fragment NewNotificationFragment on NotificationType {
  id
  notification
  userId
  read
  createdAt
  updatedAt
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const NotificationFragmentFragmentDoc = gql`
    fragment NotificationFragment on NotificationType {
  id
  notification
  title
  userId
  read
  petId
  createdAt
  updatedAt
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInputType!) {
  changePassword(input: $input) {
    error {
      ...ErrorFragment
    }
    success
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
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
export const DeletePetDocument = gql`
    mutation DeletePet($input: DeletePetInputType!) {
  deletePet(input: $input) {
    success
  }
}
    `;

export function useDeletePetMutation() {
  return Urql.useMutation<DeletePetMutation, DeletePetMutationVariables>(DeletePetDocument);
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
export const MarkAsSoldDocument = gql`
    mutation MarkAsSold($input: MarkAsSoldInput!) {
  markAsSold(input: $input) {
    success
  }
}
    `;

export function useMarkAsSoldMutation() {
  return Urql.useMutation<MarkAsSoldMutation, MarkAsSoldMutationVariables>(MarkAsSoldDocument);
};
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($input: MarkNotificationAsReadInputType!) {
  markNotificationAsRead(input: $input) {
    success
  }
}
    `;

export function useMarkNotificationAsReadMutation() {
  return Urql.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument);
};
export const NewChatDocument = gql`
    mutation NewChat($input: NewChatInputType!) {
  newChat(input: $input) {
    success
    chatId
  }
}
    `;

export function useNewChatMutation() {
  return Urql.useMutation<NewChatMutation, NewChatMutationVariables>(NewChatDocument);
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
      ...UserFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

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
export const RequestForgotPasswordLinkDocument = gql`
    mutation RequestForgotPasswordLink($input: RequestForgotPasswordEmailLinkInputType!) {
  requestForgotPassword(input: $input) {
    error {
      ...ErrorFragment
    }
    success
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useRequestForgotPasswordLinkMutation() {
  return Urql.useMutation<RequestForgotPasswordLinkMutation, RequestForgotPasswordLinkMutationVariables>(RequestForgotPasswordLinkDocument);
};
export const ResendVerificationCodeDocument = gql`
    mutation ResendVerificationCode {
  resendVerificationCode {
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

export function useResendVerificationCodeMutation() {
  return Urql.useMutation<ResendVerificationCodeMutation, ResendVerificationCodeMutationVariables>(ResendVerificationCodeDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($input: SendMessageInputType!) {
  sendMessage(input: $input) {
    success
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
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
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($input: UpdateUserInfoInputType!) {
  updateUserInfo(input: $input) {
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

export function useUpdateUserInfoMutation() {
  return Urql.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument);
};
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($input: VerifyEmailInputType!) {
  verifyEmail(input: $input) {
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

export function useVerifyEmailMutation() {
  return Urql.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument);
};
export const ChatMessagesDocument = gql`
    query ChatMessages($input: ChatMessagesInputType!) {
  chat(input: $input) {
    chat {
      ...ChatFragment
    }
  }
}
    ${ChatFragmentFragmentDoc}`;

export function useChatMessagesQuery(options: Omit<Urql.UseQueryArgs<ChatMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<ChatMessagesQuery, ChatMessagesQueryVariables>({ query: ChatMessagesDocument, ...options });
};
export const MyChatsDocument = gql`
    query MyChats {
  chats {
    chats {
      ...ChatFragment
    }
    count
    unopened
  }
}
    ${ChatFragmentFragmentDoc}`;

export function useMyChatsQuery(options?: Omit<Urql.UseQueryArgs<MyChatsQueryVariables>, 'query'>) {
  return Urql.useQuery<MyChatsQuery, MyChatsQueryVariables>({ query: MyChatsDocument, ...options });
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
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    total
    unread
    notifications {
      ...NotificationFragment
    }
  }
}
    ${NotificationFragmentFragmentDoc}`;

export function useNotificationsQuery(options?: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<NotificationsQuery, NotificationsQueryVariables>({ query: NotificationsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($input: GetUserByIdInput!) {
  user(input: $input) {
    id
    email
    avatar
    firstName
    lastName
    verified
    isLoggedIn
    createAt
    updateAt
    pets {
      ...PetFragment
    }
  }
}
    ${PetFragmentFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const NewChatMessageDocument = gql`
    subscription NewChatMessage($input: NewChatMessageSubscriptionInput!) {
  newChatMessage(input: $input) {
    userId
  }
}
    `;

export function useNewChatMessageSubscription<TData = NewChatMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewChatMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewChatMessageSubscription, TData>) {
  return Urql.useSubscription<NewChatMessageSubscription, TData, NewChatMessageSubscriptionVariables>({ query: NewChatMessageDocument, ...options }, handler);
};
export const NewNotificationDocument = gql`
    subscription NewNotification($input: NewNotificationSubscriptionInput!) {
  newNotification(input: $input) {
    notification {
      ...NewNotificationFragment
    }
    userId
  }
}
    ${NewNotificationFragmentFragmentDoc}`;

export function useNewNotificationSubscription<TData = NewNotificationSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewNotificationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewNotificationSubscription, TData>) {
  return Urql.useSubscription<NewNotificationSubscription, TData, NewNotificationSubscriptionVariables>({ query: NewNotificationDocument, ...options }, handler);
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