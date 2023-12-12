import { useUserLogsQuery } from "../generated/graphql";
import { PageWrapper } from "../components/PageWrapper";
import { Box, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import StandardButton from "../components/base/StandardButton";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import GetStarted from "../components/home/GetStarted";
import { NextPage } from "next";
import styles from "../variables.module.scss";
import { ErrorComponent } from "../components/base/Error";
import LoadingSpinner from "../components/base/LoadingSpinner";
import { LogCard } from "../components/log-card/card";

const Logs: NextPage = () => {
  const { data, loading, fetchMore, variables, error } = useUserLogsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error?.message.includes("Not authenticated")) {
    return (
      <PageWrapper>
        <Hero />
        <Features />
        <Testimonials />
        <GetStarted />
      </PageWrapper>
    );
  }

  if (!loading && !data) {
    return (
      <PageWrapper>
        <ErrorComponent message="We were unable to fetch your log data." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Flex
        mb={4}
        bg="chakra-subtle-bg._light"
        p={4}
        justifyContent={"space-between"}
      >
        <Heading color={styles.blue}>My Logs</Heading>
        <NextLink href="/create-log">
          <StandardButton ml="auto">New Log</StandardButton>
        </NextLink>
      </Flex>
      {loading && !data ? (
        <LoadingSpinner />
      ) : (
        <Box display={"flex"} flexWrap={"wrap"} p={4}>
          {data?.userLogs.logs.map((l) =>
            !l ? null : <LogCard log={l} key={l.id}></LogCard>
          )}
        </Box>
      )}
      {data && data.userLogs.hasMore ? (
        <Flex>
          <StandardButton
            size="lg"
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: `${
                    data.userLogs.logs[data.userLogs.logs.length - 1].date
                  }_${data.userLogs.logs[data.userLogs.logs.length - 1].id}`,
                },
              });
            }}
            m="auto"
            my={4}
            isLoading={loading && !data}
          >
            Load More
          </StandardButton>
        </Flex>
      ) : null}
    </PageWrapper>
  );
};

export default Logs;
