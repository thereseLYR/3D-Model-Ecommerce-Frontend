import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  HStack,
  Image,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ModelFields from "./ModelFields";
import ModelTabs from "./ModelTabs";

export default function StaticModel() {
  const navigate = useNavigate();

  const boxWidth = "500px";
  const boxHeight = "800px";

  const handleCustomiseModelClick = () => {
    navigate("/clicky");
  };

  return (
    <Container>
      <VStack spacing={10}>
        <Box alignItems={"left"}>
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/models">3D Models</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/model">Clicky</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <HStack spacing={5} divider={<StackDivider borderColor="gray.200" />}>
            <Box w={boxWidth} h={boxHeight}>
              <VStack spacing={3}>
                <Image src="https://picsum.photos/400" alt="product_image" />
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
              <ModelFields />
            </Box>
          </HStack>
        </Box>
        <Box>
          <ModelTabs />
        </Box>
      </VStack>
    </Container>
  );
}
