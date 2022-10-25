import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";

const property = {
  imageUrl:
    "https://img1.cgtrader.com/items/1878019/45d16e73d0/large/teddy-bear-tiny-figurine-for-3d-printing-3d-model-obj-mtl-fbx-stl.jpg",
  imageAlt: "Cute 3D printed dark brown bear",
  title: "Cute Dark Brown Bear",
  category: "Animals",
  reviewCount: 10,
  rating: 5,
};

export default function PurchaseCard() {
  return (
    <Flex
      mt={"1%"}
      mb={"1%"}
      p={3}
      h={{ md: "220px" }}
      w="50%"
      boxShadow="lg"
      borderRadius="sm"
      backgroundColor={"gray.100"}
      direction="column"
    >
      <Stack
        w={"100%"}
        h={"40%"}
        direction={{ base: "column", md: "row" }}
        pb="1%"
        borderBottom="1px"
        borderColor={"gray.300"}
      >
        <Image
          w={{ md: "20%" }}
          src={property.imageUrl}
          alt={property.imageAlt}
          objectFit={"cover"}
        />
        <Stack w={"80%"} p={"1%"} direction={{ base: "column" }}>
          {/* Title */}
          <Flex justifyContent="space-between">
            <Text
              fontSize={{ base: "md" }}
              textAlign={"left"}
              maxW={"4xl"}
              fontWeight="semibold"
              as="h2"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.title}
            </Text>
            <Button colorScheme="teal" size="xs">
              Cancel Order
            </Button>
          </Flex>
          {/* Description */}
          <Flex justifyContent="space-between">
            <Text
              fontSize={{ base: "sm" }}
              textAlign={"left"}
              maxW={"4xl"}
              pt={"1%"}
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.imageAlt}
            </Text>
            <Text
              fontSize={{ base: "sm" }}
              textAlign={"left"}
              maxW={"4xl"}
              pt={"1%"}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              x 50
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <Flex
        w={"100%"}
        h={"45%"}
        borderBottom="1px"
        borderColor={"gray.300"}
        direction="column"
        mb="1%"
      >
        <Text
          fontSize={{ base: "sm" }}
          textAlign={"left"}
          pl={"1%"}
          fontWeight="semibold"
          as="h4"
        >
          Colour Configuration Part Breakdown:
        </Text>
        <Flex direction="column" pl={"3%"} overflow={"auto"}>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} as="h4">
            Case_A_v3: coral
          </Text>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} as="h4">
            Spring_Normal: darkmagenta
          </Text>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} as="h4">
            Wheel_40T: lightblue
          </Text>
          <Text fontSize={{ base: "sm" }} textAlign={"left"} as="h4">
            Case_B_v4: indianred
          </Text>
        </Flex>
      </Flex>
      <Flex w={"100%"} h={"40%"} justifyContent={"right"}>
        <Text fontSize={{ base: "sm" }} textAlign={"right"} as="h4" pr="2%">
          Total Payment:
        </Text>
        <Text
          fontSize={{ base: "sm" }}
          textAlign={"right"}
          as="h4"
          color="green"
          pr="2%"
        >
          $50.00
        </Text>
      </Flex>
    </Flex>
  );
}
