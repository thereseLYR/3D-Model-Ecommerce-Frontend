import React, { useState, useContext } from 'react'
import {
  Flex,
  Heading,
  Button,
  chakra,
  Box,
  Text,
  Avatar,
  Input,
} from '@chakra-ui/react'
import axios from "axios";
import { CgProfile } from 'react-icons/cg'
import { BiPurchaseTag } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import BackendUrlContext from '../components/BackendUrl.jsx'

const Profile = ({ user, setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [email, setEmail] = useState(user.email)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [username, setUsername] = useState(user.username)
  const [address, setAddress] = useState(user.address)
  const [phone, setPhone] = useState(user.phone)
  const [saveState, setSaveState] = useState(true)
  const [profileState, setProfileState] = useState(true)
  const navigate = useNavigate()
  const CProfile = chakra(CgProfile)
  const CPurchaseTag = chakra(BiPurchaseTag)  

  const handleEdit = () => {
    console.log('clicked')
    setSaveState(false)
    }

  const handleProfileSelect = () => {
    setProfileState(true)
    navigate('/profile')
  }

  const handlePurchaseSelect = () => {
    setProfileState(false)
    navigate('/profile/purchase')
  }

  const handleSave = (event) => {
    event.preventDefault()

      const data = {
        id: user.id,
        email,
        firstName,
        lastName,
        username,
        address,
        phone
      }
      axios
        .post(`${backendUrl}/api/update-profile`, data)
        .then((response) => {
          console.log("profile update successful");
          console.log(response.data.result);
          const { updatedUser } = response.data.result;
          setUser(updatedUser);
          setSaveState(true)
          navigate('/profile')
        })
        .catch((error) => console.log(error))
    } 
  
  return (
     <Flex 
        w='100%'
        h='100%'
        backgroundColor='gray.200'
        justifyContent='center'
        pt='5%'
      >
        {/* Left Box */}
        <Box 
          h={{ md:'50%', base:'80%'}}
          w='10%' 
        >   
          <Flex 
            // backgroundColor={'orange'}
            alignItems='center'
            p={5} 
            h={{ base:'15%'}}
            w={{ base: '85%'}}
            borderBottom='1px' 
            borderColor={'gray.300'}
            >
              <Avatar 
                size={{base:'lg'}} 
                mr={3} 
                name={user.username} 
                src='' />
               <Text as='b'>{user.username}</Text>
          </Flex>
          <Flex
            pt={3}
            backgroundColor={'gray.200'} 
            alignItems='center'
            justifyContent='center'
            flexDirection={'column'}
          >
            <Flex           
              alignItems='center'
              justifyContent='center'
            >
              { profileState ? (
              <Flex
                w={200}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={"green"}
                justifyContent='stretch'
                alignItems='center'
                onClick={handleProfileSelect}
                _hover={{
                cursor: 'pointer',
                textDecoration: "none",
                color: "green",
                }}
              >
                <Box>{<CProfile color="green" w={10} h={10} />}</Box>
                <Box ml={'10%'}>My Profile</Box>
              </Flex>
              ) : ( 
              <Flex
                w={200}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={"gray.600"}
                justifyContent='stretch'
                alignItems='center'
                onClick={handleProfileSelect}
                _hover={{
                cursor: 'pointer',
                textDecoration: "none",
                color: "green",
                }}
              >
                <Box>{<CProfile color="green" w={10} h={10} />}</Box>
                <Box ml={'10%'} >My Profile</Box>
              </Flex>
                )}
            </Flex>
            <Flex
              w={200}
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              color={"gray.600"}
              justifyContent='stretch'
              alignItems='center'
              onClick={handlePurchaseSelect}
              _hover={{
              cursor: 'pointer',
              textDecoration: "none",
              color: "green",
              }}
            >
              <Box>{<CPurchaseTag w={10} h={10}/>}</Box>
              <Box ml={'10%'}>My Purchases</Box>
            </Flex>
          </Flex>
        </Box>

        {/* Right White Box */}
        <Box 
          h={{ md:'50%', base:'80%'}}
          w={{ md:'45%', base:'80%'}} 
          bg='white' 
        >
          <Flex
            alignItems='flex-end'
            justifyContent='center'
            h={{ base:'15%'}}
            // backgroundColor={'orange'} 
          >
            <Box 
              w='95%'
              pb='1%'
              borderBottom='1px' 
              borderColor={'gray.300'}
              // backgroundColor={'green.200'} 
            >
              <Heading as='h1' size='md' >
                My Profile
              </Heading>
              <Text>Manage your account</Text>
            </Box>
          </Flex>
          <Box>
            <Flex 
              alignItems='center'
              justifyContent='center'
            >
              <Flex 
                h={{ md: '300px', base: '400px'}}
                w={{ md: '25%', base: '35%'}}
                // backgroundColor='red'
                pl='3%'
                flexDirection={'column'} 
                justifyContent='space-evenly'
              >
                <Text>
                    Username: 
                </Text>
                <Text>
                    First Name: 
                </Text> 
                  <Text>
                    Last Name: 
                </Text>
                <Text>
                    Email: 
                </Text>
                <Text>
                    Phone: 
                </Text>
                <Text> 
                    Address: 
                </Text>
                </Flex>
              <Flex 
                h={{ md: '300px', base: '400px'}}
                w={{ base: '75%' }} 
                // backgroundColor='white'
                flexDirection={'column'} 
                justifyContent='space-evenly'
                > 
                {saveState ? (
                  <>
                  <Text>
                      {user.username}
                  </Text>
                  <Text>
                      {user.firstName}
                  </Text>
                  <Text>
                      {user.lastName}
                  </Text>
                  <Text>
                      {user.email}
                  </Text>
                  <Text>
                      {user.phone}
                  </Text>
                  <Text>
                      {user.address}
                  </Text>
                  </>
                ) : (
                  <>
                <Input
                  type="text"
                  w={{ md: '85%' }} 
                  value={username}
                  onChange={(event) => {
                  setUsername(event.target.value);
                  }}
                />
                <Input
                  type="text"
                  w={{ md: '85%' }} 
                  value={firstName}
                  onChange={(event) => {
                  setFirstName(event.target.value);
                  }}
              />
              <Input
                type="text"
                w={{ md: '85%' }} 
                value={lastName}
                onChange={(event) => {
                setLastName(event.target.value);
                }}
              />
              <Input
                type="email"
                w={{ md: '85%' }} 
                value={email}
                onChange={(event) => {
                setEmail(event.target.value);
                }}
                />
              <Input
                type="text"
                w={{ md: '85%' }} 
                value={phone}
                onChange={(event) => {
                setPhone(event.target.value);
                }}
              />
              <Input
                type="text"
                w={{ md: '85%' }} 
                value={address}
                onChange={(event) => {
                setAddress(event.target.value);
                }}
              />
              </>
              )}
            </Flex>
          </Flex>
        </Box>
      <Flex 
        h={{md:'20%'}}
        // backgroundColor={'green'}
        alignItems='center'
        justifyContent='center'
      >
        { saveState ? (
          <Box 
          //  backgroundColor={'yellow'}
          >
            <Button onClick={handleEdit}> Edit Profile </Button>
          </Box>
        ) : (
          <Box 
          //  backgroundColor={'yellow'}
          >
            <Button onClick={handleSave}> Save Profile </Button>
          </Box>
        )}
        </Flex>
      </Box>
    </Flex>
  )  
}

export default Profile;