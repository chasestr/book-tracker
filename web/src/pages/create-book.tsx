import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { BookStatus, useCreateBookMutation } from "../generated/graphql";
import { PageWrapper } from "../components/PageWrapper";
import StandardButton from "../components/base/StandardButton";
import variables from "../variables.module.scss";
import { formatEnumValue } from "../utils/formatEnumValue";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  status: Yup.string()
    .oneOf(Object.values(BookStatus), "Invalid book status")
    .required("Book status is required"),
  publisher: Yup.string().optional(),
  pages: Yup.number().optional(),
  startDate: Yup.string().optional(),
  finishDate: Yup.string().optional(),
  notes: Yup.string().optional(),
  summary: Yup.string().optional(),
  genre: Yup.string().optional(),
  rating: Yup.number().optional(),
});

const CreateBook = () => {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const toast = useToast();

  const [createBook, {}] = useCreateBookMutation();

  const initialValues = {
    title: "",
    author: "",
    status: BookStatus.NOT_STARTED,
    publisher: undefined,
    pages: undefined,
    startDate: undefined,
    finishDate: undefined,
    notes: undefined,
    summary: undefined,
    genre: undefined,
    rating: undefined,
  };

  const handleCancel = () => {
    if (isFormDirty) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (confirmCancel) {
        router.back();
      }
    } else {
      router.push("/");
    }
  };

  return (
    <PageWrapper>
      <Heading mb="4" color={variables.blue} textAlign={"center"}>
        Create Book
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (isFormDirty) {
            const { errors } = await createBook({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: "books:{}" });
              },
            });

            if (!errors) {
              toast({
                title: "Book created successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              router.push("/");
            }
          }
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.title && !!formikProps.errors.title
              }
            >
              <FormLabel>Title</FormLabel>
              <Field
                type="text"
                name="title"
                as={Input}
                required
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.author && !!formikProps.errors.author
              }
            >
              <FormLabel>Author</FormLabel>
              <Field
                type="text"
                name="author"
                as={Input}
                required
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.author}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.status && !!formikProps.errors.status
              }
            >
              <FormLabel>Status</FormLabel>
              <Field
                name="status"
                as={Select}
                required
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              >
                {Object.entries(BookStatus).map(([key, value]) => (
                  <option key={key} value={value}>
                    {formatEnumValue(value)}
                  </option>
                ))}
              </Field>
              <FormErrorMessage>{formikProps.errors.status}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.publisher && !!formikProps.errors.publisher
              }
            >
              <FormLabel>Publisher</FormLabel>
              <Field
                type="text"
                name="publisher"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>
                {formikProps.errors.publisher}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.pages && !!formikProps.errors.pages
              }
            >
              <FormLabel>Number of pages</FormLabel>
              <Field
                type="number"
                name="pages"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.pages}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.startDate && !!formikProps.errors.startDate
              }
            >
              <FormLabel>Start date</FormLabel>
              <Field
                type="date"
                name="startDate"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              {(Array.isArray(formikProps.errors.startDate)
                ? formikProps.errors.startDate
                : [formikProps.errors.startDate]
              ).map((error, index) => (
                <FormErrorMessage key={index}>
                  {error as string}
                </FormErrorMessage>
              ))}
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.finishDate &&
                !!formikProps.errors.finishDate
              }
            >
              <FormLabel>Finish date</FormLabel>
              <Field
                type="date"
                name="finishDate"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              {(Array.isArray(formikProps.errors.finishDate)
                ? formikProps.errors.finishDate
                : [formikProps.errors.finishDate]
              ).map((error, index) => (
                <FormErrorMessage key={index}>
                  {error as string}
                </FormErrorMessage>
              ))}
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.notes && !!formikProps.errors.notes
              }
            >
              <FormLabel>Notes</FormLabel>
              <Field
                type="text"
                name="notes"
                as={Textarea}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.notes}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.summary && !!formikProps.errors.summary
              }
            >
              <FormLabel>Summary</FormLabel>
              <Field
                type="text"
                name="summary"
                as={Textarea}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.summary}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.genre && !!formikProps.errors.genre
              }
            >
              <FormLabel>Genre</FormLabel>
              <Field
                type="text"
                name="genre"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.genre}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.rating && !!formikProps.errors.rating
              }
            >
              <FormLabel>Rating (number)</FormLabel>
              <Field
                type="number"
                name="rating"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.rating}</FormErrorMessage>
            </FormControl>

            <StandardButton onClick={handleCancel} mr={2} mb={4}>
              Cancel
            </StandardButton>
            <StandardButton type="submit" mb={4}>
              Save Changes
            </StandardButton>
          </form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default CreateBook;
