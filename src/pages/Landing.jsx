import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../components/BackendUrl.jsx";
import Footer from "../components/Footer.jsx";
import CarouselImage from "../components/Landing/CarouselImage.jsx";
import SlideAnimation from "../components/Landing/SlideAnimation.jsx";
import ModelBox from "../components/ModelBox.jsx";

const Landing = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);
  const [modelsData, setModelsData] = useState();
  const navigate = useNavigate();

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
  }, [backendUrl]);

  return (
    <>
      <Box>
        <Flex direction="column">
          <Flex bg="black" h="600px" justifyContent={"center"}>
            <Image
              w={{ md: "20%" }}
              src="porky_prints_icon_white.svg"
              alt="a 3D Model"
              objectFit={"fit"}
              marginRight={"30px"}
            />
            <Flex
              bg="black"
              w={{ md: "%" }}
              justifyContent={"center"}
              direction={"column"}
            >
              <Heading size="2xl" color="white">
                Porky Prints
              </Heading>
              <Text pt="2%" fontSize="3xl" color="white" marginBottom={"4px"}>
                Practical. Playable. Printable.
              </Text>
              <Flex>
                <Button
                  onClick={() => navigate("/admin/contact-us")}
                  _hover={{ textDecoration: "underline" }}
                  bg="none"
                  color="white"
                  fontSize="lg"
                  padding={"0px"}
                >
                  {"Learn More >"}
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  _hover={{ textDecoration: "underline" }}
                  bg="none"
                  color="white"
                  fontSize="lg"
                >
                  {"Sign Up >"}
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex h={"600px"} direction={"row"}>
            <Flex h={"100%"} animation={SlideAnimation} alignItems="center">
              <Flex h="100%">
                <CarouselImage srcPath={"/models/model1.png"} />
                <CarouselImage srcPath={"/models/model2.png"} />
                <CarouselImage srcPath={"/models/model3.png"} />
                <CarouselImage srcPath={"/models/model4.png"} />
              </Flex>
            </Flex>
            <Flex h={"100%"} animation={SlideAnimation} alignItems="center">
              <Flex h="100%">
                <CarouselImage srcPath={"/models/model1.png"} />
                <CarouselImage srcPath={"/models/model2.png"} />
                <CarouselImage srcPath={"/models/model3.png"} />
                <CarouselImage srcPath={"/models/model4.png"} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Grid p={4} style={{ margin: "10px" }}>
        <Heading as="h3" size="lg" marginBottom="14px" marginLeft={"10px"}>
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
      <Footer />
    </>
  );
};

export default Landing;
