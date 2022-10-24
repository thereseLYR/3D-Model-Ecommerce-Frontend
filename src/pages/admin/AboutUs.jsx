import { Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <br />
      <Container>
        <VStack alignItems="left">
          <Text as="b" fontSize="28px">
            About Porky Prints / FAQ
          </Text>
          <Text as="b" fontSize="lg">
            Porky Prints
          </Text>
          <HStack>
            <Text fontSize="sm" color="gray.600">
              We are a 3D printing service e-commerce business based out of
              Singapore. Our primary services are providing custom 3D prints and
              products in a variety of materials. You can feel confident and
              satisfied knowing our 3D printing experts will always deliver the
              best.
            </Text>
            <Image boxSize="150px" src="../porky_prints_icon.svg" />
          </HStack>
        </VStack>
        <br />
        <VStack alignItems="start">
          <Text as="b" fontSize="lg">
            FAQ
          </Text>
          <Text color="gray.700">Q. When was Porky Prints founded?</Text>
          <Text fontSize="sm" color="gray.600">
            Porky prints was founded in 2022, by Therese, Stacey, Yanxiang and
            Felicia. During the course of Rocket's Academy Bootcamp, they banded
            together to begin their aspiring journey as software developers
            whilst also continuing their hobbies for building and tinkering
            through 3D printing.
          </Text>
          <Text color="gray.700">Q. Why Porky Prints?</Text>
          <Text fontSize="sm" color="gray.600">
            Porky is synonym for fabricate which means to to lie/ invent
            compared to fabricate's well known meaning of inventing. And we love
            cute piggies!
          </Text>
          <Text color="gray.700">Q. What are the printers we use?</Text>
          <Text fontSize="sm" color="gray.600">
            HP inkjet da best
          </Text>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
