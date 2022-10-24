import { Divider, Text, VStack } from "@chakra-ui/react";
import CartDetail from "../components/cart/CartDetail";
import Navbar from "../components/Navbar.jsx";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <VStack spacing={5}>
        <Text fontSize={"4xl"}>My Cart</Text>
        <Divider />
        <CartDetail />
      </VStack>
    </>
  );
}
