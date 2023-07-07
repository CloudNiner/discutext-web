import React from "react";

import {
  Box,
  HStack,
  Heading,
  Link,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import RecencyDot from "../components/RecencyDot";
import discutextApi from "../discutext-api";

export const rootStackStyleProps = {
  backgroundColor: "white",
  spacing: 10,
  padding: 5,
  boxShadow: "sm",
  borderWidth: "1px",
  borderRadius: "lg",
};

const DiscussionDetail: React.FC = () => {
  let { wfoId } = useParams();
  const { data: discussion, error } = useSWR(
    wfoId,
    discutextApi.getLatestDiscussion
  );
  const validAt = discussion?.valid_at
    ? new Date(discussion.valid_at)
    : undefined;

  return (
    <Box height="100%" padding={5} backgroundColor="blue.50">
      {error ? (
        <VStack {...rootStackStyleProps}>
          <Text>Error retrieving Forecast Discussion for "{wfoId}".</Text>
          <Link textDecoration="underline" href="/">
            Go back.
          </Link>
        </VStack>
      ) : discussion ? (
        <VStack
          divider={<StackDivider borderColor="gray" />}
          {...rootStackStyleProps}
        >
          <VStack marginTop={5}>
            <Heading as="h2" margin={0} fontSize="2xl">
              {discussion.wfo_id}
            </Heading>
            <HStack>
              <Text>Updated At: {validAt?.toLocaleString() || "--"}</Text>
              {validAt && <RecencyDot dt={validAt} />}
            </HStack>
          </VStack>
          {discussion.sections.map((s, si) => (
            <Box key={si}>
              <Heading as="h3" fontSize="xl">
                {s.header}
              </Heading>
              {s.paragraphs.map((p, pi) => (
                <Text key={pi} mt={4}>
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
