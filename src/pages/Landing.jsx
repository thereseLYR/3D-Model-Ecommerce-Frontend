import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import ModelBox from "../components/ModelBox.jsx";
import Navbar from "../components/Navbar.jsx";

const Landing = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);

  return (
    <>
      <Navbar />
      <Grid p={4}>
        <Box
          w="98%"
          p={4}
          m="8px 0px 16px 0px"
          bg="gray.100"
          height="200px"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          textAlign="center"
        >
          <Text>Hi!</Text>
          <Text>We sell 3D models woohoo</Text>
          <Text>I think we can have some description here?</Text>
          <Text>Or some cool slideshow?</Text>
        </Box>
        <Heading as="h3" size="lg" marginBottom="8px">
          Featured Models
        </Heading>
        {/* TODO: add featured models */}
        {/* <Grid templateColumns="repeat(5, 1fr)" gap={2}>
          <Grid item></Grid>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Landing;
