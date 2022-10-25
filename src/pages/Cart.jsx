import { Divider, Text, VStack } from "@chakra-ui/react";
import CartDetail from "../components/cart/CartDetail";
import Footer from "../components/Footer";

export default function CartPage() {
  return (
    <>
      <VStack spacing={5}>
        <Text fontSize={"4xl"} fontWeight={"700"} marginTop={"10px"}>
          My Cart
        </Text>
        <Divider />
        <CartDetail />
      </VStack>
      <Footer />
    </>
  );
}
