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
import { useState } from "react";
import { useCookies } from "react-cookie";

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

export default function ModelFields({ modelDataForOrderCookie }) {
  const [material, setMaterial] = useState("PLA");
  const [price, setPrice] = useState(modelDataForOrderCookie["ppu"] || 15); // TODO: bug here, to discover why price is undefined
  const [quantity, setQuantity] = useState(1);
  const [successfulAddCart, setSuccessfulAddCart] = useState(false);
  const [cookies, setCookie] = useCookies(["temp-cart"]);

  // TODO: reset button to remove customized config and restore defaults
  const colourDataFromConfigurator = cookies["saved-models"] || "";

  const handleAddToCartClick = () => {
    const componentBreakDownCopy = { ...defaultModelNew.component_breakdown };
    for (const p in componentBreakDownCopy) {
      // if colourDataFromConfigurator[1] exists, assign that value to componentBreakDownCopy[p]
      // else, take default colour
      componentBreakDownCopy[p] = colourDataFromConfigurator[1]
        ? colourDataFromConfigurator[1][p]
        : defaultClickyColours[p];
    }
    const cartModelNew = [
      {
        ...defaultModelNew,
        component_breakdown: componentBreakDownCopy,
        quantity: quantity,
        material: material,
        model_name: modelDataForOrderCookie["model_name"],
        model_description: modelDataForOrderCookie["model_description"],
        ppu: modelDataForOrderCookie["ppu"],
      },
    ];

    // TODO: this overrides cartModelNew, we should append to array instead
    setCookie("temp_cart", cartModelNew, { path: "/" });
    setSuccessfulAddCart(true);
  };

  const handleOnMaterialChange = (ev) => {
    setMaterial(ev.target.value);
  };

  const handleOnQuantityChange = (ev) => {
    setQuantity(ev);
  };

  const ModelBreakdown = () => {
    return (
      <Box>
        <Text
          color={"gray.400"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"md"}
          letterSpacing={1.1}
          textAlign={"left"}
        >
          Component Breakdown
        </Text>
        <TableContainer>
          <Table variant="striped" colorScheme="pink">
            <TableCaption>
              All parts will be made in the same material
            </TableCaption>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Part Name</Th>
                <Th>Color</Th>
                <Th>Sample</Th>
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
                  <Td><div style={{"backgroundColor":colourDataFromConfigurator[1]
                      ? colourDataFromConfigurator[1][m]
                      : defaultClickyColours[m], "color":colourDataFromConfigurator[1]
                      ? colourDataFromConfigurator[1][m]
                      : defaultClickyColours[m]}}>TEST TEXT</div></Td>
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
        color={"gray.600"}
        fontWeight={800}
        textTransform={"uppercase"}
        fontSize={"4xl"}
      >
        Clicky
      </Text>
      <Text
        color={"#FF5876"}
        textTransform={"uppercase"}
        fontWeight={800}
        fontSize={"2xl"}
        letterSpacing={1.1}
        textAlign={"left"}
      >
        Customise color, material and quantity
      </Text>
      <ModelBreakdown />
      <FormControl>
        <FormLabel
          color={"gray.400"}
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
          color={"gray.400"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"md"}
          letterSpacing={1.1}
          textAlign={"left"}
        >
          Quantity
        </FormLabel>
        <NumberInput
          defaultValue={1}
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
      <Text
        color={"gray.500"}
        textTransform={"uppercase"}
        fontWeight={800}
        fontSize={"lg"}
        letterSpacing={1.1}
        textAlign={"left"}
      >
        Price: ${price * quantity}
      </Text>
      <Button
        variant="solid"
        size="lg"
        onClick={handleAddToCartClick}
        disabled={quantity === 0}
        bgColor={"#FF5876"}
        color={"white"}
        _hover={{
          bg: "#FF8BA0",
        }}
      >
        Add to Cart
      </Button>
      <Text>{successfulAddCart && "Successfully added to cart!"}</Text>
    </VStack>
  );
}
