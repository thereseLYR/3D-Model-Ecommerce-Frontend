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
  // hard code reviews for demo purposes
  let reviews = [
    {
      id: "fakereview1",
      username: "mario",
      comments: "The quality was awesome! Fun to meddle with.",
      rating: 5,
    },
    {
      id: "fakereview2",
      username: "wario",
      comments: "Easy to assemble.",
      rating: 5,
    },
    {
      id: "fakereview3",
      username: "bowser",
      comments: "I saw one of these my friend ordered and I bought one.",
      rating: 5,
    },
    {
      id: "fakereview4",
      username: "yoshi",
      comments:
        "One of my hobbies is tinkering and building, this was extremely fun!",
      rating: 5,
    },
    {
      id: "fakereview5",
      username: "luigi",
      comments: "Heard about this on a radio, decided to give it a try",
      rating: 5,
    },
  ];

  const shuffleReviews = () => {
    for (let i = reviews.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
    }
    return reviews;
  };

  const getRandomInt = () => Math.floor(Math.random() * reviews.length) + 1;
  const randomReviews = shuffleReviews().splice(0, getRandomInt());

  return (
    <VStack
      alignItems={"start"}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={3}
    >
      {randomReviews.map((r, _) => (
        <Box key={r.id}>
          <Text
            color={"teal.500"}
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

export default function ModelTabs({ modelDescription }) {
  return (
    <Tabs colorScheme="teal" size="md" align="start" w={"900px"}>
      <TabList>
        <Tab>Description</Tab>
        <Tab>Reviews</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text color={"gray.700"}>{modelDescription}</Text>
        </TabPanel>
        <TabPanel>
          <ReviewCard />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
