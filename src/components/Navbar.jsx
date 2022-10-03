import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
// import { Logo } from './Logo'
import BackendUrlContext from './BackendUrl.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (
    <Box as="section" backgroundColor={'maroon'} pb={{ base: '12', md: '24' }} >
      <Box backgroundColor={'green'} as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Flex>
          { isDesktop ? (
            <>
            <Container backgroundColor={'blue'} py={{ base: '4', lg: '5' }}>
              <HStack spacing="10" justify="space-between">
                <Flex justify="space-between" flex="1">
                  <ButtonGroup  variant="link" spacing="8">
                    {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                      <Button textColor={'white'} key={item}>{item}</Button>
                    ))}
                  </ButtonGroup>
                  <HStack spacing="1">
                    <Button textColor={'white'} variant="link">Login |</Button>
                    <Button textColor={'white'} variant="link">Sign up</Button>
                  </HStack>
                </Flex>
              </HStack>
            </Container>
            <Container backgroundColor={'blue'} py={{ base: '4', lg: '5' }}>
              <HStack spacing="10" justify="space-between">
                <Flex justify="space-between" flex="1">
                  <ButtonGroup  variant="link" spacing="8">
                    {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                      <Button textColor={'white'} key={item}>{item}</Button>
                    ))}
                  </ButtonGroup>
                  <HStack spacing="1">
                    <Button textColor={'white'} variant="link">Login |</Button>
                    <Button textColor={'white'} variant="link">Sign up</Button>
                  </HStack>
                </Flex>
              </HStack>
            </Container>
          </>
          ) : (
             <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                />
          )}
          </Flex>
      </Box>
      {/* <Logo /> */}
    </Box>
  )
};

export default Navbar;
