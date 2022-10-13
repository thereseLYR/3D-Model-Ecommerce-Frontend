import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const STRIPE_PK = process.env.REACT_APP_STRIPE_PK;
const stripePromise = loadStripe(STRIPE_PK);

// TODO: Ideally should get cartItems from cookies
const cartItems = [
  {
    model_id: 1,
    model_name: "Flower Pot",
    model_description: "Single color 3d printed Flower Pot",
    quantity: 1,
    pricePerUnit: 10.0,
  },
];

const SingleCartItem = ({ item }) => {
  return (
    <HStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={25}
      align="stretch"
    >
      <Box>
        <Text>{item.model_name}</Text>
        <br />
        <Text>{item.model_description}</Text>
        <br />
      </Box>
      <Box>
        <Text>Qty:</Text>
        <br />
        <Text>{item.quantity}</Text>
      </Box>
      <Box>
        <Text>Price:</Text>
        <br />
        <Text>${item.pricePerUnit * item.quantity}</Text>
      </Box>
    </HStack>
  );
};

export default function CartCheckoutPage() {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post(
        `${backendUrl}/api/stripe/payment-intents`,
        // price = 10, * 100 because stripe amount is in smallest denominations, $1 = 100c
        {
          amount: cartItems[0].pricePerUnit * cartItems[0].quantity * 100,
        }
      )
      .then((result) => {
        setClientSecret(result.data.client_secret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <VStack spacing={10}>
      <Text fontSize="2xl">My Cart</Text>
      <br />
      <Box>
        <SingleCartItem item={cartItems[0]} />
      </Box>
      <Box>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              price={cartItems[0].pricePerUnit * cartItems[0].quantity}
              // TODO: on successful checkout create order in order db
              onSuccessfulCheckout={() => navigate("/success-checkout")}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      </Box>
    </VStack>
  );
}
