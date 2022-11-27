import React from "react";
import {
  Box,
  Heading,
  Text,
  ChakraProvider,
  HStack,
  VStack,
} from "@chakra-ui/react";

import useSWR, { SWRConfig } from "swr";

import discutextApi from "./discutext-api";
import DiscussionDetail from "./views/DiscussionDetail";

const HEADER_HEIGHT_PX = 80;

const AppBody: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box height={`calc(100vh - ${HEADER_HEIGHT_PX}px)`} overflow="auto">
    {children}
  </Box>
);

const App = () => {
  const { data } = useSWR("PHI", discutextApi.getLatestDiscussion);
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
          padding="5"
          alignItems="center"
          justifyContent="space-between"
          height={`${HEADER_HEIGHT_PX}px`}
        >
          <Heading>DiscuText {data?.wfo_id ? `: ${data.wfo_id}` : ""}</Heading>
          {validAt && <Text>Valid: {validAt.toLocaleString()}</Text>}
        </HStack>
        <AppBody>{data && <DiscussionDetail discussion={data} />}</AppBody>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
