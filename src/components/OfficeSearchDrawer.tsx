import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import {
  Button,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NWSOffice } from "@/discutext-api/models";

interface OfficeSearchDrawerProps {
  offices: NWSOffice[];
}

const OfficeSearchDrawer: React.FC<OfficeSearchDrawerProps> = ({ offices }) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
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
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button>
          <FaMagnifyingGlass />
          Search
        </Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent>
          <DrawerHeader>Search NWS Offices</DrawerHeader>
          <DrawerBody>
            <Input
              value={searchValue}
              placeholder="Search by ID, City, or State"
              onChange={onSearchChange}
            />
            <VStack alignItems="flex-start">
              {searchOffices.map((office) => (
                <Button variant="plain" key={office.CWA}>
                  <a href={`/discussion/${office.CWA}`}>
                    {office.CWA}: {office.CityState}
                  </a>
                  <FaArrowRight />
                </Button>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline" mr={3}>
                Close
              </Button>
            </DrawerActionTrigger>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </DrawerRoot>
  );
};

export default OfficeSearchDrawer;
