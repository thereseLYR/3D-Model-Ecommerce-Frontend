import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import ModelBox from "../components/ModelBox.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Models() {
  const { backendUrl } = useContext(BackendUrlContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoriesData, setCategoriesData] = useState();
  const [modelsData, setModelsData] = useState();

  // get all categories on render
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/categories`)
      .then((response) => {
        const categories = response.data.results;
        setCategoriesData(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // render the models every time selectedcategory changes
  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory === 0) {
      axios
        .get(`${backendUrl}/api/models`)
        .then((response) => {
          console.log(response.data.results);
          const models = response.data.results;
          setModelsData(models);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${backendUrl}/api/models-by-category/${selectedCategory}`)
        .then((response) => {
          console.log(response.data.results);
          const models = response.data.results;
          setModelsData(models);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        style={{ margin: "10px" }}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <List>
            <ListItem>
              <Box
                className={
                  selectedCategory === 0
                    ? "selected-category"
                    : "unselected-category"
                }
                border="1px"
                borderColor="grey"
                p="2"
                onClick={() => {
                  setSelectedCategory(0);
                }}
              >
                All Categories
              </Box>
            </ListItem>
            {categoriesData &&
              categoriesData.map((category, index) => (
                <ListItem>
                  <Box
                    id={category.id}
                    key={`category${category.id}`}
                    className={
                      selectedCategory === category.id
                        ? "selected-category"
                        : "unselected-category"
                    }
                    border="1px"
                    borderColor="grey"
                    p="2"
                    onClick={() => {
                      setSelectedCategory(category.id);
                    }}
                  >
                    {category.category_name}
                  </Box>
                </ListItem>
              ))}
          </List>
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          <Text
            style={{ fontSize: "20px", fontWeight: "700", marginLeft: "10px" }}
          >
            Models
          </Text>
          <Box style={{ display: "flex" }}>
            {modelsData &&
              modelsData.map((model) => (
                <ModelBox
                  imageAlt={model.model_description}
                  title={model.model_name}
                  modelId={model.id}
                />
              ))}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
