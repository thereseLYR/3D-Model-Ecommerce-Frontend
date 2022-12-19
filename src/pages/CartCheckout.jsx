import { Box, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Checkout/CartItem";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import Footer from "../components/Footer";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export default function CartCheckoutPage({ user }) {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["saved-models"]);
  const [userDetails, setUserDetails] = useState({});
  const cartCookies = useRef(cookies.temp_cart || []);

  useEffect(() => {
    cartCookies.current = cookies.temp_cart;
  });

  useEffect(() => {
    user !== undefined ? getUserDetails() : navigate("/access-denied");
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .post(
        `${backendUrl}/api/stripe/payment-intents`,
        // price = 10, * 100 because stripe amount is in smallest denominations, $1 = 100c
        {
          amount:
            cartCookies.current[0]["ppu"] *
            cartCookies.current[0]["quantity"] *
            100,
        }
      )
      .then((result) => {
        setClientSecret(result.data.client_secret);
        console.log(
          "[DEBUG] stripe client secret = ",
          result.data.client_secret
        );
      });
  }, []);

  const getUserDetails = useCallback(() => {
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
  }, [user]);

  const postNewOrder = () => {
    axios
      .post(`${backendUrl}/api/orders`, {
        fullname: `${userDetails.firstName} ${userDetails.lastName}`,
        address: userDetails.address,
        email: userDetails.email,
        phone: userDetails.phone,
        order: cartCookies.current,
      })
      .then((res) => {
        console.log("[DEBUG] successfully placed order, res=", res);
      })
      .catch((err) => {
        console.log("[ERROR] unable to post new order, err=", err);
      });
  };

  const clearCookiesCheckout = () => {
    removeCookie("temp_cart");
    removeCookie("saved-models");
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecret,
    appearance: appearance,
  };

  return (
    <>
      <VStack spacing={10} alignItems={"center"}>
        <Text
          color={"#FF5876"}
          textTransform={"uppercase"}
          fontWeight={800}
          letterSpacing={1.1}
          fontSize="3xl"
          marginTop={"10px"}
        >
          Review your order
        </Text>
        <Box>
          <CartItem item={cartCookies.current[0]} />
        </Box>
        <Box>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                price={
                  cartCookies.current[0]["ppu"] *
                  cartCookies.current[0]["quantity"]
                }
                // TODO: Move this out to success checkout page
                // onSuccessfulCheckout={() => {
                //   postNewOrder();
                //   clearCookiesCheckout();
                //   navigate("/success-checkout");
                // }}
                userDetails={userDetails}
              />
            </Elements>
          )}
        </Box>
      </VStack>
      <Footer />
    </>
  );
}
