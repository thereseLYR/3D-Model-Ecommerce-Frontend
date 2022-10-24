import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// TODO: get this model from db, model can consist of multiple parts, we keep track of them in component_breakdown
const defaultModel = {
  id: 1,
  model_name: "Clicky",
  model_description: "some description",
  ppu: 30,
  component_breakdown: {
    part_id_1: { part_name: "Gear", default_color: "grey", color: null }, // color change in configurator to update this field in cookies
    part_id_2: {
      part_name: "Front Housing",
      default_color: "green",
      color: null,
    },
    part_id_3: {
      part_name: "Back Housing",
      default_color: "green",
      color: null,
    },
  },
  quantity: 0,
  material: "",
};

export default function ModelFields() {
  const [material, setMaterial] = useState("PLA");
  const [quantity, setQuantity] = useState(0);
  const [successfulAddCart, setSuccessfulAddCart] = useState(false);
  const [cookies, setCookie] = useCookies(["temp_cart"]);
  let tempCartCookies = cookies.temp_cart || "";

  useEffect(() => {
    tempCartCookies = cookies.temp_cart;
  }, [cookies.temp_cart]);

  const handleAddToCartClick = () => {
    const componentBreakDownCopy = { ...defaultModel.component_breakdown };
    // set colors
    for (const p in componentBreakDownCopy) {
      componentBreakDownCopy[p]["color"] = componentBreakDownCopy[p].color
        ? componentBreakDownCopy[p].color
        : componentBreakDownCopy[p].default_color;
    }

    const cartModel = {
      ...defaultModel,
      component_breakdown: componentBreakDownCopy,
      quantity: quantity,
      material: material,
    };

    let tempCart = [];
    tempCart.push(cartModel);

    // add updated cartModel in cookies
    setCookie("temp_cart", tempCart, { path: "/" });
    setSuccessfulAddCart(true);
  };

  const handleOnMaterialChange = (ev) => {
    console.log("material change event: ", ev.target.value);
    setMaterial(ev.target.value);
  };

  const handleOnQuantityChange = (ev) => {
    console.log("quantity change event: ", ev);
    setQuantity(ev);
  };

  const ModelBreakdown = () => {
    return (
      <Box>
        <Text
          color={"gray.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"md"}
          letterSpacing={1.1}
          textAlign={"left"}
        >
          Clicky Component Breakdown
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>
              All parts will be made in the same material
            </TableCaption>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Part Name</Th>
                <Th>Color</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(defaultModel.component_breakdown).map((m, i) => (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{defaultModel.component_breakdown[m].part_name}</Td>
                  <Td>
                    {defaultModel.component_breakdown[m].color
                      ? defaultModel.component_breakdown[m].color
                      : defaultModel.component_breakdown[m].default_color}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <VStack alignItems={"start"} spacing={5}>
      <Text
        color={"gray.700"}
        fontWeight={800}
        textTransform={"uppercase"}
        fontSize={"4xl"}
      >
        Clicky
      </Text>
      <Text
        color={"green.500"}
        textTransform={"uppercase"}
        fontWeight={800}
        fontSize={"lg"}
        letterSpacing={1.1}
        textAlign={"left"}
      >
        Customise color, material and quantity
      </Text>
      <ModelBreakdown />
      <FormControl>
        <FormLabel
          color={"gray.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"md"}
          letterSpacing={1.1}
          textAlign={"left"}
        >
          Material
        </FormLabel>
        <Select
          defaultValue={material}
          placeholder="Select a material"
          onChange={handleOnMaterialChange}
        >
          <option value="PLA">PLA</option>
          <option value="ABS">ABS</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel
          color={"gray.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"md"}
          letterSpacing={1.1}
          textAlign={"left"}
        >
          Quantity
        </FormLabel>
        <NumberInput
          defaultValue={
            tempCartCookies.length > 0 ? tempCartCookies[0].quantity : 0
          }
          min={1}
          max={5}
          onChange={handleOnQuantityChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <br />
      <Button
        colorScheme="pink"
        variant="solid"
        size="lg"
        onClick={handleAddToCartClick}
        disabled={quantity === 0}
      >
        Add to Cart
      </Button>
      <Text>{successfulAddCart && "Successfully added to cart!"}</Text>
    </VStack>
  );
}
