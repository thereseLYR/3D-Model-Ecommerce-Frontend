import { Button } from "@chakra-ui/react";

export default function LandingNavButton(props) {
  const { displayText, navFunction } = props;
  return (
    <>
      <Button
        onClick={navFunction}
        _hover={{ textDecoration: "underline" }}
        bg="none"
        color="white"
        fontSize="lg"
      >
        {displayText}
      </Button>
    </>
  );
}
