import { Container, Text, VStack } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";

export default function Delivery() {
  return (
    <>
      <NavBar />
      <br />
      <Container>
        <VStack alignItems="left">
          <Text as="b" fontSize="28px">
            Delivery Policy and Rates
          </Text>
          <Text as="b" fontSize="lg">
            Singapore Delivery Policy
          </Text>
          <Text fontSize="sm" color="gray.600">
            Porky Prints offers free postal delivery on all orders within
            Singapore over $30.
          </Text>
          <Text fontSize="sm" color="gray.600">
            All orders placed before 12pm SGT Monday-Friday are shipped out the
            same day.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Orders will typically take 1-5 business days based on the postal
            service in Singapore. All deliveries will be made with the most
            economical method.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Once the order is sent out for delivery, you will receive an order
            complete email and tracking number when applicable.
          </Text>
          <Text fontSize="sm" color="gray.600">
            We can only deliver to the address that you provide. If your package
            is returned to us due to either an invalid address or unclaimed, we
            will refund the order minus our delivery cost.
          </Text>
          <Text as="b" fontSize="lg">
            Rest of the World Shipping Policy
          </Text>
          <Text fontSize="sm" color="gray.600">
            At this time we do not offer shipping to any other countries outside
            of Singapore.
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
