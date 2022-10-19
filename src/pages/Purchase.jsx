import React, { useState, useContext } from 'react'
import {
  Flex,
  Heading,
  Button,
  chakra,
  Box,
  Text,
  Avatar,
  Image,
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
  const [profileState, setProfileState] = useState(false)
  const navigate = useNavigate()
  const CProfile = chakra(CgProfile)
  const CPurchaseTag = chakra(BiPurchaseTag)  

    const property = {
    imageUrl:
      "https://img1.cgtrader.com/items/1878019/45d16e73d0/large/teddy-bear-tiny-figurine-for-3d-printing-3d-model-obj-mtl-fbx-stl.jpg",
    imageAlt: "Cute 3D printed dark brown bear",
    title: "Cute Dark Brown Bear",
    category: "Animals",
    reviewCount: 10,
    rating: 5,
  };

    const handleProfileSelect = () => {
    setProfileState(true)
    navigate('/profile')
  }

  const handlePurchaseSelect = () => {
    setProfileState(false)
    navigate('/profile/purchase')
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
                <Box>{<CProfile w={10} h={10} />}</Box>
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
                <Box>{<CProfile w={10} h={10} />}</Box>
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
          >
            <Box 
              w='95%'
              pb='1%'
              borderBottom='1px' 
              borderColor={'gray.300'}
              // backgroundColor={'green.200'} 
            >
              <Heading 
                as='h1' 
                size='md' >
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
                direction='column'
                backgroundColor='white'
              >
                {/* First Entry */}
                <Stack w='100%' p="4" boxShadow="lg" m="4" borderRadius="sm" backgroundColor='grey'>
                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="space-between"
                    backgroundColor={'yellow'}
                    >
                      <Image w={'20%'} src={property.imageUrl} alt={property.imageAlt} />
                      <Stack w={'50%'} direction={{ base: 'column' }}  backgroundColor={'green'}>
                        {/* Title */}
                        <Text 
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        {/* Description */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.imageAlt}
                        </Text>
                        {/* Components */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          Case_A_v3: coral,
                          Spring_Normal: darkmagenta,
                          Wheel_40T: lightblue,
                          Case_B_v4: indianred,
                        </Text>
                      </Stack>
                      <Stack w={'30%'} direction={{ base: 'column' }} backgroundColor={'green'}>
                        <Text
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          Qty: 50 pcs
                        </Text>
                        <Text
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          >Total Paid: $50.00</Text>
                      </Stack> 
                    </Stack> 
                  </Stack>
                   {/* Second Entry */}
                  <Stack w='100%' p="4" boxShadow="lg" m="4" borderRadius="sm" backgroundColor='grey'>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      justifyContent="space-between"
                      backgroundColor={'yellow'}
                      >
                      <Image w={'20%'} src={property.imageUrl} alt={property.imageAlt} />
                      <Stack w={'50%'} direction={{ base: 'column' }}  backgroundColor={'green'}>
                        {/* Title */}
                        <Text 
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        {/* Description */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.imageAlt}
                        </Text>
                        {/* Components */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          Case_A_v3: coral,
                          Spring_Normal: darkmagenta,
                          Wheel_40T: lightblue,
                          Case_B_v4: indianred,
                        </Text>
                      </Stack>
                      <Stack w={'30%'} direction={{ base: 'column' }} backgroundColor={'green'}>
                        <Text
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          Qty: 50 pcs
                        </Text>
                        <Text
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          >Total Paid: $50.00</Text>
                      </Stack> 
                    </Stack>
                  </Stack>
                  {/* Third Entry */}
                  <Stack w='100%' p="4" boxShadow="lg" m="4" borderRadius="sm" backgroundColor='grey'>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      justifyContent="space-between"
                      backgroundColor={'yellow'}
                      >
                      <Image w={'20%'} src={property.imageUrl} alt={property.imageAlt} />
                      <Stack w={'50%'} direction={{ base: 'column' }}  backgroundColor={'green'}>
                        {/* Title */}
                        <Text 
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        {/* Description */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.imageAlt}
                        </Text>
                        {/* Components */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          Case_A_v3: coral,
                          Spring_Normal: darkmagenta,
                          Wheel_40T: lightblue,
                          Case_B_v4: indianred,
                        </Text>
                      </Stack>
                      <Stack w={'30%'} direction={{ base: 'column' }} backgroundColor={'green'}>
                        <Text
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          Qty: 50 pcs
                        </Text>
                        <Text
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          >Total Paid: $50.00</Text>
                      </Stack> 
                    </Stack>
                  </Stack>
                  {/* Fourth Entry */}
                  <Stack w='100%' p="4" boxShadow="lg" m="4" borderRadius="sm" backgroundColor='grey'>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      justifyContent="space-between"
                      backgroundColor={'yellow'}
                      >
                      <Image w={'20%'} src={property.imageUrl} alt={property.imageAlt} />
                      <Stack w={'50%'} direction={{ base: 'column' }}  backgroundColor={'green'}>
                        {/* Title */}
                        <Text 
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        {/* Description */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.imageAlt}
                        </Text>
                        {/* Components */}
                        <Text 
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}>
                          Case_A_v3: coral,
                          Spring_Normal: darkmagenta,
                          Wheel_40T: lightblue,
                          Case_B_v4: indianred,
                        </Text>
                      </Stack>
                      <Stack w={'30%'} direction={{ base: 'column' }} backgroundColor={'green'}>
                        <Text
                          fontSize={{ base: 'md' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          Qty: 50 pcs
                        </Text>
                        <Text
                          fontSize={{ base: 'sm' }} 
                          textAlign={'left'} 
                          maxW={'4xl'} 
                          pt={'1%'}          
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          >Total Paid: $50.00</Text>
                      </Stack> 
                    </Stack>
                  </Stack>
               </Flex>
            </Box>
         </Flex>
  ) 
      
}

export default Profile;