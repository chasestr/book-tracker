import gql from "graphql-tag";
import * as Urql from "urql";
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  title?: InputMaybe<Scalars["String"]["input"]>;
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
  title?: InputMaybe<Scalars["String"]["input"]>;
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
    __typename: "PaginatedBooks";
    hasMore: boolean;
    books: Array<{
      __typename: "Book";
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

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
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

export function useCreateBookMutation() {
  return Urql.useMutation<CreateBookMutation, CreateBookMutationVariables>(
    CreateBookDocument
  );
}
export const DeleteBookDocument = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id)
  }
`;

export function useDeleteBookMutation() {
  return Urql.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(
    DeleteBookDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...MinimalUserResponse
    }
  }
  ${MinimalUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...MinimalUserResponse
    }
  }
  ${MinimalUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const UpdateBookDocument = gql`
  mutation UpdateBook($id: Int!, $title: String) {
    updateBook(id: $id, title: $title) {
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

export function useUpdateBookMutation() {
  return Urql.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    UpdateBookDocument
  );
}
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

export function useBookQuery(
  options: Omit<Urql.UseQueryArgs<BookQueryVariables>, "query">
) {
  return Urql.useQuery<BookQuery, BookQueryVariables>({
    query: BookDocument,
    ...options,
  });
}
export const BooksDocument = gql`
  query Books($limit: Int!, $cursor: String) {
    books(cursor: $cursor, limit: $limit) {
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
        __typename
      }
      hasMore
      __typename
    }
  }
`;

export function useBooksQuery(
  options: Omit<Urql.UseQueryArgs<BooksQueryVariables>, "query">
) {
  return Urql.useQuery<BooksQuery, BooksQueryVariables>({
    query: BooksDocument,
    ...options,
  });
}
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      ...MinimalUser
    }
  }
  ${MinimalUserFragmentDoc}
`;

export function useCurrentUserQuery(
  options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, "query">
) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({
    query: CurrentUserDocument,
    ...options,
  });
}
