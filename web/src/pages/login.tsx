import { Form, Formik } from "formik";
import React from "react";
import { PageWrapper } from "../components/PageWrapper";
import { InputField } from "../components/InputField";
import { Box, Flex } from "@chakra-ui/react";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import StandardButton from "../components/base/StandardButton";

const Login = () => {
  const router = useRouter();
  const [login, {}] = useLoginMutation();
  return (
    <PageWrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: "Query",
                  currentUser: data?.login.user,
                },
              });
              cache.evict({ fieldName: "books:{}" });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={4} justifyContent="space-between">
              <StandardButton type="submit" isLoading={isSubmitting}>
                Login
              </StandardButton>
              <NextLink href="/forgot-password">
                <StandardButton alignContent="flex-end">
                  Forgot password
                </StandardButton>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default Login;
