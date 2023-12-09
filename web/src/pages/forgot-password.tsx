import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import { InputField } from "../components/InputField";
import { PageWrapper } from "../components/PageWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import StandardButton from "../components/base/StandardButton";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword, {}] = useForgotPasswordMutation();
  return (
    <PageWrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            {complete ? (
              <>
                <Box mt={4}>
                  If an account with this email exists, a link has been sent to
                  reset your password
                </Box>
                <NextLink href="/login">
                  <StandardButton mt={4}>Back to login</StandardButton>
                </NextLink>
              </>
            ) : (
              <Flex mt={4}>
                <StandardButton type="submit" isLoading={isSubmitting}>
                  Send email
                </StandardButton>
              </Flex>
            )}
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default ForgotPassword;
