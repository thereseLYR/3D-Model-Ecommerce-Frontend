import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

export default function NavBar({ user }) {
  const { isOpen, onToggle } = useDisclosure()


  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ md: 40, base: 5 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          // Flex contents (i.e., menu button) will not display with medium screens
          display={{ base: 'flex', md: 'none' }}

        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex 
          // replace with Logo when ready
           flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>

          <Text
            as="a"
            href="/"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>

              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                      <Link
                        p={2}
                        href={navItem.href ?? "#"}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={"gray.600"}
                        _hover={{
                          textDecoration: "none",
                          color: "gray.800",
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </PopoverTrigger>
                  </Popover>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Flex>
        { user.username ?               
        (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            as="a"
            fontSize="sm"
            fontWeight={400}
            href='/profile'
            background= 'none'
            _active={{
              textDecoration: 'none',
            }}
            _hover={{
              textDecoration: 'none',
              
            }}
          >
             <Avatar size='sm' mr={3} name={user.username} src='' />
            {user.username}
          </Button>
        </Stack>

        )

        : 
        (<Stack
          flex={{ base: 1, md: 0 }}
          justify='flex-end'
          direction='row'
          spacing={6}
        >
          <Button
            as='a'
            fontSize='sm'
            fontWeight={400}
            variant='link'
            href='/login'
          >
            Login
          </Button>
          <Button
            as="a"
            href="/signup"
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="teal.400"
            _hover={{
              bg: "teal.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>)
      }
      </Flex>
    </Box>
  );
}

const NAV_ITEMS = [
  {
    label: "3D Models",
    href: "/models",
  },
  //   {
  //     label: 'Find Work',
  //     children: [
  //       {
  //         label: 'Job Board',
  //         subLabel: 'Find your dream design job',
  //         href: '#'
  //       },
  //       {
  //         label: 'Freelance Projects',
  //         subLabel: 'An exclusive list for contract work',
  //         href: '#'
  //       }
  //     ]
  //   }

];

