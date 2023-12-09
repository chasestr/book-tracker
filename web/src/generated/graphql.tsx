import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: any; output: any };
};

export type Book = {
  __typename?: "Book";
  author: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  finishDate?: Maybe<Scalars["DateTimeISO"]["output"]>;
  genre?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  pages?: Maybe<Scalars["Float"]["output"]>;
  publisher?: Maybe<Scalars["String"]["output"]>;
  rating?: Maybe<Scalars["Float"]["output"]>;
  startDate?: Maybe<Scalars["DateTimeISO"]["output"]>;
  summary?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["Float"]["output"];
};

export type BookInput = {
  author: Scalars["String"]["input"];
  finishDate?: InputMaybe<Scalars["String"]["input"]>;
  genre?: InputMaybe<Scalars["String"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  pages?: InputMaybe<Scalars["Float"]["input"]>;
  publisher?: InputMaybe<Scalars["String"]["input"]>;
  rating?: InputMaybe<Scalars["Float"]["input"]>;
  startDate?: InputMaybe<Scalars["String"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  createBook: Book;
  deleteBook: Scalars["Boolean"]["output"];
  forgotPassword: Scalars["Boolean"]["output"];
  login: UserResponse;
  logout: Scalars["Boolean"]["output"];
  register: UserResponse;
  updateBook?: Maybe<Book>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationCreateBookArgs = {
  input: BookInput;
};

export type MutationDeleteBookArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  usernameOrEmail: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationUpdateBookArgs = {
  id: Scalars["Int"]["input"];
  input: BookInput;
};

export type PaginatedBooks = {
  __typename?: "PaginatedBooks";
  books: Array<Book>;
  hasMore: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  book?: Maybe<Book>;
  books: PaginatedBooks;
  currentUser?: Maybe<User>;
};

export type QueryBookArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryBooksArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  updatedAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MinimalErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type MinimalUserFragment = {
  __typename?: "User";
  id: number;
  username: string;
};

export type MinimalUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
  user?: { __typename?: "User"; id: number; username: string } | null;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: { __typename?: "User"; id: number; username: string } | null;
  };
};

export type CreateBookMutationVariables = Exact<{
  input: BookInput;
}>;

export type CreateBookMutation = {
  __typename?: "Mutation";
  createBook: {
    __typename?: "Book";
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    author: string;
    userId: number;
  };
};

export type DeleteBookMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteBookMutation = {
  __typename?: "Mutation";
  deleteBook: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: { __typename?: "User"; id: number; username: string } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: { __typename?: "User"; id: number; username: string } | null;
  };
};

export type UpdateBookMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  input: BookInput;
}>;

export type UpdateBookMutation = {
  __typename?: "Mutation";
  updateBook?: {
    __typename?: "Book";
    id: number;
    title: string;
    author: string;
    publisher?: string | null;
    pages?: number | null;
    startDate?: any | null;
    finishDate?: any | null;
    notes?: string | null;
    summary?: string | null;
    genre?: string | null;
    rating?: number | null;
    userId: number;
  } | null;
};

export type BookQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type BookQuery = {
  __typename?: "Query";
  book?: {
    __typename?: "Book";
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    author: string;
    publisher?: string | null;
    pages?: number | null;
    startDate?: any | null;
    finishDate?: any | null;
    notes?: string | null;
    summary?: string | null;
    genre?: string | null;
    rating?: number | null;
    userId: number;
  } | null;
};

export type BooksQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type BooksQuery = {
  __typename?: "Query";
  books: {
    __typename?: "PaginatedBooks";
    hasMore: boolean;
    books: Array<{
      __typename?: "Book";
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      author: string;
      publisher?: string | null;
      pages?: number | null;
      startDate?: any | null;
      finishDate?: any | null;
      notes?: string | null;
      summary?: string | null;
      genre?: string | null;
      rating?: number | null;
      userId: number;
    }>;
  };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser?: { __typename?: "User"; id: number; username: string } | null;
};

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
  ${MinimalUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...MinimalUserResponse
    }
  }
  ${MinimalUserResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

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
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateBookDocument = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      createdAt
      updatedAt
      title
      author
      userId
    }
  }
`;
export type CreateBookMutationFn = Apollo.MutationFunction<
  CreateBookMutation,
  CreateBookMutationVariables
>;

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
export function useCreateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookMutation,
    CreateBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(
    CreateBookDocument,
    options
  );
}
export type CreateBookMutationHookResult = ReturnType<
  typeof useCreateBookMutation
>;
export type CreateBookMutationResult =
  Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<
  CreateBookMutation,
  CreateBookMutationVariables
>;
export const DeleteBookDocument = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id)
  }
`;
export type DeleteBookMutationFn = Apollo.MutationFunction<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;

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
export function useDeleteBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookMutation,
    DeleteBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(
    DeleteBookDocument,
    options
  );
}
export type DeleteBookMutationHookResult = ReturnType<
  typeof useDeleteBookMutation
>;
export type DeleteBookMutationResult =
  Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

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
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...MinimalUserResponse
    }
  }
  ${MinimalUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...MinimalUserResponse
    }
  }
  ${MinimalUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateBookDocument = gql`
  mutation UpdateBook($id: Int!, $input: BookInput!) {
    updateBook(id: $id, input: $input) {
      id
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
    }
  }
`;
export type UpdateBookMutationFn = Apollo.MutationFunction<
  UpdateBookMutation,
  UpdateBookMutationVariables
>;

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
export function useUpdateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBookMutation,
    UpdateBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    UpdateBookDocument,
    options
  );
}
export type UpdateBookMutationHookResult = ReturnType<
  typeof useUpdateBookMutation
>;
export type UpdateBookMutationResult =
  Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookMutation,
  UpdateBookMutationVariables
>;
export const BookDocument = gql`
  query Book($id: Int!) {
    book(id: $id) {
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
    }
  }
`;

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
export function useBookQuery(
  baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
}
export function useBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(
    BookDocument,
    options
  );
}
export function useBookSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<BookQuery, BookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<BookQuery, BookQueryVariables>(
    BookDocument,
    options
  );
}
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookSuspenseQueryHookResult = ReturnType<
  typeof useBookSuspenseQuery
>;
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
      }
    }
  }
`;

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
export function useBooksQuery(
  baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    options
  );
}
export function useBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    options
  );
}
export function useBooksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<BooksQuery, BooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    options
  );
}
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksSuspenseQueryHookResult = ReturnType<
  typeof useBooksSuspenseQuery
>;
export type BooksQueryResult = Apollo.QueryResult<
  BooksQuery,
  BooksQueryVariables
>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      ...MinimalUser
    }
  }
  ${MinimalUserFragmentDoc}
`;

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
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export function useCurrentUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useCurrentUserSuspenseQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
