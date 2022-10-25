import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../components/BackendUrl.jsx";
import Footer from "../components/Footer.jsx";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const { backendUrl } = useContext(BackendUrlContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email) {
      const data = {
        email,
        password,
        firstName,
        lastName,
        username,
        address,
        phone,
      };
      axios
        .post(`${backendUrl}/api/register`, data)
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => console.log("[ERROR] unable to register: ", error));
    } else {
      console.log("[ERROR] signup email is empty");
    }
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="white"
        justifyContent="flex-start"
        alignItems="center"
        paddingTop={"30px"}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="#FF5876" />
          <Heading color="#FF5876">Sign up</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="First name"
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Last name"
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Phone"
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={6}
                  type="submit"
                  variant="solid"
                  bgColor={"#FF5876"}
                  color={"white"}
                  width="full"
                  onClick={handleSubmit}
                  _hover={{
                    bg: "#FF8BA0",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Footer />
      </Flex>
    </>
  );
};

export default Signup;
