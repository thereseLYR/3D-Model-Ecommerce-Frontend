import {
  Box,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

const ReviewCard = () => {
  // hard code reviews for now
  const reviews = [
    {
      id: "fakereview1",
      username: "supermario",
      comments: "The quality was awesome! Fun to meddle with.",
      rating: 5,
    },
    {
      id: "fakereview2",
      username: "wario",
      comments: "Easy to assemble.",
      rating: 5,
    },
  ];

  return (
    <VStack
      alignItems={"start"}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={3}
    >
      {reviews.map((r, _) => (
        <Box key={r.id}>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
            textAlign={"left"}
          >
            {r.username}
          </Text>
          <Text color={"gray.600"}>{r.comments}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default function ModelTabs() {
  return (
    <Tabs size="md" align="start" w={"900px"}>
      <TabList>
        <Tab>Description</Tab>
        <Tab>Reviews</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text color={"gray.600"}>
            Clicky! It's a toy inspired by other fidget toys and designed for
            the anxious with the need to fidget with something. Provides stress
            relieve, is lightweight and suitable to tinker around with!
          </Text>
          <br />
          <Text color={"gray.600"}>
            Comprises of 3 parts - customise to your desired color and start
            building!
          </Text>
          <br />
          <Text color={"gray.600"}>
            Part Breakdown: Gear x1 , Front Housing x1, Back Housing x1
          </Text>
        </TabPanel>
        <TabPanel>
          <ReviewCard />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
