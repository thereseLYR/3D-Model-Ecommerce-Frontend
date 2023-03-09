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
  Tag,
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
  return (
    <Text fontSize={"lg"} color={"gray.700"}>
      There are no items in your shopping cart
    </Text>
  );
};

export default function CartDrawer() {
  const cartBtnRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie] = useCookies(["temp-cart"]);
  const [cartCookie, setCartCookie] = useState(cookies["temp-cart"] || []);

  useEffect(() => {
    if (cookies["temp-cart"] && cookies["temp-cart"].length > 0) {
      setCartCookie(cookies["temp-cart"]);
    } else {
      setCartCookie([]);
    }
  }, [cookies]);

  const DrawerCartItem = ({ item }) => {
    return (
      <HStack divider={<StackDivider borderColor="gray.200" />} spacing={5}>
        <Image
          src="/models/model1.png"
          boxSize="120px"
          alt="product_image"
        ></Image>
        <VStack alignItems={"start"} spacing={1}>
          <Text as="b" fontSize={"lg"} color={"gray.700"}>
            {item.model_name}
          </Text>
          <Text fontSize={"sm"} color={"gray.600"}>
            Material: {item.material}
          </Text>
          <Text fontSize={"sm"} color={"gray.600"}>
            Quantity: {item.quantity} pcs
          </Text>
          <Text fontSize={"sm"} color={"gray.600"}>
            Price: ${item.ppu * item.quantity}
          </Text>
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
        {/* cart icon button */}
        <>
          <Icon w={7} h={7} as={BiCart} />
          {cartCookie.length > 0 && (
            <Tag margin="0px 0px 0px 6px">{cartCookie.length}</Tag>
          )}
        </>
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
              <Text color={"gray.700"}>Shopping Cart </Text>
              <Text color={"gray.700"}>
                {cartCookie ? cartCookie.length : 0} Items
              </Text>
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              alignItems={"start"}
            >
              {cartCookie.length > 0 ? (
                cartCookie.map((item, idx) => (
                  <DrawerCartItem key={idx} item={cartCookie[idx]} />
                ))
              ) : (
                <EmptyCartText />
              )}
            </VStack>
            <br />
            <Divider />
            <br />
            <VStack spacing={5}>
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
