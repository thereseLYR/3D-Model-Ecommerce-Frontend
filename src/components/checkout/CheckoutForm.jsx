import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import BillingDetailsFields from "./BillingDetailsFields";
import CheckoutErrorContainer from "./CheckoutErrorContainer";

const CheckoutForm = ({
  price,
  onSuccessfulCheckout,
  clientSecret,
  userDetails,
}) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError("");
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessingTo(true);
    const cardElement = elements.getElement("card");

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: "Singapore",
        line1: ev.target.address.value, // billing address line1, line2...
        state: "Singapore",
        postal_code: ev.target.zip.value,
      },
    };

    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        error.type === "card_error" || error.type === "validation_error"
          ? setCheckoutError(error.message)
          : setCheckoutError(error);
        setProcessingTo(false);
        return;
      }
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    hidePostalCode: true,
  };

  const CardPayment = () => {
    return (
      <Box minW={{ base: "90%", md: "550px" }}>
        <Text
          color={"pink.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          letterSpacing={1.1}
          fontSize="lg"
        >
          Card Payment
        </Text>
        <br />
        <CardElement
          options={cardElementOpts}
          onChange={handleCardDetailsChange}
        />
        <br />
      </Box>
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <VStack>
        <BillingDetailsFields userDetails={userDetails} />
        <CardPayment />
        {checkoutError && (
          <CheckoutErrorContainer>{checkoutError}</CheckoutErrorContainer>
        )}
        <Box>
          <Button
            type="submit"
            colorScheme="purple"
            size="md"
            disabled={isProcessing || !stripe}
            leftIcon={<FiCreditCard />}
          >
            {isProcessing ? "Processing..." : `Pay $${price}`}
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default CheckoutForm;
