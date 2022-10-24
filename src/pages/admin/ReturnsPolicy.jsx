import { Container, Link, Text, VStack } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
export default function ReturnsPolicy() {
  return (
    <>
      <NavBar />
      <br />
      <Container>
        <VStack alignItems="left">
          <Text as="b" fontSize="28px">
            Returns and Refund Policy
          </Text>
          <Text fontSize="md" color="gray.600">
            Please contact us to discuss the details of any problem prior to
            sending any product back. You can reach us at{" "}
            <Link color="#FF5876">3d.appdev2022@gmail.com</Link>.
          </Text>
          <Text as="b" fontSize="md">
            Refund and Warranty Policy
          </Text>
          <Text fontSize="sm" color="gray.600">
            Our general policy last 90 days for all Porky Prints Products. If
            you are outside of the 90 days for Porky Prints Products, we cannot
            offer you a refund or exchange.
          </Text>
          <Text as="b" fontSize="md">
            Refund
          </Text>
          <Text fontSize="sm" color="gray.600">
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.
            Upon inspection and approved, your refund will be processed, and a
            credit will automatically be applied to your credit card or original
            method of payment.
          </Text>
          <Text as="b" fontSize="md">
            Late or Missing Refunds
          </Text>
          <Text fontSize="sm" color="gray.600">
            If you haven’t received a refund yet, first check your original
            payment method account again. Then contact your payment method
            company, it may take some time before your refund is officially
            posted. If you’ve done all of this and you still have not received
            your refund yet, please contact us at{" "}
            <Link color="#FF5876">3d.appdev2022@gmail.com</Link>.
          </Text>
          <Text as="b" fontSize="md">
            Exchanges
          </Text>
          <Text fontSize="sm" color="gray.600">
            When sending an item in for exchange per the policies above, send to
            the following address:
          </Text>
          <VStack spacing={1} alignItems="left">
            <Text fontSize="sm" color="gray.400">
              To: Porky Prints
            </Text>
            <Text fontSize="sm" color="gray.400">
              Attn: Porky Returns
            </Text>
            <Text fontSize="sm" color="gray.400">
              Address: 8 Sin Ming Road, Sin Ming Centre #01-03 Singapore 575628
            </Text>
          </VStack>
          <Text fontSize="sm" color="gray.600">
            You will be responsible for paying for your own postal costs for
            returning your item. Postal and shipping costs are non-refundable.
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
