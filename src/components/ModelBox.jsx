import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ModelBox({
  imageUrl,
  modelId,
  title,
  imageAlt,
  reviewCount = 10,
  rating = 5,
}) {
  const navigate = useNavigate();
  const handleModelBoxClick = () => navigate(`/model/${modelId}`);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleModelBoxClick}
      id={modelId}
      margin={"8px"}
      width={"250px"}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        height={"150px"}
        width={"250px"}
        objectFit={"fit"}
      />
      <Box p="4">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="pink">
            New!
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
        <Box display="flex" mt="1" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < rating ? "#FF5876" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
