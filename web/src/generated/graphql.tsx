import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  finishDate?: Maybe<Scalars['DateTimeISO']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logs: Array<ReadingLog>;
  notes?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Float']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['DateTimeISO']['output']>;
  status: BookStatus;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type BookInput = {
  author: Scalars['String']['input'];
  finishDate?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Scalars['Float']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status: BookStatus;
  summary?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

/** Available statuses for books */
export enum BookStatus {
  FINISHED = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LogInput = {
  bookId: Scalars['Int']['input'];
  date: Scalars['String']['input'];
  minutes?: InputMaybe<Scalars['Float']['input']>;
  pagesRead?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBook: Book;
  createDemoUser: Scalars['Boolean']['output'];
  createLog: ReadingLog;
  deleteBook: Scalars['Boolean']['output'];
  deleteLog: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateBook?: Maybe<Book>;
  updateLog?: Maybe<ReadingLog>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateBookArgs = {
  input: BookInput;
};


export type MutationCreateLogArgs = {
  input: LogInput;
};


export type MutationDeleteBookArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBookArgs = {
  id: Scalars['Int']['input'];
  input: BookInput;
};


export type MutationUpdateLogArgs = {
  id: Scalars['Int']['input'];
  input: LogInput;
};

export type PaginatedBooks = {
  __typename?: 'PaginatedBooks';
  books: Array<Book>;
  hasMore: Scalars['Boolean']['output'];
};

export type PaginatedLogs = {
  __typename?: 'PaginatedLogs';
  hasMore: Scalars['Boolean']['output'];
  logs: Array<ReadingLog>;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  bookLogs: PaginatedLogs;
  books: PaginatedBooks;
  booksByStatus: Array<Book>;
  currentUser?: Maybe<User>;
  log?: Maybe<ReadingLog>;
  userLogs: PaginatedLogs;
  userLogsWithoutPagination: Array<ReadingLog>;
};


export type QueryBookArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBookLogsArgs = {
  bookId: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryBooksArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryBooksByStatusArgs = {
  status: BookStatus;
};


export type QueryLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserLogsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};

export type ReadingLog = {
  __typename?: 'ReadingLog';
  book: Book;
  bookId: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  minutes?: Maybe<Scalars['Float']['output']>;
  pagesRead?: Maybe<Scalars['Float']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  books: Array<Book>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  logs: Array<ReadingLog>;
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type BookFragmentFragment = { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> };

export type LogFragmentFragment = { __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null, book: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> }, user: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } };

export type MinimalErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type MinimalUserFragment = { __typename?: 'User', id: number, username: string };

export type MinimalUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null };

export type UserFragmentFragment = { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type CreateBookMutationVariables = Exact<{
  input: BookInput;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, userId: number } };

export type CreateDemoUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateDemoUserMutation = { __typename?: 'Mutation', createDemoUser: boolean };

export type CreateLogMutationVariables = Exact<{
  input: LogInput;
}>;


export type CreateLogMutation = { __typename?: 'Mutation', createLog: { __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null, book: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> }, user: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } } };

export type DeleteBookMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: boolean };

export type DeleteLogMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteLogMutation = { __typename?: 'Mutation', deleteLog: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type UpdateBookMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: BookInput;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook?: { __typename?: 'Book', id: number, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number } | null };

export type UpdateLogMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: LogInput;
}>;


export type UpdateLogMutation = { __typename?: 'Mutation', updateLog?: { __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null, book: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> }, user: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } } | null };

export type BookQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type BookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> } | null };

export type BooksQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type BooksQuery = { __typename?: 'Query', books: { __typename?: 'PaginatedBooks', hasMore: boolean, books: Array<{ __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, user: { __typename?: 'User', createdAt: string, email: string, updatedAt: string, id: number, username: string } }> } };

export type BooksByStatusQueryVariables = Exact<{
  status: BookStatus;
}>;


export type BooksByStatusQuery = { __typename?: 'Query', booksByStatus: Array<{ __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, username: string } | null };

export type LogQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LogQuery = { __typename?: 'Query', log?: { __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null, book: { __typename?: 'Book', id: number, createdAt: string, updatedAt: string, title: string, author: string, status: BookStatus, publisher?: string | null, pages?: number | null, startDate?: any | null, finishDate?: any | null, notes?: string | null, summary?: string | null, genre?: string | null, rating?: number | null, userId: number, logs: Array<{ __typename?: 'ReadingLog', id: number }> }, user: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } } | null };

export type UserLogsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserLogsQuery = { __typename?: 'Query', userLogs: { __typename?: 'PaginatedLogs', hasMore: boolean, logs: Array<{ __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null }> } };

export type UserLogsWithoutPaginationQueryVariables = Exact<{ [key: string]: never; }>;


export type UserLogsWithoutPaginationQuery = { __typename?: 'Query', userLogsWithoutPagination: Array<{ __typename?: 'ReadingLog', id: number, date: any, bookId: number, userId: number, pagesRead?: number | null, minutes?: number | null }> };

export const BookFragmentFragmentDoc = gql`
    fragment BookFragment on Book {
  id
  createdAt
  updatedAt
  title
  author
  status
  publisher
  pages
  startDate
  finishDate
  notes
  summary
  genre
  rating
  userId
  logs {
    id
  }
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  createdAt
  updatedAt
  username
  email
}
    `;
export const LogFragmentFragmentDoc = gql`
    fragment LogFragment on ReadingLog {
  id
  date
  book {
    ...BookFragment
  }
  user {
    ...UserFragment
  }
  bookId
  userId
  pagesRead
  minutes
}
    ${BookFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export const MinimalErrorFragmentDoc = gql`
    fragment MinimalError on FieldError {
  field
  message
}
    `;
export const MinimalUserFragmentDoc = gql`
    fragment MinimalUser on User {
  id
  username
}
    `;
export const MinimalUserResponseFragmentDoc = gql`
    fragment MinimalUserResponse on UserResponse {
  errors {
    ...MinimalError
  }
  user {
    ...MinimalUser
  }
}
    ${MinimalErrorFragmentDoc}
${MinimalUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...MinimalUserResponse
  }
}
    ${MinimalUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($input: BookInput!) {
  createBook(input: $input) {
    id
    createdAt
    updatedAt
    title
    author
    status
    userId
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const CreateDemoUserDocument = gql`
    mutation CreateDemoUser {
  createDemoUser
}
    `;
export type CreateDemoUserMutationFn = Apollo.MutationFunction<CreateDemoUserMutation, CreateDemoUserMutationVariables>;

/**
 * __useCreateDemoUserMutation__
 *
 * To run a mutation, you first call `useCreateDemoUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDemoUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDemoUserMutation, { data, loading, error }] = useCreateDemoUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateDemoUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateDemoUserMutation, CreateDemoUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDemoUserMutation, CreateDemoUserMutationVariables>(CreateDemoUserDocument, options);
      }
export type CreateDemoUserMutationHookResult = ReturnType<typeof useCreateDemoUserMutation>;
export type CreateDemoUserMutationResult = Apollo.MutationResult<CreateDemoUserMutation>;
export type CreateDemoUserMutationOptions = Apollo.BaseMutationOptions<CreateDemoUserMutation, CreateDemoUserMutationVariables>;
export const CreateLogDocument = gql`
    mutation CreateLog($input: LogInput!) {
  createLog(input: $input) {
    ...LogFragment
  }
}
    ${LogFragmentFragmentDoc}`;
export type CreateLogMutationFn = Apollo.MutationFunction<CreateLogMutation, CreateLogMutationVariables>;

/**
 * __useCreateLogMutation__
 *
 * To run a mutation, you first call `useCreateLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLogMutation, { data, loading, error }] = useCreateLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateLogMutation, CreateLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLogMutation, CreateLogMutationVariables>(CreateLogDocument, options);
      }
export type CreateLogMutationHookResult = ReturnType<typeof useCreateLogMutation>;
export type CreateLogMutationResult = Apollo.MutationResult<CreateLogMutation>;
export type CreateLogMutationOptions = Apollo.BaseMutationOptions<CreateLogMutation, CreateLogMutationVariables>;
export const DeleteBookDocument = gql`
    mutation DeleteBook($id: Int!) {
  deleteBook(id: $id)
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const DeleteLogDocument = gql`
    mutation DeleteLog($id: Int!) {
  deleteLog(id: $id)
}
    `;
export type DeleteLogMutationFn = Apollo.MutationFunction<DeleteLogMutation, DeleteLogMutationVariables>;

/**
 * __useDeleteLogMutation__
 *
 * To run a mutation, you first call `useDeleteLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLogMutation, { data, loading, error }] = useDeleteLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLogMutation, DeleteLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLogMutation, DeleteLogMutationVariables>(DeleteLogDocument, options);
      }
export type DeleteLogMutationHookResult = ReturnType<typeof useDeleteLogMutation>;
export type DeleteLogMutationResult = Apollo.MutationResult<DeleteLogMutation>;
export type DeleteLogMutationOptions = Apollo.BaseMutationOptions<DeleteLogMutation, DeleteLogMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...MinimalUserResponse
  }
}
    ${MinimalUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...MinimalUserResponse
  }
}
    ${MinimalUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateBookDocument = gql`
    mutation UpdateBook($id: Int!, $input: BookInput!) {
  updateBook(id: $id, input: $input) {
    id
    title
    author
    status
    publisher
    pages
    startDate
    finishDate
    notes
    summary
    genre
    rating
    userId
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const UpdateLogDocument = gql`
    mutation UpdateLog($id: Int!, $input: LogInput!) {
  updateLog(id: $id, input: $input) {
    ...LogFragment
  }
}
    ${LogFragmentFragmentDoc}`;
export type UpdateLogMutationFn = Apollo.MutationFunction<UpdateLogMutation, UpdateLogMutationVariables>;

/**
 * __useUpdateLogMutation__
 *
 * To run a mutation, you first call `useUpdateLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLogMutation, { data, loading, error }] = useUpdateLogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLogMutation, UpdateLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLogMutation, UpdateLogMutationVariables>(UpdateLogDocument, options);
      }
export type UpdateLogMutationHookResult = ReturnType<typeof useUpdateLogMutation>;
export type UpdateLogMutationResult = Apollo.MutationResult<UpdateLogMutation>;
export type UpdateLogMutationOptions = Apollo.BaseMutationOptions<UpdateLogMutation, UpdateLogMutationVariables>;
export const BookDocument = gql`
    query Book($id: Int!) {
  book(id: $id) {
    ...BookFragment
  }
}
    ${BookFragmentFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export function useBookSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookSuspenseQueryHookResult = ReturnType<typeof useBookSuspenseQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BooksDocument = gql`
    query Books($limit: Int!, $cursor: String) {
  books(cursor: $cursor, limit: $limit) {
    hasMore
    books {
      id
      createdAt
      updatedAt
      title
      author
      publisher
      pages
      startDate
      finishDate
      notes
      summary
      genre
      rating
      userId
      user {
        ...MinimalUser
        createdAt
        email
        updatedAt
      }
    }
  }
}
    ${MinimalUserFragmentDoc}`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useBooksQuery(baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export function useBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksSuspenseQueryHookResult = ReturnType<typeof useBooksSuspenseQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const BooksByStatusDocument = gql`
    query BooksByStatus($status: BookStatus!) {
  booksByStatus(status: $status) {
    ...BookFragment
  }
}
    ${BookFragmentFragmentDoc}`;

/**
 * __useBooksByStatusQuery__
 *
 * To run a query within a React component, call `useBooksByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useBooksByStatusQuery(baseOptions: Apollo.QueryHookOptions<BooksByStatusQuery, BooksByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksByStatusQuery, BooksByStatusQueryVariables>(BooksByStatusDocument, options);
      }
export function useBooksByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksByStatusQuery, BooksByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksByStatusQuery, BooksByStatusQueryVariables>(BooksByStatusDocument, options);
        }
export function useBooksByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BooksByStatusQuery, BooksByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BooksByStatusQuery, BooksByStatusQueryVariables>(BooksByStatusDocument, options);
        }
export type BooksByStatusQueryHookResult = ReturnType<typeof useBooksByStatusQuery>;
export type BooksByStatusLazyQueryHookResult = ReturnType<typeof useBooksByStatusLazyQuery>;
export type BooksByStatusSuspenseQueryHookResult = ReturnType<typeof useBooksByStatusSuspenseQuery>;
export type BooksByStatusQueryResult = Apollo.QueryResult<BooksByStatusQuery, BooksByStatusQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...MinimalUser
  }
}
    ${MinimalUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LogDocument = gql`
    query Log($id: Int!) {
  log(id: $id) {
    ...LogFragment
  }
}
    ${LogFragmentFragmentDoc}`;

/**
 * __useLogQuery__
 *
 * To run a query within a React component, call `useLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLogQuery(baseOptions: Apollo.QueryHookOptions<LogQuery, LogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogQuery, LogQueryVariables>(LogDocument, options);
      }
export function useLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogQuery, LogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogQuery, LogQueryVariables>(LogDocument, options);
        }
export function useLogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogQuery, LogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogQuery, LogQueryVariables>(LogDocument, options);
        }
export type LogQueryHookResult = ReturnType<typeof useLogQuery>;
export type LogLazyQueryHookResult = ReturnType<typeof useLogLazyQuery>;
export type LogSuspenseQueryHookResult = ReturnType<typeof useLogSuspenseQuery>;
export type LogQueryResult = Apollo.QueryResult<LogQuery, LogQueryVariables>;
export const UserLogsDocument = gql`
    query UserLogs($limit: Int!, $cursor: String) {
  userLogs(cursor: $cursor, limit: $limit) {
    hasMore
    logs {
      id
      date
      bookId
      userId
      pagesRead
      minutes
    }
  }
}
    `;

/**
 * __useUserLogsQuery__
 *
 * To run a query within a React component, call `useUserLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserLogsQuery(baseOptions: Apollo.QueryHookOptions<UserLogsQuery, UserLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLogsQuery, UserLogsQueryVariables>(UserLogsDocument, options);
      }
export function useUserLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserLogsQuery, UserLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLogsQuery, UserLogsQueryVariables>(UserLogsDocument, options);
        }
export function useUserLogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserLogsQuery, UserLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserLogsQuery, UserLogsQueryVariables>(UserLogsDocument, options);
        }
export type UserLogsQueryHookResult = ReturnType<typeof useUserLogsQuery>;
export type UserLogsLazyQueryHookResult = ReturnType<typeof useUserLogsLazyQuery>;
export type UserLogsSuspenseQueryHookResult = ReturnType<typeof useUserLogsSuspenseQuery>;
export type UserLogsQueryResult = Apollo.QueryResult<UserLogsQuery, UserLogsQueryVariables>;
export const UserLogsWithoutPaginationDocument = gql`
    query UserLogsWithoutPagination {
  userLogsWithoutPagination {
    id
    date
    bookId
    userId
    pagesRead
    minutes
  }
}
    `;

/**
 * __useUserLogsWithoutPaginationQuery__
 *
 * To run a query within a React component, call `useUserLogsWithoutPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLogsWithoutPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLogsWithoutPaginationQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserLogsWithoutPaginationQuery(baseOptions?: Apollo.QueryHookOptions<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>(UserLogsWithoutPaginationDocument, options);
      }
export function useUserLogsWithoutPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>(UserLogsWithoutPaginationDocument, options);
        }
export function useUserLogsWithoutPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>(UserLogsWithoutPaginationDocument, options);
        }
export type UserLogsWithoutPaginationQueryHookResult = ReturnType<typeof useUserLogsWithoutPaginationQuery>;
export type UserLogsWithoutPaginationLazyQueryHookResult = ReturnType<typeof useUserLogsWithoutPaginationLazyQuery>;
export type UserLogsWithoutPaginationSuspenseQueryHookResult = ReturnType<typeof useUserLogsWithoutPaginationSuspenseQuery>;
export type UserLogsWithoutPaginationQueryResult = Apollo.QueryResult<UserLogsWithoutPaginationQuery, UserLogsWithoutPaginationQueryVariables>;