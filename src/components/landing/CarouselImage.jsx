import { Box, Image } from "@chakra-ui/react";

export default function CarousellImage(props) {
  const { srcPath } = props;
  return (
    <>
      <Box w="38vw">
        <Image h="100%" src={srcPath} alt="a 3D Model" objectFit={"cover"} />
      </Box>
    </>
  );
}
