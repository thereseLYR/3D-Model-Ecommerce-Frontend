import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import BackendUrlContext from "../BackendUrl.jsx";
import React, { useContext } from 'react'
import axios from "axios";

const property = {
  imageUrl:
    "https://img1.cgtrader.com/items/1878019/45d16e73d0/large/teddy-bear-tiny-figurine-for-3d-printing-3d-model-obj-mtl-fbx-stl.jpg",
  imageAlt: "Cute 3D printed dark brown bear",
  title: "Cute Dark Brown Bear",
  category: "Animals",
  reviewCount: 10,
  rating: 5,
};

export default function PurchaseCard({orderDetails, state, fetchOrderData}) {
  const { backendUrl } = useContext(BackendUrlContext);
  
  let orderData = JSON.parse(orderDetails.order_details)[0]
  let orderId = orderDetails.id

   let handleCancelOrder = () => {
    axios
      .delete(`${backendUrl}/api/orders/cancel-order/${orderId}`)
      .then((response) => {
        console.log(response);
        fetchOrderData();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

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
              {orderData.model_name}
            </Text>
            { state === "submitted" && 
            <Button colorScheme="pink" size="xs" onClick={handleCancelOrder}>
              Cancel Order
            </Button>
            }   
            { state === "progress" && 
            <Button 
              colorScheme="pink" 
              size="xs"  
              _active={{
                textDecoration: 'none',
              }}
              _hover={{
                cursor: 'default',
                textDecoration: "none",
              }}>
              In Progress
            </Button>
            }
            { state === "completed" && 
            <Button 
              colorScheme="pink" 
              size="xs"
              _active={{
                textDecoration: 'none',
              }}
              _hover={{
                cursor: 'default',
                textDecoration: "none",
              }}>
              Completed
            </Button>
            }                 
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
               {orderData.model_description}
            </Text>
            <Text
              fontSize={{ base: "sm" }}
              textAlign={"left"}
              maxW={"4xl"}
              pt={"1%"}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              x{orderData.quantity}
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
          {Object.keys(orderData.component_breakdown).map((key, index) => 
            (<Text fontSize={{ base: "sm" }} textAlign={"left"} as="h4">
            {key} : {orderData.component_breakdown[key]}
          </Text>)
          )}
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
          color="pink.500"
          pr="2%"
        >
          ${parseInt(orderData.quantity) * parseInt(orderData.ppu)}.00
        </Text>
      </Flex>
    </Flex>
  );
}
