import React, { useState, useContext } from 'react'
import {
  Flex,
  Heading,
  Button,
  chakra,
  Box,
  Text,
  Avatar,
  Link,
  Stack,
} from '@chakra-ui/react'
import axios from "axios";
import { CgProfile } from 'react-icons/cg'
import { BiPurchaseTag } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import BackendUrlContext from '../components/BackendUrl.jsx'

const Profile = ({ user, setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [checkState, setCheckState] = useState('submitted')
  const navigate = useNavigate()
  const CProfile = chakra(CgProfile)
  const CPurchaseTag = chakra(BiPurchaseTag)  

  

  const handleSave = (event) => {
    event.preventDefault()

      const data = {
        id: user.id,
      }
      axios
        .post(`${backendUrl}/api/update-profile`, data)
        .then((response) => {
          console.log("profile update successful");
          console.log(response.data.result);
          const { updatedUser } = response.data.result;
          setUser(updatedUser);
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
              <Text as='b'> {user.username}</Text>
            </Flex>
            <Flex
              pt={3}
              backgroundColor={'gray.200'} 
              alignItems='center'
              justifyContent='center'
              flexDirection={'column'}>
            <Flex           
              alignItems='center'
              justifyContent='center' >
                <Link
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.600"}
                  href='/profile'
                  _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                  }}
                >
                  {<CProfile color="black" w={10} h={10} />}
                 </Link>
                 <Link
                  w={200}
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.600"}
                  href='/profile'
                  _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                  }}
                >
                  My Profile
                 </Link>
              </Flex>
              <Flex           
              alignItems='center'
              justifyContent='center' >
                <Link
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.600"}
                  href='/profile/purchase'
                  _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                  }}
                >
                  {<CPurchaseTag color="black" w={10} h={10}/>}
                 </Link>
                 <Link
                  w={200}
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.600"}
                  href='/profile/purchase'
                  _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                  }}
                >
                  My Purchases
                 </Link>
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
            backgroundColor={'orange'} 
          >
          <Box 
            w='95%'
            pb='1%'
            borderBottom='1px' 
            borderColor={'gray.300'}
            // backgroundColor={'green.200'} 
          >
            <Heading as='h1' size='md' >
              My Purchases
            </Heading>
            <Text>Status of Purchases</Text>
          </Box>
          </Flex>
              <Flex 
               flexDirection={'row'} 
               alignItems='center'
               justifyContent='space-evenly'
               backgroundColor='gray.200'
               h={'13%'}
              >
                  <Button 
                    borderBottom='1px' 
                    borderColor={'gray.300'} 
                    h={'60%'} 
                    w={'33%'}
                    backgroundColor='white'
                    background= 'none'
                    _active={{
                      textDecoration: 'none',
                    }}
                    _hover={{
                    color:'green'
                    }}
                    onClick={()=>setCheckState('submitted')}
                  > Submitted                 
                  </Button>
                  <Button                    
                    borderBottom='1px' 
                    borderColor={'gray.300'} 
                    backgroundColor='white'
                    h={'60%'} 
                    w={'33%'}
                    _active={{
                    textDecoration: 'none',
                    }}
                    _hover={{
                    color:'green'
                    }}
                    onClick={()=>setCheckState('progress')}
                  > In Progress 
                  </Button>
                  <Button                  
                    borderBottom='1px' 
                    borderColor={'gray.300'} 
                    backgroundColor='white'
                    h={'60%'} 
                    w={'33%'}
                    _active={{
                    textDecoration: 'none',
                    }}
                    _hover={{
                    color:'green'
                    }}
                    onClick={()=>setCheckState('completed')}
                  > Completed
                  </Button>
              </Flex>
                <Flex 
                  alignItems='center'
                  justifyContent='center'
                  backgroundColor='white'
                >
                  <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" backgroundColor='grey'>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      justifyContent="space-between">
                        <Box>INSERT PICTURE HERE</Box>
                      <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                        Title
                      </Text>
                      <Stack direction={{ base: 'column', md: 'row' }}>
                        <Text>$50.00</Text>
                      </Stack>
                    </Stack>
                  </Stack>
               </Flex>
              </Box>
             
        </Flex>
  ) 
      
}

export default Profile;