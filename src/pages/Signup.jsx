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
  Box,
  Avatar,
  FormControl,
  InputRightElement
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BackendUrlContext from '../components/BackendUrl.jsx'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Signup = () => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading color='teal.400'>Sign Up</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='First name'
                    onChange={(event) => {
                      setFirstName(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='Last name'
                    onChange={(event) => {
                      setLastName(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='Address'
                    onChange={(event) => {
                      setAddress(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='Phone'
                    onChange={(event) => {
                      setPhone(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='Username'
                    onChange={(event) => {
                      setUsername(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='email'
                    placeholder='Email Address'
                    onChange={(event) => {
                      setEmail(event.target.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<CFaLock color='gray.300' />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Signup
