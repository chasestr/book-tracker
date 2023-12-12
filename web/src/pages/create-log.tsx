import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import {
  BookStatus,
  useBooksByStatusQuery,
  useCreateLogMutation,
} from "../generated/graphql";
import { PageWrapper } from "../components/PageWrapper";
import StandardButton from "../components/base/StandardButton";
import variables from "../variables.module.scss";
import LoadingSpinner from "../components/base/LoadingSpinner";
import { ErrorComponent } from "../components/base/Error";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  book: Yup.number().required("You must select a book"),
  pagesRead: Yup.number().optional(),
  hours: Yup.number().optional(),
  minutes: Yup.number().optional(),
});

const CreateLog = () => {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const toast = useToast();

  const { data, loading } = useBooksByStatusQuery({
    variables: { status: BookStatus.IN_PROGRESS },
  });
  const [createLog, {}] = useCreateLogMutation();

  const initialValues = {
    date: "",
    book: "",
    pagesRead: undefined,
    hours: undefined,
    minutes: undefined,
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
      router.push("/logs");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner />
      </PageWrapper>
    );
  }

  if (!data?.booksByStatus) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`No in progress books found. Please ensure that you have at 
          least one book with an in progress status.`}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Heading mb="4" color={variables.blue} textAlign={"center"}>
        Create Log
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (isFormDirty) {
            const inputToMinutes = values.hours
              ? values.hours * 60 + (values.minutes || 0)
              : values.minutes || undefined;

            const numBookId = parseInt(values.book);
            const { errors } = await createLog({
              variables: {
                input: {
                  bookId: numBookId,
                  date: values.date,
                  minutes: inputToMinutes || undefined,
                  pagesRead: values.minutes || undefined,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "userLogs:{}" });
              },
            });

            if (!errors) {
              toast({
                title: "Log created successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              router.push("/logs");
            }
          }
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <FormControl
              mb="4"
              isInvalid={formikProps.touched.book && !!formikProps.errors.book}
            >
              <FormLabel>Book</FormLabel>
              <Field
                name="book"
                as={Select}
                required
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              >
                <option value={undefined}>Select a book</option>
                {data.booksByStatus.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </Field>
              <FormErrorMessage>{formikProps.errors.book}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={formikProps.touched.date && !!formikProps.errors.date}
            >
              <FormLabel>Date</FormLabel>
              <Field
                type="date"
                name="date"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              {(Array.isArray(formikProps.errors.date)
                ? formikProps.errors.date
                : [formikProps.errors.date]
              ).map((error, index) => (
                <FormErrorMessage key={index}>
                  {error as string}
                </FormErrorMessage>
              ))}
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.pagesRead && !!formikProps.errors.pagesRead
              }
            >
              <FormLabel>Number of pages read</FormLabel>
              <Field
                type="number"
                name="pagesRead"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>
                {formikProps.errors.pagesRead}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.hours && !!formikProps.errors.hours
              }
            >
              <FormLabel>Hours</FormLabel>
              <Field
                type="number"
                name="hours"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.hours}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb="4"
              isInvalid={
                formikProps.touched.minutes && !!formikProps.errors.minutes
              }
            >
              <FormLabel>Minutes</FormLabel>
              <Field
                type="number"
                name="minutes"
                as={Input}
                onChange={(e: string | ChangeEvent<any>) => {
                  formikProps.handleChange(e);
                  setIsFormDirty(true);
                }}
                bg={variables.light_mint}
              />
              <FormErrorMessage>{formikProps.errors.minutes}</FormErrorMessage>
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

export default CreateLog;
