import { Box, Button, Text, VStack } from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import BillingDetailsFields from "./BillingDetailsFields";

const CardPayment = ({ paymentElementOptions }) => {
  return (
    <Box minW={{ base: "90%", md: "550px" }}>
      <Text
        color={"#FF5876"}
        textTransform={"uppercase"}
        fontWeight={800}
        letterSpacing={1.1}
        fontSize="2xl"
        marginBottom={"16px"}
      >
        Card Payment
      </Text>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
    </Box>
  );
};

const CheckoutForm = ({ price, userDetails }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("xxx checking stripe");

    if (!stripe) {
      console.log("xxx no stripe");
      return;
    }
    const urlClientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(new URLSearchParams(window.location.search));
    console.log("xxx url client secret in checkout form: ", urlClientSecret);
    console.log("xxx checking client secret");

    const clientSecretToUse = urlClientSecret;

    if (!clientSecretToUse) {
      console.log("xxx no client secret");
      return;
    }

    console.log("xxx retriveing payment intent");
    stripe
      .retrievePaymentIntent(clientSecretToUse)
      .then(({ paymentIntent }) => {
        console.log("xxx paymentIntent.status", paymentIntent);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("xxxx submit button pressed");

    console.log("xxxx stripe: ", stripe);
    console.log("xxxx elements: ", elements);

    if (!stripe || !elements) {
      // stripe has not yet loaded
      console.log("xxxx stripe and elements not loaded");
      console.log("xxxx stripe: ", stripe);
      console.log("xxxx elements: ", elements);
      return;
    }

    setIsLoading(true);
    // TODO: see if we can pass billingDetails somewhere to postNewOrder
    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value, // billing address line1, line2...
        state: e.target.state.value,
        postal_code: e.target.zip.value,
      },
    };

    console.log("xxxx confirming payment..");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // shipping: billingDetails,
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/success-checkout",
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.

      if (error) {
        error.type === "card_error" || error.type === "validation_error"
          ? setMessage(error.message)
          : setMessage(error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      // TODO: Move this to success checkout page
      // onSuccessfulCheckout();
    } catch (err) {
      console.log("xxxx error in payment:", err);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <BillingDetailsFields userDetails={userDetails} />
        <CardPayment paymentElementOptions={paymentElementOptions} />
        <Box>
          <Button
            type="submit"
            bgColor={"#FF5876"}
            color={"white"}
            _hover={{ bg: "#FF8BA0" }}
            size="md"
            disabled={isLoading || !stripe}
            leftIcon={<FiCreditCard />}
            marginTop={"10px"}
          >
            {isLoading ? "Processing..." : `Pay $${price}`}
          </Button>
        </Box>
        <Text
          id="payment-message"
          color={"#FF5876"}
          fontWeight={800}
          fontSize="sm"
        >
          {message ? message : ""}
        </Text>
      </VStack>
    </form>
  );
};

export default CheckoutForm;
