import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { PageWrapper } from "../components/PageWrapper";
import { TextareaField } from "../components/TextareaField";
import { useCreateBookMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isLoggedIn } from "../utils/isLoggedIn";

export const CreateBook: React.FC<{}> = ({}) => {
  const router = useRouter();
  isLoggedIn();
  const [, createBook] = useCreateBookMutation();
  return (
    <PageWrapper variant="small">
      <Formik
        initialValues={{
          title: "",
          author: "",
          publisher: undefined,
          pages: undefined,
          startDate: undefined,
          finishDate: undefined,
          notes: undefined,
          summary: undefined,
          genre: undefined,
          rating: undefined,
        }}
        onSubmit={async (values) => {
          const { error } = await createBook({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="title"
                placeholder="Title"
                label="Title"
                required={true}
              />
            </Box>
            <Box>
              <InputField
                name="author"
                placeholder="Author"
                label="Author"
                required={true}
              />
            </Box>
            <Box>
              <InputField
                name="publisher"
                placeholder="Publisher"
                label="Publisher"
              />
            </Box>
            <Box>
              <InputField
                name="pages"
                placeholder="Pages"
                label="Number of Pages"
                type="number"
              />
            </Box>
            <Box>
              <InputField
                name="startDate"
                placeholder="Start Date"
                label="Start Date"
                type="date"
              />
            </Box>
            <Box>
              <InputField
                name="finishDate"
                placeholder="Finish Date"
                label="Finish Date"
                type="date"
              />
            </Box>
            <Box>
              <TextareaField name="notes" placeholder="Notes" label="Notes" />
            </Box>
            <Box>
              <TextareaField
                name="summary"
                placeholder="Summary"
                label="Summary"
              />
            </Box>
            <Box>
              <InputField name="genre" placeholder="Genre" label="Genre" />
            </Box>
            <Box>
              <InputField
                name="rating"
                placeholder="Rating 1-10"
                label="Rating"
                type="number"
              />
            </Box>
            <Flex mt={4}>
              <Button type="submit" isLoading={isSubmitting} color="teal">
                Save Book
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreateBook);
