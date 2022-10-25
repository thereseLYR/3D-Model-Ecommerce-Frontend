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
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CartDetail() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["temp_cart"]);
  const colourCartCookie = useRef(cookies["saved-models"] || []);
  const cartCookie = useRef(cookies["temp_cart"] || []);
  // use cartCookie.current for model ID/material/quantity data
  // use saved-models for colour options

  useEffect(() => {
    if (cartCookie.length > 0) {
      cartCookie.current = cookies["temp_cart"];
    }
    if (colourCartCookie.length > 0) {
      colourCartCookie.current = cookies["saved-models"];
    }
  });

  const onEditClick = () => navigate("/model");
  const onDeleteClick = (id) => {
    for (let i = 0; i < cartCookie.current.length; i += 1) {
      const currentItem = cartCookie.current[i];
      if (currentItem.id === id) {
        cartCookie.current.splice(i, 1);
      }
    }
    setCookie("temp_cart", cartCookie.current, { path: "/" });
  };

  const CartItem = ({ cartDataItem, modelDataItem }) => {
    let modelNamesArr;
    if (cartDataItem) {
      if (modelDataItem && !(modelDataItem.length > 0)) {
        // use default colors from cartDataItem
        modelNamesArr = Object.keys(cartDataItem.component_breakdown);
      } else {
        // use colors set from modelDataItem
        // modelDataItem[0][1] is an object with pure colour data from the customized clicky model
        modelNamesArr = Object.keys(modelDataItem[0][1]);
      }
      const modelDataItemsList = modelNamesArr.map((key) => {
        return (
          <li key={key}>
            <strong>{key}</strong>:{" "}
            {modelDataItem.length > 0
              ? modelDataItem[0][1][key]
              : cartDataItem.component_breakdown[key]}
          </li>
        );
      });

      return (
        <HStack spacing={10} divider={<StackDivider borderColor="gray.200" />}>
          <Image src="/models/model1.png" boxSize="280px"></Image>
          <VStack alignItems="start">
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
      return <Text>No items in cart</Text>;
    }
  };

  return (
    <VStack spacing={10} divider={<StackDivider borderColor="gray.200" />}>
      <CartItem
        cartDataItem={cartCookie.current.length > 0 && cartCookie.current[0]}
        modelDataItem={colourCartCookie.current}
      />
      {/* hardcoded modelId for colourCartCookie since our only active configurator is clicky */}
      <Button
        size="lg"
        onClick={() => navigate("/cart-checkout")}
        bgColor={"#FF5876"}
        color={"white"}
        _hover={{
          bg: "#FF8BA0",
        }}
        s
      >
        Checkout
      </Button>
    </VStack>
  );
}
