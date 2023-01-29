import React from "react";
import { Discussion } from "../discutext-api/models";

import {
  StackDivider,
  Box,
  VStack,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";

export interface DiscussionDetailProps {
  discussion: Discussion;
}

const DiscussionDetail: React.FC<DiscussionDetailProps> = ({ discussion }) => {
  const validAt = discussion?.valid_at
    ? new Date(discussion.valid_at)
    : undefined;
  return (
    <Box padding={5} backgroundColor="blue.50">
      <VStack
        divider={<StackDivider borderColor="gray" />}
        backgroundColor="white"
        spacing={10}
        padding={5}
        boxShadow="sm"
        borderWidth="1px"
        borderRadius="lg"
      >
        <HStack>
          <Heading as="h2" fontSize="2xl">
            {discussion.wfo_id}
          </Heading>
          <Text>:: {validAt?.toLocaleString()}</Text>
        </HStack>
        {discussion.sections.map((s) => (
          <Box>
            <Heading as="h3" fontSize="xl">
              {s.header}
            </Heading>
            {s.paragraphs.map((p) => (
              <Text mt={4}>{p}</Text>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default DiscussionDetail;
