import { LockIcon } from "@chakra-ui/icons";
import { Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container>
        <br />
        <VStack spacing={5}>
          <LockIcon w={20} h={20} />
          <Text fontSize={"3xl"}>Access Denied</Text>
          <Text fontSize={"xl"} textAlign={"center"}>
            You are required to login or sign up if you have not before checking
            out your cart to make payment
          </Text>
          <HStack>
            <Button
              colorScheme="pink"
              size="lg"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </Button>
            <Button
              colorScheme="teal"
              variant={"outline"}
              size="lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default AccessDeniedPage;
