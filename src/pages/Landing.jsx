
import { Box, Grid, Heading, Text, Image, Flex, Button, Link, keyframes } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BackendUrlContext from "../components/BackendUrl.jsx";
import Footer from "../components/Footer.jsx";
import ModelBox from "../components/ModelBox.jsx";
import { useNavigate } from "react-router-dom";
import CarouselImage from "../components/landing/CarouselImage.jsx";

const Landing = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);
  const [modelsData, setModelsData] = useState();
  const navigate = useNavigate();
  const slide = keyframes`
    0%{
        transform: translateX(0%);
    }
    5%{
        transform: translateX(0%);
    }
    10%{
        transform: translateX(-10%);
    }
    15%{
        transform: translateX(-10%);
    }
    20%{
        transform: translateX(-20%);
    }
    25%{
        transform: translateX(-20%);
    }
    30%{
        transform: translateX(-30%);
    }
    35%{
        transform: translateX(-30%);
    }
    40%{
        transform: translateX(-40%);
    }
    45%{
        transform: translateX(-40%);
    }
    50%{
        transform: translateX(-50%);
    }
    55%{
        transform: translateX(-50%);
    }
    60%{
        transform: translateX(-60%);
    }
    65%{
        transform: translateX(-60%);
    }
    70%{
        transform: translateX(-70%);
    }
    75%{
        transform: translateX(-70%);
    }
    80%{
        transform: translateX(-80%);
    }
    85%{
        transform: translateX(-80%);
    }
    90%{
        transform: translateX(-90%);
    }
    95%{
        transform: translateX(-90%);
    }
    100%{
        transform: translateX(-100%);
    }
  `;

  const slideAnimation = `${slide} infinite 25s`;

  // render models on landing
  // render the models every time selectedcategory changes
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/models`)
      .then((response) => {
        const models = response.data.results;
        setModelsData(models);
      })
      .catch((error) => {
        console.log("[ERROR] unable to get models: ", error);
      });
  }, [backendUrl]);

  return (
    <>
      <Box>
        <Flex direction='column'>
          <Flex
            bg='black'
            h='700px'
            justifyContent={'center'}
          >
            <Image 
              w={{md:'20%'}} 
              src='./Landing_Test.jpg' 
              alt='a 3D Model'
              objectFit={'cover'}
              />
              <Flex bg='black' w={{md:'20%'}} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                <Heading size='2xl'color='white'>Porky Prints</Heading>
                <Text pt='2%' fontSize='3xl' color='white'> Lovable. Playable. Printable. </Text>
                <Flex>
                  <Button
                     onClick={()=>navigate("/admin/contact-us")}     
                    _hover={{ textDecoration: "underline" }} 
                    bg='none' 
                    color='white'
                    fontSize='lg'
                  >
                    Learn More > 
                  </Button>
                  <Button
                    onClick={()=>navigate("/signup")}    
                    _hover={{ textDecoration: "underline" }} 
                    bg='none' 
                    color='white'
                    fontSize='lg'
                  >
                    Sign Up > 
                  </Button>
                </Flex>
              </Flex>
            </Flex>
   
          <Flex h={'600px'} direction={'row'}>
            <Flex h={'100%'} animation={slideAnimation} alignItems='center'>
              <Flex h='100%'>
                <CarouselImage srcPath={'./Landing_Test_1.webp'} />
                <CarouselImage srcPath={'./Landing_Test_2.webp'} />
                <CarouselImage srcPath={'./Landing_Test_3.webp'} />
                <CarouselImage srcPath={'./Landing_Test_4.webp'} />
                <CarouselImage srcPath={'./Landing_Test_5.webp'} />
                <CarouselImage srcPath={'./Landing_Test_6.webp'} />
                <CarouselImage srcPath={'./Landing_Test_7.webp'} />
                <CarouselImage srcPath={'./Landing_Test_8.webp'} />
                <CarouselImage srcPath={'./Landing_Test_9.webp'} />
                <CarouselImage srcPath={'./Landing_Test_10.webp'} />
              </Flex>
            </Flex>
            <Flex h={'100%'} animation={slideAnimation} alignItems='center'>
              <Flex h='100%'>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_1.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    objectPosition={'center'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_2.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_3.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_4.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_5.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_6.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_7.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_8.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_9.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
                <Box w='20vw'>
                  <Image 
                    h='100%'
                    src='./Landing_Test_10.webp' 
                    alt='a 3D Model'
                    objectFit={'cover'}
                    />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Grid p={4} style={{ margin: "10px" }}>
        <Heading as="h3" size="lg" marginBottom="8px">
          Featured Models
        </Heading>
        <Box style={{ display: "flex" }}>
          {modelsData &&
            modelsData.map((model) => (
              <ModelBox
                imageUrl={`/models/model${model.id}.png`}
                imageAlt={model.model_description}
                title={model.model_name}
                modelId={model.id}
              />
            ))}
        </Box>
      </Grid>
      <Footer />
    </>
  );
};

export default Landing;