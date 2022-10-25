import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../BackendUrl.jsx";
import Footer from "../Footer";
import ModelFields from "./ModelFields";
import ModelTabs from "./ModelTabs";

export default function StaticModel() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(BackendUrlContext);
  const [model, setModel] = useState("");

  const boxWidth = "500px";
  const boxHeight = "800px";

  const handleCustomiseModelClick = () => {
    navigate("/clicky");
  };

  useEffect(() => {
    axios.get(`${backendUrl}/api/models/1`).then((result) => {
      let modelDataForOrderCookie = {};
      const data = result.data["modelData"];
      // populate additional fields with data from DB
      modelDataForOrderCookie["model_name"] = data["model_name"];
      modelDataForOrderCookie["model_description"] = data["model_description"];
      const ppu = data["price_per_unit"];
      modelDataForOrderCookie["ppu"] = ppu;
      setModel(modelDataForOrderCookie);
    });
  }, [backendUrl]);

  return (
    <>
      <Container>
        <VStack spacing={10}>
          <br />
          <Box>
            <HStack
              spacing={5}
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Box w={boxWidth} h={boxHeight}>
                <VStack spacing={3}>
                  <Image src="models/model1.png" alt="model1" />
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    size="lg"
                    onClick={handleCustomiseModelClick}
                  >
                    Customise Model
                  </Button>
                </VStack>
              </Box>
              <Box w={boxWidth} h={boxHeight}>
                <ModelFields modelDataForOrderCookie={model} />
              </Box>
            </HStack>
          </Box>
          <Box>
            <ModelTabs modelDescription={model.model_description} />
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
