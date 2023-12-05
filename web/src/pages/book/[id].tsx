import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useBookQuery } from "../../generated/graphql";
import { PageWrapper } from "../../components/PageWrapper";
import { Heading } from "@chakra-ui/react";

export const Book = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching, error }] = useBookQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return (
      <PageWrapper>
        <div>Loading...</div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div>{error.message}</div>
      </PageWrapper>
    );
  }

  if (!data?.book) {
    return (
      <PageWrapper>
        <div>Could not find book</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Heading mb={4}>{data.book.title}</Heading>
      {data.book.summary ? data.book.summary : null}
    </PageWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Book);
