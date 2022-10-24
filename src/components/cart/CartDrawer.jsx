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
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  return <Icon w={7} h={7} as={BiCart} />;
};

const EmptyCartText = () => {
  return <Text>There are no items in your shopping cart.</Text>;
};

export default function CartDrawer() {
  const cartBtnRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie] = useCookies(["temp_cart"]);
  const [cartCookie, setCartCookie] = useState(cookies.temp_cart || []);

  useEffect(() => {
    if (cookies.temp_cart && cookies.temp_cart.length > 0) {
      setCartCookie(cookies.temp_cart);
    }
  }, [cookies]);

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
        color="gray.800"
        bg="#FF8BA0"
        _hover={{
          bg: "#FFBECA",
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
              <Text>{cartCookie ? cartCookie.length : 0} Items</Text>
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack
              spacing={5}
              divider={<StackDivider borderColor="gray.200" />}
            >
              {cartCookie.length > 0 ? (
                cartCookie.map((item, idx) => (
                  <DrawerCartItem key={idx} item={cartCookie[idx]} />
                ))
              ) : (
                <EmptyCartText />
              )}
              <Text fontSize={"md"} as="b">
                Subtotal: $
                {cartCookie.length > 0
                  ? cartCookie.reduce(
                      (total, obj) => obj.quantity * obj.ppu + total,
                      0
                    )
                  : 0}
              </Text>
              <Button
                borderRadius={5}
                type="submit"
                variant="solid"
                bgColor={"#FF5876"}
                color={"white"}
                onClick={() => navigate("/cart")}
                _hover={{
                  bg: "#FF8BA0",
                }}
              >
                View Cart
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
