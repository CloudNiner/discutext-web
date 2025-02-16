import React from "react";

import {
  Box,
  HStack,
  Heading,
  Link,
  Spinner,
  StackSeparator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import useSWR from "swr";

import RecencyDot from "@/components/RecencyDot";
import discutextApi from "@/discutext-api";

const discussionFetcher = async (args: [string, string]) =>
  await discutextApi.getLatestDiscussion(args[0]);
const officeFetcher = async (args: [string, string]) =>
  (await discutextApi.getOffice(args[0])).properties;

const DiscussionDetail: React.FC = () => {
  const { wfoId } = useParams();
  const {
    data: discussion,
    error,
    isLoading,
  } = useSWR([wfoId, "discussion"], discussionFetcher);
  const { data: office } = useSWR([wfoId, "office"], officeFetcher);
  const validAt = discussion?.valid_at
    ? new Date(discussion.valid_at)
    : undefined;

  console.log(office);
  const officeText = office ? `: ${office.City}, ${office.ST}` : "";

  return (
    <VStack alignItems="start">
      <Heading>{wfoId + officeText}</Heading>
      <HStack>
        <Text>Updated: {validAt?.toLocaleString() || "--"}</Text>
        {validAt && <RecencyDot dt={validAt} />}
      </HStack>
      {error ? (
        <VStack>
          <Text>Error retrieving Forecast Discussion for {wfoId}.</Text>
          <Link href="/">Go back.</Link>
        </VStack>
      ) : isLoading ? (
        <Text>
          Loading... <Spinner />
        </Text>
      ) : discussion ? (
        <VStack
          alignItems="start"
          gapY={4}
          marginTop={4}
          separator={<StackSeparator />}
        >
          {discussion.sections.map((s, si) => (
            <Box key={si}>
              <Heading as="h3" size="lg" mb={4}>
                {s.header}
              </Heading>
              {s.paragraphs.map((p, pi) => (
                <Text marginY={2} key={pi}>
                  {p}
                </Text>
              ))}
            </Box>
          ))}
        </VStack>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default DiscussionDetail;
