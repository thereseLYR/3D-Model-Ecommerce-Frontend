import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Image,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  return <Icon w={6} h={6} as={BiCart} />;
};

const EmptyCartText = () => {
  return <Text>There are no items in your shopping cart.</Text>;
};

export default function CartDrawer() {
  const cartBtnRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie] = useCookies(["temp_cart"]);
  let tempCartCookies = cookies.temp_cart || "";

  useEffect(() => {
    tempCartCookies = cookies.temp_cart;
  }, [cookies.temp_cart]);

  const DrawerCartItem = ({ item }) => {
    return (
      <HStack
        divider={<StackDivider borderColor="gray.200" />}
        alignItems={"start"}
      >
        <Image src="https://picsum.photos/100/100" alt="product_image"></Image>
        <VStack alignItems={"start"}>
          <Text fontSize={"lg"} as="b">
            {item.model_name}
          </Text>
          <Text>
            {item.material}, x{item.quantity}
          </Text>
          <Text>${item.ppu * item.quantity}</Text>
        </VStack>
      </HStack>
    );
  };

  return (
    <>
      <Button
        display={{ base: "none", md: "inline-flex" }}
        onClick={onOpen}
        color="white"
        bg="pink.400"
        _hover={{
          bg: "pink.300",
        }}
      >
        <CartIcon />
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={cartBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={3}>
              <Text>Shopping Cart</Text>
              <Text>{tempCartCookies ? tempCartCookies.length : 0} Items</Text>
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack
              spacing={5}
              divider={<StackDivider borderColor="gray.200" />}
            >
              {tempCartCookies.length !== 0 ? (
                tempCartCookies.map((item, idx) => (
                  <DrawerCartItem key={idx} item={tempCartCookies[idx]} />
                ))
              ) : (
                <EmptyCartText />
              )}
              <Text fontSize={"md"} as="b">
                Subtotal: $
                {tempCartCookies.length !== 0
                  ? tempCartCookies.reduce(
                      (total, obj) => obj.quantity * obj.ppu + total,
                      0
                    )
                  : 0}
              </Text>
              <Button colorScheme="blue" onClick={() => navigate("/cart")}>
                View Cart
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
