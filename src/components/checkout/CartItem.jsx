import { Box, HStack, StackDivider, Text } from "@chakra-ui/react";

export default function CartItem({ item }) {
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
