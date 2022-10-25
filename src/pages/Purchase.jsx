import React, { useState, useContext, useEffect} from 'react'
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
import Submitted from '../components/profile-purchase-history/Submitted.jsx'

const Purchase = ({ user, setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [checkState, setCheckState] = useState('submitted')
  const navigate = useNavigate()
  const CProfile = chakra(CgProfile)
  const CPurchaseTag = chakra(BiPurchaseTag)  
  const [dataStatus, setdataStatus] = useState(false);
  const [addSubmittedOrders, setaddSubmittedOrders] = useState([]);
  const [addProgressingOrders, setaddProgressingOrders] = useState([]);
  const [addCompletedOrders, setaddCompletedOrders] = useState([]);

  const fetchOrderData = async () => {
    // fetch order data via id
    axios
      .get(`${backendUrl}/api/orders/all-data/${user.id}`)
      .then((response) => {
        console.log(response);
        // sort data by status
        for (let i = 0; i < response.data.result.length; i ++) {
          if (response.data.result[i].status === 'submitted') {
            setaddSubmittedOrders(addSubmittedOrders, JSON.parse(response.data.result[i].order_details))
          } else if (response.data.result[i].status === 'progress') {
            setaddProgressingOrders(addProgressingOrders, JSON.parse(response.data.result[i].order_details))
          } else if (response.data.result[i].status === 'completed') {
            setaddCompletedOrders(addCompletedOrders, JSON.parse(response.data.result[i].order_details))
          }
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    // if haven't already, obtain data
    if (!dataStatus) {
      fetchOrderData();
    }
  });

  const property = {
    imageUrl:
      "https://img1.cgtrader.com/items/1878019/45d16e73d0/large/teddy-bear-tiny-figurine-for-3d-printing-3d-model-obj-mtl-fbx-stl.jpg",
    imageAlt: "Cute 3D printed dark brown bear",
    title: "Cute Dark Brown Bear",
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
              src=''/>
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
            <Button 
              borderBottom='2px' 
              borderColor={checkState === 'submitted' ? 'green' : 'gray.300'} 
              h={'60%'} 
              w={'33%'}
              color={checkState === 'submitted' ? 'green' : 'gray.300'} 
              backgroundColor='white'
              background= 'none'
              _active={{
                textDecoration: 'none',
              }}
              _hover={{
                color:`${checkState === 'submitted' ? 'gray.300' : 'green'}`,
                borderColor:`${checkState === 'submitted' ? 'gray.300' : 'green'}`
              }}
              onClick={()=>setCheckState('submitted')}
            > 
              Submitted                 
            </Button>
            <Button                    
              borderBottom='2px' 
              borderColor={checkState === 'progress' ? 'green' : 'gray.300'} 
              backgroundColor='white'
              h={'60%'} 
              w={'33%'}
              color={checkState === 'progress' ? 'green' : 'gray.300'} 
              _active={{
                textDecoration: 'none',
              }}
              _hover={{
                color:`${checkState === 'progress' ? 'gray.300' : 'green'}`,
                borderColor:`${checkState === 'progress' ? 'gray.300' : 'green'}`
              }}
              onClick={()=>setCheckState('progress')}
            > 
              In Progress 
            </Button> 
            <Button                  
              borderBottom='2px' 
              borderColor={checkState === 'completed' ? 'green' : 'gray.300'} 
              backgroundColor='white'
              h={'60%'} 
              w={'33%'}
              color={checkState === 'completed' ? 'green' : 'gray.300'} 
              _active={{
              
              }}
              _hover={{
                color:`${checkState === 'completed' ? 'gray.300' : 'green'}`,
                borderColor:`${checkState === 'completed' ? 'gray.300' : 'green'}`
              }}
              onClick={()=>setCheckState('completed')}
            > 
              Completed
            </Button>
          </Flex>
          <Flex 
            alignItems='center'
            direction='column'
            overflow='auto'
            h={{md: '400px'}}
            >
            { checkState === 'submitted' && 
              addSubmittedOrders.map((element) =>
                <Submitted submittedData={element}/>
              )} 
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

export default Purchase;