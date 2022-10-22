import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Navbar from "../components/Navbar.jsx";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const STRIPE_PK = process.env.REACT_APP_STRIPE_PK;
const stripePromise = loadStripe(STRIPE_PK);

const SingleCartItem = ({ item }) => {
  return (
    <HStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={25}
      align="stretch"
    >
      <Box w={300}>
        <Text as="b" fontSize={"lg"}>
          {item.model_name}
        </Text>
        {Object.keys(item.component_breakdown).map((i) => {
          return (
            <Text fontSize={"s"}>
              {i}: {item.component_breakdown[i]}
            </Text>
          );
        })}
        <br />
      </Box>
      <Box w={50}>
        <Text>Qty:</Text>
        <br />
        <Text>{item.quantity}</Text>
      </Box>
      <Box w={50}>
        <Text>Price:</Text>
        <br />
        <Text>${item.ppu * item.quantity}</Text>
      </Box>
    </HStack>
  );
};

export default function CartCheckoutPage({ user }) {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [cookies, setCookie] = useCookies(["saved-models"]);
  const [userDetails, setUserDetails] = useState({});

  const tempCartCookies = cookies.temp_cart;

  const postStripePayments = () => {
    axios
      .post(
        `${backendUrl}/api/stripe/payment-intents`,
        // price = 10, * 100 because stripe amount is in smallest denominations, $1 = 100c
        {
          amount:
            tempCartCookies[0]["ppu"] * tempCartCookies[0]["quantity"] * 100,
        }
      )
      .then((result) => {
        setClientSecret(result.data.client_secret);
      });
  };

  const getUserDetails = () => {
    axios
      .get(`${backendUrl}/api/users/${user.id}`)
      .then((res) => {
        const u = res.data.result;
        setUserDetails(u);
      })
      .catch((err) => {
        console.log(
          `[ERROR] unable to get user with user_id: ${user.id}, err:${err}`
        );
      });
  };

  const postNewOrder = () => {
    axios
      .post(`${backendUrl}/api/orders`, {
        fullname: `${userDetails.firstName} ${userDetails.lastName}`,
        address: userDetails.address,
        email: userDetails.email,
        phone: userDetails.phone,
      })
      .then((res) => {
        console.log("[DEBUG] successfully placed order, res=", res);
      })
      .catch((err) => {
        console.log("[ERROR] unable to post new order: ", err);
      });
  };

  useEffect(() => {
    if (user !== undefined) {
      postStripePayments();
      getUserDetails();
    } else {
      navigate("/access-denied");
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Navbar />
      <br />
      <VStack spacing={10}>
        <Text
          color={"pink.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          letterSpacing={1.1}
          fontSize="3xl"
        >
          My Cart
        </Text>
        <Box>
          <SingleCartItem item={tempCartCookies[0]} />
        </Box>
        <Box>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                price={
                  tempCartCookies[0]["ppu"] * tempCartCookies[0]["quantity"]
                }
                onSuccessfulCheckout={() => {
                  postNewOrder();
                  navigate("/success-checkout");
                }}
                clientSecret={clientSecret}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            </Elements>
          )}
        </Box>
      </VStack>
    </>
  );
}
