import { LockIcon } from "@chakra-ui/icons";
import { Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <br />
        <VStack spacing={5}>
          <LockIcon w={20} h={20} />
          <Text fontSize={"3xl"}>Access Denied</Text>
          <Text fontSize={"xl"} textAlign={"center"}>
            You are required to create an account and login before checking out
            your cart to make payment
          </Text>
          <HStack>
            <Button
              size="lg"
              onClick={() => navigate("/cart")}
              bgColor={"#FF5876"}
              color={"white"}
              _hover={{
                bg: "#FF8BA0",
              }}
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
