import { CheckIcon } from "@chakra-ui/icons";
import { Button, Container, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const SuccessCheckoutPage = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [cookies, setCookies] = useCookies(["user"]);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const userId = cookies.user.id;

  const getLatestOrderByUser = () => {
    axios
      .get(`${backendUrl}/api/orders/users/${userId}?sort=created_at:desc`)
      .then((res) => {
        setOrderId(res.data.result.id);
      })
      .catch((err) =>
        console.log("[ERROR] unable to get latest order by user: ", err)
      );
  };

  useEffect(() => getLatestOrderByUser());

  return (
    <>
      <Navbar />
      <br />
      <Container centerContent>
        <VStack spacing={5}>
          <CheckIcon w={20} h={20} />
          <Text fontSize={"3xl"}>Thank you for your purchase!</Text>
          <Text as="span" fontSize={"lg"}>
            Your order number is
          </Text>
          <Text as="span" color="teal.600">
            0000{orderId}
          </Text>
          <Text fontSize={"lg"}>
            You will receive an order confirmation email with details of your
            order
          </Text>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </VStack>
      </Container>
    </>
  );
};

export default SuccessCheckoutPage;
