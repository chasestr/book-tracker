import { Form, Formik } from "formik";
import React from "react";
import { PageWrapper } from "../components/PageWrapper";
import { InputField } from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

export const login: React.FC<{}> = () => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();
  return (
    <PageWrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
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
              <Button type="submit" isLoading={isSubmitting} color="teal">
                Login
              </Button>
              <NextLink href="/forgot-password">
                <Button color="teal" alignContent="flex-end">
                  Forgot password
                </Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(login);
