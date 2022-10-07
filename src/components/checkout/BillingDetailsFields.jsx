// TODO: pass props
import React from "react";
import {
  VStack,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Text,
} from "@chakra-ui/react";

const BillingDetailsFields = () => {
  return (
    <Box minW={{ base: "90%", md: "500px" }}>
      <Text fontSize="lg">Delivery Details</Text>
      <br />
      <VStack>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Name"
          ></InputLeftAddon>
          <Input
            type="text"
            name="name"
            label="name"
            placeholder="John Doe"
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Email"
          ></InputLeftAddon>
          <Input
            type="text"
            name="email"
            label="email"
            nameplaceholder="johndoe@email.com"
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Address"
          ></InputLeftAddon>
          <Input
            type="text"
            name="address"
            label="address"
            placeholder=""
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="City"
          ></InputLeftAddon>
          <Input
            type="text"
            name="city"
            label="city"
            placeholder="Singapore"
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="State"
          ></InputLeftAddon>
          <Input
            type="text"
            name="state"
            label="state"
            placeholder="Singapore"
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Zip Code"
          ></InputLeftAddon>
          <Input
            type="text"
            name="zip"
            label="zip"
            placeholder=""
            required
          ></Input>
        </InputGroup>
      </VStack>
      <br />
    </Box>
  );
};

export default BillingDetailsFields;
