import { Box, Text } from "@chakra-ui/react";
import React from "react";

const CheckoutErrorContainer = () => {
  return (
    <Box>
      <Text color="tomato">
        Error processing card payment, please try again
      </Text>
    </Box>
  );
};

export default CheckoutErrorContainer;
