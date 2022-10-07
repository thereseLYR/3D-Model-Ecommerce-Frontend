import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ModelBox from "../components/ModelBox.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Models() {
  return (
    <>
      <Navbar />
      <Grid p={4}>
        <Text>
          Incomplete page. Supposed to have sidenav at the left with all the
          categories, and display of the models on the right.
        </Text>
      </Grid>
    </>
  );
}
