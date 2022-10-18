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
import React, { useState } from "react";
import { useCookies } from "react-cookie";

// TODO: get this model from db, model can consist of multiple parts, we keep track of them in component_breakdown
// get colour from cookie
// query DB for model_name, model_description, and ppu

const defaultClickyColours = {
  Case_A_v3: "coral",
  Spring_Normal: "darkmagenta",
  Wheel_40T: "lightblue",
  Case_B_v4: "indianred",
};

const defaultModelNew = {
  id: 1,
  component_breakdown: defaultClickyColours,
  quantity: 0,
  material: "",
};

export default function ModelFields() {
  const [material, setMaterial] = useState("PLA");
  const [quantity, setQuantity] = useState(0);
  const [successfulAddCart, setSuccessfulAddCart] = useState(false);
  const [cookies, setCookie] = useCookies(["temp-cart"]);

  // TODO: reset button to remove customized config and restore defaults

  const colourDataFromConfigurator = cookies["saved-models"];

  const handleAddToCartClick = () => {
    const componentBreakDownCopy = { ...defaultModelNew.component_breakdown };
    for (const p in componentBreakDownCopy) {
      // if colourDataFromConfigurator[1] exists, assign that value to componentBreakDownCopy[p]
      // else, take default colour
      componentBreakDownCopy[p] = colourDataFromConfigurator[1] 
      ? colourDataFromConfigurator[1][p] 
      : defaultClickyColours[p];
    }

    const cartModelNew = {
      ...defaultModelNew,
      component_breakdown: componentBreakDownCopy,
      quantity: quantity,
      material: material,
    };
    // console.log("DING DING DING THIS IS THE cartModelNew");
    // console.log(cartModelNew);
    // add updated cartModel in cookies
    // setCookie(defaultModel.model_name, cartModel, { path: "/temp-cart" });
    setCookie(defaultModelNew.id, cartModelNew, { path: "/temp-cart" });
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
              {Object.keys(defaultModelNew.component_breakdown).map((m, i) => (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{m}</Td>
                  <Td>
                    {/* check if saved-items exists for this particular modelID first */}
                    {/* if yes, read data from cookie */}
                    {/* else render with default colour values from defaultClickyColours */}
                    {colourDataFromConfigurator[1]
                      ? colourDataFromConfigurator[1][m]
                      : defaultClickyColours[m]}
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
          defaultValue={0}
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
