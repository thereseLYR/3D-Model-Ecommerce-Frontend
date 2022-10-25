import { Button, useToast } from "@chakra-ui/react";

export default function SaveButton(props) {
  const { onSaveCustomClick, onExitClick } = props;
  const toast = useToast();
  return (
    <>
      <Button
        variant="solid"
        size="lg"
        bgColor={"#FF5876"}
        color={"white"}
        _hover={{
          bg: "#FF8BA0",
        }}
        margin={"10px 0px 10px 0px"}
        onClick={() => {
          onSaveCustomClick();
          toast({
            title: "Custom Colours Saved.",
            position: "top-left",
            description: "Successfully saved model custom colours.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }}
      >
        Save Custom Colors
      </Button>
      <Button variant="outline" colorScheme={"pink"} onClick={onExitClick}>
        Return to Clicky
      </Button>
    </>
  );
}
