import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { validateEmail } from "../../utils/validateEmail";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleOnSend = () => {
    if (validateEmail(email)) {
      toast({
        title: "Messaged Sent",
        description: "Message has been sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <NavBar />
      <br />
      <Container>
        <VStack alignItems="left">
          <Text as="b" fontSize="lg">
            Need Help?
          </Text>
          <Text>Need help with your order? Issues with your purchase?</Text>
          <Text>Looking to print a custom design?</Text>
          <Text>
            Send us a message here or email us at
            <Link color="teal.400">{" 3d.appdev2022@gmail.com "}</Link>
            and we'll get back to you as soon as possible!
          </Text>
          <br />
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={email.length > 0 && !validateEmail(email)}
              errorBorderColor="red.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              type="text"
              name="message"
              label="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></Textarea>
          </FormControl>
          <Button
            type="submit"
            variant="solid"
            bgColor={"teal.400"}
            color={"white"}
            width="full"
            onClick={handleOnSend}
            _hover={{
              bg: "teal.300",
            }}
          >
            Send
          </Button>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
