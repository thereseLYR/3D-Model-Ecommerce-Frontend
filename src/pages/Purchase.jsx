import { Flex } from "@chakra-ui/react";
import ProfileTabs from "../components/Profile/ProfileTabs.jsx";
import PurchaseStatus from "../components/Purchase/PurchaseStatus.jsx";

// TODO: remove
const property = {
  imageUrl:
    "https://img1.cgtrader.com/items/1878019/45d16e73d0/large/teddy-bear-tiny-figurine-for-3d-printing-3d-model-obj-mtl-fbx-stl.jpg",
  imageAlt: "Cute 3D printed dark brown bear",
  title: "Cute Dark Brown Bear",
  category: "Animals",
  reviewCount: 10,
  rating: 5,
};

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
      <PurchaseStatus />
    </Flex>
  );
};

export default Purchase;
