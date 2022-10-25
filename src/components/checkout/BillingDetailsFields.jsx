import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";

const BillingDetailsFields = ({ userDetails }) => {
  const [fullname, setFullname] = useState(
    userDetails.firstName + " " + userDetails.lastName
  );
  const [address, setAddress] = useState(userDetails.address);
  const [phone, setPhone] = useState(userDetails.phone);
  const [email, setEmail] = useState(userDetails.email);

  return (
    <Box minW={{ base: "90%", md: "550px" }}>
      <Text
        color={"#FF5876"}
        textTransform={"uppercase"}
        fontWeight={800}
        letterSpacing={1.1}
        fontSize="2xl"
      >
        Billing and Delivery Details
      </Text>
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
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Email"
          ></InputLeftAddon>
          <Input
            type="email"
            name="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Phone"
          ></InputLeftAddon>
          <Input
            type="text"
            name="phone"
            label="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="Address"
          ></InputLeftAddon>
          <Textarea
            type="text"
            name="address"
            label="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Textarea>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="City"
          ></InputLeftAddon>
          <Select placeholder="Select City" name="city">
            <option value="Singapore">Singapore</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            minW={{ md: "110px" }}
            children="State"
          ></InputLeftAddon>
          <Select placeholder="Select State" name="state">
            <option value="Singapore">Singapore</option>
          </Select>
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
