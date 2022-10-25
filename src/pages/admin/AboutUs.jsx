import { Container, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import Footer from "../../components/Footer";

export default function AboutUs() {
  return (
    <>
      <br />
      <Container>
        <VStack alignItems="left">
          <Text as="b" fontSize="28px">
            About Porky Prints / FAQ
          </Text>
          <Text as="b" fontSize="2xl">
            Porky Prints
          </Text>
          <HStack alignItems={"flex-start"}>
            <Text
              fontSize="sm"
              color="gray.600"
              marginRight={"10px"}
              paddingTop={"10px"}
            >
              We are a 3D printing service e-commerce business based out of
              Singapore. Our primary services are providing custom 3D prints and
              products in a variety of materials. You can feel confident and
              satisfied knowing our 3D printing experts will always deliver the
              best.
            </Text>
            <Image boxSize="150px" src="../porky_prints_icon.svg" />
          </HStack>
        </VStack>
        <VStack alignItems="start">
          <Text as="b" fontSize="2xl" marginBottom={"10px"}>
            FAQ
          </Text>
          <Text color="gray.700" as="b">
            Q. Who's behind Porky Prints?
          </Text>
          <Text fontSize="sm" color="gray.600">
            Porky Prints was founded in 2022, by {""}
            <Link color="#FF5876" href="https://github.com/thereseLYR">
              Therese
            </Link>
            , {""}
            <Link color="#FF5876" href="https://github.com/staceyng">
              Stacey
            </Link>
            , {""}
            <Link color="#FF5876" href="https://github.com/Nyx92">
              Yanxiang
            </Link>{" "}
            and {""}
            <Link color="#FF5876" href="https://github.com/sundriedtomato12">
              Felicia
            </Link>
            . During the course of Rocket Academy's Bootcamp, they banded
            together to begin their aspiring journey as software developers
            whilst also continuing their hobbies for building and tinkering
            through 3D printing.
          </Text>
          <Text color="gray.700" as="b">
            Q. Why Porky Prints?
          </Text>
          <Text fontSize="sm" color="gray.600">
            'Porky' is a synonym for lies or fabications - a pun on the physical
            'fabrications' that we do in-house to manufacture the items you buy
            from us! Also, we love cute piggies.
          </Text>
          <Text color="gray.700" as="b">
            Q. What 3D printers do we use?
          </Text>
          <Text fontSize="sm" color="gray.600">
            Prusa MK3Ss and Voron V0.1s.
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
