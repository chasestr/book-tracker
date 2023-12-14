import LoadingSpinner from "../components/base/LoadingSpinner";
import { PageWrapper } from "../components/PageWrapper";
import { ErrorComponent } from "../components/base/Error";
import ReadingProgressLineChart from "../components/visualizations/ReadingProgressLineChart";
import { useUserLogsWithoutPaginationQuery } from "../generated/graphql";
import withNoSSR from "../components/base/NoSSR";
import { Flex, Heading, Text } from "@chakra-ui/react";
import variables from "../variables.module.scss";

const Graphs: React.FC = () => {
  const { loading, error, data } = useUserLogsWithoutPaginationQuery();

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner />
      </PageWrapper>
    );
  }
  if (error || !data?.userLogsWithoutPagination) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`We weren't able to load your visualizations. Please try again.`}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Heading mb={12} color={variables.blue} textAlign={"center"}>
        Pages Read
      </Heading>
      <ReadingProgressLineChart data={data.userLogsWithoutPagination} />
      <Flex my={4} bg={variables.dark_mint} borderRadius={25}>
        <Text color={variables.white} p={4} align={"center"}>
          The visualizations for pages read in the last year, month, and day
          each require at least 10 log entries within the specified time period.
        </Text>
      </Flex>
      <Heading my={8} color={variables.blue} textAlign={"center"}>
        More Coming Soon...
      </Heading>
    </PageWrapper>
  );
};

export default withNoSSR(Graphs);
