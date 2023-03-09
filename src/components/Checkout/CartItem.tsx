import { Box, HStack, StackDivider, Text } from "@chakra-ui/react";

// TODO: change anonymous type definition to interface
// item (temp-cart data) will ahve the following format:
// const cartModelNew = [
//   {
//     ...defaultModelNew,
//     component_breakdown: componentBreakDownCopy,
//     quantity: quantity,
//     material: material,
//     model_name: modelDataForOrderCookie["model_name"],
//     model_description: modelDataForOrderCookie["model_description"],
//     ppu: modelDataForOrderCookie["ppu"],
//   },
// ];

// currently breaks on the CartCheckoutPage
export default function CartItem({ item }: { item: { [key: string]: any } }) {
  return (
    <HStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={25}
      align="stretch"
    >
      <Box w={300}>
        <Text as="b" fontSize={"lg"}>
          {item.model_name}
        </Text>
        {Object.keys(item.component_breakdown).map((i) => {
          return (
            <Text fontSize={"s"}>
              {i}: {item.component_breakdown[i]}
            </Text>
          );
        })}
        <br />
      </Box>
      <Box w={50}>
        <Text>Qty:</Text>
        <br />
        <Text>{item.quantity}</Text>
      </Box>
      <Box w={50}>
        <Text>Price:</Text>
        <br />
        <Text>${item.ppu * item.quantity}</Text>
      </Box>
    </HStack>
  );
}
