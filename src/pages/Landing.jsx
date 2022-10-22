import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import ModelBox from "../components/ModelBox.jsx";
import Navbar from "../components/Navbar.jsx";

const Landing = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);
  const [modelsData, setModelsData] = useState();

  // render models on landing
  // render the models every time selectedcategory changes
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/models`)
      .then((response) => {
        const models = response.data.results;
        setModelsData(models);
      })
      .catch((error) => {
        console.log("[ERROR] unable to get models: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Grid p={4}>
        <Heading as="h3" size="lg" marginBottom="8px">
          Featured Models
        </Heading>
        <Box style={{ display: "flex" }}>
          {modelsData &&
            modelsData.map((model) => (
              <ModelBox
                imageUrl={`/models/model${model.id}.png`}
                imageAlt={model.model_description}
                title={model.model_name}
                modelId={model.id}
              />
            ))}
        </Box>
      </Grid>
    </>
  );
};

export default Landing;
