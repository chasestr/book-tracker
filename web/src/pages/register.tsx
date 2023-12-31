import { Form, Formik } from "formik";
import React from "react";
import { PageWrapper } from "../components/PageWrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/react";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import StandardButton from "../components/base/StandardButton";

const Register = () => {
  const router = useRouter();
  const [register, {}] = useRegisterMutation();
  return (
    <PageWrapper >
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: "Query",
                  currentUser: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <StandardButton mt={4} type="submit" isLoading={isSubmitting}>
              Register
            </StandardButton>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default Register;
