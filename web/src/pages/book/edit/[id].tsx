import { useRouter } from "next/router";
import { PageWrapper } from "../../../components/PageWrapper";
import {
  useBookQuery,
  //   useUpdateBookMutation,
} from "../../../generated/graphql";

const EditBook = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  //   const [, updateBook] = useUpdateBookMutation();
  const { data, loading, error } = useBookQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
    ssr: false,
  });

  if (loading) {
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

  //   await updateBook({});
  //   router.back(); or router.push("/");
  return <div>Hello</div>;
};

export default EditBook;
