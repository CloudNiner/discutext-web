import { Container, Heading, HStack } from "@chakra-ui/react";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SWRConfig } from "swr";

import OfficeSearchDrawer from "@/components/OfficeSearchDrawer";
import { Provider as ChakraProvider } from "@/components/ui/provider";
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

const App = () => {
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
          <HStack
            alignItems="center"
            justifyContent="space-between"
            marginBottom={4}
          >
            <Heading>DiscuText</Heading>
            <OfficeSearchDrawer />
          </HStack>
          <RouterProvider router={router} />
        </Container>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
