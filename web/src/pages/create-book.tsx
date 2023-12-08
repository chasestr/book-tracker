import { Box, Flex } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { PageWrapper } from "../components/PageWrapper";
import { TextareaField } from "../components/TextareaField";
import { useCreateBookMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { isLoggedIn } from "../utils/isLoggedIn";
import StandardButton from "../components/base/StandardButton";

export const CreateBook: React.FC<{}> = ({}) => {
  const router = useRouter();
  const loggedIn = isLoggedIn();
  if (!loggedIn) {
    router.replace("/login?next=" + router.pathname);
  }
  const [createBook, {}] = useCreateBookMutation();
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
          const { errors } = await createBook({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "books:{}" });
            },
          });
          if (!errors) {
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
              <StandardButton type="submit" isLoading={isSubmitting}>
                Save Book
              </StandardButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default CreateBook;
