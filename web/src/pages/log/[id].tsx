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
  useLogQuery,
  useUpdateLogMutation,
} from "../../generated/graphql";
import { PageWrapper } from "../../components/PageWrapper";
import StandardButton from "../../components/base/StandardButton";
import variables from "../../variables.module.scss";
import { ErrorComponent } from "../../components/base/Error";
import LoadingSpinner from "../../components/base/LoadingSpinner";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  book: Yup.number().required("You must select a book"),
  pagesRead: Yup.number().optional(),
  hours: Yup.number().optional(),
  minutes: Yup.number().optional(),
});

const LogDetails = () => {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const toast = useToast();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading, error } = useLogQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
    ssr: false,
  });

  const { data: bookData, loading: bookLoading } = useBooksByStatusQuery({
    variables: { status: BookStatus.IN_PROGRESS },
  });

  const [updateLog, {}] = useUpdateLogMutation();

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

  if (bookLoading || loading) {
    return (
      <PageWrapper>
        <LoadingSpinner />
      </PageWrapper>
    );
  }

  if (!bookData?.booksByStatus) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`No in progress books found. Please ensure that you have at 
          least one book with an in progress status.`}
        />
      </PageWrapper>
    );
  }

  if (!data?.log?.book) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`We were unable to find this log's associated book. Please try again.`}
        />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <ErrorComponent message="We were unable to find that log. Please try again." />
      </PageWrapper>
    );
  }

  const initialHours = data?.log?.minutes
    ? Math.floor(data.log.minutes / 60)
    : undefined;
  const initialMinutes = data?.log?.minutes ? data.log.minutes % 60 : undefined;

  const initialValues = data?.log
    ? {
        date: new Date(data.log.date).toISOString().split("T")[0],
        book: data.log.book.id.toString(),
        pagesRead: data.log.pagesRead ?? undefined,
        hours: initialHours,
        minutes: initialMinutes,
      }
    : {
        date: new Date().toISOString().split("T")[0],
        book: "",
        pagesRead: undefined,
        hours: undefined,
        minutes: undefined,
      };

  return (
    <PageWrapper>
      <Heading mb="4" color={variables.blue} textAlign={"center"}>
        View/Edit Log
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
            const { errors } = await updateLog({
              variables: {
                id: intId,
                input: {
                  bookId: numBookId,
                  date: new Date(values.date).toISOString().split("T")[0],
                  minutes: inputToMinutes || undefined,
                  pagesRead: values.pagesRead || undefined,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "userLogs:{}" });
              },
            });

            if (!errors) {
              toast({
                title: "Log updated successfully!",
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
                <option value={formikProps.initialValues.book}>
                  {data.log!!.book.title}
                </option>
                {bookData.booksByStatus.map((b) => (
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

export default LogDetails;
