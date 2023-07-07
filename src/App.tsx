import React from "react";

import { Box, ChakraProvider, Heading, HStack } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import useSWR, { SWRConfig } from "swr";

import OfficeSearchDrawer from "./components/OfficeSearchDrawer";
import discutextApi from "./discutext-api";
import { NWSOffice } from "./discutext-api/models";
import DiscussionDetail from "./views/DiscussionDetail";

const router = createBrowserRouter([
  {
    path: "/discussion/:wfoId",
    element: <DiscussionDetail />,
  },
  {
    path: "/",
    element: <Navigate to="/discussion/PHI" replace />,
  },
]);

const HEADER_HEIGHT_PX = 80;

const AppBody: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box height={`calc(100vh - ${HEADER_HEIGHT_PX}px)`} overflow="auto">
    {children}
  </Box>
);

const nwsOfficeFetcher = async (): Promise<NWSOffice[]> => {
  return await discutextApi.getOffices();
};

const App = () => {
  const { data: offices } = useSWR("NWSOFFICES", nwsOfficeFetcher);
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
          <Heading size="lg">DiscuText</Heading>
          <OfficeSearchDrawer offices={offices || []} />
        </HStack>
        <AppBody>
          <RouterProvider router={router} />
        </AppBody>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
