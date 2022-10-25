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
  Link,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../components/BackendUrl.jsx";
import Footer from "../components/Footer";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // prevent it from submitting a form
    event.preventDefault();

    if (email) {
      axios
        .post(`${backendUrl}/api/login`, {
          email,
          password,
        })
        .then((response) => {
          const { user } = response.data.result;
          setUser(user);
          if (user) {
            navigate("/");
          } else navigate("/login");
        })
        .catch((error) => console.log("[ERROR] unable to login: ", error));
    } else {
      console.log("[ERROR] login email is empty");
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
          <Heading color="#FF5876">Welcome</Heading>
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
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          {"New to us? "}
          <Link color="#FF5876" href="/signup">
            Sign up
          </Link>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default Login;
