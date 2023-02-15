import { Box, Grid, GridItem, List, ListItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import Footer from "../components/Footer.jsx";
import ModelBox from "../components/ModelBox.jsx";

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
        console.log("[ERROR] unable to get categories: ", error);
      });
  }, [backendUrl]);

  // render the models every time selectedcategory changes
  useEffect(() => {
    if (selectedCategory === 0) {
      axios
        .get(`${backendUrl}/api/models`)
        .then((response) => {
          const models = response.data.results;
          setModelsData(models);
        })
        .catch((error) => {
          console.log("[ERROR] unable to get models: ", error);
        });
    } else {
      axios
        .get(`${backendUrl}/api/models-by-category/${selectedCategory}`)
        .then((response) => {
          const models = response.data.results;
          setModelsData(models);
        })
        .catch((error) => {
          console.log("[ERROR] unable to get models by category: ", error);
        });
    }
  }, [selectedCategory, backendUrl]);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} style={{ margin: "10px" }}>
        <GridItem rowSpan={2} colSpan={1}>
          <List>
            <ListItem key={`uuid-${selectedCategory}`}>
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
                _hover={{
                  cursor: "pointer",
                }}
                fontWeight="700"
              >
                All Categories
              </Box>
            </ListItem>
            {categoriesData &&
              categoriesData.map((category, index) => (
                <ListItem key={`category_${index}`}>
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
                    _hover={{
                      cursor: "pointer",
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
            style={{ fontSize: "24px", fontWeight: "700", marginLeft: "10px" }}
          >
            Models
          </Text>
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
        </GridItem>
      </Grid>
      <Box height={"200px"}></Box>
      <Footer />
    </>
  );
}
