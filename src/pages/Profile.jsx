import React, { useState, useContext } from 'react'
import axios from 'axios'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Grid,
  GridItem,
  Center,
  Box,
  Text,
  Avatar,
  FormControl,
  InputRightElement
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BackendUrlContext from '../components/BackendUrl.jsx'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Signup = ({user}) => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState(`${user.firstName + user.lastName}`)
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()
  const handleShowClick = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email) {
      console.log(
        email,
        password,
        firstName,
        lastName,
        username,
        address,
        phone
      )
      const data = {
        email,
        password,
        firstName,
        lastName,
        username,
        address,
        phone
      }
      axios
        .post(`${backendUrl}/api/register`, data)
        .then((response) => {
          console.log(response.data)
          navigate('/login')
        })
        .catch((error) => console.log(error))
    } else {
      console.log('nothing entered')
    }
  }

  return (
      <Flex 
      width='100%'
      height='100%'
      backgroundColor='gray.200'
      alignItems='center'
      justifyContent='center'
      >
        {/* Left Yellow Box */}
        <Box 
          h='50%' 
          w='15%' 
          bg='yellow'>
          <Text>My Profile</Text>
        </Box>

        {/* Right White Box */}
        <Box 
          h='50%' 
          w='65%' 
          bg='white' 
          px={{ md: 5, base: 5 }}
        >
          <Box 
            p={5} 
            borderBottom='1px' 
            borderColor={'gray.300'}
          >
            <Heading as='h1' size='md' >My Profile</Heading>
            <Text>Manage your account</Text>
          </Box>
          
            
              <Box 
                pt='5%' 
                backgroundColor={'red'} 
                minW={{ base: '90%' }}
              >
                <Flex 
                  alignItems='center'
                  justifyContent='center'
                >
                  <Box width='20%'>
                    <Stack
                      spacing={7}
                      p='1rem'
                      backgroundColor='whiteAlpha.900'
                      pl='40%'
                    >
                      <Text>
                          Username: 
                      </Text>
                      <Text>
                          Name: 
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
                    </Stack>
                </Box>
                <Box width='30%'> 
                    <Stack
                      spacing={7}
                      p='1rem'
                      backgroundColor='whiteAlpha.900'
                    >
                      <Text>
                          {user.username}
                      </Text>
                      <Text>
                          {fullName}
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
                    </Stack>
                </Box>
                <Box width='30%'>
                   <Avatar size='lg' mr={3} name={user.username} src='' />
                </Box>
               </Flex>
              </Box>
            
       
        
        </Box>

      </Flex>


  
  )
}

export default Signup
