import React from "react";

import {
  Box,
  HStack,
  Heading,
  Link,
  StackSeparator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import useSWR from "swr";

import RecencyDot from "@/components/RecencyDot";
import discutextApi from "@/discutext-api";

const DiscussionDetail: React.FC = () => {
  const { wfoId } = useParams();
  const { data: discussion, error } = useSWR(
    wfoId,
    discutextApi.getLatestDiscussion
  );
  const validAt = discussion?.valid_at
    ? new Date(discussion.valid_at)
    : undefined;

  return (
    <Box>
      {error ? (
        <VStack>
          <Text>Error retrieving Forecast Discussion for {wfoId}.</Text>
          <Link href="/">Go back.</Link>
        </VStack>
      ) : discussion ? (
        <VStack gapY={4} separator={<StackSeparator />}>
          <VStack>
            <Heading>{discussion.wfo_id}</Heading>
            <HStack>
              <Text>Updated: {validAt?.toLocaleString() || "--"}</Text>
              {validAt && <RecencyDot dt={validAt} />}
            </HStack>
          </VStack>
          {discussion.sections.map((s, si) => (
            <Box key={si}>
              <Heading mb={4}>{s.header}</Heading>
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
    </Box>
  );
};

export default DiscussionDetail;
