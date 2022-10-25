import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Divider,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { validateEmail } from "../utils/validateEmail";

const PaymentIcons = () => {
  return (
    <Image
      h={10}
      w={40}
      src="/payment_icons_stripe.png"
      alt="payment-icons-stripe"
    />
  );
};

const SmallPinkDiv = () => {
  return <div className="footer__smallpink"></div>;
};

const SmallWhiteDiv = () => {
  return <div className="footer__smallwhite"></div>;
};

const EmailSubscriptionInput = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (validateEmail(email)) {
      setEmail("");
      toast({
        title: "Email subscribed",
        description: "You have successfully subscribed to our mailing list.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <InputGroup size={"sm"}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isInvalid={email.length > 0 && !validateEmail(email)}
        errorBorderColor="red.300"
      />
      <InputRightElement>
        <IconButton
          size="sm"
          bg=""
          aria-label="right-arrow"
          icon={<ArrowForwardIcon />}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default function Footer() {
  return (
    <VStack className="footer">
      <Divider />
      <HStack spacing={20}>
        {/* Customer Assistance block */}
        <VStack spacing={3} alignItems="left">
          <Text as="b" color="gray.700" fontSize="sm">
            Customer Assistance
          </Text>
          <SmallPinkDiv />
          <Link color="gray.500" fontSize="xs" href="/admin/delivery">
            Delivery
          </Link>
          <Link color="gray.500" fontSize="xs" href="/admin/returns-policy">
            Returns Policy
          </Link>
        </VStack>
        {/* More info block */}
        <VStack spacing={3} alignItems="left">
          <Text as="b" color="gray.700" fontSize="sm">
            More Information
          </Text>
          <SmallPinkDiv />
          <Link color="gray.500" fontSize="xs" href="/admin/contact-us">
            Contact us
          </Link>
          <Link color="gray.500" fontSize="xs" href="/admin/about-us">
            About us
          </Link>
        </VStack>
        <VStack alignItems="left">
          <Text as="b" color="gray.700" fontSize="sm">
            Subscribe to our emails
          </Text>
          <EmailSubscriptionInput />
          {/* HACK #2 FOR ALIGNMENT */}
          <Text color="white" fontSize="xs">
            dummy placeholder
          </Text>
          <SmallWhiteDiv />
          {/* END HACK #2 */}
        </VStack>
      </HStack>
      <Divider />
      <br />
      {/* Payment Icons and CopyRight */}
      <PaymentIcons />
      <Text fontSize="xs" color="gray.300">
        © 2022, Porky Prints
      </Text>
      <br />
    </VStack>
  );
}
