import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Image,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CartDetail() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["temp_cart"]);
  let tempCartCookie = cookies.temp_cart;
  let colourCartCookie = cookies["saved-models"];
  console.log("this is from cartDetail");
  console.log("cookies", cookies);
  // use tempCartCookie for model ID/material/quantity data
  // use saved-models for colour options
  console.log(tempCartCookie);
  console.log(colourCartCookie);

  useEffect(() => {
    tempCartCookie = cookies.temp_cart;
  }, [cookies.temp_cart]);
  // ... what is this useEffect doing?

  const onEditClick = () => navigate("/model");
  const onDeleteClick = (id) => {
    for (let i = 0; i < tempCartCookie.length; i += 1) {
      const currentItem = tempCartCookie[i];
      if (currentItem.id == id) {
        tempCartCookie.splice(i, 1);
      }
    }
    setCookie("temp_cart", tempCartCookie, { path: "/" });
  };

  const CartItem = ({ item }) => {
    if (item) {
      console.log("bro wtf is item");
      console.log(item);
      return (
        <HStack spacing={10} divider={<StackDivider borderColor="gray.200" />}>
          <Image src="https://picsum.photos/150/180"></Image>
          <VStack>
            <Text as="b" fontSize={"lg"}>
              {item.model_name}
            </Text>
            <Text fontSize={"sm"}>Model ID: {item.id} </Text>
            <Text fontSize={"sm"}>Colors: </Text>
            <Text fontSize={"sm"}>Material: {item.material}</Text>
            <Text fontSize={"sm"}>Quantity: {item.quantity}</Text>
          </VStack>
          <HStack>
            <IconButton
              onClick={onEditClick}
              colorScheme="teal"
              aria-label="remove-item-cart"
              icon={<EditIcon />}
            />
            <IconButton
              button={item.id}
              onClick={() => onDeleteClick(item.id)}
              colorScheme="teal"
              aria-label="remove-item-cart"
              icon={<DeleteIcon />}
            />
          </HStack>
        </HStack>
      );
    } else {
      return <Text>No items in Cart</Text>;
    }
  };

  const onCheckoutClick = () => navigate("/cart-checkout");

  return (
    <VStack spacing={10} divider={<StackDivider borderColor="gray.200" />}>
      <CartItem item={tempCartCookie.length > 0 && tempCartCookie[0]} />
      <Button colorScheme="pink" size="lg" onClick={onCheckoutClick}>
        Checkout
      </Button>
    </VStack>
  );
}
