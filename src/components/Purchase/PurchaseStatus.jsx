import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import BackendUrlContext from "../BackendUrl.jsx";
import PurchaseCard from "./PurchaseCard.jsx";

export default function PurchaseStatus() {
  const { backendUrl } = useContext(BackendUrlContext);
  const [checkState, setCheckState] = useState("submitted");

  return (
    <Box
      h={{ md: "50%", base: "80%" }}
      w={{ md: "45%", base: "80%" }}
      bg="white"
    >
      <Flex
        alignItems="flex-end"
        justifyContent="center"
        h={{ base: "15%" }}
        bg="white"
      >
        <Box w="95%" pb="1%">
          <Heading as="h1" size="md">
            My Purchases
          </Heading>
          <Text>Status of Purchases</Text>
        </Box>
      </Flex>
      <Flex
        flexDirection={"row"}
        alignItems="center"
        justifyContent="space-evenly"
        backgroundColor="gray.200"
        h={"13%"}
      >
        <Button
          borderBottom="2px"
          borderColor={checkState === "submitted" ? "green" : "gray.300"}
          h={"60%"}
          w={"33%"}
          color="green"
          backgroundColor="white"
          background="none"
          _active={{
            textDecoration: "none",
          }}
          onClick={() => setCheckState("submitted")}
        >
          Submitted
        </Button>
        <Button
          borderBottom="2px"
          borderColor={checkState === "progress" ? "green" : "gray.300"}
          backgroundColor="white"
          h={"60%"}
          w={"33%"}
          color="green"
          _active={{
            textDecoration: "none",
          }}
          onClick={() => setCheckState("progress")}
        >
          In Progress
        </Button>
        <Button
          borderBottom="2px"
          borderColor={checkState === "completed" ? "green" : "gray.300"}
          backgroundColor="white"
          h={"60%"}
          w={"33%"}
          color="green"
          _active={{
            textDecoration: "none",
          }}
          onClick={() => setCheckState("completed")}
        >
          Completed
        </Button>
      </Flex>
      <Flex
        alignItems="center"
        direction="column"
        overflow="auto"
        h={{ md: "400px" }}
      >
        {checkState === "submitted" && (
          <>
            {/* First Entry */}
            <PurchaseCard />
            {/* Second Entry */}
            <PurchaseCard />
          </>
        )}
        {/* end of second Entry */}
        {/* start of progress first Entry */}
        {checkState === "progress" && (
          <>
            <PurchaseCard />
          </>
        )}
        {/* end of progress first entry */}
        {/* start of completed first entry */}
        {checkState === "completed" && (
          <>
            <PurchaseCard />
          </>
        )}
        {/* end of progress first entry */}
      </Flex>
    </Box>
  );
}
