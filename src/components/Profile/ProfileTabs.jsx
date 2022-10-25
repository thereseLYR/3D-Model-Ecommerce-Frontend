import { Avatar, Box, chakra, Flex, Text } from "@chakra-ui/react";
import { BiPurchaseTag } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function ProfileTabs({ user }) {
  const CProfile = chakra(CgProfile);
  const CPurchaseTag = chakra(BiPurchaseTag);
  const navigate = useNavigate();

  const handleProfileSelect = () => {
    navigate("/profile");
  };

  const handlePurchaseSelect = () => {
    navigate("/profile/purchase");
  };

  return (
    <Box h={{ md: "100%", base: "80%" }} w="10%">
      <Flex alignItems="center" p={-2} h={{ base: "15%" }} w={{ base: "85%" }}>
        <Avatar mr={3} name={user.username} src="" />
        <Text as="b">{user.username}</Text>
      </Flex>
      <Flex
        pt={3}
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
      >
        <Flex alignItems="center" justifyContent="center">
          <Flex
            w={200}
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            justifyContent="stretch"
            alignItems="center"
            onClick={handleProfileSelect}
            _hover={{
              cursor: "pointer",
              textDecoration: "none",
              color: "pink.500",
            }}
          >
            <Box>{<CProfile w={10} h={10} />}</Box>
            <Box ml={"10%"}>My Profile</Box>
          </Flex>
        </Flex>
        <Flex
          w={200}
          p={2}
          fontSize={"sm"}
          fontWeight={500}
          justifyContent="stretch"
          alignItems="center"
          onClick={handlePurchaseSelect}
          _hover={{
            cursor: "pointer",
            textDecoration: "none",
            color: "pink.500",
          }}
        >
          <Box>{<CPurchaseTag w={10} h={10} />}</Box>
          <Box ml={"10%"}>My Purchases</Box>
        </Flex>
      </Flex>
    </Box>
  );
}
