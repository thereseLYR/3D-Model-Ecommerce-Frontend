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
  let tempCartCookie = cookies["temp_cart"];
  let colourCartCookie = cookies["saved-models"];
  console.log("this is from cartDetail");
  // console.log("cookies", cookies);
  // use tempCartCookie for model ID/material/quantity data
  // use saved-models for colour options
  console.log("cart cookie", tempCartCookie);
  console.log("colour cookie", colourCartCookie);

  useEffect(() => {
    tempCartCookie = cookies["temp_cart"];
  }, [cookies.temp_cart]);
  // ... what is this useEffect doing?

  const onEditClick = () => navigate("/model");
  const onDeleteClick = (id) => {
    for (let i = 0; i < tempCartCookie.length; i += 1) {
      const currentItem = tempCartCookie[i];
      if (currentItem.id === id) {
        tempCartCookie.splice(i, 1);
      }
    }
    setCookie("temp_cart", tempCartCookie, { path: "/" });
  };

  const CartItem = ({ cartDataItem, modelDataItem }) => {
    if (cartDataItem) {
      console.log(cartDataItem);
      console.log("modelDataItem", modelDataItem);
      // modelDataItem[0][1] is an object with pure colour data from the customized clicky model
      const modelDataItemsList = Object.keys(modelDataItem[0][1]).map((key) => {
        return (
          <li key={key}>
            {" "}
            <strong>{key}</strong>: {modelDataItem[key]}{" "}
          </li>
        );
      });

      // console.log(modelDataItemsList);

      return (
        <HStack spacing={10} divider={<StackDivider borderColor="gray.200" />}>
          <Image src="https://picsum.photos/150/180"></Image>
          <VStack>
            <Text as="b" fontSize={"lg"}>
              {cartDataItem.model_name}
            </Text>
            <Text fontSize={"sm"}>Model ID: {cartDataItem.id} </Text>
            <Text fontSize={"sm"}>Colors: {modelDataItemsList} </Text>
            <Text fontSize={"sm"}>Material: {cartDataItem.material}</Text>
            <Text fontSize={"sm"}>Quantity: {cartDataItem.quantity}</Text>
          </VStack>
          <HStack>
            <IconButton
              onClick={onEditClick}
              colorScheme="teal"
              aria-label="remove-item-cart"
              icon={<EditIcon />}
            />
            <IconButton
              button={cartDataItem.id}
              onClick={() => onDeleteClick(cartDataItem.id)}
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
      <CartItem
        cartDataItem={tempCartCookie.length > 0 && tempCartCookie[0]}
        modelDataItem={[colourCartCookie]}
      />
      {/* hardcoded modelId for colourCartCookie since our only active configurator is clicky */}
      <Button colorScheme="pink" size="lg" onClick={onCheckoutClick}>
        Checkout
      </Button>
    </VStack>
  );
}
