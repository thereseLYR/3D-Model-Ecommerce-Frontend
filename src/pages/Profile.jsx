import { Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileTabs from "../components/Profile/ProfileTabs";

const Profile = ({ user, setUser }) => {
  // TODO: ideally we should do a get to backend /api/users/user_id to get full user data instead of getting from cookies
  return (
    <>
      <Flex w="100%" h="60%" justifyContent="center" pt="5%">
        <ProfileTabs user={user} />
        <ProfileDetails user={user} />
      </Flex>
      <Footer />
    </>
  );
};

export default Profile;
