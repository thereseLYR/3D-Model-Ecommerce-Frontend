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
  Link,
  Avatar,
  FormControl,
  InputRightElement
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BackendUrlContext from '../components/BackendUrl.jsx'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext)
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState('')
  const [password, setPassword] = useState('')

  const handleShowClick = () => setShowPassword(!showPassword)

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    // prevent it from submitting a form
    event.preventDefault()
    console.log(email)

    if (email) {
      console.log('email exists!!')
      axios
        .post(`${backendUrl}/api/login`, {
          email,
          password
        })
        .then((response) => {
          console.log('successful login')
          console.log(response.data.result)
          const { user } = response.data.result
          setUser(user)
          if (user) {
            navigate('/landing')
          } else navigate('/login')
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
        <Heading color='teal.400'>Welcome</Heading>
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color='teal.500' href='/signup'>
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
