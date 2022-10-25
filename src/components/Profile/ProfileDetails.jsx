import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../BackendUrl.jsx";

export default function ProfileDetails({ user, setUser }) {
  const { backendUrl } = useContext(BackendUrlContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [saveState, setSaveState] = useState(true);

  const handleEdit = () => {
    setSaveState(false);
  };

  const handleCancel = () => {
    setSaveState(true);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const data = {
      id: user.id,
      email,
      firstName,
      lastName,
      username,
      address,
      phone,
    };

    axios
      .put(`${backendUrl}/api/users/${user.id}`, data)
      .then((response) => {
        console.log("profile update successful");
        console.log(response.data.result);
        const { updatedUser } = response.data.result;
        setUser(updatedUser);
        setSaveState(true);
        navigate("/profile");
      })
      .catch((err) =>
        console.log("[ERROR] failed to update user profile, err: ", err)
      );

    setSaveState(true);
  };

  return (
    <Box h={{ md: "50%", base: "80%" }} w={{ md: "45%", base: "80%" }}>
      <Flex alignItems="flex-end" justifyContent="center" h={{ base: "15%" }}>
        <Box w="95%" pb="1%" borderBottom="2px">
          <Heading as="h1" size="md">
            My Profile
          </Heading>
          <Text>Manage your account</Text>
        </Box>
      </Flex>
      <Box>
        <Flex alignItems="center" justifyContent="center">
          <Flex
            h={{ md: "300px", base: "400px" }}
            w={{ md: "25%", base: "35%" }}
            pl="3%"
            pt="3%"
            flexDirection={"column"}
          >
            <Flex h={"20%"} backgroundColor={"#FFBECA"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">Username:</Text>
            </Flex>
            <Flex h={"20%"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">First Name:</Text>
            </Flex>
            <Flex h={"20%"} backgroundColor={"#FFBECA"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">Last Name:</Text>
            </Flex>
            <Flex h={"20%"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">Email:</Text>
            </Flex>
            <Flex h={"20%"} backgroundColor={"#FFBECA"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">Phone:</Text>
            </Flex>
            <Flex h={"20%"} alignItems={"center"}>
              <Text margin="0px 0px 0px 10px">Address:</Text>
            </Flex>
          </Flex>
          <Flex
            h={{ md: "300px", base: "400px" }}
            w={{ base: "75%" }}
            pr="3%"
            pt="3%"
            flexDirection={"column"}
          >
            {saveState ? (
              <>
                <Flex
                  h={"20%"}
                  backgroundColor={"#FFBECA"}
                  alignItems={"center"}
                >
                  <Text>{username}</Text>
                </Flex>
                <Flex h={"20%"} alignItems={"center"}>
                  <Text>{firstName}</Text>
                </Flex>
                <Flex
                  h={"20%"}
                  backgroundColor={"#FFBECA"}
                  alignItems={"center"}
                >
                  <Text>{lastName}</Text>
                </Flex>
                <Flex h={"20%"} alignItems={"center"}>
                  <Text>{email}</Text>
                </Flex>
                <Flex
                  h={"20%"}
                  backgroundColor={"#FFBECA"}
                  alignItems={"center"}
                >
                  <Text>{phone}</Text>
                </Flex>
                <Flex h={"20%"} alignItems={"center"}>
                  <Text>{address}</Text>
                </Flex>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  height={"20%"}
                  value={username}
                  backgroundColor={"#FFBECA"}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  height={"20%"}
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  height={"20%"}
                  backgroundColor={"#FFBECA"}
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <Input
                  type="email"
                  height={"20%"}
                  value={email}
                  disabled={"true"}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  height={"20%"}
                  backgroundColor={"#FFBECA"}
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  height={"20%"}
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </>
            )}
          </Flex>
        </Flex>
      </Box>
      <Flex h={{ md: "20%" }} alignItems="center" justifyContent="center">
        {saveState ? (
          <Box>
            <Button
              variant="solid"
              bgColor={"#FF5876"}
              color={"white"}
              _hover={{
                bg: "#FF8BA0",
              }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          <HStack>
            <Button
              variant="solid"
              bgColor={"#FF5876"}
              color={"white"}
              _hover={{
                bg: "#FF8BA0",
              }}
              onClick={handleSave}
            >
              Save Profile
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
