import { Flex } from "@chakra-ui/react";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileTabs from "../components/Profile/ProfileTabs";

const Profile = ({ user, setUser }) => {
  // TODO: ideally we should do a get to backend /api/users/user_id to get full user data instead of getting from cookies
  return (
    <Flex w="100%" h="100%" justifyContent="center" pt="5%">
      <ProfileTabs user={user} />
      <ProfileDetails user={user} />
    </Flex>
  );
};

export default Profile;
