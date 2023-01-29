import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { NWSOffice } from "../discutext-api/models";

interface OfficeSearchDrawerProps {
  offices: NWSOffice[];
}

const OfficeSearchDrawer: React.FC<OfficeSearchDrawerProps> = ({ offices }) => {
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerSearchButtonRef = useRef<HTMLButtonElement>(null);
  const drawerSearchInputRef = useRef<HTMLInputElement>(null);
  const onSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    [setSearchValue]
  );
  const searchOffices = useMemo(() => {
    if (searchValue.length < 2) {
      return [];
    }
    return offices.filter((office) => {
      const searchValueLower = searchValue.toLowerCase();
      return (
        office.CWA.toLowerCase().includes(searchValueLower) ||
        office.CityState.toLowerCase().includes(searchValueLower)
      );
    });
  }, [offices, searchValue]);

  return (
    <>
      <Button
        leftIcon={<SearchIcon />}
        ref={drawerSearchButtonRef}
        onClick={onOpen}
      >
        Search
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="md"
        onClose={onClose}
        finalFocusRef={drawerSearchButtonRef}
        initialFocusRef={drawerSearchInputRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search NWS Offices</DrawerHeader>

          <DrawerBody overflowX="hidden">
            <Input
              value={searchValue}
              placeholder="Search by ID, City, or State"
              onChange={onSearchChange}
              ref={drawerSearchInputRef}
            />
            <VStack marginX={1} marginY={5} alignItems="flex-start">
              {searchOffices.map((office) => (
                <Button
                  as="a"
                  href={`/discussion/${office.CWA}`}
                  key={office.CWA}
                  variant="link"
                  rightIcon={<ArrowForwardIcon />}
                >
                  {office.CWA}: {office.CityState}
                </Button>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OfficeSearchDrawer;
