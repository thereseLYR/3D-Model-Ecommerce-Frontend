import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import ModelBox from "../components/ModelBox.jsx";

const Landing = ({ user }) => {
  const { backendUrl } = useContext(BackendUrlContext)

  return (
    <>
      {' '}
        <Grid p={4} >
          <Box
            p={4}
            m='8px 0px 16px 0px'
            bg='gray.100'
            height='200px'
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
            textAlign='center'
          >
            <Text>Hi!</Text>
            <Text>We sell 3D models woohoo</Text>
            <Text>I think we can have some description here?</Text>
            <Text>Or some cool slideshow?</Text>
          </Box>
          <Box>
            <Heading as='h3' size='lg' marginBottom='8px'>
              Featured Models
            </Heading>
            <Grid templateColumns='repeat(5, 1fr)'>
              <Grid item> 
                <ModelBox />
              </Grid>
              <Grid item>
                <ModelBox />
              </Grid>
              <Grid item>
                <ModelBox />
              </Grid>
              <Grid item>
                <ModelBox />
              </Grid>
              <Grid item>
                <ModelBox />
              </Grid>
            </Grid>
          </Box>
        </Grid>
    </>
  );
};

export default Landing;
