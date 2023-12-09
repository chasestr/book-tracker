import React, { useState } from "react";
import { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
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
import StandardButton from "../../components/base/StandardButton";
import { ErrorComponent } from "../../components/base/Error";

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
                <ErrorComponent message={tokenError} />
              </Flex>
            ) : null}
            <StandardButton mt={4} type="submit" isLoading={isSubmitting}>
              Reset Password
            </StandardButton>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default ChangePassword;
