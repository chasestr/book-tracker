import React, { useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { PageWrapper } from "../../components/PageWrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";

export const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [changePassword, {}] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <PageWrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: "Query",
                  currentUser: data?.changePassword.user,
                },
              });
              cache.evict({ fieldName: "books:{}" });
            },
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>Request additional password change</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button mt={4} type="submit" isLoading={isSubmitting} color="teal">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default ChangePassword;
