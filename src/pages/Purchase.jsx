import { Flex } from "@chakra-ui/react";
import ProfileTabs from "../components/Profile/ProfileTabs.jsx";
import PurchaseStatus from "../components/Purchase/PurchaseStatus.jsx";

const Purchase = ({ user, setUser }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      backgroundColor="gray.200"
      justifyContent="center"
      pt="5%"
    >
      <ProfileTabs user={user} />
      <PurchaseStatus user={user}/>
    </Flex>
  );
};

export default Purchase;
