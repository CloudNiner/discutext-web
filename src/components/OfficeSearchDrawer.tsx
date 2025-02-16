import React, { ChangeEvent, useState } from "react";

import {
  Button,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import useSWR from "swr";

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { InputGroup } from "@/components/ui/input-group";
import discutextApi from "@/discutext-api";
import { NWSOffice } from "@/discutext-api/models";

const nwsOfficeFetcher = async (): Promise<NWSOffice[]> => {
  return await discutextApi.getOffices();
};

const OfficeSearchDrawer: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const { data: offices, isLoading } = useSWR("NWSOFFICES", nwsOfficeFetcher);
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);
  const searchOffices = () => {
    if (searchValue.length < 2) {
      return [];
    }
    return (offices || []).filter((office) => {
      const searchValueLower = searchValue.toLowerCase();
      return (
        office.CWA.toLowerCase().includes(searchValueLower) ||
        office.CityState.toLowerCase().includes(searchValueLower)
      );
    });
  };

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
            <InputGroup
              flex="1"
              endElement={isLoading ? <Spinner /> : undefined}
            >
              <Input
                value={searchValue}
                disabled={isLoading}
                placeholder="Search by ID, City, or State"
                onChange={onSearchChange}
              />
            </InputGroup>
            <VStack alignItems="flex-start">
              {searchOffices().map((office) => (
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
