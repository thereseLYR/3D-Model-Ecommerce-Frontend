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
    navigate('/profile')
  }

  const handlePurchaseSelect = () => { 
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
                <Box ml={'10%'}>My Profile</Box>
              </Flex>
            </Flex>
              <Flex
                w={200}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={"green"}
                justifyContent='stretch'
                alignItems='center'
                onClick={handlePurchaseSelect}
                _hover={{
                cursor: 'pointer',
                textDecoration: "none",
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
            bg='white' 
          >
            <Box 
              w='95%'
              pb='1%'
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
          {checkState === 'submitted' ? (
            <Button 
              borderBottom='2px' 
              borderColor={'green'} 
              h={'60%'} 
              w={'33%'}
              color='green'
              backgroundColor='white'
              background= 'none'
              _active={{
                textDecoration: 'none',
              }}
              onClick={()=>setCheckState('submitted')}
            > 
              Submitted                 
            </Button>) : (
            <Button 
              borderBottom='2px' 
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
            > 
              Submitted                 
            </Button>
            )}
            {checkState === 'progress' ? (
            <Button                    
              borderBottom='2px' 
              borderColor={'green'} 
              backgroundColor='white'
              h={'60%'} 
              w={'33%'}
              color='green'
              _active={{
              textDecoration: 'none',
              }}
              onClick={()=>setCheckState('progress')}
            > 
              In Progress 
            </Button>) : (
            <Button                    
              borderBottom='2px' 
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
            > 
              In Progress 
            </Button>
            )}
            {checkState === 'completed' ? (
            <Button                  
              borderBottom='2px' 
              borderColor={'green'} 
              backgroundColor='white'
              h={'60%'} 
              w={'33%'}
              color='green'
              _active={{
              textDecoration: 'none',
              }}
              onClick={()=>setCheckState('completed')}
            > 
              Completed
            </Button>) : (
            <Button                  
              borderBottom='2px' 
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
            > 
              Completed
            </Button>
            )}
              </Flex>
              <Flex 
                alignItems='center'
                direction='column'
                overflow='auto'
                h={{md: '400px'}}
              >
              { checkState === 'submitted' && 
              <>
                {/* First Entry */}
                <Flex
                  mt={'1%'}
                  mb={'1%'}
                  p={3}
                  h={{md: '220px'}} 
                  w='50%' 
                  boxShadow="lg"  
                  borderRadius="sm" 
                  backgroundColor={'gray.100'}
                  direction='column'
                >
                  <Stack 
                    w={'100%'}
                    h={'40%'}
                    direction={{ base: 'column', md: 'row' }}
                    pb='1%'
                    borderBottom='1px' 
                    borderColor={'gray.300'}
                  >
                  <Image 
                    w={{md:'20%'}} 
                    src={property.imageUrl} 
                    alt={property.imageAlt} 
                    objectFit={'cover'}
                  />
                  <Stack 
                    w={'80%'} 
                    p={'1%'}
                    direction={{ base: 'column' }}  
                    >
                        {/* Title */}
                        <Flex
                          justifyContent="space-between" 
                        >
                          <Text 
                            fontSize={{ base: 'md' }}
                            textAlign={'left'} 
                            maxW={'4xl'}          
                            fontWeight="semibold"
                            as="h2"
                            lineHeight="tight"
                            noOfLines={1}>
                            {property.title}
                          </Text>
                          <Button
                            colorScheme='teal' 
                            size='xs'
                          >
                            Cancel Order
                          </Button>
                        </Flex>
                        {/* Description */}
                        <Flex justifyContent="space-between">
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
                          <Text
                              fontSize={{ base: 'sm' }} 
                              textAlign={'left'} 
                              maxW={'4xl'} 
                              pt={'1%'} 
                              fontWeight="semibold"         
                              as="h4"
                              lineHeight="tight"
                              noOfLines={1}>
                              x 50
                          </Text>
                        </Flex>
                      </Stack>
                    </Stack>
                  <Flex
                    w={'100%'}
                    h={'45%'} 
                    borderBottom='1px' 
                    borderColor={'gray.300'}
                    direction='column'
                    mb='1%'
                  >
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'left'}
                    pl={'1%'}
                    fontWeight="semibold"   
                    as="h4"
                  >
                    Components:
                  </Text>
                  <Flex
                    direction='column'
                    pl={'3%'}
                    overflow={'auto'}
                  >
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'left'}
                    as="h4"
                  >
                    Case_A_v3: coral
                  </Text>
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'left'}
                    as="h4"
                  >
                    Spring_Normal: darkmagenta
                  </Text>
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'left'}
                    as="h4"
                  >
                    Wheel_40T: lightblue
                  </Text>
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'left'}
                    as="h4"
                  >
                    Case_B_v4: indianred
                  </Text>
                </Flex>
              </Flex>
              <Flex
                w={'100%'}
                h={'40%'}
                justifyContent={'right'}
                >
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'right'}
                    as="h4"
                    pr='2%'
                  >
                    Total Payment: 
                  </Text>
                  <Text
                    fontSize={{ base: 'sm' }} 
                    textAlign={'right'}
                    as="h4"
                    color='green'
                    pr='2%'
                  >
                    $50.00
                  </Text>
                </Flex>
              </Flex> 
              {/* Second Entry */}
              <Flex
                mt={'1%'}
                mb={'1%'}
                p={3}
                h={{md: '220px'}} 
                w='50%' 
                boxShadow="lg"  
                borderRadius="sm" 
                backgroundColor={'gray.100'}
                direction='column'
              >
                <Stack 
                  w={'100%'}
                  h={'40%'}
                  direction={{ base: 'column', md: 'row' }}
                  pb='1%'
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                >
                <Image 
                  w={{md:'20%'}} 
                  src={property.imageUrl} 
                  alt={property.imageAlt} 
                  objectFit={'cover'}
                />
                <Stack 
                  w={'80%'} 
                  p={'1%'}
                  direction={{ base: 'column' }}        
                  overflow={'auto'}>
                      {/* Title */}
                      <Flex
                        justifyContent="space-between" 
                      >
                        <Text 
                          fontSize={{ base: 'md' }}
                          textAlign={'left'} 
                          maxW={'4xl'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        <Button
                          colorScheme='teal' 
                          size='xs'
                        >
                          Cancel Order
                        </Button>
                      </Flex>
                      {/* Description */}
                      <Flex justifyContent="space-between">
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
                        <Text
                            fontSize={{ base: 'sm' }} 
                            textAlign={'left'} 
                            maxW={'4xl'} 
                            pt={'1%'} 
                            fontWeight="semibold"         
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}>
                            x 50
                        </Text>
                      </Flex>
                    </Stack>
                  </Stack>
                <Flex
                  w={'100%'}
                  h={'45%'}
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                  direction='column'
                  mb='1%'
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  pl={'1%'}
                  fontWeight="semibold"   
                  as="h4"
                >
                  Components:
                </Text>
                <Flex
                  direction='column'
                  pl={'3%'}
                  overflow={'auto'}
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_A_v3: coral
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Spring_Normal: darkmagenta
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Wheel_40T: lightblue
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_B_v4: indianred
                </Text>
              </Flex>
            </Flex>
            <Flex
              w={'100%'}
              h={'40%'}
              justifyContent={'right'}
              >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  pr='2%'
                >
                  Total Payment: 
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  color='green'
                  pr='2%'
                >
                  $50.00
                </Text>
              </Flex>
            </Flex>
            </>
            } 
            {/* end of second Entry */}
            {/* start of progress first Entry */}
            { checkState === 'progress' && 
            <>
              {/* First Entry */}
              <Flex
                mt={'1%'}
                mb={'1%'}
                p={3}
                h={{md: '220px'}} 
                w='50%' 
                boxShadow="lg"  
                borderRadius="sm" 
                backgroundColor={'gray.100'}
                direction='column'
              >
                <Stack 
                  w={'100%'}
                  h={'40%'}
                  direction={{ base: 'column', md: 'row' }}
                  pb='1%'
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                >
                <Image 
                  w={{md:'20%'}} 
                  src={property.imageUrl} 
                  alt={property.imageAlt} 
                  objectFit={'cover'}
                />
                <Stack 
                  w={'80%'} 
                  p={'1%'}
                  direction={{ base: 'column' }}  
                  >
                      {/* Title */}
                      <Flex
                        justifyContent="space-between" 
                      >
                        <Text 
                          fontSize={{ base: 'md' }}
                          textAlign={'left'} 
                          maxW={'4xl'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        <Button
                          colorScheme='teal' 
                          size='xs'
                          _active={{
                          textDecoration: 'none',
                          }}
                          _hover={{
                          cursor: 'default',
                          textDecoration: "none",
                          }}
                        >
                          Delivering
                        </Button>
                      </Flex>
                      {/* Description */}
                      <Flex justifyContent="space-between">
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
                        <Text
                            fontSize={{ base: 'sm' }} 
                            textAlign={'left'} 
                            maxW={'4xl'} 
                            pt={'1%'} 
                            fontWeight="semibold"         
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}>
                            x 50
                        </Text>
                      </Flex>
                    </Stack>
                  </Stack>
                <Flex
                  w={'100%'}
                  h={'45%'} 
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                  direction='column'
                  mb='1%'
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  pl={'1%'}
                  fontWeight="semibold"   
                  as="h4"
                >
                  Components:
                </Text>
                <Flex
                  direction='column'
                  pl={'3%'}
                  overflow={'auto'}
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_A_v3: coral
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Spring_Normal: darkmagenta
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Wheel_40T: lightblue
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_B_v4: indianred
                </Text>
              </Flex>
            </Flex>
            <Flex
              w={'100%'}
              h={'40%'}
              justifyContent={'right'}
              >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  pr='2%'
                >
                  Total Payment: 
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  color='green'
                  pr='2%'
                >
                  $50.00
                </Text>
              </Flex>
            </Flex> 
          </>}
          {/* end of progress first entry */}
          {/* start of completed first entry */}
            { checkState === 'completed' && 
            <>
              {/* First Entry */}
              <Flex
                mt={'1%'}
                mb={'1%'}
                p={3}
                h={{md: '220px'}} 
                w='50%' 
                boxShadow="lg"  
                borderRadius="sm" 
                backgroundColor={'gray.100'}
                direction='column'
              >
                <Stack 
                  w={'100%'}
                  h={'40%'}
                  direction={{ base: 'column', md: 'row' }}
                  pb='1%'
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                >
                <Image 
                  w={{md:'20%'}} 
                  src={property.imageUrl} 
                  alt={property.imageAlt} 
                  objectFit={'cover'}
                />
                <Stack 
                  w={'80%'} 
                  p={'1%'}
                  direction={{ base: 'column' }}  
                  >
                      {/* Title */}
                      <Flex
                        justifyContent="space-between" 
                      >
                        <Text 
                          fontSize={{ base: 'md' }}
                          textAlign={'left'} 
                          maxW={'4xl'}          
                          fontWeight="semibold"
                          as="h2"
                          lineHeight="tight"
                          noOfLines={1}>
                          {property.title}
                        </Text>
                        <Button
                          colorScheme='teal' 
                          size='xs'
                          _active={{
                          textDecoration: 'none',
                          }}
                          _hover={{
                          cursor: 'default',
                          textDecoration: "none",
                          }}
                        >
                          Completed
                        </Button>
                      </Flex>
                      {/* Description */}
                      <Flex justifyContent="space-between">
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
                        <Text
                            fontSize={{ base: 'sm' }} 
                            textAlign={'left'} 
                            maxW={'4xl'} 
                            pt={'1%'} 
                            fontWeight="semibold"         
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}>
                            x 50
                        </Text>
                      </Flex>
                    </Stack>
                  </Stack>
                <Flex
                  w={'100%'}
                  h={'45%'} 
                  borderBottom='1px' 
                  borderColor={'gray.300'}
                  direction='column'
                  mb='1%'
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  pl={'1%'}
                  fontWeight="semibold"   
                  as="h4"
                >
                  Components:
                </Text>
                <Flex
                  direction='column'
                  pl={'3%'}
                  overflow={'auto'}
                >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_A_v3: coral
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Spring_Normal: darkmagenta
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Wheel_40T: lightblue
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'left'}
                  as="h4"
                >
                  Case_B_v4: indianred
                </Text>
              </Flex>
            </Flex>
            <Flex
              w={'100%'}
              h={'40%'}
              justifyContent={'right'}
              >
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  pr='2%'
                >
                  Total Payment: 
                </Text>
                <Text
                  fontSize={{ base: 'sm' }} 
                  textAlign={'right'}
                  as="h4"
                  color='green'
                  pr='2%'
                >
                  $50.00
                </Text>
              </Flex>
            </Flex>
            </>} 
            {/* end of progress first entry */}
        </Flex>
      </Box>
    </Flex>
  ) 
      
}

export default Profile;