import React from "react";
import { Discussion } from "../discutext-api/models";

import { StackDivider, Box, VStack, Text, Heading } from "@chakra-ui/react";

export interface DiscussionDetailProps {
  discussion: Discussion;
}

const DiscussionDetail: React.FC<DiscussionDetailProps> = ({ discussion }) => (
  <Box padding={5} backgroundColor="blue.50">
    <VStack
      divider={<StackDivider borderColor="gray" />}
      backgroundColor="white"
      spacing={10}
      padding={5}
      boxShadow="sm"
      borderWidth="1px"
    >
      {discussion.sections.map((s) => (
        <Box>
          <Heading fontSize="xl">{s.header}</Heading>
          {s.paragraphs.map((p) => (
            <Text mt={4}>{p}</Text>
          ))}
        </Box>
      ))}
    </VStack>
  </Box>
);

export default DiscussionDetail;
