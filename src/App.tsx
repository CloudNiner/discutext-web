import { Container, Heading, HStack } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import useSWR, { SWRConfig } from "swr";

import OfficeSearchDrawer from "@/components/OfficeSearchDrawer";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import discutextApi from "@/discutext-api";
import { NWSOffice } from "@/discutext-api/models";
import DiscussionDetail from "@/views/DiscussionDetail";

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
        <Container p={8}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading>DiscuText</Heading>
            <OfficeSearchDrawer offices={offices || []} />
          </HStack>
          <RouterProvider router={router} />
        </Container>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
