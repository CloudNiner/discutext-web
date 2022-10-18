import React from "react";
import {
  Box,
  Heading,
  Text,
  ChakraProvider,
  Flex,
  HStack,
} from "@chakra-ui/react";

import useSWR, { SWRConfig } from "swr";

import discutextApi from "./discutext-api";

const HEADER_HEIGHT_PX = 80;

const App = () => {
  const { data, error } = useSWR("PHI", discutextApi.getLatestDiscussion);
  const validAt = data?.valid_at ? new Date(data.valid_at) : undefined;
  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnReconnect: true,
          revalidateOnFocus: false,
        }}
      >
        <HStack
          backgroundColor="blue.100"
          p="5"
          alignItems="center"
          justifyContent="space-between"
          height={`${HEADER_HEIGHT_PX}px`}
        >
          <Heading>DiscuText {data?.wfo_id ? `: ${data.wfo_id}` : ""}</Heading>
          {validAt && <Text>Valid: {validAt.toLocaleString()}</Text>}
        </HStack>
        <Flex
          backgroundColor="blue.50"
          flexDirection="column"
          height={`calc(100vh - ${HEADER_HEIGHT_PX}px)`}
          overflow="auto"
          margin="0"
        >
          {data &&
            data.sections.map((s) => (
              <Box
                margin={2}
                padding={5}
                backgroundColor="white"
                shadow="md"
                borderWidth="1px"
              >
                <Heading fontSize="xl">{s.header}</Heading>
                {s.paragraphs.map((p) => (
                  <Text mt={4}>{p}</Text>
                ))}
              </Box>
            ))}
        </Flex>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
