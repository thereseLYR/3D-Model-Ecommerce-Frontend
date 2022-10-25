import React, { useState, useContext, useEffect} from 'react'
import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
} from '@chakra-ui/react'
import axios from "axios";
import BackendUrlContext from "../BackendUrl.jsx";
import PurchaseCard from "./PurchaseCard.jsx";


export default function PurchaseStatus({ user }) {
  const { backendUrl } = useContext(BackendUrlContext);
  const [checkState, setCheckState] = useState("submitted");
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
        setdataStatus(true)
        let allOrders = response.data.result
        let submittedOrders = allOrders.filter((o)=> (o.status === 'submitted'))
        setaddSubmittedOrders(submittedOrders)
        let progressOrders = allOrders.filter((o)=> (o.status === 'progress'))
        setaddProgressingOrders(progressOrders)
        let completedOrders = allOrders.filter((o)=> (o.status === 'completed'))
        setaddCompletedOrders(completedOrders)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    // // if haven't already, obtain data
    // if (!dataStatus) {
      console.log('fetching data')
      fetchOrderData();
    // }
  },[]);

  return (
    <Box
      h={{ md: "50%", base: "80%" }}
      w={{ md: "45%", base: "80%" }}
      bg="white"
    >
      <Flex
        alignItems="flex-end"
        justifyContent="center"
        h={{ base: "15%" }}
        bg="white"
      >
        <Box w="95%" pb="1%">
          <Heading as="h1" size="md">
            My Purchases
          </Heading>
          <Text>Status of Purchases</Text>
        </Box>
      </Flex>
      <Flex
        flexDirection={"row"}
        alignItems="center"
        justifyContent="space-evenly"
        backgroundColor="gray.200"
        h={"13%"}
      >
      <Button 
        borderBottom='2px' 
        borderColor={checkState === 'submitted' ? 'pink.500' : 'gray.300'} 
        h={'60%'} 
        w={'33%'}
        color={checkState === 'submitted' ? 'pink.500' : 'gray.300'} 
        backgroundColor='white'
        background= 'none'
        _active={{
          textDecoration: 'none',
        }}
        _hover={{
          color:'pink.500',
          borderColor:'pink.500'
        }}
        onClick={()=>setCheckState('submitted')}
      > 
        Submitted                 
        </Button>
      <Button 
        borderBottom='2px' 
        borderColor={checkState === 'progress' ? 'pink.500' : 'gray.300'} 
        h={'60%'} 
        w={'33%'}
        color={checkState === 'progress' ? 'pink.500' : 'gray.300'} 
        backgroundColor='white'
        background= 'none'
        _active={{
          textDecoration: 'none',
        }}
        _hover={{
          color:'pink.500',
          borderColor:'pink.500'
        }}
        onClick={()=>setCheckState('progress')}
      > 
        In Progress                 
      </Button>
      <Button 
        borderBottom='2px' 
        borderColor={checkState === 'completed' ? 'pink.500' : 'gray.300'} 
        h={'60%'} 
        w={'33%'}
        color={checkState === 'completed' ? 'pink.500' : 'gray.300'} 
        backgroundColor='white'
        background= 'none'
        _active={{
          textDecoration: 'none',
        }}
        _hover={{
          color:'pink.500',
          borderColor:'pink.500'
        }}
        onClick={()=>setCheckState('completed')}
      > 
        Completed                 
      </Button>
      </Flex>
      <Flex
        alignItems="center"
        direction="column"
        overflow="auto"
        h={{ md: "400px" }}
      >
        {checkState === "submitted" && (
          <>
          {addSubmittedOrders.map((element, submittedIndex) =>
            <PurchaseCard key={submittedIndex} orderDetails={element} state={checkState} fetchOrderData={fetchOrderData}/>
          )} 
          </>
        )} 
        {checkState === "progress" && (
          <>
          {addProgressingOrders.map((element, progressIndex) =>
            <PurchaseCard key={progressIndex} orderDetails={element} state={checkState}/>
          )} 
          </>
        )} 
        {checkState === "completed" && (
          <>
          {addCompletedOrders.map((element, completedIndex) =>
            <PurchaseCard key={completedIndex} orderDetails={element} state={checkState}/>
          )} 
          </>
        )} 
      </Flex>
    </Box>
  );
}
